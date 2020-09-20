import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

/**
 * Marker component
 * 
 * @param {HTML element} param.image
 */
const Marker = ({ image }) => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)'}}>
    {image}
  </div>
)

/**
 * GoogleMap component
 * 
 * @param {number} param.longitude 
 * @param {number} param.latitude 
 * @param {number} param.zoom 
 * @param {string} param.pathToPin 
 * @param {string} param.pathToPin 
 * @param {JSON} param.customStyles 
 */
export default function CustomGoogleMap({ lng, lat, zoom = 14, pathToPin, customStyles }) {

  const customStylesAndOptions = {
    styles: customStyles,
    fullscreenControl: false,
    zoomControl: false,
  }

  const mapCenter = { lat, lng };

  return (
    <div className="custom-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAbAtNxBgxqKGS9DviCOdkKEZzclRRN8Q0' }}
        defaultCenter={mapCenter}
        defaultZoom={zoom}
        options={customStylesAndOptions}
      >
        <Marker
          lat={lat}
          lng={lng}
          image={<img src={pathToPin} />}
        />
      </GoogleMapReact>
    </div>
  )
}


CustomGoogleMap.propTypes = {
  lng: PropTypes.number, 
  lat: PropTypes.number, 
  zoom: PropTypes.number, 
  pathToPin: PropTypes.string, 
  customStyles: PropTypes.array
}