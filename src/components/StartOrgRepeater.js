import React from 'react'
import PropTypes from 'prop-types'

/**
 * Loop throught param and return JSX elements 
 * @param {array} organizationRepeater 
 */
export default function StartOrgRepeater({ organizationRepeater }) {
  return (
    <div className="start-org__repeater">
      {organizationRepeater.map((item, index) => {

        return (
          <div className="start-org__repeater-item" key={index}>
            <div className="start-org__repeater-item-index">
              {index + 1}
            </div>
            <div className="start-org__repeater-item-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

StartOrgRepeater.propTypes = {
  organizationRepeater: PropTypes.arrayOf(PropTypes.object)
}