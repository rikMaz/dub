import React, {useContext, useState} from "react";
import Webcam from "react-webcam";
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function Camera() {
  const history = useHistory();
  const webcamRef = React.useRef(null);
  const {setInputImage,setInputImageUrl,devices} = useContext(SearchContext);
  const [camera,setCamera] = useState(0);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ deviceId: devices[camera].deviceId}} width={"100%"}/>
      <button onClick={onCapture}>Capture photo</button>
      <button onClick={onCameraSwitch}>Switch Camera</button>
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

  function onCameraSwitch() {
    if(camera === 0) {
      setCamera(1);
    } else {
      setCamera(0);
    }
  }

}