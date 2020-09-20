import React from 'react'
import PropTypes from 'prop-types'

/**
 * Static view compoennt for FAQ header section
 * @param {String} title 
 * @param {String} subtitle 
 */
export default function FAQHeader({ title, subtitle }) {
  return (
    <section className="faq__header">
      <h2>{title}</h2>
      <p className="subtitle">{subtitle}</p>
    </section>
  )
}
