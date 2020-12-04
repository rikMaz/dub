import React, {useContext, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";
import SearchContext from "../context/SearchContext";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import styled from "styled-components/macro";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

  searchButton: {
    color: 'black',
    background: 'white',
    height: 120,
    width: 120,
  },
  searchIcon: {
    color: 'black',
    height: 60,
    width: 60,
  },

}));

export default function SearchPage() {
  const classes = useStyles();
  const history = useHistory();
  const {name,setName,searchType,setSearchType,getActors,getMovies,setSearchItems,getVoiceActors,getMovieCrew} = useContext(SearchContext);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])


  if(searchType === "crew") {
    return (
      <>
        <div>{name}</div>
        <div>{searchType}</div>
        <button onClick={onCancel}>Cancel</button>
        <SearchList/>
      </> )

  }

  return (

    <>
      <HeaderStyled>
        <div>
          <Input name="name" value={name} type="text" placeholder="Search..." onChange={event => setName(event.target.value)}/>
        </div>
      </HeaderStyled>

      <MainStyled>
        <div>
          <Input name="name" value={name} type="text" placeholder="Search..." onChange={event => setName(event.target.value)}/>
        </div>
      </MainStyled>

      <BottomStyled>
        <Fab className={classes.searchButton} aria-label="searchIcon" onClick={() => history.push("/search")}>
          <SearchIcon className={classes.searchIcon}/>
        </Fab>
      </BottomStyled>


      {/*<div>{searchType}</div>
      <DropdownButton id="searchtype" title="SearchType">
        <Dropdown.Item onClick={() => setSearchType("movie")}>Movie</Dropdown.Item>
        <Dropdown.Item onClick={() => setSearchType("actor")}>Actor</Dropdown.Item>
        <Dropdown.Item onClick={() => setSearchType("voiceactor")}>Voice Actor</Dropdown.Item>
      </DropdownButton>

      <input name="name" disabled={!searchType} value={name} type="text" onChange={event => setName(event.target.value)}/>
      <button onClick={onSearch} disabled={!name}>Search</button>
      <button onClick={goHome}>Cancel</button>
      <SearchList/>*/}
    </>)


  function onCancel() {
    history.goBack();
    setSearchItems([]);
  }

  function goHome() {
    history.push("/");
    setName("");
    setSearchItems([]);
  }

  function onSearch() {

    switch (searchType) {

      case "movie":
        getMovies(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      case "actor":
        getActors(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      case "voiceactor":
        getVoiceActors(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      default:
        break;
    }
  }

  function onRefresh() {

    let currentPath = window.location.pathname.split("/");
    if (currentPath.length > 2) {
      const previousSearch = currentPath[3].replace("%20", " ");
      setSearchType(currentPath[2]);
      switch (currentPath[2]) {

        case "movie":
          getMovies(previousSearch);
          break;

        case "actor":
          getActors(previousSearch);
          break;

        case "voiceactor":
          getVoiceActors(previousSearch);
          break;

        case "crew":
          setName(previousSearch);
          getMovieCrew(currentPath[4]);
          break;

        default:
          break;

      }
    }
  }


}

const HeaderStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
`;

const MainStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const BottomStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: start;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  background: grey;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: white;
  }
`;