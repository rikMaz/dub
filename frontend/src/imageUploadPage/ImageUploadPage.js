import React, {useState,useContext} from "react";
import SearchContext from "../context/SearchContext";

export default function ImageUploadPage() {
  const {awsResult,awsRecognizeCelebrity} = useContext(SearchContext);
  const [imageUrl,setImageUrl] = useState("/imageerror.png");

  return (
    <>
      <div>Image Upload Page</div>
      <input type="file" accept="image/*" onChange={handleImage}/>
      <img src={imageUrl} alt="upload" height="50%" width="50%"/>
      <div>{awsResult}</div>
      </>
  )

  function handleImage(event) {
    const imageFile = event.target.files[0];
    setImageUrl(URL.createObjectURL(imageFile));
    awsRecognizeCelebrity(imageFile);
  }
}