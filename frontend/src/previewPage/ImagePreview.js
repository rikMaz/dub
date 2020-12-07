import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";
import styled from 'styled-components/macro';
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  buttonClose: {
    color: 'black',
    background: 'red',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
    position: "absolute",
    top: "450px",
    left: "240px",
  },

  buttonCheck: {
    color: 'black',
    background: 'green',
    border: "2px solid",
    borderColor: "black",
    height: 100,
    width: 100,
    position: "absolute",
    top: "450px",
    left: "10px",
  },

  buttonIcon: {
    color: "black",
    height: 50,
    width: 50
  }

}));

export default function ImagePreview() {
  const classes = useStyles();
  const history = useHistory();
  const {inputImageUrl,inputImage,recognizeCelebrity,setSearchType} = useContext(SearchContext);

  return (
    <>

      <HeaderStyled>
        <NameStyled>Image Upload</NameStyled>
      </HeaderStyled>

      <MainStyled>
        <MainImageStyled>

          <DivWrapper>
            <ImgStyled alt="ActorImage" src={inputImageUrl} height="525px" width="350px"/>
            <div>
              <Fab className={classes.buttonCheck} aria-label="buttonCheck" onClick={recognize}>
                <CheckIcon className={classes.buttonIcon}/>
              </Fab>
              <Fab className={classes.buttonClose} aria-label="closeIcon" onClick={onCancel}>
                <CloseIcon className={classes.buttonIcon}/>
              </Fab>
            </div>
          </DivWrapper>

        </MainImageStyled>
      </MainStyled>


      </>
  )

  function onCancel() {
    history.goBack();
  }

  function recognize() {
    console.log(inputImage);
    setSearchType("Actors");
    recognizeCelebrity(inputImage);
  }

}


const HeaderStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
  padding-top: 20px;
`;

const NameStyled = styled.div`
  font-size: 1.4em;
  padding-top: 20px;
  color: white;
`;

const ImgStyled = styled.img`
  border-radius: 10px;
`;

const MainStyled = styled.div`
  display: grid;
  grid-template-rows: min-content;
`;

const MainImageStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const DivWrapper = styled.div`
  padding-top: 40px;
  position: relative;
`;
