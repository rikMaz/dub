import React, {useState,useContext} from "react";
import SearchContext from "../context/SearchContext";
//import Resizer from 'react-image-file-resizer';

export default function ImageUploadPage() {
  const {awsResult,awsRecognizeCelebrity} = useContext(SearchContext);
  const [imageUrl,setImageUrl] = useState("/imageerror.png");


  return (
    <>
      <div>Image Upload Page</div>
      <input type="file" accept="image/*" onChange={handleImage}/>
      <img src={imageUrl} alt="upload" height="50%" width="50%"/>
      <div>{awsResult}</div>

      {/*<input type="file" accept="image/*" onChange={resize}/>
      <img src={imageUrl} id="output" alt="blabla"/>*/}

      </>
  )

  function handleImage(event) {
    const imageFile = event.target.files[0];
    setImageUrl(URL.createObjectURL(imageFile));
    awsRecognizeCelebrity(imageFile);
  }

/*
  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
      uri => {
        resolve(uri);
      },
      'base64'
    );
  });

  async function resize(event) {
    const resizeFile = (file) => new Promise(resolve => {
      Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
        uri => {
          resolve(uri);
        },
        'base64'
      );
    });

    const file = event.target.files[0];
    const image = await resizeFile(file).then(() => console.log(image));
  }*/

}