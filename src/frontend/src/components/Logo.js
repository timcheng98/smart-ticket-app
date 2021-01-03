import React, { useState } from 'react';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo_Black.png'

const Logo = (props) => {

  const defaultStyle = {
    width: '100%',
    height: '100%',
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
