import { useState } from 'react';

import './styles.scss';

export const Stepper = ({ defaultValue, onChange }) => {
  const [count, setCount] = useState(defaultValue ? defaultValue : 0)

  const increment = () => {
    setCount(count + 1);
    onChange(count + 1);
  };
  const decrement = () => {
    if (count <= 0) return;

    setCount(count - 1);
    onChange(count - 1);
  };

  return (
    <div className='stepper-box'>
      <div className='btn' onClick={decrement}><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M400 256H112"/></svg></div>
      <div className='count'>{count}</div>
      <div className='btn' onClick={increment}><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg></div>
    </div>
  );
};