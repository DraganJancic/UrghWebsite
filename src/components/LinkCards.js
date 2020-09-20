import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import './LinkCards.scss'

export default function LinkCards({ linkCards, mainLinkCard, language }) {

  const { locale } = language;

  return (
    <div className="cards content-wrapper">
      <div className="cards__main">
        <div className="cards__main-image">
          <Img resolutions={mainLinkCard.mainLinkCardImage.localFile.childImageSharp.resolutions} />
        </div>
        <div className="cards__main-content">
          <h3>{mainLinkCard.mainLinkCardTitle}</h3>
          <p>{mainLinkCard.mainLinkCardSubtitle}</p>
          <div>
            <Link className="read-more-link--dark" to={mainLinkCard.mainLinkCardUrl} >{locale === 'is_IS' ? 'Lestu meira' : 'Read more'}</Link>
          </div>
        </div>
      </div>
      {
        //mapping all cards after main card
        linkCards.map((card, index) => {
          return (
            card.squareOrReportCard    //if true returns square cards else returns report card
              ?
              <div className="cards__square" key={index}>
                <Link className="cards__square-link" to={card.url.url}>
                  <div className="cards__square-image">
                    <Img resolutions={card.icon.localFile.childImageSharp.resolutions} />
                  </div>
                  <h6>{card.title}</h6>
                </Link>
              </div>
              :
              <div className="cards__report" key={index}>
                <div className="cards__report-content">
                  <h6>{card.title}</h6>
                  <Link className="cta-report" to={card.url.url}>{locale === 'is_IS' ? 'Skýrsla' : 'Report'}</Link>
                </div>
              </div>
          )
        })
      }
    </div>
  )
}

LinkCards.propTypes = {
  LinkCards: PropTypes.object,
  mainLinkCard: PropTypes.object.isRequired,
  language: PropTypes.object
}