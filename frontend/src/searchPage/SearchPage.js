import React from "react";
import { useHistory } from 'react-router-dom';

export default function SearchPage() {
  const history = useHistory();
  return (
    <>
      <div>SearchPage</div>
      <label>Movie/TVSeries<input/></label>
      <button>Search</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }

}