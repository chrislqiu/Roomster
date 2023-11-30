import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIcon from "../images/room.svg";
import { Icon } from 'leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { Link } from 'react-router-dom';

const MapComponent = ({ propertyList }) => {
  propertyList = Array.isArray(propertyList) ? propertyList : [propertyList];

  let defaultPosition = [40.425869, -86.908066];

  if (propertyList.length === 1) {
    const { latitude, longitude } = propertyList[0].propertyInfo;
    if (latitude !== undefined && longitude !== undefined) {
      defaultPosition = [latitude, longitude];
    }
  }


  return (
    <div>
      {propertyList.length > 0 ? (
        <MapContainer
          center={defaultPosition}
          zoom={15}
          style={{ width: '700px', height: '400px' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains="abcd"
            maxZoom={20}
          />
          <MarkerClusterGroup>
            {propertyList.map((location, index) => {
              const { latitude, longitude } = location.propertyInfo;
              const { _id } = location;
              const { beds, baths, cost, image } = location.propertyInfo;
              if (latitude !== undefined && longitude !== undefined) {
                return (
                  <Marker
                    key={index}
                    position={[latitude, longitude]}
                    icon={new Icon({
                      iconUrl: markerIcon,
                      iconSize: [50, 50],
                      iconAnchor: [25, 50],
                    })}
                  >
                    <Popup>
                      <div style={{ textAlign: 'center' }}>
                        <h2>{propertyList[index].propertyInfo.propertyName}</h2>
                        <img src={image} alt={`Property ${index + 1}`} style={{ maxWidth: '100%', margin: '5px 0' }} />
                        <h3 style={{ margin: '5px 0' }}>{`${beds} Bed, ${baths} Bath`}</h3>
                        <h3 style={{ margin: '5px 0' }}>{`$${cost} per month`}</h3>
                        <p style={{ margin: '5px 0' }}>{propertyList[index].companyInfo.name}</p>
                        <p style={{ margin: '5px 0' }}>{propertyList[index].propertyInfo.address}</p>
                        <Link
                          to={`http://localhost:3001/Property/${_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'block', margin: '8px 0' }}
                        >
                          Go to Property Details
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                );
              } else {
                return null;
              }
            })}
          </MarkerClusterGroup>
        </MapContainer>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default MapComponent;
