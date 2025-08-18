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
       <Introduction heading="Research art galleries and exhibitions for any given date or date range when planning visits to Sydney and its art suburbs"/>
      {/* <Filter/> */}
      <HomeGalleryComponent/>
    </main>
  );
};

export default Home;