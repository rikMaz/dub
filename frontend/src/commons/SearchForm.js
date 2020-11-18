import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



export default function SearchForm({onSearch}){
  const [name,setName] = useState("");

  const history = useHistory();

  return (
    <Form onSubmit={handleSubmit}>

      <label>Movie/TVSeries<input name="name" /></label>


      <button>Search</button>
      <button onClick={onCancel}>Cancel</button>


    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault();
    onSearch
  }

}