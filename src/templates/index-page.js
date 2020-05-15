import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import style from "./index-page.module.sass"

//* DOCUMENT *//
const IndexPageTemplate = (props) => {
  return (
    <>
      <Welcome {...props.welcome} />
      <Projects {...props.projects} />
      <Skills {...props.skills} />
      <Contact {...props.contact} />
    </>
  )
}

// IndexPageTemplate.propTypes = {
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string.isRequired,
//   social: PropTypes.object
// }

const Welcome = (props) => {
  return (
    <section className={style.welcome} id="welcome" style={{ backgroundImage: `url(/images/john-towner-JgOeRuGD_Y4-unsplash.webp)` }}>
      <div className={style.welcomeWrapper}>
        <h1 className={style.welcomeTitle}>
          <span className={style.welcomeSpanTitle}>{props.title}</span><br/>
          <span className={style.welcomeSpanSubtitle}>{props.subtitle}</span>
        </h1>
        <div className={style.welcomeButtons}>
          <a className={style.welcomeButtonPrimary} href="#projects">{props.buttons.primary.text}</a>
          <a className={style.welcomeButtonSecondary} href="#contact">{props.buttons.secondary.text}</a>
        </div>
      </div>
    </section>
  )
}

const Projects = (props) => {
  return (
    <section>
    </section>
  )
}

const Skills = (props) => {
  return (
    <section>
    </section>
  )
}

const Contact = (props) => {
  return (
    <section>
    </section>
  )
}

//* CONFIGURATION *//
const IndexPage = ({ data }) => {
  let { frontmatter: fm } = data.markdownRemark

  return (
    <IndexPageTemplate
      welcome={fm.welcome}
      projects={fm.projects}
      skills={fm.skills}
      contact={fm.contact}
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
  query {
    markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        title
        contact {
          twitter {
            url
            text
            isShow
          }
          title
          mail
          linkedin {
            url
            text
            isShow
          }
          facebook {
            url
            text
            isShow
          }
        }
        projects {
          title
        }
        skills {
          title
        }
        welcome {
          title
          subtitle
          buttons {
            secondary {
              text
            }
            primary {
              text
            }
          }
        }
      }
    }
  }
`
