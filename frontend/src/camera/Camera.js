import React from "react";
import Webcam from "react-webcam";

export default function Camera() {

  return (
    <>
      <div>Hallo</div>
      <Webcam audio={false} screenshotFormat="image/jpeg" width={200} height={200}/>

      </>
  )
}