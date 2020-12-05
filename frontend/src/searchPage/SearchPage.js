import React, {useContext, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";
import SearchContext from "../context/SearchContext";
import styled from "styled-components/macro";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import withStyles from "@material-ui/core/styles/withStyles";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 50,
    position: 'relative',
    backgroundColor: "white",
    fontSize: "16px",
    padding: '10px 26px 10px 12px',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Futura',
    ].join(','),
    '&:focus': {
      borderRadius: 50,
      border: "none",
      backgroundColor: "white",
    },

  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({

  searchButton: {
    color: 'black',
    background: 'white',
    height: 39,
    width: 39,
  },
  searchIcon: {
    color: 'black',
    height: 20,
    width: 20,
  },
  selecter: {
    padding: "10px",
  }

}));

export default function SearchPage() {
  const classes = useStyles();
  const history = useHistory();
  const {name,setName,getActors,searchType, setSearchType,getMovies,setSearchItems,getVoiceActors,getMovieCrew} = useContext(SearchContext);
  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

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
        <div className={classes.selecter}>

          <FormControl>
            <Select
              id="demo-customized-select"
              value={searchType}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={"movie"}>Movie</MenuItem>
              <MenuItem value={"actor"}>Actor</MenuItem>
              <MenuItem value={"voiceactor"}>Voice Actor</MenuItem>
            </Select>
          </FormControl>

        </div>

        <div>
          <Input name="name" value={name} type="text" placeholder="Search..." onChange={event => setName(event.target.value)}/>
        </div>

        <div className={classes.selecter}>
          <Fab className={classes.searchButton} aria-label="searchIcon" onClick={onSearch}>
            <SearchIcon className={classes.searchIcon}/>
          </Fab>
        </div>

      </HeaderStyled>

      <MainStyled>
        <SearchList/>
      </MainStyled>

    </>)


  function onCancel() {
    history.goBack();
    setSearchItems([]);
  }

 /* function goHome() {
    history.push("/");
    setName("");
    setSearchItems([]);
  }*/

  function onSearch() {
    console.log(searchType);
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
  /*display: grid;
  grid-template-columns: min-content min-content min-content;*/
  display: flex;
  justify-items: start;
  align-items: center;
  padding-top: 10px;
`;

const MainStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 9px;
  background: white;
  border: none;
  border-radius: 50px;
  ::placeholder {
    color: black;
  }
`;