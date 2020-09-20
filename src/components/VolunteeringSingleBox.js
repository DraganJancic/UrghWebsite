import React from 'react';
import PropTypes from 'prop-types'

/**
 * VolunteeringSingleBox can be open or closed depeands of passed state
 *
 * @param {string} title 
 * @param {string} description 
 * @param {string} name 
 * @param {string} email 
 * @param {number} phone 
 * @param {number} index 
 * @param {number} cardIndex 
 * @param {number} groupIndex 
 * @param {number} thisCardGroupIndex 
 * @param {function} setCardIndex 
 * @param {function} setCardGroupIndex 
 *
 * @returns {JSX Element}
 */
export default function VolunteeringSingleBox({ title, description, name, email, phone, index, cardIndex, groupIndex, thisCardGroupIndex, setCardIndex, setCardGroupIndex }) {

  return (  
    <div className={`volunteering__subsection-box volunteering__subsection-box--${groupIndex === thisCardGroupIndex && index === cardIndex ? 'open' : 'closed'}`}>
      <div 
      onClick={() =>{
        setCardIndex(cardIndex === index && thisCardGroupIndex === groupIndex ? null : index)
        setCardGroupIndex(thisCardGroupIndex)
      }}  
      className="volunteering__subsection-title-wrapper"
      >
        <h6 className="volunteering__subsection-title">{title}
        </h6>
      </div>
      <div className="volunteering__subsection-box-content">
        <p className="volunteering__subsection-description">{description}</p>
        <div className="volunteering__subsection-info">
          <p className="volunteering__subsection-name"><span>Name:</span>{name}</p>
          <a href={`mailto:${email}`} className="volunteering__subsection-email"><span>Email:</span>{email}</a>
          <a href={`tel:${phone}`} className="volunteering__subsection-phone"><span>Phone:</span>{phone}</a>
        </div>
      </div>
    </div>    
  );
};

VolunteeringSingleBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.number,
  index: PropTypes.number,
  cardIndex: PropTypes.number, 
  groupIndex: PropTypes.number, 
  thisCardGroupIndex: PropTypes.number, 
  setCardIndex: PropTypes.func, 
  setCardGroupIndex: PropTypes.func
}