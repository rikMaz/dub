import React, {useContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";
import { ReactMic } from 'react-mic';

export default function HomePage() {
  const history = useHistory();
  const {setInputImage,setInputImageUrl,setDevices,setInputAudio,setInputAudioUrl,setAudioBlob} = useContext(SearchContext);
  const [recordStatus,setRecordStatus] = useState(false);


  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  },[handleDevices])


  return (
    <>
      <div>Homepage</div>
      <button onClick={onSearch}>Direct Search</button>
      <button onClick={onCamera}>Camera</button>
      <button onClick={onMicro}>Micro</button>
      <input type="file" accept="image/*" onChange={onImageUpload}/>
      <input type="file" accept="audio/*" onChange={onAudioUpload}/>

      <div>
        <ReactMic
          record={recordStatus}
          className="sound-wave"
          onStop={(recordedBlob) => setInputAudio(recordedBlob)}
          onData={(recordedBlob) => setInputAudio(recordedBlob)}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onClick={() => setRecordStatus(true)} type="button">Start</button>
        <button onClick={onStopRecording} type="button">Stop</button>
      </div>
    </>
  )



  function onRecord(audioData) {
    const file = new File([audioData],"recorded_audio", {type : "audio/wav"})
    setInputAudio(file);
    setInputAudioUrl(URL.createObjectURL(file));
  }

  function onStopRecording() {
    setRecordStatus(false)
    history.push("/micro");
  }


  function onImageUpload(event) {
    setInputImage(event.target.files[0]);
    setInputImageUrl(URL.createObjectURL(event.target.files[0]));
    history.push("/previewpage");
  }

  function onAudioUpload(event) {
    setInputAudio(event.target.files[0]);
    setInputAudioUrl(URL.createObjectURL(event.target.files[0]));
    history.push("/micro");
  }

  function onSearch() {
    history.push("/search")
  }

  function onCamera() {
    history.push("/camera")
  }

  function onMicro() {
    history.push("/micro")
  }

}