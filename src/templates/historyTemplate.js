import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import HistoryLayout from '../components/HistoryLayout'
import Header from '../components/Header'
import Footer from '../components/Footer'

/**
* History page 
* 
* @param {object} data
* @param {object} pageContext
*
* @returns {JSX Element}
*/
export default function historyTemplate({ data, pageContext }) {
  const { wpPage: { translations, language, history_template } } = data
  const { menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } } } = pageContext

  return (
    <>
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <HistoryLayout historyArray={history_template} />
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />
    </>
  )
}

historyTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}
export const infoRepeaterQuery = graphql`
  query historyPageByID($id: String) {
    wpPage(id: {eq: $id}) {
      id
      translations {
        uri
      }
      language {
        locale
      }
      history_template {
        historyRepeater {
          description
          hasPortrait
          image {
            file: localFile {
              historyRepeaterImage: childImageSharp {
                fluid(quality: 90) {
                  aspectRatio
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          title
          year
        }
      }
    }
  }
`