import React, {useEffect} from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import SEO from "../components/seo"
import Layout from "../components/layout.js"
import style from "./index-page.module.sass"

// GreenShock
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//* DOCUMENT *//
const IndexPageTemplate = (props) => {
  useEffect(() => {

    ScrollTrigger.defaults({
      start:"top 80%",
      toggleActions:"play null play null",
    })

    // Project animation
    gsap.from( `.${style.project}`, 
      {
        scrollTrigger: `.${style.project}`,
        stagger: 0.2,
        x:500,
        opacity:0
      }
    )

    // Skills animation
    gsap.from( `.${style.skillsLogo}`, 
    {
      scrollTrigger: `.${style.skillsLogo}`,
      stagger: 0.1,
      opacity:0
    }
  )
    

    // Contact animation
    gsap.from( ".animated-form-elt",
      {
        scrollTrigger: {
          trigger: ".animated-form-elt",
          start:"top bottom",
          // markers: true
        },
        stagger: 0.1,
        x:-500,
        opacity:0
      }
    )

    gsap.from( `.${style.contactLink}`,
      {
        scrollTrigger: {
          trigger:`.${style.contactLink}`,
          start:"top bottom",
          // markers:true
        },
        stagger: 0.1,
        x:500,
        opacity:0
      }
    )
  }, [])
  return (
    <>
      <div className={style.noOverflow}>
        <SEO title="Portfolio"/>
        <WelcomeSection {...props.welcomeSection} />
        <ProjectsSection {...props.projectsSection} projects={props.projects} />
        <SkillsSection {...props.skillsSection} />
        <ContactSection {...props.contactSection} />
      </div>
    </>
  )
}

