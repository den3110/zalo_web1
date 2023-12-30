import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";


// Create the file metadata
/** @type {any} */

const firebaseConfig = {
  apiKey: "AIzaSyBsImGL6fuQb715w69ZlSVEkZag07sLu8Y",
  authDomain: "quiz-20730.firebaseapp.com",
  projectId: "quiz-20730",
  storageBucket: "quiz-20730.appspot.com",
  messagingSenderId: "402820908137",
  appId: "1:402820908137:web:890833413103e61f6c0ef8",
  measurementId: "G-D4K2ZRYZ0K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const uploadImageClient = async (file) => {
  try {
    
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject)=> {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log(snapshot);
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
    
            // ...
    
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             return resolve(downloadURL)
          });
        }
        );
    })
  } catch (error) {
    return error
  }
  
};

export const uploadVoiceClient= async (file)=> {
  const storage = getStorage();
  const storageRef = ref(storage, "voices/" + v4());
  
  const metadata = {
    contentType: "audio/mp3",
  };
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  return new Promise((resolve, reject)=> {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log(snapshot);
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
  
          // ...
  
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           return resolve(downloadURL)
        });
      }
      );
  })
}
