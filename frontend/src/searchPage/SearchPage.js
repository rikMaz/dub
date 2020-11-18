import React, {useContext, useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";

export default function SearchPage() {
  const {getMoviesByName} = useContext(SearchContext);
  const [name,setName] = useState("");
  const history = useHistory();

  return (
    <>
      <div>SearchPage</div>
      <label>Movie/TVSeries<input name="name" value={name} type="text" onChange={event => setName(event.target.value)}/></label>
      <button onClick={handleSearch}>Search</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }

  function handleSearch() {
    getMoviesByName(name);
    history.push("/searchresultpage");
  }


}