import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

export default function StartOrgHeader({ organizationHeader }) {

  const { image: { file: { image } }, title, description } = organizationHeader

  return (
    <section className="start-org__header">
      <Img fluid={image.fluid} alt="start an organisation" className="start-org__header-image" />
      <div className="start-org__header-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  )
}

StartOrgHeader.propTypes = {
  organizationHeader: PropTypes.object.isRequired
}