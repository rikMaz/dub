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
    fontFamily: 'Futura',
    position: "absolute",
    top: "520px",
    left: "10px",
    borderRadius: 50,
    paddingLeft: "141px",
    paddingRight: "141px"
  },

}));

export default function MoviePage() {
  const history = useHistory();
  const [movie] = useMovie();
  const {setName,getMovieCrew,setSearchType} = useContext(SearchContext);
  const classes = useStyles();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  return (
    <>
      <HeaderStyled>
        <NameStyled>{movie?.name}</NameStyled>
      </HeaderStyled>

      <MainStyled>

        <DivWrapper>
          <ImgStyled alt="movieImage" src={movie?.image} height="525px" width="350px"/>
          <Button className={classes.button} onClick={getCrew}>Crew</Button>
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


}

const HeaderStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
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
`;

const DivWrapper = styled.div`
  padding-top: 40px;
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

