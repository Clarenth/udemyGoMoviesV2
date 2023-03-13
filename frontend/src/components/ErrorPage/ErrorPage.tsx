import { isRouteErrorResponse, useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error:any = useRouteError();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="mt-3">Error!</h1>
          <p>Sorry, an unexpected error has occured.</p>
          <p>
            <em>{error.statusText || error.messgae}</em>
          </p>
        </div>
      </div>
    </div>
  )
};