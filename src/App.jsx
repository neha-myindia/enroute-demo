import './App.css'
import BottomBlackFooter from './components/BottomBlackFooter'
import Filter from './components/Filter'
import HomeGalleryComponent from './components/HomeGalleryComponent'
import Introduction from './components/Introduction'
import Navbar from './components/Navbar/Navbar'
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar/>
      {/* <Filter/>
      <HomeGalleryComponent/> */}
      <Outlet/>
      <BottomBlackFooter/>
    </>
  )
}

export default App
