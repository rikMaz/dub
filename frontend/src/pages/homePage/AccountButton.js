import React, {useContext} from "react";
import styled from "styled-components/macro";
import {useHistory} from "react-router-dom";


import {makeStyles} from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import UserContext from "../../tech/context/UserContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() => ({
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

export default function AccountButton() {
  const classes = useStyles();
  const history = useHistory();
  const {logout} =useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    logout();
    history.push("/login");
    setAnchorEl(null);
  };

  return (
    <IconButton aria-label="account" onClick={handleClick}>
      <AccountButtonStyled>
        <AccountCircleIcon className={classes.icon}/>
        <Typography className={classes.text}>Account</Typography>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
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