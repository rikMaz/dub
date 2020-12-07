import React, {useContext, useState} from "react";
import Webcam from "react-webcam";
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";
import styled from 'styled-components/macro';
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  buttonSwitch: {
    color: 'black',
    background: 'grey',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
  },
  buttonCapture: {
    color: 'black',
    background: 'white',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
  },
  buttonClose: {
    color: 'black',
    background: 'grey',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
  },
  buttonIcon: {
    color: "black",
    height: 50,
    width: 50
  }

}));

export default function Camera() {
  const classes = useStyles();
  const history = useHistory();
  const webcamRef = React.useRef(null);
  const {setInputImage,setInputImageUrl,devices} = useContext(SearchContext);
  const [camera,setCamera] = useState(0);

  return (
    <>

      <HeaderStyled>
        <TitleStyled>Take a photo</TitleStyled>
      </HeaderStyled>

      <MainStyled>

          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ deviceId: devices[camera].deviceId}} height={"400px"} width={"100%"}/>


      </MainStyled>

      <ButtonGroupPositionStyled>
        <ButtonGroupGridStyled>
          <Fab className={classes.buttonSwitch} aria-label="switchCameraIcon" onClick={onCameraSwitch}>
            <SwitchCameraIcon className={classes.buttonIcon}/>
          </Fab>
          <Fab className={classes.buttonCapture} aria-label="photoCameraIcon" onClick={onCapture}>
            <PhotoCameraIcon className={classes.buttonIcon}/>
          </Fab>
          <Fab className={classes.buttonClose} aria-label="closeIcon" onClick={onCancel}>
            <CloseIcon className={classes.buttonIcon}/>
          </Fab>
        </ButtonGroupGridStyled>
      </ButtonGroupPositionStyled>

      </>
  )

  function onCapture() {
    const url = webcamRef.current.getScreenshot();
    fetch(url).then(res => res.blob()).then(blob => {
      const file = new File([blob],"captured_image", {type : "image/jpg"})
      setInputImage(file);
      setInputImageUrl(URL.createObjectURL(file));
      history.push("/image");
    })
  }

  function onCameraSwitch() {
    if(camera === 0) {
      setCamera(1);
    } else {
      setCamera(0);
    }
  }

  function onCancel() {
    history.goBack();
  }

}

const HeaderStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
  padding-top: 20px;
`;

const TitleStyled = styled.div`
  font-size: 1.4em;
  padding-top: 20px;
  color: white;
`;

const MainStyled = styled.div`
  display: grid;
  justify-items: center;
  grid-template-rows: min-content;
`;

const ButtonGroupPositionStyled = styled.div`
  
  display: grid;
  justify-items: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
`;

const ButtonGroupGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  justify-content: center;
`;

