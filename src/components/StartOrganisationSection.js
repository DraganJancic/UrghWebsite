import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

// Info static component which contaions link which redirect to info page
export default function StartOrganisationSection({ info, language }) {
  const { startOrgTitle, startOrgContent, link } = info
  const { locale } = language

  return (
    <div className='organisations__start-org'>
      <h3>{startOrgTitle}</h3>
      <p>{startOrgContent}</p>
      <Link to={link} className="cta-with-pseudo">{locale === 'is_IS' ? 'ISLearn more' : 'Learn more'}</Link>
    </div>
  )
}

StartOrganisationSection.propTypes = {
  info: PropTypes.object,
  language: PropTypes.object
}
