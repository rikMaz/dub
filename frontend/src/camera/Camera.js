import React, {useContext, useState} from "react";
import Webcam from "react-webcam";
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function Camera() {
  const history = useHistory();
  const webcamRef = React.useRef(null);
  const {setInputImage,setInputImageUrl} = useContext(SearchContext);


  return (
    <>
      <div>Hallo</div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={200} height={200}/>
      <button onClick={onCapture}>Capture photo</button>
      </>
  )

  function onCapture() {
    const url = webcamRef.current.getScreenshot();
    fetch(url).then(res => res.blob()).then(blob => {
      const file = new File([blob],"captured_image", {type : "image/jpg"})
      setInputImage(file);
      setInputImageUrl(URL.createObjectURL(file));
      history.push("/previewpage");
    })




  }

}