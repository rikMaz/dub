import React, {useContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import RecordRTC from "recordrtc";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from "styled-components/macro";
import {Typography} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Fab from "@material-ui/core/Fab";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MicIcon from '@material-ui/icons/Mic';
import SearchIcon from '@material-ui/icons/Search';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import SearchContext from "../../tech/context/SearchContext";


const useStyles = makeStyles((theme) => ({
  button: {
    color: 'black',
    background: 'white',
    height: 120,
    width: 120,
    padding: "10px",
  },
  buttonLoading: {
    color: 'black',
    background: 'white',
    height: 120,
    width: 120,
    position: "absolute",
    top: 10,
    left: 10,
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
    width: 50,
  },
  textButton: {
    color: 'white',
    fontFamily: "Futura",
    fontStyle: 'normal',
    textTransform: "none",
  },
  loading: {
    color: "teal"
  },
  loadingWrapper: {
    position: "relative"
  }

}));


export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();
  const {setDevices,setInputAudio,setInputAudioUrl,identifyVoiceActor,setInputImage,setInputImageUrl} = useContext(SearchContext);
  const [progress, setProgress] = useState(0);
  const [taskStatus, setTaskStatus] = useState(0);
  const [actionType,setActionType] = useState(0);
  const [description,setDescription] = useState("Tap to identify speaker");
  const [loadingType,setLoadingTyp] = useState(0)


  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
    // eslint-disable-next-line
  },[])

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


  return (
    <PageLayout>
      <HeaderStyled>

        <IconButton aria-label="recent">
          <IconButtonStyled>
            <FindInPageIcon className={classes.icon}/>
            <Typography className={classes.textButton}>Recent</Typography>
          </IconButtonStyled>
        </IconButton>


        <IconButton aria-label="login">
          <AccountButtonStyled>
            <AccountCircleIcon className={classes.icon}/>
            <Typography className={classes.textButton}>Account</Typography>
          </AccountButtonStyled>
        </IconButton>


      </HeaderStyled>

      <MainStyled>

        <ButtonGroupStyled>

          <DescriptionStyled>{description}</DescriptionStyled>

          <ButtonGroupTopStyled>

            <IconButton aria-label="arrowBackIosIcon" onClick={countDown}>
              <ArrowBackIosIcon className={classes.icon}/>
            </IconButton>

            {actionType === 0 &&
              <div className={classes.loadingWrapper}>
                {loadingType === 0 && <CircularProgress className={classes.loading} size={140} variant="determinate" value={progress}/>}
                {loadingType === 1 && <CircularProgress className={classes.loading} size={140}/>}
                <Fab className={classes.buttonLoading} aria-label="micIcon" onClick={onRecordAudio}>
                  <MicIcon className={classes.buttonIcon}/>
                </Fab>
              </div>
            }

            {actionType === 1 &&
              <ButtonWrapper>
                <Fab className={classes.button} aria-label="photoCameraIcon" onClick={() => history.push("/camera")}>
                  <PhotoCameraIcon className={classes.buttonIcon}/>
                </Fab>
              </ButtonWrapper>
            }

            {actionType === 2 &&
              <ButtonWrapper>
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
              </ButtonWrapper>
            }

            {actionType === 3 &&
              <ButtonWrapper>
                <input
                  hidden
                  id={"contained-button-file"}
                  accept={"audio/*, .m4a"}
                  type={"file"}
                  onChange={onAudioUpload}
                />
                <label htmlFor={"contained-button-file"}>
                  <Fab className={classes.button} aria-label="audioTrackIcon" component={"span"}>
                    <AudiotrackIcon className={classes.buttonIcon}/>
                  </Fab>
                </label>
              </ButtonWrapper>
            }

            <IconButton aria-label="arrowForwardIosIcon" onClick={countUp}>
              <ArrowForwardIosIcon className={classes.icon} />
            </IconButton>

          </ButtonGroupTopStyled>

          <ButtonGroupBottomStyled>
            <Fab className={classes.searchButton} aria-label="searchIcon" onClick={() => history.push("/search")}>
              <SearchIcon />
            </Fab>
          </ButtonGroupBottomStyled>

        </ButtonGroupStyled>

      </MainStyled>

    </PageLayout>
  )




  function countDown() {
    if (actionType > 0) {
      setActionType(actionType-1);
    }
    changeDescription(actionType-1);
  }

  function countUp() {
    if (actionType < 3) {
      setActionType(actionType+1);
    }
    changeDescription(actionType+1);
  }

  function changeDescription(counter) {
    if (counter === 0) {
      setDescription("Tap to identify speaker")
    }
    if (counter === 1) {
      setDescription("Tap to take a photo")
    }
    if (counter === 2) {
      setDescription("Tap to upload image")
    }
    if (counter === 3) {
      setDescription("Tap to upload audio")
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

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  height: 100vh;
  background-color: #333;
`;

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
`;


const IconButtonStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 10px;
`;

const AccountButtonStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 5px;
`;


const MainStyled = styled.div`
  display: grid;
`;

const DescriptionStyled = styled.div`
  display: grid;
  align-items: end;
  color: white;
  font-size: 1.4em;
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

const ButtonGroupBottomStyled = styled.div`
  display: grid;
  align-items: start;
`;

const ButtonWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 3px;
`;