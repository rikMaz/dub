import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import styled from 'styled-components/macro';
import SearchContext from "../../tech/context/SearchContext";
import UploadContext from "../../tech/context/UploadContext";

import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Fab from "@material-ui/core/Fab";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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

export default function ImagePreview() {
  const classes = useStyles();
  const history = useHistory();
  const {setSearchType} = useContext(SearchContext);
  const {inputImageUrl,inputImage,recognizeCelebrity} = useContext(UploadContext);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <PageLayout>

        <TitleStyled>Image Upload</TitleStyled>

        <ImageWrapper>
          <ImgStyled alt="ActorImage" src={inputImageUrl} height="525px" width="350px"/>

          <ButtenGroupStyled>
            <Fab className={classes.buttonCheck} aria-label="buttonCheck" onClick={recognize}>
              <CheckIcon className={classes.icon}/>
            </Fab>
            <Fab className={classes.buttonClose} aria-label="closeIcon" onClick={onCancel}>
              <CloseIcon className={classes.icon}/>
            </Fab>
          </ButtenGroupStyled>
        </ImageWrapper>

        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </PageLayout>
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
  color: white;
`;

const ImgStyled = styled.img`
  border-radius: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ButtenGroupStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  grid-gap: 90px;
  align-items: center;
  position: absolute;
  top: 400px;
  left: 30px;
`;
