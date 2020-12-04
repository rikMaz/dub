import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function PreviewPage() {
  const history = useHistory();
  const {inputImageUrl,inputImage,recognizeCelebrity,setSearchType} = useContext(SearchContext);


  return (
    <>
      <div>PreviewPage</div>
      <img src={inputImageUrl} alt="upload" height="50%" width="50%"/>
      <div>Sind Sie mit dem Foto zufrieden?</div>
      <button onClick={recognize}>Ja</button>
      <button onClick={onCancel}>Nein</button>
      <button onClick={show}>Show</button>
      </>
  )

  function onCancel() {
    history.goBack();
  }

  function show() {
    console.log(inputImage);
    console.log(inputImageUrl);
  }

  function recognize() {
    console.log(inputImage);
    setSearchType("Actors");
    recognizeCelebrity(inputImage);
  }

}