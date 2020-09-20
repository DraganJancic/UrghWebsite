
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

//Styles
import './HomeBanner.scss'
//Hoks
import { useCurrentWidth } from '../hooks/useResize';

//Home banner componnet from flexible content object
export default function HomeBanner({ url, desktopImage, mobileImage }) {

  const { localFile: { childImageSharp } } = desktopImage;
  const { mobileFile: { mobileObjectImage } } = mobileImage;

  const windowWidth = useCurrentWidth()

  return (
    <section className="home-banner">
      <div className="home-banner__wrapper content-wrapper">
        <a href={url} className="home-banner__link" target="_blank">
          <Img className="home-banner__image" resolutions={windowWidth > 579 ? childImageSharp.resolutions : mobileObjectImage.resolutions} />
        </a>
      </div>
    </section>
  )
}

HomeBanner.propTypes = {
  url: PropTypes.string,
  desktopImage: PropTypes.object.isRequired,
  mobileImage: PropTypes.object.isRequired
}
