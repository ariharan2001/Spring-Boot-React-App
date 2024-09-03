import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPen } from '@fortawesome/free-solid-svg-icons';

const UserIcon = ({ name = "user-icon" }) => {

  if( name == "edit" )
    return <FontAwesomeIcon icon={faPen} />

  return <FontAwesomeIcon icon={faCircleUser} size="2x" style={{fontWeight:"100"}} />
};

export default UserIcon;
