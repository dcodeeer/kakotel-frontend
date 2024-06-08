export class Kuro {
  constructor(url) {
    this.url = url;
    this.events = {};
    this.ws = null;
    

    this.reconnectInterval = 1000;
    this.maxReconnectInterval = 30000;
    this.reconnectDelay = 1.5;
    this.timeoutInterval = 2000;

    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.ws.onclose = (e) => {
      console.log('connection closed by code: ', e.code);
      if (e.code === 1000) return;
      this.reconnect();
    };

    this.ws.onmessage = this.handleMessages.bind(this);
  }

  reconnect() {
    setTimeout(() => {
      this.reconnectInterval = Math.min(this.reconnectInterval * this.reconnectDelay, this.maxReconnectInterval);
      this.connect();
    }, this.reconnectInterval);
  }

  handleMessages(e) {
    const message = JSON.parse(e.data);
    if (message.event) {
      const event = this.events[message.event];
      if (event) {
        const payload = JSON.parse(message.payload);
        event(payload);
      }
    }
  }

  close(code = 1000, reason = '') {
    this.ws.close(code, reason);
    this.ws = null;
    delete this;
  }

  on(event, callback) {
    this.events[event] = callback;
  }

  emit(event, payload) {
    const message = {
      event: event,
      payload: payload,
    };
    
    this.ws.send(JSON.stringify(message));
  }
}