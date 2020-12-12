import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import SearchContext from "../../tech/context/SearchContext";
import styled from "styled-components/macro";

import Fab from "@material-ui/core/Fab";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import {makeStyles} from "@material-ui/core/styles";

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

export default function ImageUploadButton() {
  const classes = useStyles();
  const history = useHistory();
  const {setInputImage,setInputImageUrl} = useContext(SearchContext);

  return (
    <ComponentLayout>
      <DescriptionStyled>Tap to upload image</DescriptionStyled>
      <input hidden id={"contained-button-file"} accept={"image/*"} type={"file"} onChange={onImageUpload}/>
      <label htmlFor={"contained-button-file"}>
        <Fab className={classes.button} aria-label="photoLibraryIcon" component={"span"}>
          <PhotoLibraryIcon className={classes.icon}/>
        </Fab>
      </label>
    </ComponentLayout>
  )

  function onImageUpload(event) {
    setInputImage(event.target.files[0]);
    setInputImageUrl(URL.createObjectURL(event.target.files[0]));
    history.push("/image")
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