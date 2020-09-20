import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import VolunteeringSingleBox from './VolunteeringSingleBox'
import './VolunteerinAssociations.scss'

/**
 * VolunteeringAssociationsSection component with volunteering associations cards
 *
 * @param {array} volunteeringAssociationsData 
 *
 * @returns {JSX Element}
 */
export default function VolunteeringAssociationsSection({ volunteeringAssociationsData }) {

  // On click on single card Set card index as state
  const [cardIndex, setCardIndex] = useState()
  // There are more cards group s
  const [cardGroupIndex, setCardGroupIndex] = useState()

  return (
    <div className="volunteering__associations">
      {volunteeringAssociationsData && 
        volunteeringAssociationsData.map((item, groupKey) => {

          return (
            <div className="volunteering__cell" key={groupKey}>
              <div className="volunteering__cell-header">
                <Img className="volunteering__cell-img"
                  fluid={item.sectionImage.file.sectionIcon.fluid}
                />
                <div className="volunteering__cell-title">
                  {item.sectionTitle}
                </div>
              </div>

              <div className="volunteering__subsection">
                {
                  item.sectionRepeater.map((card, index) => {

                    return (
                      <VolunteeringSingleBox 
                        key={index}
                        title={card.subsectionTitle}
                        description={card.subsectionDescription}
                        name={card.subsectionName}
                        email={card.subsectionEmail}
                        phone={card.subsectionPhone}
                        groupIndex={cardGroupIndex} 
                        index={index} 
                        thisCardGroupIndex={groupKey} 
                        cardIndex={cardIndex} 
                        setCardIndex={setCardIndex}
                        setCardGroupIndex={setCardGroupIndex}
                      /> 
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

VolunteeringAssociationsSection.propTypes = {
  volunteeringAssociationsData: PropTypes.arrayOf(PropTypes.object),
}

