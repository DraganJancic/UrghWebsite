import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
 * Static section which redirect to contact page
 * @param {string} cantFindTitle 
 * @param {string} cantSubtitle 
 */
export default function CantFindSection({ cantFindTitle, cantSubtitle, cantFindUrl }) {

  return (
    <div className="faq__cant-find">
      <h3>{cantFindTitle}</h3>
      <p className="subtitle">{cantSubtitle}</p>
      {cantFindUrl && <Link className="cta-with-pseudo" target={cantFindUrl.target} to={cantFindUrl.url}>{cantFindUrl.title}</Link>}
    </div>
  )
}

CantFindSection.propTypes = {
  cantFindTitle: PropTypes.string,
  cantSubtitle: PropTypes.string,
  cantFindUrl: PropTypes.objectOf(PropTypes.string)
}