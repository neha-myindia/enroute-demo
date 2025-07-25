import React,{useEffect} from 'react'
import GallerylistFilter from '../components/GallerylistFilter'
import Introduction from '../components/Introduction'

const GalleryList = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
     <>
      <Introduction/>
    <GallerylistFilter/></>
  )
}

export default GalleryList