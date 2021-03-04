import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo_Black.png'

const Logo = (props) => {

  const defaultStyle = {
    width: '100%',
    objectFit: 'contain',
    height: 50,
  };


  return (
    <Link to="/events">
      <img style={defaultStyle} src={logo} alt="company_logo" />
    </Link>
  )
}

export default Logo
