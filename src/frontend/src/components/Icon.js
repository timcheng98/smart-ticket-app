import { ReactComponent as Ticket } from '../data/icons/Ticket.svg'
import React from 'react';



const Icon = ({ type }) => {
  const iconType = {
    ticket: (<Ticket style={styles.icon}/>)
  }
  // console.log('iconType[type]', iconType[type])
  return (<>{iconType[type]}</>)
}

const styles = {
  icon: {
    height: 24,
    width: 24
  }
,}

export default Icon;