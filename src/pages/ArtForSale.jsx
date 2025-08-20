import React,{useEffect} from 'react'
import Filter from '../components/Filter'
import Introduction from '../components/Introduction'
import ArtForSaleComponent from '../components/ArtForSaleComponent'
import ArtForSaleFilter from '../components/ArtForSaleFilter'

const ArtForSale = () => {
     useEffect(() => {
                window.scrollTo(0, 0);
              }, []);
  return (
     <>
      <Introduction heading="Search for featured arts for sale"/>
      <ArtForSaleFilter/>
    <ArtForSaleComponent/>
    </>
  )
}

export default ArtForSale