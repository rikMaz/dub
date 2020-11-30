import React, {useContext, useState} from "react";
import {uploadAudio} from "../service/SearchService";
import SearchContext from "../context/SearchContext";
import ReactAudioPlayer from "react-audio-player";


export default function Micro() {
  const [recVoice,setRecVoice] = useState();
  const {inputAudio,inputAudioUrl} = useContext(SearchContext);

  return (
    <>
      <div>Micro</div>

      <button onClick={onUploadAudio}>Upload Audio</button>
      <button onClick={onShowAudio}>Show Audio File</button>
      <div>{recVoice}</div>

      {/*<ReactAudioPlayer
        src={inputAudioUrl}
        autoPlay
        controls
        />*/}

      </>
  )

  function onShowAudio() {
    console.log(inputAudio)
  }

  function onUploadAudio() {

    uploadAudio(inputAudio).then(item => setRecVoice(item));

  }

}