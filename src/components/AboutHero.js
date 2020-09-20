import React from 'react'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'

import '../components/AboutHero.scss'

/**
 * AboutHero component
 *
 * @param {string} pageTitle
 * @param {object} heroData
 * 
 * @returns {JSX Element}
 */
export default function AboutHero({ pageTitle, heroData }) {
  const { title, description, image } = heroData
  
  return (
    <section className="about-us__hero">
      <div className="about-us__hero-wrapper content-wrapper">
        <p className="about-us__hero-subtitle popins">{pageTitle}</p>
        <h1 className="about-us__hero-title">{title}</h1>
        <div className="about-us__hero-content">
          <div className="about-us__hero-content-text" dangerouslySetInnerHTML={{ __html: description }} />
          <div className="about-us__hero-content-img-wrapper">
            <BackgroundImage
              className="about-us__hero-content-img"
              fluid={image.file.aboutHeroImage.fluid}
            ></BackgroundImage>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutHero.propTypes = {
  heroData: PropTypes.object,
  pageTitle: PropTypes.string
}
