import axios from 'axios';
import './styles.scss';

export const Estate = () => {
  return <div>estate single</div>;
};

Estate.loader = async () => {
  try {
    const estate = await axios.get('/estates/getOne?id');
    if (estate.status === 200) {
      if (!estate.data) estate.data = [];
      
      return {
        estates: estate.data,
      };
    }
  } catch {}

  return {
    estates: [],
  };
};  