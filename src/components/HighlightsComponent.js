import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
//Styles
import './HighlightsComponent.scss'
//SVG image
import SvgElement from '../svg-images/Circles-blue.svg'

//Highlights component from flexible content object
export default function HighlightsComponent({ description, title, link, image, language }) {

  const { locale } = language;

  //limiting description to 180 caracters
  const limitedDescription = description.substring(0, 180);

  //object destructuring for gatsby image
  const { localFile: { childImageSharp: { resolutions } } } = image;

  return (
    <section className="highlights">
      <div className="content-wrapper">
        <div className="highlights__wrapper">
          <div className="highlights__image-wrapper">
            <Img className="highlights__image" resolutions={resolutions} />
          </div>
          <div className="highlights__headlines">
            <h3 className="highlights__headlines-title">{title}</h3>
            <p className="highlights__headlines-subtitle">{
              description.length > 180
                ? `${limitedDescription}...`
                : description
            }</p>
            <a href={link} className="read-more-link--light">{locale === 'is_IS' ? 'Lestu meira' : 'Read more'}</a>
          </div>
          <SvgElement className="highlights__svg" />
        </div>
      </div>
    </section>
  )
}

HighlightsComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.object.isRequired
}
