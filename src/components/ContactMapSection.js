import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import mapStyles from '../utils/contactMapStyles'
import pinImg from '../images/map-pin.svg'
import CustomMap from './CustomGoogleMap'
import './ContactMapSection.scss'

/**
 * ContactMapSection component
 * 
 * @param {object} param.data
 */
export default function ContactMapSection({ data }) {

  const { 
    sectionTitle,
    googleMap: { longitude, latitude, zoom }, 
    contactDetails
  } = data;

  return (
    <div className="contact-map-section">
      <div className="contact-map-section__inner-wrapper">
        <CustomMap 
          lat={latitude}
          lng={longitude}
          zoom={parseInt(zoom, 10)}
          pathToPin={pinImg}
          customStyles={mapStyles}
        />
        <div className="contact-map-section__details">
          <h2 className="contact-map-section__details-title">{sectionTitle}</h2>
          <p>Testing incremental build.</p>
          {
            Object.entries(contactDetails).map(([name, value], index) => {
              return (
                <div className="contact-map-section__details-item" key={index}>
                  <div className="contact-map-section__details-item-image">
                    <Img resolutions={value.icon.file.childImageSharp.resolutions} />
                  </div>
                  
                  <div className="contact-map-section__details-item-content">
                    <h6 >{value.title}</h6>
                    {((fieldGroupName) => {
                      switch (fieldGroupName) {
                        case 'addressInfo':
                        case 'officeHours':
                          return <p>{value.info}</p>
                        case 'emailInfo':
                          return <a href={`mailto:${value.info}`}>{value.info}</a>
                        case 'phoneInfo':
                          return <a href={`tel:${value.info}`}>{value.info}</a>
                        default:
                          break;
                      }
                    })(name)}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}


ContactMapSection.propTypes = {
  data: PropTypes.object
}