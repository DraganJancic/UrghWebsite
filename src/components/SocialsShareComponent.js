import React from 'react'
import PropTypes from 'prop-types'

import fbIcon from '../images/facebook.svg'
import twIcon from '../images/twitter.svg'
import lnIcon from '../images/linked-in.svg'

import './SocialsShareComponent.scss'

/**
 * SocialsShareComponent component
 *
 * @param {object} language
 * 
 * @returns {JSX Element}
 */
export default function SocialsShareComponent({ title, language, postSlugTranslationName, slug }) {

  // A temporary URL that we can/should replace with a live URL when they provide it
  const url = 'http://student.jldevelopment.is';

  return (
    <div className="socials-share">
      <p className="socials-share__title strong">{language.locale === 'is_IS' ? 'Deila' : 'Share'}</p>
      <div className="socials-share__buttons">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}/${postSlugTranslationName}${slug}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={fbIcon} alt="facebook icon" />
        </a> 
        <a
          href={`https://twitter.com/intent/tweet?url=${url}/${postSlugTranslationName}${slug}&text=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={twIcon} alt="twitter icon" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}/${postSlugTranslationName}${slug}&title=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={lnIcon} alt="linkedin icon" />
        </a>
      </div>
    </div>
  )
}

SocialsShareComponent.propTypes = {
  language: PropTypes.object
}
