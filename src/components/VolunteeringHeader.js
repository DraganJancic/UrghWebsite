import React from 'react';
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'

import './VolunteeringHeader.scss'

/**
 * VolunteeringHeader
 *
 * @param {object} volunteeringHeaderData 
 *
 * @returns {JSX Element}
 */
export default function VolunteeringHeader({ volunteeringHeaderData }) {
  
  const { volunteeringTitle, volunteeringDescription, volunteeringHeroImage } = volunteeringHeaderData
  
  return (
    <div className="volunteering__header">
      <div className="volunteering__header-img-wrapper">
        <BackgroundImage
          className="volunteering__header-img"
          fluid={volunteeringHeroImage.file.heroImage.fluid}
        ></BackgroundImage>
      </div>
      <h2 className="volunteering__header-title">{volunteeringTitle}</h2>
      <p className="volunteering__header-description">{volunteeringDescription}</p>
    </div>
  );
};

VolunteeringHeader.propTypes = {
  volunteeringHeaderData: PropTypes.object
}