import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Link } from "gatsby"

import '../components/MeetCouncil.scss'

/**
 * MeetCouncil component
 *
 * @param {array} councilData
 * @param {object} language
 * 
 * @returns {JSX Element}
 */
export default function MeetCouncil({ councilData, language }) {
  return (
    <section className="councils">
      <div className="councils__wrapper content-wrapper">
        <h3 className="councils__title">{language.locale === 'is_IS' ? 'Hittu ráðið' : 'Meet the council '}</h3>
        <div className="councils__cards">
          {
            councilData.map((item, index) => {
              return(
                <div className="councils__card" key={index}>
                  <div className="councils__card-img-wrapper">
                    <Img resolutions={item.image.file.councilCardImage.resolutions} className="councils__card-img" />
                  </div>
                  <div className="councils__card-info">
                    <h5 className="councils__card-name">{item.name}</h5>
                    <span className="councils__card-position small">{item.position}</span>
                    <p className="councils__card-description small">{item.description}</p>
                  </div>
                  <div className="councils__card-socials-wrapper">
                    <div className="councils__card-email">
                      <div className="councils__card-email--letter"></div>
                      <a href={`mailto:${item.email}`}><p className="strong">{item.email}</p></a>
                    </div>
                    {item.socialsRepeater && <div className="councils__card-socials">
                      {
                        item.socialsRepeater.map((social, index) => {
                          return(
                            <div className="councils__card-social" key={index}>
                              <Link to={social.url} target="_blank">
                                <Img fluid={social.socialIcon.file.councilSocialImage.fluid} alt="Social Icon"/>
                              </Link>
                            </div>
                          )
                        })
                      }
                    </div>}
                  </div>
                </div>
              )
            })
          }
        </div>  
      </div>
    </section>
  )
}

MeetCouncil.propTypes = {
  councilData: PropTypes.array,
  language: PropTypes.object,
}
