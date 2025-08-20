import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useParams } from 'react-router-dom';



const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [17, 55],      
  popupAnchor: [1, -40], 
});


const highlightedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
   iconSize: [35, 55],       
  iconAnchor: [17, 55],      
  popupAnchor: [1, -40],     
  shadowSize: [41, 41]
});

const createLabelIcon = (name) => {
  return L.divIcon({
    className: "custom-marker", 
    html: `
      <div style="display:flex; flex-direction:column; align-items:center;">
        <img src="https://unpkg.com/leaflet/dist/images/marker-icon.png" 
             style="width:25px; height:41px;" />
        <span style="margin-top:2px; font-size:12px; color:#ffffff; padding:2px 10px; background-color:#363636; font-weight:500; white-space:nowrap;">
          ${name}
        </span>
      </div>
    `,
  });
};

function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, zoom);
    }
  }, [coords, zoom, map]);
  return null;
}



export const ShowonMap=()=> {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [selectedFromURL, setSelectedFromURL] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = (area = "") => {
    let url = `${baseUrl}/galleries/map/`;
    if (area) {
      url += `?area=${encodeURIComponent(area)}`;
    }
    axios.get(url)
      .then(res => {
    setGalleries(res.data);
  })
      .catch(err => console.error(err));
  };

 const handleGalleryClick = (gallery) => {
  setSelectedGallery(gallery); 
  setSidebarOpen(true);
};

 useEffect(() => {
  if (id) {
    axios.get(`${baseUrl}/galleries/map/?id=${id}`)
      .then(res => {
        setSelectedGallery(res.data[0]);
        setSelectedFromURL(res.data[0]); 
        setSidebarOpen(true);
      })
      .catch(err => {
        console.error("Error fetching selected gallery:", err);
      });
  }
}, [id]);



  return (
    <div className="map-wrapper">
      
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={12}
        style={{ height: "100vh", width: "80%", marginTop:"10vmin" }}
      >
        <TileLayer
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
/>

        {selectedGallery && (
          <ChangeMapView coords={[selectedGallery.lat, selectedGallery.long]} zoom={16} />
        )}

        {galleries.map(g => (
 <Marker
    key={g.id}
    position={[g.lat, g.long]}
    icon={
      selectedFromURL && g.id === selectedFromURL.id
        ? highlightedIcon
        : createLabelIcon(g.name)
    }
    eventHandlers={{
      click: () => handleGalleryClick(g)
    }}
  >
    <Popup>{g.name}</Popup>
  </Marker>
))}
      </MapContainer>

      {/* Sidebar */}
      {sidebarOpen && selectedGallery && (
        <Sidebar
          collapsed={false}
          
          style={{width:"80%", height:"15vmin",  position: "absolute",  top: 0, background: "#fff" }}
        >
          <Menu>
            <MenuItem>
              <h2>{selectedGallery.name}</h2>
            </MenuItem>
            <MenuItem>
              {selectedGallery.gallery_image && (
                <img
                  src={selectedGallery.gallery_image}
                  alt={selectedGallery.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
            </MenuItem>
            <MenuItem>
              <strong>Address:</strong><br/> {selectedGallery.address}
            </MenuItem>
             <MenuItem>
              <strong>Contact Number:</strong><br/> {selectedGallery.contact_number}
            </MenuItem>
            <MenuItem>
              <strong>Area:</strong><br/> {selectedGallery.area}
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </div>
  );
}


