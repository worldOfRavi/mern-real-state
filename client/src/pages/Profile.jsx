import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePrec, setFilePrec]  = useState(0);
  const [fileUplaodError, setFileUplaodError] = useState(false);
  const [formData, setFormData]  = useState({});
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])

  // function to handle the file upload
  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred/
          snapshot.totalBytes) * 100;
          setFilePrec(Math.round(progress));
      },
      (error)=>{
        setFileUplaodError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).
        then((downloadURL)=>{
          setFormData({...formData, avatar:downloadURL})
          setFileUplaodError(false)
        })
      }

    )
  }
  return (
    
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-center text-3xl font-semibold my-4'>Profile</h1>
      <form className="flex flex-col gap-4">
      <input onChange={(e)=>setFile(e.target.files[0])} type="file"  ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile"
        className="rounded-full w-24 h-24 self-center object-cover cursor-pointer mt-2" />
        <p className="self-center text-sm">
          {fileUplaodError ? (
            <span className="text-red-700">Error image uplaod(image should be less than 2MB )</span>
          ) : filePrec > 0 && filePrec <100 ?
          ( <span className="text-slate-700">{`Uploading ${filePrec}%`}</span> ) :
          filePrec === 100 ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : ""
          }
        </p>
        <input type="text" placeholder="username" id="username"
        className="border p-3 rounded-lg" />

        <input type="email" placeholder="email" id="email"
        className="border p-3 rounded-lg" />

        <input type="password" placeholder="password" id="password"
        className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg
        p-3 uppercase hover:opacity-80 disabled:opacity-70">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
