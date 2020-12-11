import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import useActor from "../hooks/useActor";
import SearchItem from "../searchPage/SearchItem";
import styled from 'styled-components/macro';
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import {makeStyles} from "@material-ui/core/styles";
import SearchContext from "../context/SearchContext";

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
  }

}));


export default function ActorPage() {
  const history = useHistory();
  const {setName,setSearchItems,setSearchType} = useContext(SearchContext);
  const [actor] = useActor();
  const classes = useStyles();

  return (
    <PageLayout>
      <HeaderStyled>

        <div>
          <Fab className={classes.button} aria-label="goBack" onClick={goBack}>
            <ArrowBackIcon className={classes.icon}/>
          </Fab>
        </div>

        <NameStyled>{actor?.name}</NameStyled>

        <div>
          <Fab className={classes.button} aria-label="goHome" onClick={goHome}>
            <HomeIcon className={classes.icon}/>
          </Fab>
        </div>

      </HeaderStyled>

      <MainStyled>

        <DivWrapper>
          <ImgStyled alt="actorImage" src={actor?.image} height="525px" width="350px"/>

          {actor?.voiceActors.length > 0 &&
          <div>
              <ImgVoiceActorStyled alt="VoiceActorImage" src={actor?.voiceActors[0].image} onClick={onImageClick} height="160px" width="114px"/>
              <NameVoiceActorStyled>Voice Actor</NameVoiceActorStyled>
          </div>
          }

        </DivWrapper>

          <InfosStyled>

            <ListStyled>

              <ListItemStyled>
                <LabelStyled>Birthday:</LabelStyled>
                <div>{actor?.birthday}</div>
              </ListItemStyled>

              <ListItemStyled>
                <LabelStyled>Place of Birth:</LabelStyled>
                <div>{actor?.placeOfBirth}</div>
              </ListItemStyled>

              <ListItemStyled>
                <LabelStyled>Biography:</LabelStyled>
                <div>{actor?.biography}</div>
              </ListItemStyled>

            </ListStyled>
          </InfosStyled>


          <MovieListStyled>
            {actor?.movies.map((listItem) =>
              <li key={listItem.id}>
                <SearchItem searchItem={listItem}/>
              </li>
            )}
          </MovieListStyled>

      </MainStyled>

    </PageLayout>
  )

  function onImageClick() {
    history.push(`/details/voiceactor/${actor?.voiceActors[0].id}`);
  }

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

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  height: 100vh;
  background-color: #333;
`;

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

const ImgStyled = styled.img`
  border-radius: 10px;
`;

const ImgVoiceActorStyled = styled.img`
  border: 2px solid white;
  border-radius: 10px;
  position: absolute;
  top: 365px;
  left: 225px;
`;

const MainStyled = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  justify-items: center;
  align-items: center;
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

const MovieListStyled = styled.ul`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 5px;
  list-style: none;
  gap: var(--size-xxl);
`;

const ListItemStyled = styled.li`
padding: 10px;
`;

const NameVoiceActorStyled = styled.div`
  font-size: 0.5em;
  padding: 5px 36px 5px 36px;
  background: white;
  border-radius: 0px 0px 5px 5px;
  position: absolute;
  top: 505px;
  left: 225px;
  white-space: nowrap;
`;