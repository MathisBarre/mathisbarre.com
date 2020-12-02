module.exports = {
  siteMetadata: {
    title: "Mathis Barré",
    description: "Portfolio du développeur web freelance Mathis Barré",
    author: "Mathis Barré",
    baseurl: "https://mathisbarre.com",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-139419835-3",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Defers execution of google analytics script after page load
        defer: true
      },
    },
    {
      resolve: 'gatsby-plugin-ackee-tracker',
      options: {
        // Domatin ID found when adding a domain in the admin panel.
        domainId: 'c98f2d67-5e0b-4349-ad49-5e76a46270ad',
        // URL to Server eg: "https://analytics.test.com".
        server: 'https://analytics.mathisbarre.com/',
        // Disabled analytic tracking when running localy
        ignoreLocalhost: true,
        // Enable or disable the tracking of your own visits (as identified by your login to the Ackee dashboard).
        ignoreOwnVisits: true,
        // If enabled it will collect info on OS, BrowserInfo, Device  & ScreenSize
        detailed: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/static/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-relative-images`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sass`,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "mathisbarre.com",
        short_name: "Mathis Barré",
        start_url: "/",
        background_color: "#000000",
        theme_color: "#F50057",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "static/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        // crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`
  ],
}
