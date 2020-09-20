import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

//Single news on archive page
export default function SingleNewsPreview({ title, image, link, date, readMore }) {

  return (
    <div className="single-news-preview">
      {image !== null
        ? <BackgroundImage
          className="single-news-preview__image-wrap"
          fluid={image.node.file.newsImage.fluid}
        />
        : null
      }
      <div className="single-news-preview__content-wrap">
        <p className="single-news-preview__content-date">{date}</p>
        <h3>{title}</h3>
        <Link className="read-more-link--light" to={link}>{readMore}</Link>
      </div>
    </div>
  )
}

SingleNewsPreview.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  date: PropTypes.string,
  readMore: PropTypes.string,
}