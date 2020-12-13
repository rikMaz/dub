import React, {useContext} from "react";
import styled from 'styled-components/macro';
import {useHistory} from "react-router-dom";
import UploadContext from "../../tech/context/UploadContext";
import useAudio from "../../tech/hooks/useAudio";
import ReactAudioPlayer from "react-audio-player";

import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  buttonClose: {
    color: 'black',
    background: 'grey',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
  },
  buttonCheck: {
    color: 'black',
    background: 'teal',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
  },
  icon: {
    color: "black",
    height: 50,
    width: 50
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function AudioPreview() {
  const classes = useStyles();
  const history = useHistory();
  const {inputAudio,inputAudioUrl,identifyVoiceActor} = useContext(UploadContext);
  const [error] = useAudio();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


  return (
      <PageLayout>

        <TitleStyled>Audio Upload</TitleStyled>

        <MainStyled>

          {error === "notFound" &&
          <ErrorMessageStyled>Couldn't identify speaker!</ErrorMessageStyled>
          }

          <ReactAudioPlayer src={inputAudioUrl} autoPlay controls/>

          <ButtonGroupStyled>
            <Fab className={classes.buttonCheck} aria-label="buttonCheck" onClick={identify}>
              <CheckIcon className={classes.icon}/>
            </Fab>
            <Fab className={classes.buttonClose} aria-label="closeIcon" onClick={onCancel}>
              <CloseIcon className={classes.icon}/>
            </Fab>
          </ButtonGroupStyled>

        </MainStyled>

        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>

      </PageLayout>
  )


  function onCancel() {
    history.goBack();
  }

  function identify() {
    handleToggle();
    console.log(inputAudio);
    identifyVoiceActor(inputAudio).then(() => handleClose());
  }

}

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
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

const MainStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

const ErrorMessageStyled = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.0em;
  color: red;
`;

const ButtonGroupStyled = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 90px;
  justify-content: center;
`;