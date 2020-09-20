import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Header from '../components/Header'
import Footer from '../components/Footer'
import DocumentPagesLayout from '../components/DocumentPagesLayout'

//Template for page with linked documents
export default function docsLinkTemplate({ data, pageContext }) {

  const {
    menuInfo: { data: { allWpMenu } },
    footerInfo: { data: { allWp: { nodes: [optionsPage] } } },
    sideBanners: { data: { allWp: { nodes: [sideBannersData] } } } } = pageContext

  const { wpPage: { translations, language, legal_documents: { mainTitle, documentRepeater } } } = data

  return (
    <>
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <DocumentPagesLayout title={mainTitle} docRepeater={documentRepeater} sideBannersData={sideBannersData} />
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />
    </>
  )
}

docsLinkTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}


export const docPageQuery = graphql`
  query docPageById($id: String) {
    wpPage(id: {eq: $id}) {
      translations {
        uri
      }
      language {
        locale
      }
      legal_documents {
        mainTitle
        documentRepeater {
          docTitle
          documentRepeater {
            docLink
            docTitle
            pdfOrWord
          }
          fieldGroupName
          subtitle
          title
        }
      }
    }
  }
`