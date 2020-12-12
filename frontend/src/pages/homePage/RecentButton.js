import React from "react";
import styled from "styled-components/macro";


import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'white',
  },
  text: {
    color: 'white',
    fontFamily: "Futura",
    fontStyle: 'normal',
    textTransform: "none",
  }
}));

export default function RecentButton() {
  const classes = useStyles();

  return (
    <IconButton aria-label="account">
      <AccountButtonStyled>
        <FindInPageIcon className={classes.icon}/>
        <Typography className={classes.text}>Recent</Typography>
      </AccountButtonStyled>
    </IconButton>
  )
}

const AccountButtonStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 5px;
`;