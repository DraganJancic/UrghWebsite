import React from 'react'
import PropTypes from 'prop-types'

import BackgroundImage from 'gatsby-background-image'
import Img from 'gatsby-image'

import SideBanner from './SideBanner'

import defaultImage from '../images/default-discount.png'
import './SingleDiscount.scss'
/**
 * List of discounts / All discounts can be shown or filtered discounts 
 * It depeands of discountsData state
 * @param {array} currentLanguageDiscounts 
 */
export default function DiscountsList({ currentLanguageDiscounts, sidebarData }) {

  return (
    <section className="discount-page__list">
      <div className="discount-page__list-wrapper">
        {currentLanguageDiscounts.map((discount, index) => {
          const { discount_adress: { discountWebAddress } } = discount
          return (
            <div className="single-discount" key={index}>
              <a href={discountWebAddress} target="_blank">
                {discount.featuredImage !== null
                  ? <Img className="single-discount__image" fluid={discount.featuredImage.node.file.image.fluid} />
                  : <div style={{ backgroundImage: `url(${defaultImage})` }} className="single-discount__image" />
                }
              </a>
              <div className="single-discount__content">
                <a target="_blank" href={discountWebAddress}><h4>{discount.title}</h4></a>
                <p className="single-discount__text" dangerouslySetInnerHTML={{ __html: discount.content }}></p>
                <p className="strong">{discount.discount_adress.discountAddress}</p>
              </div>
            </div>
          )

        }
        )}
      </div>
      <SideBanner sideBannersData={sidebarData} />

    </section >
  )
}

DiscountsList.propTypes = {
  currentLanguageDiscounts: PropTypes.array
}