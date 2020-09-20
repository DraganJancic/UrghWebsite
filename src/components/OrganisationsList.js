import React from 'react'
import PropTypes from 'prop-types'

import SingleOrganisation from './SingleOrganisation'
/**
 *  Organisation list render organisations
 *  List of orfanisations depeands of activeTaxonomy
 */
export default function OrganisationsList({ activeTaxonomy, sortedOrganisationInfos, allTaxonomies, allTaxonomiesText }) {

  return (
    <div className="organisations__list">
      {
        //get all organisations info and show them in propper list
        Object.entries(sortedOrganisationInfos).map(organisationSection => {

          const [organisationTitle, organisationsList] = organisationSection;

          if (organisationsList.length !== 0 && activeTaxonomy === allTaxonomiesText) {
            return (
              <div className="organisations__list-wrapper" key={organisationTitle}>

                <div className="organisations__list-section">
                  <h5>{organisationTitle}</h5>
                </div>
                <div className="organisations__list-items">
                  {organisationsList.map((organisation, index) => {
                    const { title, content, organizations_fields: { email, externalLink, phone }, featuredImage } = organisation
                    return <SingleOrganisation
                      key={index}
                      title={title}
                      image={featuredImage}
                      email={email}
                      phone={phone}
                      link={externalLink}
                      content={content}
                    />
                  })}
                </div>
              </div>
            )
          } else if (activeTaxonomy === organisationTitle && activeTaxonomy !== allTaxonomiesText) {

            return (
              <div className="organisations__list-wrapper" key={organisationTitle}>

                <div className="organisations__list-section">
                  <h5>{organisationTitle}</h5>
                  <div className="organisations__list-items">

                    {organisationsList.map((organisation, index) => {
                      const { title, content, organizations_fields: { email, externalLink, phone }, featuredImage } = organisation
                      return <SingleOrganisation
                        key={index}
                        title={title}
                        image={featuredImage}
                        email={email}
                        phone={phone}
                        link={externalLink}
                        content={content}
                      />
                    })}
                  </div>
                </div>
              </div>

            )
          }
        })
      }
    </div>
  )
}

OrganisationsList.propTypes = {
  activeTaxonomy: PropTypes.string,
  sortedOrganisationInfos: PropTypes.object,
  allTaxonomies: PropTypes.array,
  allTaxonomiesText: PropTypes.string
}