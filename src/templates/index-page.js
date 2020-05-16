import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout.js"
import style from "./index-page.module.sass"

//* DOCUMENT *//
const IndexPageTemplate = (props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mathis Barré - Portfolio</title>
      </Helmet>
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
    <section className={style.skills} id="skills" style={{ backgroundImage: "url(/images/fabian-grohs-dC6Pb2JdAqs-unsplash.jpg)"}}>
      <h2 className={style.skillsTitle}>{props.title}</h2>
      <div className={style.skillsRow}>
        <img className={style.skillsLogo} src="/images/html.png" alt="logo html"/>
        <img className={style.skillsLogo} src="/images/css.png" alt="logo css"/>
        <img className={style.skillsLogo} src="/images/sass.png" alt="logo sass"/>
        <img className={style.skillsLogo} src="/images/jekyll.png" alt="logo jekyll"/>
        <img className={style.skillsLogo} src="/images/xd.png" alt="logo adobe XD"/>
      </div>
      <div className={style.skillsRow}>
        <img className={style.skillsLogo} src="/images/js.png" alt="logo javascript"/>
        <img className={style.skillsLogo} src="/images/react.png" alt="logo Reactjs"/>
        <img className={style.skillsLogo} src="/images/redux.png" alt="logo redux"/>
        <img className={style.skillsLogo} src="/images/gatsby.svg" alt="logo gatsby"/>
      </div>
    </section>
  )
}

const ContactSection = (props) => {
  return (
    <section className={style.contact} id="contact">
      <h2 className={style.contactTitle}>{props.title}</h2>
      <div className={style.contactContent}>
        <form className={style.contactForm} action="">
          <label className={style.contactLabel}>
            Votre adresse e-mail
            <input className={style.contactInput} id="email" type="text" placeholder="johne@doe.com"/>
          </label>
          <label className={style.contactLabel}>
            Message
            <textarea className={style.contactTextarea} name="message" id="message" placeholder="Je vous contact pour..."></textarea>
          </label>
          <input className={style.contactSubmit} type="submit" value="Envoyer le formulaire"/>
        </form>
        <div className={style.contactSeparator} />
        <div className={style.contactLinks}>
          <a className={style.contactLink} rel="noopener noreferrer" href={props.mail}><img className={style.contactLinkImg} src="/images/mail.svg" alt="mail"/>{props.mail}</a>
          <a className={style.contactLink} rel="noopener noreferrer" href={props.twitter.url}><img className={style.contactLinkImg} src="/images/twitter.svg" alt="twitter"/>{props.twitter.text}</a>
          <a className={style.contactLink} rel="noopener noreferrer" href={props.facebook.url}><img className={style.contactLinkImg} src="/images/facebook.svg" alt="facebook"/>{props.facebook.text}</a>
          <a className={style.contactLink} rel="noopener noreferrer" href={props.linkedin.url}><img className={style.contactLinkImg} src="/images/linkedin.svg" alt="linkedin"/>{props.linkedin.text}</a>
        </div>
      </div>
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
