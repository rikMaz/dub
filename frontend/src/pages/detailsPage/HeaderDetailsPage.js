import React, {useContext} from "react";
import styled from "styled-components/macro";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import {makeStyles} from "@material-ui/core/styles";
import SearchContext from "../../tech/context/SearchContext";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles(() => ({

  button: {
    color: 'black',
    background: 'white',
    height: 43,
    width: 43,
  },
  icon: {
    color: 'black',
    height: 20,
    width: 20,
  }

}));

export default function HeaderDetailsPage({item}) {
  const classes = useStyles();
  const history = useHistory();
  const {setName,setSearchItems,setSearchType} = useContext(SearchContext);

  return (
    <ComponentLayout>

        <Fab className={classes.button} aria-label="goBack" onClick={goBack}>
          <ArrowBackIcon className={classes.icon}/>
        </Fab>

        <NameStyled>{item?.name}</NameStyled>

        <Fab className={classes.button} aria-label="goHome" onClick={goHome}>
          <HomeIcon className={classes.icon}/>
        </Fab>

    </ComponentLayout>
  )

  function goHome() {
    history.push("/");
    setName("");
    setSearchItems([]);
    setSearchType("movie");
  }

  function goBack() {
    history.goBack();
  }
}

const ComponentLayout = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  justify-items: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const NameStyled = styled.div`
  font-size: 1.4em;
  color: white;
`;