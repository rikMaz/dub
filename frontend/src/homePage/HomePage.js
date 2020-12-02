import React, {useContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";
import RecordRTC ,{invokeSaveAsDialog} from "recordrtc";
import Fab from "@material-ui/core/Fab";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MicIcon from '@material-ui/icons/Mic';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components/macro";
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const useStyles = makeStyles((theme) => ({
  button: {
    /*color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',*/
    color: 'black',
    background: 'white',
    height: 120,
    width: 120
  },
  arrow: {
    color: 'white',
  },
  buttonIcon: {
    color: "black",
    height: 40,
    width: 40
  },
  searchButton: {
    color: 'black',
    background: 'white',
    height: 50,
    width: 50
  },
  textButton: {
    color: 'white',
  },

}));


export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();
  const {setDevices,setInputAudio,setInputAudioUrl,identifyVoiceActor} = useContext(SearchContext);

  const [actionType,setActionType] = useState("micro")


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
      <HeaderStyled>
        <MediathekStyled>
          <Button className={classes.textButton}>Mediathek</Button>
        </MediathekStyled>
        <LoginStyled>
          <Button className={classes.textButton}>Login</Button>
        </LoginStyled>
      </HeaderStyled>

      <MainStyled>

        <ButtonGroupStyled>

          <ButtonGroupTopStyled>

            <IconButton aria-label="arrowBackIosIcon">
              <ArrowBackIosIcon className={classes.arrow} onClick={changeActionType}/>
            </IconButton>

            {/*<Fab size="small" aria-label="arrowForwardIosIcon" onClick={() => history.push("/camera")}>
              <ChevronLeftIcon />
            </Fab>*/}

            <Fab className={classes.button} aria-label="micIcon" onClick={onRecordAudio}>
              <MicIcon className={classes.buttonIcon}/>
            </Fab>

            {/*<Fab size="small" aria-label="arrowForwardIosIcon" onClick={() => history.push("/camera")}>
              <ChevronRightIcon />
            </Fab>*/}

            <IconButton aria-label="arrowForwardIosIcon">
              <ArrowForwardIosIcon className={classes.arrow} onClick={changeActionType}/>
            </IconButton>


          </ButtonGroupTopStyled>

          <Fab className={classes.searchButton} aria-label="searchIcon" onClick={() => history.push("/search")}>
            <SearchIcon />
          </Fab>

        </ButtonGroupStyled>



      </MainStyled>

    </>
  )

  function changeActionType() {
    if(actionType == "micro") {
      setActionType("camera");
    } else {
      setActionType("audio");
    }
  }


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

}

const LoginStyled = styled.div`
  display: grid;
  justify-items: end;
`;

const MediathekStyled = styled.div`
  display: grid;
  justify-items: start;
`;

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const MainStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const ButtonGroupStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

const ButtonGroupTopStyled = styled.div`

  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;

`;
