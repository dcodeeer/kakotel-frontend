import { UploadPhoto } from './UploadPhoto';
import { Personal } from './Personal';
import { Password } from './Password';

import './styles.scss';


export const Settings = () => {
  return (
    <div className='settings-page container'>
      <UploadPhoto />
      <Personal />
      <Password />
    </div>
  );
};