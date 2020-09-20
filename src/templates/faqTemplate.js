import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FAQLayout from '../components/FAQLayout'

export default function faqTemplate({ data, pageContext }) {
  const { wpPage: { translations, language,
    faq_acf: { title, subtitle, cantFindTitle, cantSubtitle, cantFindUrl, groups } } } = data
  const {
    menuInfo: { data: { allWpMenu } },
    footerInfo: { data: { allWp: { nodes: [optionsPage] } } },
    sideBanners: { data: { allWp: { nodes: [sideBannersData] } } } } = pageContext

  return (
    <div className="faq-template">
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <FAQLayout title={title} subtitle={subtitle} cantFindTitle={cantFindTitle} cantSubtitle={cantSubtitle} cantFindUrl={cantFindUrl} groups={groups} sideBannersData={sideBannersData} />
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />

    </div>
  )
}


export const faqDataQuery = graphql`
  query faqPageByID($id: String!) {
    wpPage(id: {eq: $id}) {
      translations {
        uri
      }
      language {
        locale
      }
      faq_acf {
        cantFindTitle
        cantSubtitle
        cantFindUrl {
          target
          title
          url
        }
        title
        subtitle
        groups {
          groupTitle
          group {
            informationsRepeater {
              fieldGroupName
              infoDesc
              infoTitle
            }
          }
        }
      }
    }
  }
`