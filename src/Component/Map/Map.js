import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '700px',
  height: '600px',
  borderRadius: '20px'
};

const center = {
  lat: 23.810331,
  lng: 90.412521
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBMuvg2TW0OGWLhd-g863t7Yqx7_y-yYcc"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)