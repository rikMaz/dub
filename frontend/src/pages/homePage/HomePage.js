import React, {useState} from "react";
import styled from "styled-components/macro";
import AudioRecordButton from "./AudioRecordButton";
import CameraButton from "./CameraButton";
import ImageUploadButton from "./ImageUploadButton";
import AudioUploadButton from "./AudioUploadButton";
import SearchButton from "./SearchButton";
import AccountButton from "./AccountButton";
import RecentButton from "./RecentButton";

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



const useStyles = makeStyles(() => ({
  backwardArrow: {
    position: "absolute",
    top: 166,
    left: 30,
  },
  forwardArrow: {
    position: "absolute",
    top: 166,
    right: 30,
  },
  icon: {
    color: "white"
  }
}));


export default function HomePage() {
  const classes = useStyles();
  const buttonTypes = ["audioRecord","camera","imageUpload","audioUpload"];
  const [counter,setCounter] = useState(0);
  const [buttonType,setButtonType] = useState("audioRecord");


  return (
    <PageLayout>

      <HeaderStyled>
        <RecentButton/>
        <AccountButton/>
      </HeaderStyled>

      <MainStyled>

        <IconButton className={classes.backwardArrow} aria-label="arrowBackIosIcon" disabled={counter === 0} onClick={countDown}>
          <ArrowBackIosIcon className={classes.icon}/>
        </IconButton>

        {buttonType === "audioRecord" &&
        <AudioRecordButton buttonType={buttonType}/>
        }

        {buttonType === "camera" &&
        <CameraButton/>
        }

        {buttonType === "imageUpload" &&
        <ImageUploadButton/>
        }

        {buttonType === "audioUpload" &&
        <AudioUploadButton/>
        }

        <IconButton className={classes.forwardArrow} aria-label="arrowForwardIosIcon" disabled={counter === 3} onClick={countUp}>
          <ArrowForwardIosIcon className={classes.icon} />
        </IconButton>

      </MainStyled>

      <SearchButton/>

    </PageLayout>
  )

  function countDown() {
    setButtonType(buttonTypes[counter - 1]);
    setCounter(counter - 1);
  }

  function countUp() {
    setButtonType(buttonTypes[counter + 1]);
    setCounter(counter + 1);
  }

}

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 1fr;
  height: 100vh;
  align-content: center;
  background-color: #333;
`;

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
`;

const MainStyled = styled.div`
  position: relative;
  padding-top: 40px;
`;
