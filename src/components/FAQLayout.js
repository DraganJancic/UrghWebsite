import React from 'react'
import PropTypes from 'prop-types'

//Components
import SideBanner from './SideBanner'
import FAQHeader from './FAQHeader'
import FAQInfoSection from './FAQInfoSection'
import CantFindSection from './CantFindSection'
//Styles
import './FAQ.scss'

/**
 * Fayout for FAQ page which contains 4 components
 * FAQHeader & CantFindSection are presentional component with text only
 * FAQInfoSection is section with all FAQ content and it has local state for collapsing
 * SideBanner is component which are gettin images from options state & its reausable
 * @param {string} title 
 * @param {string} subtitle 
 * @param {string} cantFindTitle 
 * @param {string} cantSubtitle 
 * @param {object} cantFindUrl 
 * @param {array} groups 
 * @param {object} sideBannersData 
 * 
 */
export default function FAQLayout({ title, subtitle, cantFindTitle, cantSubtitle, cantFindUrl, groups, sideBannersData }) {

  return (
    <div className="faq faq-page">
      <div className="faq__wrapper content-wrapper">
        <div className="faq__content">
          <FAQHeader title={title} subtitle={subtitle} />
          <FAQInfoSection groups={groups} />
          <CantFindSection cantFindTitle={cantFindTitle} cantSubtitle={cantSubtitle} cantFindUrl={cantFindUrl} />
        </div>
        <SideBanner sideBannersData={sideBannersData} />
      </div>
    </div>
  )
}

FAQLayout.protoTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  cantFindTitle: PropTypes.string,
  cantSubtitle: PropTypes.string,
  cantFindUrl: PropTypes.objectOf(PropTypes.string),
  groups: PropTypes.arrayOf(PropTypes.object),
  sideBannersData: PropTypes.shape({
    optionsPage: PropTypes.object
  })
}

