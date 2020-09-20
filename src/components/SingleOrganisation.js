import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'


import './SingleOrganisation.scss'

//Single organisation card
export default function SingleOrganisation({ title, content, image, email, phone }) {
  return (
    <div className="single-organisation">
      {
        image === null
          ? <div className="single-organisation__letter-img">{title.charAt(0)}</div>
          : <Img fluid={image.node.localFile.childImageSharp.fluid} alt="organisation icon" />
      }
      <h6>{title}</h6>
      <p className="small" dangerouslySetInnerHTML={{ __html: content }} ></p>
      <div className="single-organisation__infos">
        <a className="single-organisation__email small" href={`mailto:${email}`}>{email}</a>
        <a className="single-organisation__phone small" href={`tel::${phone}`}>{phone}</a>

      </div>
    </div>
  )
}

SingleOrganisation.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.object,
  email: PropTypes.string,
  phone: PropTypes.string
}