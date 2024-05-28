import axios from 'axios';
import { useState } from 'react';
import { LoaderModal } from 'components/LoaderModal';

export const Pictures = ({ setPictures }) => {
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState({});

  const updateIds = () => {
    const newArr = [];
    Object.keys(images).map((key, index) => newArr.push(parseInt(key)));
    setPictures(newArr);
  };

  const removePicture = (key) => {
    const newObj = images;
    delete newObj[key];
    updateIds();
  };

  const onChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        await new Promise(r => setTimeout(r, 1000));

        const arrayBuffer = event.target.result;
        const blob = new Blob([arrayBuffer], { type: file.type });
        
        const res = await axios.post('/estates/tempImage', file, { headers: {'Content-Type': file.type} });
        if (res.status === 200) {
          const imageObj = images;
          imageObj[res.data] = arrayBuffer;
          setImages(imageObj);
          updateIds();
        }

        setLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setLoading(false);
    }

    e.target.value = '';
  };

  return (
    <div className='section pictures'>
      {isLoading ? <LoaderModal /> : '' }
      <div className='subtitle'>Картинки</div>
      <div className='bottom'>
        <div className='images'>
          {
            Object.keys(images).map((key, index) => (
              <div className='block' data-id='1' key={index}>
                <div className='content'>
                  <button onClick={() => removePicture(key)}><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg></button>
                </div>
                <img src={images[key]} />
              </div>
            ))
          }
        </div>
        <div className='upload'>
          <input type='file' id='file' onChange={onChange} />
          <label htmlFor='file'>
            <div>Загрузить файл</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 255.79l-64-64-64 64M256 448.21V207.79"/></svg>
          </label>
        </div>
      </div>
    </div>
  );
};