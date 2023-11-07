import React from 'react'

const Select = (props:any) => {
  return (
    <div className='mb-3'>
      <label htmlFor={props.name} className='form-lable'>
          {props.title}
      </label>
      <select 
        className='form-select'
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">{props.placeHolder}</option>
        {props.options.map((option:any) => {
          return (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          )
        })}
      </select>
      <div className={props.errorDiv}>
        {props.errorMsg}
      </div>
    </div>
  )
}

export default Select;