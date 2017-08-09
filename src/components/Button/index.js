import React from 'react';

import './index.css';

const Button = (props) => {

  return (
    <div>
      <button
        className={props.className}
        onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export default Button;
