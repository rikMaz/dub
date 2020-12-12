import React from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components/macro";

import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'black',
    background: 'white',
    height: 50,
    width: 50,
  },
}));

export default function ImageUploadButton() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ComponentLayout>
      <Fab className={classes.button} aria-label="searchIcon" onClick={() => history.push("/search")}>
        <SearchIcon />
      </Fab>
    </ComponentLayout>
  )
}

const ComponentLayout = styled.div`
  display: grid;
  justify-content: center;
  padding-top: 20px;
`;