import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

import './HistoryLayout.scss';

/**
 *  We are using the HistoryLayout component to display content for the history page
 *
 * @param {object} historyArray 
 *
 * @returns {JSX Element}
 */
export default function HistoryLayout({ historyArray }) {
  const { historyRepeater } = historyArray
  
  return (
    <section className="history">
      <div className="history__wrapper content-wrapper">
        {
          historyRepeater.map((item, index) => {
            return (
              <div className="history__box" key={index}>
                <div className="history__text-wrapper">
                  <div className="history__year">
                    <span className="history__year-circle"></span>
                    <div className="history__year-number">{item.year}</div>
                  </div>
                  <div className="history__text-content">
                    <h3 className="history__title">{item.title}</h3>
                    <p className="history__description">{item.description}</p>
                  </div>
                </div>
                <div className={`history__img-wrapper ${item.hasPortrait ? 'history__img-wrapper--portrait' : ''}`}>
                  <Img className="history__img" fluid={item.image.file.historyRepeaterImage.fluid} />
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

HistoryLayout.propTypes = {
  historyArray: PropTypes.object
}