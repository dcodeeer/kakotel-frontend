import './styles.scss';

export const toast = () => {
  
};

export const ToastComponent = ({ type, message }) => {
  const icons = {
    'success': <svg className="ionicon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path d="M352 176L217.6 336 160 272" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>,
  };

  const titles = {
    'success': 'Успех!',
  };

  return (
    <div className={`toast ${type}`}>
      {icons[type]}
      <div className='toast-content'>
        <div className='toast-title'>{titles[type]}</div>
        <div className='toast-message'>{message}</div>
      </div>
    </div>
  );
};