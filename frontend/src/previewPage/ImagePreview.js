import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";
import styled from 'styled-components/macro';
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export default function ImagePreview() {
  const classes = useStyles();
  const history = useHistory();
  const {inputImageUrl,inputImage,recognizeCelebrity,setSearchType} = useContext(SearchContext);
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
        <NameStyled>Image Upload</NameStyled>
      </HeaderStyled>

      <MainStyled>
        <MainImageStyled>

          <DivWrapper>
            <ImgStyled alt="ActorImage" src={inputImageUrl} height="525px" width="350px"/>
            <Backdrop className={classes.backdrop} open={open}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <ButtenGroupStyled>
              <Fab className={classes.buttonCheck} aria-label="buttonCheck" onClick={recognize}>
                <CheckIcon className={classes.buttonIcon}/>
              </Fab>
              <Fab className={classes.buttonClose} aria-label="closeIcon" onClick={onCancel}>
                <CloseIcon className={classes.buttonIcon}/>
              </Fab>
            </ButtenGroupStyled>
          </DivWrapper>

        </MainImageStyled>
      </MainStyled>


      </>
  )

  function onCancel() {
    history.goBack();
  }

  function recognize() {
    handleToggle();
    console.log(inputImage);
    setSearchType("Actors");
    recognizeCelebrity(inputImage).then(() => handleClose());
  }

}

const ButtenGroupStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  grid-gap: 90px;
  align-items: center;
  position: absolute;
  top: 420px;
  left: 30px;
`;

const HeaderStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const NameStyled = styled.div`
  font-size: 1.4em;
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
  padding-top: 10px;
  position: relative;
`;
