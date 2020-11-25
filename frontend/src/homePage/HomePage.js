import React, {useContext} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";

export default function HomePage() {
  const history = useHistory();
  const {setInputImage,setInputImageUrl} = useContext(SearchContext);

  return (
    <>
      <div>Homepage</div>
      <button onClick={onSearch}>Direct Search</button>
      <input type="file" accept="image/*" onChange={onImageUpload}/>
    </>
  )


  function onImageUpload(event) {
    setInputImage(event.target.files[0]);
    setInputImageUrl(URL.createObjectURL(event.target.files[0]));
    history.push("/previewpage");
  }

  function onSearch() {
    history.push("/setsearchtypepage")
  }


}