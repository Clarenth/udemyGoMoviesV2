import React from 'react'

const Alert = (props: any) => {
  return (
    <React.Fragment>
      <div className={ "alert" + props.className } role="alert">
        {props.message}
      </div>
    </React.Fragment>
  )
}

export default Alert;