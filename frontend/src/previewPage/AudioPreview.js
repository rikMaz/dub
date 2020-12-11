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

const useStyles = makeStyles((theme) => ({
  buttonClose: {
    color: 'black',
    background: 'grey',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
    /*position: "absolute",
    top: "150px",
    left: "190px",*/
  },

  buttonCheck: {
    color: 'black',
    background: 'teal',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
    /*position: "absolute",
    top: "150px",
    left: "10px",*/
  },

  buttonIcon: {
    color: "black",
    height: 50,
    width: 50
  }

}));


export default function AudioPreview() {
  const classes = useStyles();
  const history = useHistory();
  const {inputAudio,inputAudioUrl,identifyVoiceActor} = useContext(SearchContext);
  const [error] = useAudio();


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
    console.log(inputAudio);
    identifyVoiceActor(inputAudio);
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