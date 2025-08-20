import React,{useEffect} from 'react'
import Introduction from '../components/Introduction'
import ArtistsFilter from '../components/ArtistsFilter';
import ArtistsGalleryComponent from '../components/ArtistsGalleryComponent';

const ExhibitingArtists = () => {
     useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
  return (
    <>
      <Introduction heading="Search for artists who are exhibiting in Sydney / NSW now and in the future"/>
    <ArtistsFilter/>
    <ArtistsGalleryComponent/>
    </>
  )
}

export default ExhibitingArtists