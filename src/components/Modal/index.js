import './styles.scss';

export const Modal = ({ isVisible, onClose, title, text }) => {
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className='modal'>
      <div className='content'>
        <div className='title'>{title}</div>
        <div className='text'>{text}</div>
        <button className='button' onClick={onClose}>Хорошо</button>
      </div>
    </div>
  );
};