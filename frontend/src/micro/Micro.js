import React, {useContext} from "react";
import SearchContext from "../context/SearchContext";
import ReactAudioPlayer from "react-audio-player";


export default function Micro() {
  const {inputAudio,inputAudioUrl,identifyVoiceActor} = useContext(SearchContext);

  return (
    <>
      <div>Micro</div>

      <button onClick={onUploadAudio}>Upload Audio</button>
      <button onClick={onShowAudio}>Show Audio File</button>

      <ReactAudioPlayer
        src={inputAudioUrl}
        autoPlay={false}
        controls
        />

      </>
  )

  function onShowAudio() {
    console.log(inputAudio)
  }

  function onUploadAudio() {

    identifyVoiceActor(inputAudio);

  }

}