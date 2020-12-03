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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import {Typography} from "@material-ui/core";
import DescriptionIcon from '@material-ui/icons/Description';

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
  icon: {
    color: 'white',
  },
  buttonIcon: {
    color: "black",
    height: 50,
    width: 50
  },
  searchButton: {
    color: 'black',
    background: 'white',
    height: 50,
    width: 50
  },
  textButton: {
    color: 'white',
    fontFamily: "Futura",
    fontStyle: 'normal',
    textTransform: "none",
    padding: 0
  },

}));


export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();
  const {setDevices,setInputAudio,setInputAudioUrl,identifyVoiceActor,setInputImage,setInputImageUrl} = useContext(SearchContext);

  const [actionType,setActionType] = useState(0)


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

        <HeaderButtonLeftStyled>
          <IconButton aria-label="recent" onClick={countDown}>
            <TextIconStyled>
              <DescriptionIcon className={classes.icon}/>
              <Typography className={classes.textButton}>Recent</Typography>
            </TextIconStyled>
          </IconButton>
        </HeaderButtonLeftStyled>

        <HeaderButtonRightStyled>
          <IconButton aria-label="login" onClick={countDown}>
            <TextIconStyled>
              <AccountCircleIcon className={classes.icon}/>
              <Typography className={classes.textButton}>Login</Typography>
            </TextIconStyled>
          </IconButton>
        </HeaderButtonRightStyled>

      </HeaderStyled>

      <MainStyled>

        <ButtonGroupStyled>

          {actionType === 0 &&
          <DescriptionStyled>Tap to identify speaker</DescriptionStyled>
          }
          {actionType === 1 &&
          <DescriptionStyled>Tap to take a photo</DescriptionStyled>
          }
          {actionType === 2 &&
          <DescriptionStyled>Tap to upload image</DescriptionStyled>
          }
          {actionType === 3 &&
          <DescriptionStyled>Tap to upload audio</DescriptionStyled>
          }

          <ButtonGroupTopStyled>

            <IconButton aria-label="arrowBackIosIcon" onClick={countDown}>
              <ArrowBackIosIcon className={classes.arrow}/>
            </IconButton>

            {actionType === 0 &&
            <Fab className={classes.button} aria-label="micIcon" onClick={onRecordAudio}>
              <MicIcon className={classes.buttonIcon}/>
            </Fab>
            }

            {actionType === 1 &&
            <Fab className={classes.button} aria-label="photoCameraIcon" onClick={() => history.push("/camera")}>
              <PhotoCameraIcon className={classes.buttonIcon}/>
            </Fab>
            }

            {actionType === 2 &&

              <div>
                <input
                  hidden
                  id={"contained-button-file"}
                  accept={"image/*"}
                  type={"file"}
                  onChange={onImageUpload}
                />
                <label htmlFor={"contained-button-file"}>
                  <Fab className={classes.button} aria-label="photoLibraryIcon" component={"span"}>
                    <PhotoLibraryIcon className={classes.buttonIcon}/>
                  </Fab>
                </label>
              </div>
            }

            {actionType === 3 &&

            <div>
              <input
                hidden
                id={"contained-button-file"}
                accept={"image/*"}
                type={"file"}
                onChange={onAudioUpload}
              />
              <label htmlFor={"contained-button-file"}>
                <Fab className={classes.button} aria-label="audiotrackIcon">
                  <AudiotrackIcon className={classes.buttonIcon}/>
                </Fab>
              </label>
            </div>
            }


            <IconButton aria-label="arrowForwardIosIcon" onClick={countUp}>
              <ArrowForwardIosIcon className={classes.arrow} />
            </IconButton>


          </ButtonGroupTopStyled>

          <BottemStyled>
            <Fab className={classes.searchButton} aria-label="searchIcon" onClick={() => history.push("/search")}>
              <SearchIcon />
            </Fab>
          </BottemStyled>

        </ButtonGroupStyled>



      </MainStyled>

    </>
  )

  function countDown() {
    if (actionType > 0) {
      setActionType(actionType-1);
    }
  }

  function countUp() {
    if (actionType < 3) {
      setActionType(actionType+1);
    }
  }

  function onImageUpload(event) {
    setInputImage(event.target.files[0]);
    setInputImageUrl(URL.createObjectURL(event.target.files[0]));
    history.push("/image")
  }

  function onAudioUpload(event) {
    setInputAudio(event.target.files[0]);
    setInputAudioUrl(URL.createObjectURL(event.target.files[0]));
    history.push("/audio")
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

const DescriptionStyled = styled.div`
  display: grid;
  align-items: end;
  color: white;
  font-size: 1.2em;
`;


const BottemStyled = styled.div`
  display: grid;
  align-items: start;
`;

const TextIconStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 10px;
`;

const HeaderButtonLeftStyled = styled.div`
  display: grid;
  justify-items: start;
`;

const HeaderButtonRightStyled = styled.div`
  display: grid;
  justify-items: end;
`;

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const MainStyled = styled.div`
  display: grid;
`;

const ButtonGroupStyled = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 1fr;
  justify-items: center;
`;

const ButtonGroupTopStyled = styled.div`

  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;

`;
