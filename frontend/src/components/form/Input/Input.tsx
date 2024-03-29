// Libraries
import React, { forwardRef } from 'react'

// Components

// Styles

const Input = forwardRef((props: any, ref: any) => {


  return (
    <React.Fragment>
      <div className="mb-3">
        <label htmlFor={props.name}>{props.title}</label>
        <input 
          type={props.type} 
          className={props.className} 
          id={props.name} 
          ref={ref} 
          placeholder={props.placeholder} 
          onChange={props.onChange}
          autoComplete={props.autoComplete}
          value={props.value}
        />
        <div className={props.errorDIv}>{ props.errorMsg }</div>
      </div>
    </React.Fragment>
  )
})

export default Input;