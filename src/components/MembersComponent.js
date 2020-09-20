import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import '../components/MembersComponent.scss'

/**
 * MemberComoponent
 * 
 * @param {array} memberData
 * @param {object} language
 *
 * @param {
 } param0 
 */
export default function MembersComponent({ memberData, language }) {
  return (
    <section className="members">
      <div className="members__wrapper content-wrapper">
        <h3 className="members__title">{language.locale === 'is_IS' ? 'Stúdentaráðsliðar' : 'Student Relays'}</h3>
        <div className="members__cards">
          {
            memberData.map((item, index) => {
              return(
                <div className="members__card" key={index}>
                  <div className="members__card-img-wrapper">
                    <Img fluid={item.image.file.memberCardImage.fluid} className="members__card-img" />
                  </div>
                  <div className="members__card-info">
                    <h6 className="members__card-name">{item.name}</h6>
                    <p className="members__card-description small">{item.description}</p>
                  </div>
                  <div className="members__card-email">
                    <div className="members__card-email--letter"></div>
                    <a href={`mailto:${item.email}`}><p className="strong">{item.email}</p></a>
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

MembersComponent.propTypes = {
  memberData: PropTypes.array,
  language: PropTypes.object
}

