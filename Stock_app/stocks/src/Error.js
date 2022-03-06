import React from 'react';

export default function Error(props) {
    const message = props.message;
  return (<div class="error">
      We're sorry! 
      {` ${message}`}
  </div>);
}