const WelcomeSection = (props) => {
  function jumpTo(id) {
    console.log(id)
    gsap.to(window, {duration: 0.5, scrollTo: id});
  }

  return (
    <section className={style.welcome} id="welcome" style={{backgroundImage:"url(/images/john-towner-JgOeRuGD_Y4-unsplash.jpg)"}}>
      <div className={style.welcomeTopbar} />
      <img src="/images/preview.jpg" alt="" className={style.hiddenImg}/>
      <div className={style.welcomeWrapper}>
        <img className={style.welcomeProfilPic} src="/images/profil.jpg" alt="Mathis Barré profil"/>
        <div className={style.welcomeRight}>
          <h1 className={style.welcomeTitle}>
            <span className={style.welcomeSpanTitle}>{props.title}</span><br/>
            <span className={style.welcomeSpanSubtitle}>{props.subtitle}</span>
          </h1>
          <div className={style.welcomeButtons}>
            <a className={style.welcomeButtonPrimary} href="#projects" onClick={(e) => {e.preventDefault(); jumpTo("#projects")}}>{props.buttons.primary.text}</a>
            <a className={style.welcomeButtonSecondary} href="#contact" onClick={(e) => {e.preventDefault(); jumpTo("#contact")}}>{props.buttons.secondary.text}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

const ProjectsSection = (props) => {
  
  return (
    <section className={style.projects} id="projects">
      <h2 className={style.projectsTitle}>{props.title}</h2>
      {props.projects.map(({node: project}) => {
        if(project.frontmatter.show) {
          return (
            <div key={project.id} className={style.projectWrapper}>
              <Project {...project} />
              <hr className={style.projectSeparator}/>
            </div>
          )
        }
        return ""
      })}
    </section>
  )
}

const Project = ({ frontmatter: fm }) => {
  return (
    <a className={style.project} href={fm.url} target="_blank" rel="noopener noreferrer"  >
      <img className={style.projectImg} src={fm.img.url} alt={fm.img.alt} />
      <div className={style.projectContent}>
        <h3 className={style.projectTitle}>{fm.title}</h3>
        <div className={style.projectTags}>
          {fm.tags.map((tag)=>(
            <span key={tag} className={style.projectTag}>{tag}</span>
          ))}
        </div>
        <p className={style.projectText}>{fm.text}</p>
      </div>
    </a>
  )
}

const SkillsSection = (props) => {
  return (
    <BackgroundImage className={style.skills} id="skills" fluid={props.childImageSharp.fluid}>
      <div className={style.skillsShadowing}></div>
      <h2 className={style.skillsTitle}>{props.title}</h2>
      <div className={style.skillsRow}>
        <img className={style.skillsLogo} src="/images/html.png" alt="logo html"/>
        <img className={style.skillsLogo} src="/images/css.png" alt="logo css"/>
        <img className={style.skillsLogo} src="/images/sass.png" alt="logo sass"/>
        <img className={style.skillsLogo} src="/images/tailwindcss.svg" alt="logo tailwindcss"/>
        <img className={style.skillsLogo} src="/images/xd.png" alt="logo adobe XD"/>
      </div>
      <div className={style.skillsRow}>
        <img className={style.skillsLogo} src="/images/js.png" alt="logo javascript"/>
        <img className={style.skillsLogo} src="/images/greensock-gsap-logo.png" alt="logo greensock gsap"/>
        <img className={style.skillsLogo} src="/images/react.png" alt="logo Reactjs"/>
        <img className={style.skillsLogo} src="/images/gatsby.svg" alt="logo gatsby"/>
        <img className={style.skillsLogo} src="/images/next.svg" alt="logo nextjs"/>
      </div>
      <div className={style.skillsRow}>
        <img className={style.skillsLogo} src="/images/jekyll.png" alt="logo jekyll"/>
        <img className={style.skillsLogo} src="/images/git.png" alt="logo git"/>
        <img className={style.skillsLogo} src="/images/github.png" alt="logo github"/>
        <img className={style.skillsLogo} src="/images/netlify.svg" alt="logo netlify"/>
        <img className={style.skillsLogo} src="/images/vercel.png" alt="logo vercel"/>
      </div>
    </BackgroundImage>
  )
}

const ContactSection = (props) => {
  return (
    <section className={style.contact} id="contact">
      <h2 className={style.contactTitle}>{props.title}</h2>
      <div className={style.contactContent}>
        <form className={style.contactForm} name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" aria-label="hidden label" />
          <label    className={`animated-form-elt ${style.contactLabel}`}    htmlFor="email"   id="emailLabel">Votre adresse e-mail</label>
          <input    className={`animated-form-elt ${style.contactInput}`}    name="email"      id="email"   type="text" required aria-labelledby="emailLabel"/>
          <label    className={`animated-form-elt ${style.contactLabel}`}    htmlFor="message" id="labelMessage">Message</label>
          <textarea className={`animated-form-elt ${style.contactTextarea}`} name="message"    id="message" required aria-labelledby="messageLabel" ></textarea>
          <input    className={`animated-form-elt ${style.contactSubmit}`}   type="submit"     value="Envoyer" aria-label="Envoyer"/>
        </form>
        <div className={style.contactSeparator} />
        <div className={style.contactLinks}>
          <a className={style.contactLink} rel="noopener noreferrer" href={`mailto:${props.mail}`}><img className={style.contactLinkImg} src="/images/mail.svg" alt="mail"/>{props.mail}</a>
          <a className={style.contactLink} rel="noopener noreferrer" href={props.github.url}><img className={style.contactLinkImg} src="/images/github.svg" alt="github"/>{props.github.text}</a>
          <a className={style.contactLink} rel="noopener noreferrer" href={props.twitter.url}><img className={style.contactLinkImg} src="/images/twitter.svg" alt="twitter"/>{props.twitter.text}</a>
          {/* <a className={style.contactLink} rel="noopener noreferrer" href={props.facebook.url}><img className={style.contactLinkImg} src="/images/facebook.svg" alt="facebook"/>{props.facebook.text}</a> */}
          {/* <a className={style.contactLink} rel="noopener noreferrer" href={props.instagram.url}><img className={style.contactLinkImg} src="/images/instagram.svg" alt="instagram"/>{props.instagram.text}</a> */}
          <a className={style.contactLink} rel="noopener noreferrer" href={props.linkedin.url}><img className={style.contactLinkImg} src="/images/linkedin.svg" alt="linkedin"/>{props.linkedin.text}</a>
          <a className={style.contactLink} rel="noopener noreferrer" href={props.malt.url}>{/*<img className={style.contactLinkImg} src="/images/malt.svg" alt="malt"/>*/}<span style={{fontWeight: "bold"}}>malt.fr : </span> {props.malt.text}</a>
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
        welcomeSection={{...fm.welcome, ...data.welcomeImg}}
        projectsSection={fm.projects}
        projects={projects}
        skillsSection={{...fm.skills, ...data.skillsImg}}
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
          github {
            url
            text
            isShow
          }
          instagram {
            url
            text
            isShow
          }
          malt {
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
    allMarkdownRemark(filter: {frontmatter: {key: {eq: "project"}}}, sort: {fields: frontmatter___order, order: ASC}) {
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
            show
          }
        }
      }
    }
    skillsImg: file(relativePath: {eq: "images/fabian-grohs-dC6Pb2JdAqs-unsplash.jpg"}) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
