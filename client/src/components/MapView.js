import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIcon from "../images/room.svg";
import { Icon } from 'leaflet';

const MapComponent = ({ propertyList }) => {
  const apiKey = '9a33030d18d9c0db7023221f2cc438c3';

  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  // useEffect(() => {
  //   const fetchDataForProperties = async () => {
  //     const locationsArray = [];

  //     for (const property of propertyList) {
  //       const result = await fetchData(property.propertyInfo.address);
  //       if (result) {
  //         console.log("fetch: " + result.latitude)
  //         locationsArray.push(result);
  //       }
  //     }

  //     setLocations(locationsArray);
  //     setLoading(false);
  //   };

  //   fetchDataForProperties();
  // }, [propertyList]);

  // const fetchData = async (propertyAddress) => {
  //   try {
  //     const response = await fetch(
  //       `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(
  //         propertyAddress
  //       )}`
  //     );
  //     const result = await response.json();
  //     return {
  //       latitude: result.data[0].latitude,
  //       longitude: result.data[0].longitude,
  //     };
  //   } catch (error) {
  //     console.error("Error fetching location", error);
  //     return null;
  //   }
  // };

  return (
    <div>
      {loading ? (
        <p>Loading map...</p>
      ) : locations.length === 0 ? (
        <MapContainer
          center={[40.425869,-86.908066]}
          zoom={15}
          style={{ width: '700px', height: '400px' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains="abcd"
            maxZoom={20}
          />

          {propertyList.map((location, index) => {
            if (location.propertyInfo.lat !== undefined && location.propertyInfo.long !== undefined) {
              console.log("Valid lat and long:", location.propertyInfo.lat, location.propertyInfo.long);

              return (
                <Marker
                  key={index}
                  position={[location.propertyInfo.lat, location.propertyInfo.long]}
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
              console.warn(`Skipping Marker at index ${index} due to missing lat or long.`);
              return null; // or any other handling you want
            }
          })}


        </MapContainer>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default MapComponent;
