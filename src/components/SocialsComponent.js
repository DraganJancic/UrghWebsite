import React from 'react'
import PropTypes from "prop-types"

//Style
import './SocialsComponent.scss'
// In this case I am using gatsby-plugin-react-svg which allows me to use SVG as DOM element
import faceIcon from '../svg-images/facebook.svg'
import twitterIcon from '../svg-images/twitter.svg'
import linkedinIcon from '../svg-images/linked-in.svg'

// Socials component can be used in header & footer, for now we have static data here 
export default function SocialsComponent({ extraClass }) {

  const socials = [
    {
      url: 'https://www.facebook.com/',
      icon: faceIcon

    },
    {
      url: 'https://www.twitter.com/',
      icon: twitterIcon

    },
    {
      url: 'https://www.instagram.com/',
      icon: linkedinIcon
    }
  ]


  return (
    <div className="secondary-header__socials socials-component">
      {socials.map((item, index) => {
        const ItemIcon = item.icon;
        return (
          <a key={index} href={item.url} target="_blank" rel="noreferrer" className={extraClass}>
            <ItemIcon />
          </a>
        )
      })}
    </div>
  )
}

SocialsComponent.propTypes = {
  extraClass: PropTypes.string
}