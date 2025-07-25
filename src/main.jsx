import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import GalleryList from './pages/GalleryList.jsx'
import { ShowonMap } from './pages/ShowonMap.jsx'
import GalleryItemDetails from './pages/GalleryItemDetails.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        index: true,
        element: <Home />
      }
    ,{
      path:'gallery-list',
      element:<GalleryList/>
    },
    {
      path:'show-on-map',
      element:<ShowonMap/>
    },
    {
      path:'gallery-list-item-details',
      element:<GalleryItemDetails/>
    },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
