const path = require(`path`)

/**
 * SSR Pages & CPT
 * Function is async only because I am using await inside, data can be fetched using promises
 * @param {} param0 
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const menuResults = await graphql(`
    {
      allWpMenu {
        menus: nodes {
          name
          locations
          menuItems {
            nodes {
              databaseId
              parentDatabaseId
              label
              cssClasses
              parentId
              path
              childItems {
                nodes {
                  databaseId
                  parentDatabaseId
                  cssClasses
                  label
                  path
                  order
                  parentId
                  childItems {
                    nodes {
                      databaseId
                      parentDatabaseId
                      cssClasses
                      label
                      parentId
                      path
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const optionsPageFooterData = await graphql(`
  {
    allWp {
      nodes {
        optionsPage {
          footerOptions: options_page {
            fieldGroupName
            contactFooter {
              address
              email
              phone
              workingHours
            }
          }
        }
      }
    }
  }
  `)

  const optionsSideBannerData = await graphql(`
    {
      allWp {
        nodes {
          optionsPage {
            sideBannerOptions: options_page {
              fieldGroupName
              sideBanners {
                desktopImage {
                  desktopFile: localFile {
                    desktopObjectImage: childImageSharp {
                      fluid(maxWidth: 240, quality: 90) {
                        aspectRatio
                        base64
                        originalImg
                        originalName
                        sizes
                        src
                        srcSet
                        srcSetWebp
                        srcWebp
                        tracedSVG
                      }
                    }
                  }
                }
                tabletImage {
                  tabletFile: localFile {
                    tabletObjectImage: childImageSharp {
                      fluid(maxWidth: 728, quality: 90) {
                        aspectRatio
                        base64
                        originalImg
                        originalName
                        sizes
                        src
                        srcSet
                        srcSetWebp
                        srcWebp
                        tracedSVG
                      }
                    }
                  }
                }
                mobileImage {
                  mobileFile: localFile {
                    mobileObjectImage: childImageSharp {
                      fluid(maxWidth: 312, quality: 90) {
                        aspectRatio
                        base64
                        originalImg
                        originalName
                        sizes
                        src
                        srcSet
                        srcSetWebp
                        srcWebp
                        tracedSVG
                      }
                    }
                  }
                }
                url
                primaryBanner
              }
            }
          }
        }
      }
    }
  `)

  const articleResults = await graphql(`
  {
    allWpArticle {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`)

  const singlePagesResult = await graphql(`
  {
    allWpPage {
      edges {
        node {
          id
          slug
          uri
          isFrontPage
          title
          language {
            locale
          }
          template {
            ... on WpDefaultTemplate {
              templateName
            }
            ... on WpPageInfoTemplateTemplate {
              templateName
            }
            ... on WpContactPageTemplateTemplate {
              templateName
            }
          }
        }
      }
    }
  }`
  )

  const singleNewsResult = await graphql(`
  {
    allWpPost {
      nodes {
        id
        slug
        title
        uri
        language {
          slug
        }
      }
    }
  }
  `)

  const { allWpArticle } = articleResults.data
  const { allWpPage } = singlePagesResult.data
  const { allWpPost } = singleNewsResult.data


  //Create single News 
  allWpPost.nodes.forEach((item) => {


    const cptLanguage = item.language.slug === 'is' ? 'frettir/' : 'en/news/'
    const cptTranslation = item.language.slug === 'is' ? 'en/news/' : 'frettir/'

    createPage({
      path: `${cptLanguage}${item.slug}`,
      component: path.resolve(`./src/templates/newsTemplate.js`),
      context: {
        id: item.id,
        menuInfo: menuResults,
        footerInfo: optionsPageFooterData,
        sideBanners: optionsSideBannerData,
        slugTranslation: cptTranslation,
        newsSlug: cptLanguage,
        hasSocials: true
      }
    })
  })

  // Create single Articles
  allWpArticle.edges.forEach((item) => {
    const { node } = item
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/articleTemplate.js`),
      context: {
        // This is the $slug & id variable
        // passed to articleTemplate.js
        id: node.id,
        slug: node.slug,
        menuInfo: menuResults,
        footerInfo: optionsPageFooterData,
        sideBanners: optionsSideBannerData,
        hasSocials: false
      },
    })
  })



  //Create pages
  allWpPage.edges.forEach(page => {
    const { node } = page
    choseTemplateForPage(node)
  })

  function choseTemplateForPage(page) {
    //Check is frontPage or regular page
    if (page.template.templateName === 'Page Info Template') {
      createPage({
        path: page.uri,
        component: path.resolve('./src/templates/InfoPageRepater.js'),
        context: {
          id: page.id,
          slug: page.slug,
          menuInfo: menuResults,
          footerInfo: optionsPageFooterData
        }
      })
    } else if (page.template.templateName === 'Contact Page Template') {
      createPage({
        path: page.uri,
        component: path.resolve('./src/templates/contactTemplate.js'),
        context: {
          id: page.id,
          slug: page.slug,
          menuInfo: menuResults,
          footerInfo: optionsPageFooterData
        }
      })
    } else {
      if (page.isFrontPage) {
        createPage({
          path: '/',
          component: path.resolve(`./src/templates/frontPageTemplate.js`),
          context: {
            id: page.id,
            slug: '/',
            menuInfo: menuResults,
            footerInfo: optionsPageFooterData,
            isFrontPage: true
          },
        })
      } else {
        switch (page.slug) {
          case 'homepage-en':
            createPage({
              path: '/en',
              component: path.resolve(`./src/templates/frontPageTemplate.js`),
              context: {
                id: page.id,
                slug: '/en',
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData,
                isFrontPage: true

              },
            })
            break;
          case 'studentarad':
          case 'the-council-people':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/councilPeopleTemplate.js`),
              context: {
                id: page.id,
                slug: page.slug,
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData
              },
            })
            break;
          case 'frettir':
          case 'news':

            const newsPerPage = 12
            const newsPageCount = Math.ceil(allWpPost.nodes.length / newsPerPage)

            return Array.from({ length: newsPageCount }).map((_, i) => {
              return createPage({
                path: i + 1 === 1 ? page.uri : `${page.uri}/${i + 1}`,
                component: path.resolve(`./src/templates/newsArchiveTemplate.js`),
                context: {
                  id: page.id,
                  menuInfo: menuResults,
                  footerInfo: optionsPageFooterData,
                  skip: i * newsPerPage,
                  currentPage: i + 1,
                  limit: newsPerPage,
                  newsPageCount,
                },
              })
            })
            break;
          case 'saga-shi':
          case 'history':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/historyTemplate.js`),
              context: {
                id: page.id,
                slug: page.slug,
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData
              },
            })
            break;
          case 'nemendafelog':
          case 'student-organizations':
            createPage({
              path: page.uri,
              component: path.resolve('./src/templates/organisationTemplate.js'),
              context: {
                id: page.id,
                title: page.title,
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData
              },
            })
            break;
          case 'stofna-nemendafelag':
          case 'start-an-organization':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/startOrgTemplate.js`),
              context: {
                id: page.id,
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData
              },
            })
            break;
          case 'faq':
          case 'algengar-spurningar':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/faqTemplate.js`),
              context: {
                id: page.id,
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData,
                sideBanners: optionsSideBannerData,
              },
            })
            break;
          case 'legal-documents':
          case 'council-policy':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/docsLinkTemplate.js`),
              context: {
                id: page.id,
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData,
                sideBanners: optionsSideBannerData,
              },
            })
            break;
          case 'committees':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/committeesTemplate.js`),
              context: {
                id: page.id,
              },
            })
            break;
          case 'mental-health-service':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/mentalHealthTemplate.js`),
              context: {
                id: page.id,
              },
            })
            break;
          case 'sjalfbodastarf':
          case 'volunteering':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/volunteeringTemplate.js`),
              context: {
                id: page.id,
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData,
              },
            })
            break;
          case 'discounts':
          case 'afslaettir':
            createPage({
              path: page.uri,
              component: path.resolve(`./src/templates/discountTemplate.js`),
              context: {
                id: page.id,
                slug: page.slug,
                menuInfo: menuResults,
                footerInfo: optionsPageFooterData,
                sideBanners: optionsSideBannerData,

              },
            })
            break;
          // default:
          // break;
        }
      }
    }
  }
}