import React, {useContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";
import styled from "styled-components/macro";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import withStyles from "@material-ui/core/styles/withStyles";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import PersonIcon from '@material-ui/icons/Person';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from "@material-ui/icons/Home";
import SearchContext from "../../tech/context/SearchContext";

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
  },
  itemPadding: {
    paddingLeft: "6px",
    paddingRight: "6px",
  },
  iconButton: {
    padding: 0
  },
  formControl: {
    padding: 0
  }

}));

export default function SearchPage() {
  const classes = useStyles();
  const history = useHistory();
  const {name,setName,getActors,searchType, setSearchItems, setSearchType,getMovies,getVoiceActors,getMovieCrew} = useContext(SearchContext);
  const [searchPlaceholder,setSearchPlaceholder] = useState("movies...")
  const handleChange = (event) => {
    setSearchType(event.target.value);
    switch (event.target.value) {
      case "movie":
        setSearchPlaceholder("movies...")
        break;
      case "actor":
        setSearchPlaceholder("actors...")
        break;
      case "voiceactor":
        setSearchPlaceholder("voice actors...")
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])


  return (

    <PageLayout>
      {searchType !== "crew" &&
        <HeaderStyled>

          <div>
            <Fab className={classes.button} aria-label="goHome" onClick={goHome}>
              <ArrowBackIcon className={classes.icon}/>
            </Fab>
          </div>

          <div>
            <FormControl>
              <Select
                value={searchType}
                onChange={handleChange}
                input={<BootstrapInput/>}
              >
                <MenuItem value={"movie"}><LocalMoviesIcon className={classes.icon}/></MenuItem>
                <MenuItem value={"actor"}><PersonIcon className={classes.icon}/></MenuItem>
                <MenuItem value={"voiceactor"}><RecordVoiceOverIcon className={classes.icon}/></MenuItem>
              </Select>
            </FormControl>
          </div>

          <SearchbarStyled>
            <Input name="name" value={name} type="text" placeholder={searchPlaceholder}
                   onChange={event => setName(event.target.value)}/>
            <IconButton className={classes.iconButton} aria-label="clear" onClick={clear}>
              <ClearIcon className={classes.icon}/>
            </IconButton>
          </SearchbarStyled>

          <div>
            <Fab className={classes.button} aria-label="searchIcon" onClick={onSearch}>
              <SearchIcon className={classes.icon}/>
            </Fab>
          </div>

        </HeaderStyled>
      }
      {searchType === "crew" &&
        <HeaderCrewStyled>
          <div>
            <Fab className={classes.button} aria-label="goBack" onClick={goBack}>
              <ArrowBackIcon className={classes.icon}/>
            </Fab>
          </div>

          <NameStyled>{name}</NameStyled>

          <div>
            <Fab className={classes.button} aria-label="goHome" onClick={goHome}>
              <HomeIcon className={classes.icon}/>
            </Fab>
          </div>
        </HeaderCrewStyled>
      }

      <MainStyled>
        <SearchList/>
      </MainStyled>

    </PageLayout>)


  function goHome() {
    history.push("/");
    setName("");
    setSearchItems([]);
  }

 function clear() {
    //history.push("/search");
    setName("");
    setSearchItems([]);
  }

  function goBack() {
    history.goBack();
  }

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
          setSearchPlaceholder("actors...");
          break;

        case "voiceactor":
          getVoiceActors(previousSearch);
          break;

        case "crew":
          setName(previousSearch.replace("%20"," "));
          getMovieCrew(currentPath[4]);
          break;

        default:
          break;

      }
    }
  }


}

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  height: 100vh;
  background-color: #333;
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;


const HeaderCrewStyled = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  justify-items: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const MainStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Input = styled.input`
  font-size: 0.9em;
  border: none;
  width: 150px;
  border-radius: 50px;
  ::placeholder {
    color: black;
  }
`;

const SearchbarStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: 9px;
  background: white;
  height: 43px;
  border-radius: 50px;
`;


const NameStyled = styled.div`
  font-size: 1.4em;
  color: white;
`;