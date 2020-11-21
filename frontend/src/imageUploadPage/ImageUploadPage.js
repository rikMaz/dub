import React, {useState} from "react";

export default function ImageUploadPage() {

  const [imageUrl,setImageUrl] = useState("/imageerror.png");

  return (
    <>
      <div>Image Upload Page</div>
      <input type="file" accept="image/*" onChange={handleImage}/>
      <img src={imageUrl} alt="upload" height="50%" width="50%"  />
      </>
  )

  function handleImage(event) {
    const imageFile = event.target.files[0];
    setImageUrl(URL.createObjectURL(imageFile));
  }

}