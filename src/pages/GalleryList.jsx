import React,{useEffect} from 'react'
import GallerylistFilter from '../components/GallerylistFilter'
import Introduction from '../components/Introduction'

const GalleryList = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
     <>
      <Introduction heading="Search Galleries by name or suburb area"/>
    <GallerylistFilter/></>
  )
}

export default GalleryList