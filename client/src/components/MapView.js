import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIcon from "../images/room.svg";
import { Icon } from 'leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';

const MapComponent = ({ propertyList }) => {
  const defaultPosition = [40.425869, -86.908066];
  propertyList = Array.isArray(propertyList) ? propertyList : [propertyList];

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
                      <div>
                        <p>{propertyList[index].companyInfo.name}</p>
                        <p>{propertyList[index].propertyInfo.address}</p>
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
