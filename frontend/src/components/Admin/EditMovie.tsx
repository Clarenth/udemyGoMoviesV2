// Libraires

import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Input from '../form/Input/Input';
import Select from '../form/Select/Select';
import TextArea from '../form/TextArea/TextArea';

// Components

// Styles


const EditMovie = () => {
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext<any>();

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState<any>([]);
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
  });

  // Get ID from URL
  let { id } = useParams();

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/")
      return;
    }
  }, [jwtToken, navigate])

  const hasError = (key:any) => {
    return errors.indexOf(key) !== -1;
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // do validation here later
  }

  const handleChange = (event:any) => {
    let value = event.target.value;
    let name = event.target.name;
    setMovie({
      ...movie,
      [name]: value,
    })
  }

  const mpaaOptions = [
    {id: "G", value: "G"},
    {id: "PG", value: "PG"},
    {id: "PG-13", value: "PG-13"},
    {id: "R", value: "R"},
    {id: "NC-17", value: "NC-17"},
    {id: "18A", value: "18A"},
  ]

  return (
    <div>
      <h2>Add/Edit Movie</h2>
      <hr />

      <pre>{ JSON.stringify(movie, null, 3) }</pre>

      <form onSubmit={handleSubmit}>
        <input type='hidden' name="id" value={movie.id} id="id"/>
        {/* Title */}
        <Input 
          title={"Title"}
          className={"form-control"}
          type={"text"}
          name={"title"}
          value={movie.title}
          onChange={handleChange}
          errorDiv={hasError("title") ? "text-danger": "d-none"}
          errorMsg={"Please enter a title"}
        />
        {/* Release Date */}
        <Input 
          title={"Release Date"}
          className={"form-control"}
          type={"date"}
          name={"release_date"}
          value={movie.release_date}
          onChange={handleChange}
          errorDiv={hasError("release_date") ? "text-danger": "d-none"}
          errorMsg={"Please enter a release date"}
        />
        <Input 
          title={"Runtime"}
          className={"form-control"}
          type={"text"}
          name={"runetime"}
          value={movie.runtime}
          onChange={handleChange}
          errorDiv={hasError("runtime") ? "text-danger": "d-none"}
          errorMsg={"Please enter a runtime"}
        />
        <Select
          title={"MPAA Rating"}
          name={"mpaa_rating"}
          options={mpaaOptions}
          onChange={handleChange("mpaa_rating")}
          placeholder={"Choose..."}
          errorMsg={"Please choose"}
          errorDiv={hasError("mpaa_rating") ? "text-danger": "d-none"}
        />
        <TextArea 
          title={"Description"}
          name={"description"}
          value={movie.description}
          rows={"3"}
          onChange={handleChange("description")}
          errorMsg={"Please enter a description"}
          errorDiv={hasError("description") ? "text-danger": "d-none"}
        />
      </form>
    </div>
    
  )


}

export default EditMovie;