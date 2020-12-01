import React, {useContext, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";

export default function HomePage() {
  const history = useHistory();
  const {setInputImage,setInputImageUrl,setDevices} = useContext(SearchContext);

  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  },[handleDevices])

  return (
    <>
      <div>Homepage</div>
      <button onClick={onSearch}>Direct Search</button>
      <button onClick={onCamera}>Camera</button>
      <input type="file" accept="image/*" onChange={onImageUpload}/>
    </>
  )


  function onImageUpload(event) {
    setInputImage(event.target.files[0]);
    setInputImageUrl(URL.createObjectURL(event.target.files[0]));
    history.push("/previewpage");
  }

  function onSearch() {
    history.push("/search")
  }

  function onCamera() {
    history.push("/camera")
  }


}