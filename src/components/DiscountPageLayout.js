import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import DiscountHeader from './DiscountHeader'
import DiscountsList from './DiscountsList'
/**
 * Archive page layout for Discounts 
 * 
 *  @param {array} discounts - Array of all discounts
 *  @param {object} language current language 
 **/
export default function DiscountPageLayout({ discounts, language, sidebarData }) {

  const { locale } = language

  const allDiscountsText = locale === 'is_IS' ? 'Alles disco' : 'All discounts'

  //Get only discounts for current lang
  const currentLanguageDiscounts = discounts.filter(discount => discount.language.locale === locale)

  const [activeDiscountsTaxonomy, setActiveDiscountsTaxonomy] = useState('All')
  const [discountsData, setDiscountsData] = useState(currentLanguageDiscounts)

  //Get discounts taxonomies which will be filters
  let filters = currentLanguageDiscounts.map(discount => discount.discount_type.nodes[0].name)
  //Remove duplicates from array
  filters = new Set(filters)
  //Add all discounts option as 1st item in array
  filters = [allDiscountsText, ...filters]


  useEffect(() => {

    const filteredDsicountsByTaxonomy = activeDiscountsTaxonomy !== allDiscountsText
      ? currentLanguageDiscounts.filter(discount => discount.discount_type.nodes[0].name === activeDiscountsTaxonomy)
      : currentLanguageDiscounts

    setDiscountsData(filteredDsicountsByTaxonomy)

  }, [activeDiscountsTaxonomy])

  useEffect(() => {
    setDiscountsData(currentLanguageDiscounts)

  }, [])
  return (
    <div className="discount-page">
      <div className="discount-page__wrapper">

        <div className="discount-page__content-wrapper">
          <DiscountHeader filters={filters} lanugage={locale} setActiveDiscountsTaxonomy={setActiveDiscountsTaxonomy} />
          <div className="content-wrapper">
            <DiscountsList currentLanguageDiscounts={discountsData} sidebarData={sidebarData} />
          </div>

        </div>
      </div>
    </div>
  )
}

DiscountPageLayout.propTypes = {
  discounts: PropTypes.array,
  language: PropTypes.object
}