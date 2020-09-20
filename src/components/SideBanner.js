import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

import { useCurrentWidth } from '../hooks/useResize';
import './SideBanner.scss'

/**
 * SideBanner component
 *
 * @param {object} sideBannersData
 * 
 * @returns {JSX Element}
 */
export default function SideBanner({ sideBannersData }) {

  const { optionsPage: { sideBannerOptions: { sideBanners } } } = sideBannersData
  const windowWidth = useCurrentWidth()

  let bannerSize;

  if(windowWidth < 580) {
    bannerSize = 'mobile'
  } else if(windowWidth > 580 && windowWidth < 1023 ) {
    bannerSize = 'tablet'
  } else {
    bannerSize = 'desktop'
  }

  /**
   * getProperFluidImage displays the corresponding image(for mobile, tablet or desktop) depending on the screen size
   *
   * @param {object} imageObject 
   * @param {string} imageSize 
   */
  const getProperFluidImage = (imageObject, imageSize) => imageObject[`${imageSize}Image`][`${imageSize}File`][`${imageSize}ObjectImage`].fluid
  
  return (
    <div className="banners"> 
      {
        sideBanners && sideBanners.map((item, index) => {
          return(
            <div className={`banners__banner ${item.primaryBanner ? 'banners__banner--primary' : ''}`} key={index}>
              <a className="banners__banner-url" href={item.url}>
                <Img className="banners__banner-image" fluid={getProperFluidImage(item, bannerSize)} />
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

SideBanner.propTypes = {
  sideBannersData: PropTypes.object
}

