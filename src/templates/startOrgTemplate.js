import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

//Components
import Header from '../components/Header'
import StartOrgHeader from '../components/StartOrgHeader'
import StartOrgRepeater from '../components/StartOrgRepeater'
import CantFindSection from '../components/CantFindSection'
import Footer from '../components/Footer'
//Styles
import '../components/StartOrgPage.scss'

// Template for info page about starting organisation 
export default function startOrgTemplate({ data, pageContext }) {

  const { menuInfo: { data: { allWpMenu } },
    footerInfo: { data: { allWp: { nodes: [optionsPage] } } } } = pageContext
  const { wpPage: { translations, language, start_an_organization: { organizationHeader, organizationRepeater, organizationFooter } } } = data

  return (
    <>
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <div className="content-wrapper start-org">
        <StartOrgHeader organizationHeader={organizationHeader} />
        <StartOrgRepeater organizationRepeater={organizationRepeater} />
        <CantFindSection cantFindTitle={organizationFooter.mainText} cantSubtitle={organizationFooter.subtext} cantFindUrl={organizationFooter.link} />
      </div>
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />

    </>
  )
}


startOrgTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
}

export const startOrgPageQuery = graphql`
  query startOrgPageById($id: String) {
    wpPage(id: {eq: $id}) {
      translations {
        slug
      }
      language {
        locale
      }
      start_an_organization {
        organizationHeader {
          description
          title
          image {
            file: localFile {
              image: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
        organizationRepeater {
          description
          title
        }
        organizationFooter {
          mainText
          subtext
          link {
            target
            title
            url
          }
        }
      }
    }
  }
`