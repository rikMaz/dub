import React, {useContext} from 'react';
import SearchItem from "../searchPage/SearchItem";
import useVoiceActor from "../hooks/useVoiceActor";
import styled from 'styled-components/macro';
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HomeIcon from "@material-ui/icons/Home";
import {makeStyles} from "@material-ui/core/styles";
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

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

export default function VoiceActorPage() {
  const history = useHistory();
  const [voiceActor] = useVoiceActor();
  const classes = useStyles();
  const {setName,setSearchItems,setSearchType} = useContext(SearchContext);

  return (
    <>

      <HeaderStyled>

        <div>
          <Fab className={classes.button} aria-label="goBack" onClick={goBack}>
            <ArrowBackIcon className={classes.icon}/>
          </Fab>
        </div>

        <NameStyled>{voiceActor?.name}</NameStyled>

        <div>
          <Fab className={classes.button} aria-label="goHome" onClick={goHome}>
            <HomeIcon className={classes.icon}/>
          </Fab>
        </div>

      </HeaderStyled>

      <MainStyled>
        <MainImageStyled>

          <DivWrapper>
            <ImgStyled alt="ActorImage" src={voiceActor?.image} height="525px" width="350px"/>
          </DivWrapper>

        </MainImageStyled>

        <InfosStyled>

          <ListStyled>

            <ListItemStyled>
              <LabelStyled>Birthday:</LabelStyled>
              <div>{voiceActor?.birthday}</div>
            </ListItemStyled>


          </ListStyled>

        </InfosStyled>

        <ListTitleStyled>Speaking roles:</ListTitleStyled>

        <ListStyled>
          {voiceActor?.actors.map((listItem) =>
            <li key={listItem.id}>
              <SearchItem searchItem={listItem}/>
            </li>
          )}
        </ListStyled>

      </MainStyled>
    </>
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

const MainStyled = styled.div`
  display: grid;
  grid-template-rows: min-content min-content 1fr;
`;

const MainImageStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;


const DivWrapper = styled.div`
  padding-top: 10px;
  position: relative;
`;

const InfosStyled = styled.div`
  color: white;
  display: grid;
  justify-items: start;
  align-items: center;
`;


const ListTitleStyled = styled.div`
  color: white;
  font-size: 1em;
  font-weight: bold;
  padding-left: 15px;
`;

const LabelStyled = styled.div`
font-size: 1em;
font-weight: bold;
`;

const ListStyled = styled.ul`
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
