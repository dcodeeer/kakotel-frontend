import { getMe } from 'api/users';
import axios from 'axios';
import { LoaderModal } from 'components/LoaderModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const UploadPhoto = () => {
  const { data } = useSelector(state => state.user);
  
  const [isLoading, setLoading] = useState(false);

  const onChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const imagePreview = document.querySelector('#preview');

    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        // const blob = new Blob([arrayBuffer], { type: file.type });

        imagePreview.src = arrayBuffer;
        
        const res = await axios.patch('/users/uploadPhoto', file, { headers: {'Content-Type': file.type} });
        if (res.status === 200) {
          await getMe();
        }

        setLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className='upload-photo form'>
      {isLoading ? <LoaderModal /> : '' }
      <div className='form-title'>Фотография</div>
      <div className='content'>
        <img id='preview' src={data.photo} />
        <input id='photo' type='file' onChange={onChange} accept="image/png, image/gif, image/jpeg" />
        <label className='button' htmlFor='photo'>Загрузить фото</label>
      </div>
    </div>
  );
};