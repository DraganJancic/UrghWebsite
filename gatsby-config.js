const path = require(`path`)

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Student',
    titleEn: 'Student',
    description:
      'Með sameiningu Aton og Jónsson & Le’macks verður til nýtt og öflugt samskiptafélag, sem sérhæft er í ráðgjöf varðandi samskipti og stefnumótun. Hjá Aton.JL starfa sérfræðingar með fjölbreytilegan bakgrunn sem gerir félaginu kleift að nálgast og skipuleggja samskipti viðskiptavina sinna með heildstæðum hætti',
    descriptionEn: 'The potential to affect people, create dialogues and change the course of action is expanding fast. New methods of communication create new opportunities but at the same time make it more important than ever to think before we speak. What we say, when we say it and how is what makes the difference between mutual understanding and communication breakdown.',
    author: `Breyta`,
    backendUrl: process.env.WP_URL,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg-images/
        }
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        useACF: true,
        /*
         * The full URL of the WordPress site's GraphQL API.
         * Example : 'https://www.example-site.com/graphql'
         */
        url: process.env.GATSBY_BACKEND_URL || `http://netlify-test.jonssonlemacks.com/graphql`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Poppins`,
            variants: [`200`, `300`, `400`, `500`, `700`]

          },
          {
            family: `Roboto`,
            variants: [`200`, `300`, `400`, `500`, `700`]
          },
        ],
      },
    },
  ],
}