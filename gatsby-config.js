module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        // Add any options here
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Transcribr',
        short_name: 'Transcribr',
        start_url: '/app',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'standalone'
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/404/', '/', '/app/*', '/about/', '/forgot/', '/index/', '/login/', '/resetPassword/', '/signup/'],
        appendScript: require.resolve('./service-worker-append.js')
        // workboxConfig: {
        //   importWorkboxFrom: 'cdn'
        // }
      }
    }
  ]
}
