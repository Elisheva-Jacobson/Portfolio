import React from 'react';

export default function Header(props) {
    const title = props.title;
  return (<div className="header">
      <div >{title}</div>
      <hr/>
  </div>);
}
