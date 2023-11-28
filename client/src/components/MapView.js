import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import RoomIcon from '@mui/icons-material/Room';
import markerIcon from "../images/room.svg"

const MapComponent = ({address}) => {
  const apiKey = '9a33030d18d9c0db7023221f2cc438c3';

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const refineSearch = `${address}, Indiana`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(
            refineSearch
          )}`
        );
        const result = await response.json();
        setData(result.data[0]);
      } catch (error) {
        console.error("Error fetching location", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, apiKey]);

  return (
    <div>
      {loading ? (
        <p>Loading map...</p>
      ) : data ? (
        <MapContainer
          center={[data.latitude, data.longitude]}
          zoom={15}
          style={{ width: '700px', height: '200px' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains="abcd"
            maxZoom={20}
          />

          <Marker
            position={[data.latitude, data.longitude]}
            icon={new Icon({
              iconUrl: markerIcon,
              iconSize: [50, 50],
              iconAnchor: [25, 50],
            })}
          >
            <Popup>
              <div>
                <p>Text above the marker</p>
                <p>Other information here</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default MapComponent;
