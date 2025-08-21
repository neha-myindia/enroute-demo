import React,{useEffect} from 'react'
import Filter from '../components/Filter'
import Introduction from '../components/Introduction'
import GalleryMapsFilter from '../components/GalleryMapsFilter'
import { GalleryMapShow } from '../components/GalleryMapShow'

const GalleryMaps = () => {
  return (
   <>
      <Introduction heading="Search for gallery according to area"/>
    <GalleryMapsFilter/>
    <GalleryMapShow/>
    </>
  )
}

export default GalleryMaps