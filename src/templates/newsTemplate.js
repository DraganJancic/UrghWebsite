import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SingleNewsLayout from '../components/SingleNewsLayout'

export default function newsTemplate({ data, pageContext }) {

  const { wpPost: { translations, language, title, date, content, featuredImage } } = data

  const newsImage = featuredImage && featuredImage.node.file.newsImage

  const { slug, newsSlug, slugTranslation, hasSocials, menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } }, sideBanners: { data: { allWp: { nodes: [optionsPageData] } } } } = pageContext

  const newsTranslations = translations.length !== 0 ? [{ uri: `/${slugTranslation}${translations[0].slug}` }] : [{ uri: `/${slugTranslation}` }]

  return (
    <>
      <Header menuData={allWpMenu} language={language} translations={newsTranslations} />
      <SingleNewsLayout
        title={title}
        content={content}
        date={date}
        featuredPostArticleImage={newsImage}
        hasSocials={hasSocials}
        language={language}
        slug={slug}
        postSlugTranslationName={newsSlug}
        optionsPageData={optionsPageData}
      />
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />
    </>
  )
}

export const singleNewsQuery = graphql`
  query singleNews($id: String!) {
    wpPost(id: {eq: $id}) {
      translations {
        slug
      }
      language {
        locale
      }
      title
      date(formatString: "MMMM D, YYYY")
      content
      featuredImage {
        node {
          file: localFile {
            newsImage: childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
      translations {
        slug
      }
    }
  }
`