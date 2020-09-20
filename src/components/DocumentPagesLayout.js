import React from 'react'
import PropTypes from 'prop-types'

import docIcon from '../images/doc-icon.jpg'
import pdfIcon from '../images/pdf-icon.png'

import SideBanner from './SideBanner'

import './DocumentPagesLayout.scss'

/**
 * Layout for page with linked documents
 * @param {string} title 
 * @param {array} docRepeater 
 * @param {string} title 
 */
export default function DocumentPagesLayout({ title, docRepeater, sideBannersData }) {
  return (
    <div className="doc-page">
      <div className="doc-page__wrapper content-wrapper">
        <div className="doc-page__content">
          {title && <h2>{title}</h2>}

          {docRepeater && docRepeater.map((item, key) => {

            return (
              <div className="doc-page__group" key={key}>
                {item.title && <h5>{item.title}</h5>}
                {item.subtitle && <p className="doc-page__group-subtitle">{item.subtitle}</p>}
                {item.docTitle && <p className="strong">{item.docTitle}</p>}
                {item.documentRepeater.map((doc, key) =>
                  <a
                    href={doc.docLink}
                    target="_blank"
                    key={key}
                    className={`doc-page__single-doc doc-page__single-doc--${doc.pdfOrWord ? 'pdf' : 'doc'}`}>
                    <img src={doc.pdfOrWord ? pdfIcon : docIcon} />
                    <p>{doc.docTitle}</p>
                  </a>
                )}
              </div>
            )

          })}
        </div>
        <SideBanner sideBannersData={sideBannersData} />
      </div>
    </div>
  )
}

DocumentPagesLayout.propTypes = {
  title: PropTypes.string,
  docRepeater: PropTypes.arrayOf(PropTypes.object).isRequired,
  sideBannersData: PropTypes.object
}
