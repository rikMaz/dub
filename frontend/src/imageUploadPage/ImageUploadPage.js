import React, {useState,useEffect,useContext} from "react";
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function ImageUploadPage() {
  const {awsResult,awsRecognizeCelebrity,getActorsByName,inputImageUrl,setInputImageUrl,inputImage,setInputImage} = useContext(SearchContext);
  const history = useHistory();


  return (
    <>
      <div>Image Upload Page</div>
      <input type="file" accept="image/*" onChange={(event) => setInputImage(event.target.files[0])}/>
      <div>Input Image:</div>
      <input type="file" accept="image/*" onChange={handleChange} />

      <img src={inputImageUrl} alt="upload" height="50%" width="50%"/>
      <button onClick={recognizeCelebrity}>Recognize Celebrity</button>
      <div>{awsResult}</div>

      </>
  )

  function handleChange(event) {
    setInputImage(event.target.files[0]);
    history.push("/previewpage");
  }


  function recognizeCelebrity() {
    console.log(inputImage);
    setInputImageUrl(URL.createObjectURL(inputImage))
    /*const imageFile = event.target.files[0];
    setInputImageUrl(URL.createObjectURL(imageFile));
    awsRecognizeCelebrity(imageFile);*/
  }



}