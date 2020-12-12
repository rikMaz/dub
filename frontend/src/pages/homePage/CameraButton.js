import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components/macro";

import {makeStyles} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SearchContext from "../../tech/context/SearchContext";



const useStyles = makeStyles((theme) => ({
  button: {
    color: 'black',
    background: 'white',
    height: 120,
    width: 120,
    padding: "10px",
  },
  icon: {
    color: "black",
    height: 50,
    width: 50
  }
}));

export default function CameraButton() {
  const classes = useStyles();
  const history = useHistory();
  const {setDevices} = useContext(SearchContext);

  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
    // eslint-disable-next-line
  },[])

  return (
    <ComponentLayout>
      <DescriptionStyled>Tap to take a photo</DescriptionStyled>
      <Fab className={classes.button} aria-label="photoCameraIcon" onClick={() => history.push("/camera")}>
        <PhotoCameraIcon className={classes.icon}/>
      </Fab>
    </ComponentLayout>
  )

}

const ComponentLayout = styled.div`
  display: grid;
  grid-template-rows: min-content min-content;
  justify-items: center;
  grid-gap: 60px;
`;

const DescriptionStyled = styled.div`
  color: white;
  font-size: 1.4em;
`;