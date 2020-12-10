import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";
import useMovie from "../hooks/useMovie";
import styled from 'styled-components/macro';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({

  crewButton: {
    color: 'black',
    background: 'white',
    fontFamily: 'Futura',
    position: "absolute",
    top: "485px",
    left: "10px",
    borderRadius: 50,
    paddingLeft: "141px",
    paddingRight: "141px"
  },
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

export default function MoviePage() {
  const history = useHistory();
  const [movie] = useMovie();
  const {setName,getMovieCrew,setSearchType,setSearchItems} = useContext(SearchContext);
  const classes = useStyles();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  return (
    <>
      <HeaderStyled>

        <div>
          <Fab className={classes.button} aria-label="goBack" onClick={goBack}>
            <ArrowBackIcon className={classes.icon}/>
          </Fab>
        </div>

        <NameStyled>{movie?.name}</NameStyled>

        <div>
          <Fab className={classes.button} aria-label="goHome" onClick={goHome}>
            <HomeIcon className={classes.icon}/>
          </Fab>
        </div>

      </HeaderStyled>


      <MainStyled>

        <DivWrapper>
          <ImgStyled alt="movieImage" src={movie?.image} height="525px" width="350px"/>
          <Button className={classes.crewButton} onClick={getCrew}>Crew</Button>
        </DivWrapper>

        <InfosStyled>

          <ListStyled>

          <ListItemStyled>
            <LabelStyled>Release Date:</LabelStyled>
            <div>{movie?.releaseDate}</div>
          </ListItemStyled>

          <ListItemStyled>
            <LabelStyled>Original Language:</LabelStyled>
            <div>{movie?.originalLanguage}</div>
          </ListItemStyled>

          <ListItemStyled>
            <LabelStyled>Runtime:</LabelStyled>
            <div>{movie?.runtime}</div>
          </ListItemStyled>

          <ListItemStyled>
            <LabelStyled>Budget:</LabelStyled>
            <div>{formatter.format(movie?.budget)}</div>
          </ListItemStyled>

          <ListItemStyled>
            <LabelStyled>Revenue:</LabelStyled>
            <div>{formatter.format(movie?.revenue)}</div>
          </ListItemStyled>

          <ListItemStyled>
            <LabelStyled>Overview:</LabelStyled>
            <div>{movie?.overview}</div>
          </ListItemStyled>

          </ListStyled>
        </InfosStyled>
      </MainStyled>
    </>
  )

  function getCrew() {
    setSearchType("crew")
    setName(movie.name)
    getMovieCrew(movie.id).then(() => history.push(`/search/crew/${movie.name}/${movie.id}`))
  }

  function goHome() {
    history.push("/");
    setName("");
    setSearchItems([]);
  }

  function goBack() {
    history.back();
  }


}

const HeaderStyled = styled.div`
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

const MainStyled = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  justify-items: center;
  align-items: center;
`;

const ImgStyled = styled.img`
  border-radius: 10px;
`;

const DivWrapper = styled.div`
  padding-top: 10px;
  position: relative;
`;

const InfosStyled = styled.div`
  color: white;
`;

const LabelStyled = styled.div`
  font-size: 1em;
  font-weight: bold;
`;

const ListStyled = styled.ul`
  padding: 5px;
  list-style: none;
`;

const ListItemStyled = styled.li`
  padding: 10px;
`;

