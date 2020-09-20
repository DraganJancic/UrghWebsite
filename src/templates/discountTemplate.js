import React from 'react'
import PropTypes from 'prop-types'

import DiscountPageLayout from '../components/DiscountPageLayout'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function discountTemplate({ data, pageContext }) {

  // const { wpPage: { translations, language, homeFlexibleContent: { homecontent } } } = data
  const {
    menuInfo: { data: { allWpMenu } },
    footerInfo: { data: { allWp: { nodes: [optionsPage] } } },
    sideBanners: { data: { allWp: { nodes: [sidebarData] } } }
  } = pageContext

  const { allWpDiscount: { discounts }, wpPage: { language, translations } } = data

  return (
    <>
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <DiscountPageLayout discounts={discounts} language={language} sidebarData={sidebarData} />
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />
    </>
  )
}

export const discountPageQuery = graphql`
  query discountPage($id: String!) {
    wpPage(id: {eq: $id}) {
      translations {
        uri
      }
      language {
        locale
      }
    }
    allWpDiscount {
      discounts: nodes {
        title
        content
        discount_adress {
          discountAddress
          discountWebAddress
          fieldGroupName
        }
        featuredImage {
          node {
            file: localFile {
              image: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
        language {
          locale
        }
        discount_type {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`


