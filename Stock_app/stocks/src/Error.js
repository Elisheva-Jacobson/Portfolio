import React from 'react';

export default function Error(props) {
    const message = props.message;
  return (<div className="error">
      We're sorry! 
      {` ${message}`}
  </div>);
}
