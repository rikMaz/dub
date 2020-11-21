import React, {useState,useContext} from "react";
import SearchContext from "../context/SearchContext";

export default function ImageUploadPage() {
  const {awsResult,awsRecognizeCelebrity} = useContext(SearchContext);
  const [imageUrl,setImageUrl] = useState("/imageerror.png");

  return (
    <>
      <div>Image Upload Page</div>
      <input type="file" accept="image/*" onChange={handleImage}/>
      <img src={imageUrl} alt="upload"/>
      <div>{awsResult}</div>
      </>
  )

  function handleImage(event) {
    const imageFile = event.target.files[0];
    setImageUrl(URL.createObjectURL(imageFile));
    awsRecognizeCelebrity(imageFile);
  }

  /*function resizeImage(file) {

    // Ensure it's an image
    if(file.type.match(/image.*!/)) {
      console.log('An image has been loaded');

      // Load the image
      let reader = new FileReader();
      reader.onload = function (readerEvent) {
        let image = new Image();
        image.onload = function (imageEvent) {

          // Resize the image
          let canvas = document.createElement('canvas'),
            max_size = 544,//
            width = image.width,
            height = image.height;
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          let dataUrl = canvas.toDataURL('image/jpeg');
          let resizedImage = dataURLToBlob(dataUrl);
          $.event.trigger({
            type: "imageResized",
            blob: resizedImage,
            url: dataUrl
          });
        }
        image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(file);
    }
  }*/

}