import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Header from '../components/Header'
import OrganisationHeader from '../components/OrganisationHeader'
import OrganisationFilter from '../components/OrganisationFilter'
import OrganisationsList from '../components/OrganisationsList'
import StartOrganisationSection from '../components/StartOrganisationSection'

import '../components/OrganisationPage.scss'

export default function OrganisationTemplate({ data, pageContext }) {

  const { allWpOrganization: { organisationsArray },
    wpPage: { title, start_organisation_section, content, translations, language } } = data

  const { menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } } } = pageContext

  const allTaxonomiesText = language.locale === 'is_IS' ? 'Öll nemendafélög' : 'All organisations'

  const [activeTaxonomy, setactiveTaxonomy] = useState(allTaxonomiesText)
  const [allTaxonomies, setAlltaxonomies] = useState([])

  //Get only taxonomy names from list of organisations 
  const organisationTaxonomies = organisationsArray.filter(item => item.language.locale === language.locale).map(item => item.organisation_type.nodes[0].name)
  //This will be an object which will contains array for each taxonomy
  const sortedOrganisationInfos = {};

  //Create object keys => object keys will be taxonomy name
  allTaxonomies.map(item => sortedOrganisationInfos[item] = [])

  //Go throught all organisations
  const currentLanguageOrganisationsArray = organisationsArray.filter(organisation => organisation.language.locale === language.locale)

  currentLanguageOrganisationsArray.map(organisation => {
    const { title, content, featuredImage, organizations_fields, organisation_type: { nodes: [organisationTax] } } = organisation

    /**
      * Object keys are arrays nemed by taxonomy name
      * Push each organisation to proper array
     */
    Object.keys(sortedOrganisationInfos).map(taxonomyName => {
      organisationTax.name === taxonomyName && sortedOrganisationInfos[taxonomyName].push({ title, content, featuredImage, organizations_fields })
    })
  })

  useEffect(() => {

    //Remove all duplicates in array
    setAlltaxonomies(Array.from(new Set(organisationTaxonomies)))

    //Add options for all organisations besides single taxonomy as the first item in the array
    setAlltaxonomies(allTaxonomies => [allTaxonomiesText, ...allTaxonomies])

  }, [])

  return (
    <div className="organisation-page">
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <div className="organisations content-wrapper">
        <OrganisationHeader title={title} content={content} />
        <OrganisationFilter allTaxonomies={allTaxonomies} setactiveTaxonomy={setactiveTaxonomy} activeTaxonomy={activeTaxonomy} />
        <OrganisationsList activeTaxonomy={activeTaxonomy} sortedOrganisationInfos={sortedOrganisationInfos} allTaxonomies={allTaxonomies} allTaxonomiesText={allTaxonomiesText} />
        <StartOrganisationSection info={start_organisation_section} language={language} />
      </div>
    </div>
  )
}

OrganisationTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
}

export const organisationPageQuery = graphql`
  query organisationPage($id: String!) {
    wpPage(id: {eq: $id}) {
      title
      content
      start_organisation_section {
        link
        startOrgContent
        startOrgTitle
      }
      translations {
        uri
      }
      language {
        locale
      }
    }
    allWpOrganization {
      organisationsArray: nodes {
        language {
          locale
        }
        title
        content
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(maxWidth: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
        organisation_type {
          nodes {
            name
            slug
          }
        }
        organizations_fields {
          email
          externalLink
          phone
        }
      }
    }
  }
`