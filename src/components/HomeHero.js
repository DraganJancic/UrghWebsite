import React from 'react'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'

import './HomeHero.scss'

export default function HomeHero({ title, subtitle, heroImage }) {

  return (
    <section className="home-hero">
      <div className="home-hero__wrapper content-wrapper">
        <div className="home-hero__headlines">
          <p className="home-hero__headlines-subtitle subtitle">{subtitle}</p>
          <h1 className="home-hero__headlines-title">{title}</h1>
        </div>
        <div className="home-hero__wrapper-image">
          <BackgroundImage className="home-hero__image" fluid={heroImage.fluid} />
        </div>
      </div>
    </section>
  )
}

HomeHero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  heroImage: PropTypes.object
}
