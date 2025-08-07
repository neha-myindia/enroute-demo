import React, {useEffect} from 'react';
import Filter from '../components/Filter';
import HomeGalleryComponent from '../components/HomeGalleryComponent';
import Introduction from '../components/Introduction'

const Home = () => {

useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className=''>
       <Introduction/>
      {/* <Filter/> */}
      <HomeGalleryComponent/>
    </main>
  );
};

export default Home;