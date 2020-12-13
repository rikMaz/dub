import UploadContext from "./UploadContext";
import React, {useContext, useState} from "react";
import {uploadAudio, uploadImage} from "../service/SearchService";
import {useHistory} from "react-router-dom";
import UserContext from "./UserContext";


export default function UploadContextProvider({ children }) {
  const history = useHistory();
  const { token } = useContext(UserContext);
  const [devices, setDevices] = useState([]);
  const [inputAudio,setInputAudio] = useState();
  const [inputAudioUrl,setInputAudioUrl] = useState();
  const [audioBlob,setAudioBlob] = useState();
  const [inputImageUrl,setInputImageUrl] = useState("/imageerror.png");
  const [inputImage,setInputImage] = useState(null);

  const recognizeCelebrity = (file) =>
    uploadImage(file,token).then((item) => history.push("/search/actor/" + item));

  const identifyVoiceActor = (file) =>
    uploadAudio(file,token).then(function(item){
      if(item === ("couldntIdentifySpeaker")) {
        history.push("/audio/notFound");
      } else {
        history.push("/details/voiceactor/" + item);
      }
    });

  return (
    <UploadContext.Provider value={{
      audioBlob,
      setAudioBlob,
      inputAudioUrl,
      setInputAudioUrl,
      inputAudio,
      setInputAudio,
      devices,
      setDevices,
      inputImage,
      setInputImage,
      inputImageUrl,
      setInputImageUrl,
      recognizeCelebrity,
      identifyVoiceActor,

    }}>
      {children}
    </UploadContext.Provider>
  )

}