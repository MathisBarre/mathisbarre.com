import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import style from "./index-page.module.sass"

//* DOCUMENT *//
const IndexPageTemplate = (props) => {
  return (
    <>
      <WelcomeSection {...props.welcomeSection} />
      <ProjectsSection {...props.projectsSection} projects={props.projects} />
      <SkillsSection {...props.skillsSection} />
      <ContactSection {...props.contactSection} />
    </>
  )
}

// IndexPageTemplate.propTypes = {
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string.isRequired,
//   social: PropTypes.object
// }

const WelcomeSection = (props) => {
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

const ProjectsSection = (props) => {
  return (
    <section className={style.projects} id="projects">
      <h2 className={style.projectsTitle}>{props.title}</h2>
      {props.projects.map(({node: project}) => (
        <>
          <Project key={project.id} {...project} />
          <hr className={style.projectSeparator} />
        </>
      ))}
    </section>
  )
}

const Project = ({ frontmatter: fm }) => {
  return (
    <a className={style.project} href={fm.url} target="_blank" rel="noopener noreferrer">
      <img className={style.projectImg} src={fm.img.url} alt={fm.img.alt} />
      <div className={style.projectContent}>
        <h3 className={style.projectTitle}>{fm.title}</h3>
        <div className={style.projectTags}>
          {fm.tags.map((tag)=>(
            <span className={style.projectTag}>{tag}</span>
          ))}
        </div>
        <p className={style.projectText}>{fm.text}</p>
      </div>
    </a>
  )
}

const SkillsSection = (props) => {
  return (
    <section>
    </section>
  )
}

const ContactSection = (props) => {
  return (
    <section>
    </section>
  )
}

//* CONFIGURATION *//
const IndexPage = ({ data }) => {
  let { frontmatter: fm } = data.markdownRemark
  let projects = data.allMarkdownRemark.edges

  return (
    <Layout>
      <IndexPageTemplate
        welcomeSection={fm.welcome}
        projectsSection={fm.projects}
        projects={projects}
        skillsSection={fm.skills}
        contactSection={fm.contact}
      />
    </Layout>
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
    allMarkdownRemark(filter: {frontmatter: {key: {eq: "project"}}}) {
      edges {
        node {
          id
          frontmatter {
            title
            url
            img {
              url
              alt
            }
            tags
            text
          }
        }
      }
    }
  }
`
