import React, {useContext} from "react";
import ReactAudioPlayer from "react-audio-player";
import styled from 'styled-components/macro';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";
import useAudio from "../hooks/useAudio";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

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

  buttonIcon: {
    color: "black",
    height: 50,
    width: 50
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  loading: {
    color: "teal"
  },

}));


export default function AudioPreview() {
  const classes = useStyles();
  const history = useHistory();
  const {inputAudio,inputAudioUrl,identifyVoiceActor} = useContext(SearchContext);
  const [error] = useAudio();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


  return (
      <>
        <HeaderStyled>
          <TitleStyled>Audio Upload</TitleStyled>
        </HeaderStyled>

        <MainStyled>

          {error === "notFound" &&
          <ErrorMessageStyled>Couldn't identify speaker!</ErrorMessageStyled>
          }

          <DivGrid>

            <ReactAudioPlayer
              src={inputAudioUrl}
              autoPlay
              controls
            />
            <Backdrop className={classes.backdrop} open={open}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <ButtonGroupGridStyled>
              <Fab className={classes.buttonCheck} aria-label="buttonCheck" onClick={identify}>
                <CheckIcon className={classes.buttonIcon}/>
              </Fab>
              <Fab className={classes.buttonClose} aria-label="closeIcon" onClick={onCancel}>
                <CloseIcon className={classes.buttonIcon}/>
              </Fab>
            </ButtonGroupGridStyled>

          </DivGrid>

        </MainStyled>

      </>
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

const HeaderStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const TitleStyled = styled.div`
  font-size: 1.4em;
  padding-top: 20px;
  color: white;
`;

const ErrorMessageStyled = styled.div`
  padding: 50px;
  font-size: 1.0em;
  color: red;
`;

const MainStyled = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`;

const DivGrid = styled.div`
  display: grid;
  //flex-direction: column;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

const ButtonGroupGridStyled = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 90px;
  justify-content: center;
`;