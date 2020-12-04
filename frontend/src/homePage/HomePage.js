import React, {useContext, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";
import RecordRTC ,{invokeSaveAsDialog} from "recordrtc";

export default function HomePage() {
  const history = useHistory();
  const {setInputImage,setInputImageUrl,setDevices,setInputAudio,setInputAudioUrl,identifyVoiceActor} = useContext(SearchContext);


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

      <button onClick={onRecordAudio}>Record</button>

    </>
  )

  function onRecordAudio(){
    const StereoAudioRecorder = require('recordrtc').StereoAudioRecorder
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(async function(stream) {
      let recorder = RecordRTC(stream, {
        recorderType: StereoAudioRecorder,
        mimeType: 'audio/wav'
      });
      recorder.startRecording();

      const sleep = m => new Promise(r => setTimeout(r, m));
      await sleep(6000);

      recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        const file = new File([blob],"recorded_audio", {type : "audio/wav"})
        setInputAudio(file);
        setInputAudioUrl(URL.createObjectURL(file))
        invokeSaveAsDialog(blob, 'audio.wav')
        identifyVoiceActor(file);
      });
    });
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