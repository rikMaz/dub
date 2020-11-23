import React from "react";
import { useHistory } from 'react-router-dom';

export default function HomePage() {
  const history = useHistory();
  return (
    <>
      <div>Homepage</div>
      <button onClick={onSearch}>Direct Search</button>
      <button onClick={onImageUpload}>Image Upload</button>
    </>
  )

  function onSearch() {
    history.push("/setsearchtypepage")
  }

  function onImageUpload() {
    history.push("/imageuploadpage")
  }

}