import React from 'react';

export default function Error(props) {
    const message = props.message;
  return (<div>
      We're sorry! There's been an error.
      {`${message}`}
  </div>);
}
