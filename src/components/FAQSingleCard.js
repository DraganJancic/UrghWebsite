import React from 'react'
import PropTypes from 'prop-types'
/**
 * Single card which can be open or closed depeands of passed state
 * @param {object} faq  informations about cards { title, content }
 * @param {number} index position current card in array
 * @param {number} cardIndex represent state which contains info about clicked card position in array from one gruop 
 * @param {number} cardGroupIndex which group contains clicked card
 * @param {number} thisCardGroupIndex clicked card group
 */
export default function FAQSingleCard({ faq, index, cardIndex, groupIndex, thisCardGroupIndex }) {
  return (
    <div className={`faq__infos-card faq__infos-card--${groupIndex === thisCardGroupIndex && index === cardIndex ? 'open' : 'closed'}`}>
      <h6>{faq.infoTitle}</h6>
      <p className="faq__infos-card-text" dangerouslySetInnerHTML={{ __html: faq.infoDesc }}></p>
    </div>
  )
}

FAQSingleCard.propTypes = {
  faq: PropTypes.object,
  index: PropTypes.number,
  cardIndex: PropTypes.number,
  groupIndex: PropTypes.number,
  thisCardGroupIndex: PropTypes.number,
}