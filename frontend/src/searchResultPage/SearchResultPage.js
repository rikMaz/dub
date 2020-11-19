import React from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";

export default function SearchResultPage() {
  const history = useHistory();
  return (
    <>
      <div>SearchResultPage</div>
      <button onClick={onCancel}>Cancel</button>
      <SearchList/>
    </>
  )

  function onCancel() {
    history.goBack();
  }
}