import React, {useContext, useState} from "react";
import Webcam from "react-webcam";
import {useHistory} from "react-router-dom";
import styled from 'styled-components/macro';
import UploadContext from "../../tech/context/UploadContext";

import {makeStyles} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
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
  icon: {
    color: "black",
    height: 50,
    width: 50
  }

}));

export default function CameraPage() {
  const classes = useStyles();
  const history = useHistory();
  const webcamRef = React.useRef(null);
  const {setInputImage,setInputImageUrl,devices} = useContext(UploadContext);
  const [camera,setCamera] = useState(0);

  return (
    <PageLayout>

      <TitleStyled>Take a photo</TitleStyled>

      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ deviceId: devices[camera].deviceId}} height={"400px"} width={"100%"}/>

      <ButtonGroupWrapper>
        <ButtonGroupStyled>
          <Fab className={classes.buttonSwitch} aria-label="switchCameraIcon" onClick={onCameraSwitch}>
            <SwitchCameraIcon className={classes.icon}/>
          </Fab>
          <Fab className={classes.buttonCapture} aria-label="photoCameraIcon" onClick={onCapture}>
            <PhotoCameraIcon className={classes.icon}/>
          </Fab>
          <Fab className={classes.buttonClose} aria-label="closeIcon" onClick={onCancel}>
            <CloseIcon className={classes.icon}/>
          </Fab>
        </ButtonGroupStyled>
      </ButtonGroupWrapper>

      </PageLayout>
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

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 200px;
  height: 100vh;
  background-color: #333;
  justify-items: center;
  align-items: center;
`;

const TitleStyled = styled.div`
  font-size: 1.4em;
  padding-top: 20px;
  color: white;
`;

const ButtonGroupWrapper = styled.div`
  display: grid;
  justify-items: center;
  position: absolute;
  bottom: 25px;
  width: 100%;
`;

const ButtonGroupStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  justify-content: center;
`;

