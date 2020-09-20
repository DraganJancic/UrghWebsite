import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import InfoPageLayout from '../components/InfoPageLayout'


export default function InfoPageRepater({ data, pageContext }) {
  const { wpPage: { info_repeater, title, language, translations } } = data
  const { menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } } } = pageContext
  return (
    <div className="info-page-template">
      <InfoPageLayout menuData={allWpMenu} translations={translations} infoRepeater={info_repeater} pageTitle={title} language={language} footerOptionsPage={optionsPage} />
    </div>
  )
}

InfoPageRepater.propTypes = {
  data: PropTypes.object
}
export const infoRepeaterQuery = graphql`
  query infoPageByID($id: String) {
    wpPage(id: {eq: $id}) {
      id
      slug
      title
      info_repeater {
        subtitle
        repeater {
          description
          hasLink
          title
          url
          icon {
            localFile {
              childImageSharp {
                fluid(maxWidth: 100){
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
      language {
        locale
      }
      translations {
        uri
      }
    }
    allWpMenu {
      nodes {
        id
        name
        menuItems {
          nodes {
            cssClasses
            label
            path
          }
        }
      }
    }
  }
`
