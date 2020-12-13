import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import UploadContext from "../../tech/context/UploadContext";
import styled from "styled-components/macro";

import {makeStyles} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";




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

export default function AudioUploadButton() {
  const classes = useStyles();
  const history = useHistory();
  const {setInputAudio,setInputAudioUrl} = useContext(UploadContext);

  return (
    <ComponentLayout>
      <DescriptionStyled>Tap to upload audio</DescriptionStyled>
      <input hidden id={"contained-button-file"} accept={"audio/*, .m4a"} type={"file"} onChange={onAudioUpload}/>
      <label htmlFor={"contained-button-file"}>
        <Fab className={classes.button} aria-label="audioTrackIcon" component={"span"}>
          <AudiotrackIcon className={classes.icon}/>
        </Fab>
      </label>
    </ComponentLayout>
  )

  function onAudioUpload(event) {
    setInputAudio(event.target.files[0]);
    setInputAudioUrl(URL.createObjectURL(event.target.files[0]));
    history.push("/audio")
  }
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