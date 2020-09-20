import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './OrganisationFilter.scss'

/**
 * Drop down with all taxonomies
 * On select  setactiveTaxonomy function is setting activeTaxonomy
 * Then other component => OrganisationsList will render propper organisations
 */
export default function OrganisationFilter({ allTaxonomies, activeTaxonomy, setactiveTaxonomy }) {

  const [isOrgMenuOpen, setIsOrgMenuOptn] = useState(false)

  return (
    <section className="organisations__filter">

      <div className={`organisations__filter-wrap organisations__filter-wrap--${isOrgMenuOpen ? 'open' : ''}`}>
        <div className={`organisations__menu organisations__menu--${isOrgMenuOpen ? 'open' : 'closed'}`} onClick={() => setIsOrgMenuOptn(!isOrgMenuOpen)}>
          <div className="organisations__menu-item organisations__menu-item-selected">
            {activeTaxonomy}
          </div>

          {allTaxonomies.map((item, index) =>
            <div
              className={`organisations__menu-item ${item === activeTaxonomy ? 'organisations__menu-item--active' : ''}`}
              key={index}
              onClick={(e) => {
                setactiveTaxonomy(e.target.innerHTML)
              }}
            >
              {item}
            </div>)}
        </div>
      </div>
    </section>
  )
}

OrganisationFilter.propTypes = {
  allTaxonomies: PropTypes.array,
  activeTaxonomy: PropTypes.string,
  setactiveTaxonomy: PropTypes.func
}
