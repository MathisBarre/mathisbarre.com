import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

//* DOCUMENT *//
const IndexPageTemplate = ({ title, subtitle, social }) => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-pureWhite flex-col">
        <h1 className="text-6xl font-primary z-10">{title}</h1>
        <h2 className="text-3xl font-secondary z-10">Coming soon</h2>
      </div>
      <div className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2 scale-150 z-0">
        <h1 className="text-6xl font-primary text-white">{title}</h1>
        <h2 className="text-3xl font-secondary text-white text-center">Coming soon</h2>
      </div>
    </>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  social: PropTypes.object
}

//* CONFIGURATION *//
const IndexPage = ({ data }) => {
  let { frontmatter: fm } = data.markdownRemark

  return (
    <IndexPageTemplate
      title={fm.title}
      subtitle={fm.subtitle}
      social={fm.social}
    />
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired,
    }),
  }),
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        title
        templateKey
        subtitle
        social {
          twitter {
            link
            label
          }
          linkedin {
            link
            label
          }
          github {
            link
            label
          }
          facebook {
            link
            label
          }
        }
      }
    }
  }
`
