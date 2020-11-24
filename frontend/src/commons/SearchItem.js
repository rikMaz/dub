import React, { useState,useEffect,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";


export default function SearchItem({searchItem}){
  const [imageUrl,setImageUrl] = useState("");
  const imageUrlBasis = "https://image.tmdb.org/t/p/w154/";
  const history = useHistory();
  const {getMovieById,getActorById,getVoiceActorById,searchType} = useContext(SearchContext);

  useEffect(() => {
    setImageUrl(imageUrlBasis + searchItem.image);
  },[searchItem]);

  if(searchType === "Crew"){
    return(
      <>
        <div>{searchItem.name}</div>
        <div>{searchItem.character}</div>
        <img alt="SearchItemImage" src={imageUrl} onClick={onImageClick} onError={noImage} height="231px" width="154px" />
      </>
    )
  }

  return(
    <>
      <div>{searchItem.name}</div>
      <img alt="SearchItemImage" src={imageUrl} onClick={onImageClick} onError={noImage} height="231px" width="154px" />
    </>
  )


  function noImage(event){
    event.target.src = "/imageerror.png";
  }

  function onImageClick() {

    switch (searchItem.type) {

      case "movie":
        getMovieById(searchItem.id).then(() => history.push("/moviedetailspage"));
        break;

      case "Acting":
        getActorById(searchItem.id).then(() => history.push("/actordetailspage"));
        break;

      case "VoiceActor":
        getVoiceActorById(searchItem.id).then(() => history.push("/voiceactordetailspage"));
        break;

      default:
        break;
    }

  }


}