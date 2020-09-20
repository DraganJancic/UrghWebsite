import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { useCurrentWidth } from '../hooks/useResize'
import './BannerSlider.scss'
import SvgElementDesktop from '../svg-images/Circle-Stroke-grey.svg'



export default function BannerSlider({ slider }) {

  const windowWidth = useCurrentWidth()
  slider.slice(0, 5);

  //this updates activeSlider state to +1 every 5 seconds so it can change link and image and create slider effect
  const [activeSlider, setActiveSlider] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      activeSlider + 1 < slider.length
        ? setActiveSlider(activeSlider + 1)
        : setActiveSlider(activeSlider => activeSlider = 0)
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeSlider])

  return (
    <section className="slider">
      <div className="slider__wrapper content-wrapper">
        {
          slider.map((slide, index) => {
            {
              return (
                //Here is compared map function index of elemnts with activeSlider from state so images change as state is updated
                <div className={
                  `slider__link${
                  activeSlider === index    //sets active modifier class to current element
                    ? ' slider__link--active' : ''}${
                  activeSlider - 1 === index || (index === slider.length - 1 && activeSlider === 0) //sets was-active modifier class to previous element
                    ? ' slider__link--was-active' : ''}`
                }
                  key={index}>
                  <a href={slide.url}>
                    <Img className='slider__link-img'
                      resolutions={
                        windowWidth > 579
                          ? slide.bannerImage.localFile.childImageSharp.resolutions         //desktop and tablet
                          : slide.bannerImageMobile.localFile.childImageSharp.resolutions   //mobile image
                      } />
                  </a>
                </div>
              )
            }
          })
        }
        <SvgElementDesktop className="slider__svg" />
      </div>
    </section>
  )
}

BannerSlider.propTypes = {
  slider: PropTypes.array
}
