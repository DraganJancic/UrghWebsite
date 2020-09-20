import React from 'react'
import PropTypes from 'prop-types'

//Header for organisation page which contains title and content
export default function OrganisationHeader({ title, content }) {

  return (
    <section className="organisations__header">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} className="organisation__header-content" />
    </section>
  )
}
OrganisationHeader.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
}