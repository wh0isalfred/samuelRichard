import InspirationGrid from './InspirationGird';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const Inspiration = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('inspiration')
        .select('*')
        .order('created_at', { ascending: false });

      setImages(data || []);
    };

    fetch();
  }, []);

  return <InspirationGrid images={images} />;
};

export default Inspiration;