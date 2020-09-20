import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FAQSingleCard from './FAQSingleCard'

/**
 * Info section with cards with FAQ
 * When one card is open all other suppose to be closed that is reason why we have cardIndex && cardGroupIndex state
 * */
export default function FAQInfoSection({ groups }) {

  //On click on single card Set card index as state
  const [cardIndex, setCardIndex] = useState()
  //There are more cards group s
  const [cardGroupIndex, setCardGroupIndex] = useState()
  return (
    <section className="faq__infos">

      {groups ? groups.map((groupInfo, groupKey) => {

        const { groupTitle, group: { informationsRepeater } } = groupInfo

        return (
          <div className="faq__infos-group" key={groupKey} >
            <h5>{groupTitle}</h5>

            {informationsRepeater.map((faq, index) =>
              <div
                onClick={() => {
                  setCardIndex(cardIndex === index && groupKey === cardGroupIndex ? null : index)
                  setCardGroupIndex(groupKey)
                }
                }
                value={index}
                key={index}>
                <FAQSingleCard key={index} faq={faq} groupIndex={cardGroupIndex} index={index} thisCardGroupIndex={groupKey} cardIndex={cardIndex} />
              </div>
            )}

          </div>
        )
      }) : null}
    </section>
  )
}


FAQInfoSection.propTypes = {
  groups: PropTypes.array.isRequired
}