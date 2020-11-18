import React from "react";
import { useHistory } from 'react-router-dom';

export default function HomePage() {
  const history = useHistory();
  return (
    <>
      <div>Homepage</div>
      <button onClick={onSearch}>Direct Search</button>
    </>
  )

  function onSearch() {
    history.push("/searchpage")
  }

}