import { useRef, useState } from 'react';
import './styles.scss';
import axios from 'axios';
import { LoaderModal } from 'components/LoaderModal';

export const UploadIcon = ({ name, setIcon }) => {
  const [isFileSelected, setFileSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const deleteIcon = () => {
    setFileSelected(false);
    setIcon('');
    inputRef.current.value = '';
  };

  const onChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const imagePreview = document.querySelector('#preview');

    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        // const blob = new Blob([arrayBuffer], { type: file.type });
        
        const res = await axios.post('/estates/icon', file, { headers: {'Content-Type': file.type} });
        if (res.status === 200) {
          imagePreview.src = arrayBuffer;
          console.log(res.data)
          setIcon(res.data);
          setFileSelected(true);
        }

        setLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setLoading(false);
    }
  };
  
  return (
    <div className={isFileSelected ? `upload-icon selected` : `upload-icon`}>
      {isLoading ? <LoaderModal /> : '' }
      <input ref={inputRef} id='upload-icon' type='file' name={name} onChange={onChange} accept="image/png, image/gif, image/jpeg" />
      <label className='button-icon' htmlFor='upload-icon'>
        <span>Загрузить иконку</span>
        <svg className="ionicon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M320 255.79l-64-64-64 64M256 448.21V207.79" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
      </label>

      <div className='image-container' onClick={deleteIcon}>
        <div className='delete'><svg className="ionicon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M80 112h352" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg></div>
        <img id='preview' />
      </div>
    </div>
  );
};