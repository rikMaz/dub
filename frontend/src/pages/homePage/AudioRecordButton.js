import React, {useContext, useEffect, useState} from "react";
import UploadContext from "../../tech/context/UploadContext";
import styled from "styled-components/macro";
import RecordRTC from "recordrtc";

import {makeStyles} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import MicIcon from "@material-ui/icons/Mic";
import CircularProgress from "@material-ui/core/CircularProgress";



const useStyles = makeStyles(() => ({
  button: {
    color: 'black',
    background: 'white',
    height: 120,
    width: 120,
    position: "absolute",
    top: 10,
    left: 10,
  },
  icon: {
    color: "black",
    height: 50,
    width: 50
  },
  circularProgress: {
    color: "teal"
  }
}));

export default function AudioRecordButton({actionType}) {
  const classes = useStyles();
  const {setInputAudio,setInputAudioUrl,identifyVoiceActor} = useContext(UploadContext);
  const [description,setDescription] = useState("Tap to identify speaker");
  const [loadingType,setLoadingTyp] = useState(0)
  const [taskStatus, setTaskStatus] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    if (taskStatus === 1) {
      const timer = setInterval(() => {
        const nextProgress = progress + 4;

        if (nextProgress > 100) {
          clearInterval(timer);
          setLoadingTyp(1);
          setDescription("identifying speaker...")
        } else {
          setProgress(nextProgress);
        }
      }, 200);

      return () => {
        clearInterval(timer);
      };
    }

  },[progress,taskStatus])

  useEffect(() => {
    setLoadingTyp(0);
    setTaskStatus(0);
    setProgress(0);
    // eslint-disable-next-line
  },[actionType])

  return(
    <ComponentLayout>
      <DescriptionStyled>{description}</DescriptionStyled>
      <CircularProgressStyled>
        {loadingType === 0 && <CircularProgress className={classes.circularProgress} size={140} variant="determinate" value={progress}/>}
        {loadingType === 1 && <CircularProgress className={classes.circularProgress} size={140}/>}
        <Fab className={classes.button} aria-label="micIcon" onClick={onRecordAudio}>
          <MicIcon className={classes.icon}/>
        </Fab>
      </CircularProgressStyled>
    </ComponentLayout>
  )

  function onRecordAudio(){
    setTaskStatus(1);
    setDescription("recording speaker...")
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
      await sleep(5000);

      recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        const file = new File([blob],"recorded_audio", {type : "audio/wav"})
        setInputAudio(file);
        setInputAudioUrl(URL.createObjectURL(file))
        //invokeSaveAsDialog(blob, 'audio.wav')
        identifyVoiceActor(file);
      });
    });
  }

}

const ComponentLayout = styled.div`
display: grid;
grid-template-rows: min-content min-content;
justify-items: center;
grid-gap: 50px;
`;

const CircularProgressStyled = styled.div`
position: relative;
`;

const DescriptionStyled = styled.div`
  color: white;
  font-size: 1.4em;
`;
