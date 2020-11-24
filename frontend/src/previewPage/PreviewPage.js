import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function PreviewPage() {
  const {inputImageUrl,inputImage,awsResult,awsRecognizeCelebrity,getActorsByName,setSearchType} = useContext(SearchContext);
  const history = useHistory();

  return (
    <>
      <div>PreviewPage</div>
      <img src={inputImageUrl} alt="upload" height="50%" width="50%"/>
      <div>Wollten Sie dies Person fotografieren?</div>
      <button onClick={recognizeCelebrity}>Ja</button>
      <button onClick={getActor}>Get Details</button>
      <button onClick={onCancel}>Nein</button>
      <div>{awsResult}</div>
      </>
  )

  function onCancel() {
    history.goBack();
  }

  function recognizeCelebrity() {
    console.log(inputImage);
    awsRecognizeCelebrity(inputImage);
  }

  function getActor() {
    getActorsByName(awsResult);
    setSearchType("actor");
    history.push("/searchpage");
  }
}