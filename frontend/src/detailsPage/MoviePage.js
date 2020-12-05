import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";
import useMovie from "../hooks/useMovie";
import styled from 'styled-components/macro';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

  button: {
    color: 'black',
    background: 'white',
    fontFamily: 'Futura'
  },

}));

export default function MoviePage() {
  const history = useHistory();
  const [movie] = useMovie();
  const {setName,getMovieCrew,setSearchType} = useContext(SearchContext);
  const classes = useStyles();

  return (
    <>
      <HeaderStyled>
        <NameStyled>{movie?.name}</NameStyled>
      </HeaderStyled>

      <MainStyled>

        <DivStyled>
          <ImgStyled alt="MovieImage" src={movie?.image} height="300px" width="200px"/>
          <Button className={classes.button} onClick={getCrew}>Crew</Button>
        </DivStyled>

        <InfosStyled>


          <div>Release Date: {movie?.releaseDate}</div>
          <div>Original Language: {movie?.originalLanguage}</div>
          <div>Runtime: {movie?.runtime}</div>
          <div>Budget: {movie?.budget}</div>
          <div>Revenue: {movie?.revenue}</div>
          <div>Overview: {movie?.overview}</div>

        </InfosStyled>
      </MainStyled>
    </>
  )

  function getCrew() {
    setSearchType("crew")
    setName(movie.name)
    getMovieCrew(movie.id).then(() => history.push(`/search/crew/${movie.name}/${movie.id}`))
  }


}

const HeaderStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
  padding-top: 20px;
`;

const NameStyled = styled.div`
  font-size: 1.4em;
  padding-top: 20px;
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
  font-weight: bold;
`;


const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;


const InfosStyled = styled.div`
  color: white;
`;