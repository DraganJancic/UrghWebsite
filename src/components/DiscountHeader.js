import React, { useState } from 'react'
import PropTypes from "prop-types"

import './DiscountHeader.scss';

/**
  * @param {array} filters - all registred taxonomies for this CPT 
  * @param {string} language - current language
  * @param {func} setActiveDiscountsTaxonomy - callback for setting ActiveDiscountTaxonomy state
  * Discount header renders discount title & subtitle & discount filter
  * Discount filter is select options element which contains all  param.filters ( all registred taxonomies for this CPT )
  * On click on certain filter setActiveDiscountsTaxonomy will set activeDiscountTaxonomy and render proper discounts in DiscountList
 */
export default function DiscountHeader({ filters, language, setActiveDiscountsTaxonomy }) {

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [activeDiscountFilter, setActiveDiscountFilter] = useState(filters[0])

  function getFirstWord(str) {
    let spaceIndex = str.indexOf(' ')
    return spaceIndex === -1 ? str.toLowerCase() : str.substr(0, spaceIndex).toLowerCase()
  }

  return (
    <section className="discount-page__header">
      <div className="discount-page__header-wrapper content-wrapper">
        <p className="subtitle">{language === 'is_IS' ? 'ISDiscounts for students' : 'Discounts for students'}</p>
        <h2>{language === 'is_IS' ? 'Show offers inIS:' : 'Show offers in:'}</h2>

        <div className={`discount-page__header-filter ${isFiltersOpen ? 'discount-page__header-filter--open' : ''}`}>
          <div
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`active discount-page__header-filter-item discount-page__header-filter-item--${getFirstWord(activeDiscountFilter)}`}
          >{activeDiscountFilter}</div>
          {filters.map(filter => {
            const filteredString = getFirstWord(filter)
            return (
              <div
                key={filter}
                className={`discount-page__header-filter-item discount-page__header-filter-item--${filteredString} ${filteredString === getFirstWord(activeDiscountFilter) ? 'active' : ''}`}
                onClick={(e) => {
                  setIsFiltersOpen(!isFiltersOpen)
                  setActiveDiscountFilter(e.target.innerText)
                  setActiveDiscountsTaxonomy(e.target.innerText)
                }}
              >
                {filter}
              </div>
            )
          })
          }
        </div>
      </div>
    </section>
  )
}

DiscountHeader.propTypes = {
  filters: PropTypes.array,
  language: PropTypes.string,
  setActiveDiscountsTaxonomy: PropTypes.func
}