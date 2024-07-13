import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from "../firebase";
import useUpdate from "../hooks/useUpdate";
import useDelete from "../hooks/useDelete";
import useUserSignout from "../hooks/useUserSignout";
import {Link} from 'react-router-dom';
import ShowListing from "./ShowListing";


export default function Profile() {
  const {userSignout} =  useUserSignout()
  const {updateUser, updated} = useUpdate();
  const {deleteUser} = useDelete();
  const {currentUser, error, loading} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePrec, setFilePrec]  = useState(0);
  const [fileUplaodError, setFileUplaodError] = useState(false);
  const [formData, setFormData]  = useState({});
  const [showListing, setShowListing] = useState(false)
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

  // logic to handle the change
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value })
  }
  
  // logic for submit handling
  const handleSubmit = (e)=>{
    e.preventDefault();
    updateUser(formData, currentUser._id);
    
  }
  return (
    
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-center text-3xl font-semibold my-4'>Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        onChange={handleChange}
        defaultValue={currentUser.username}
        className="border p-3 rounded-lg" />

        <input type="email" placeholder="email" id="email"
        onChange={handleChange}
        defaultValue={currentUser.email}
        className="border p-3 rounded-lg" />

        <input type="password" placeholder="password" id="password"
        onChange={handleChange}
        className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg
        p-3 uppercase hover:opacity-80 disabled:opacity-70">
          {loading? "Loading..." : "Update"}
        </button>
        <Link className="bg-green-700 p-3 rounded-lg text-white uppercase
        text-center hover:opacity-85" to={"/create-listing"}>create listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={()=>deleteUser(currentUser._id)}>
          {loading ? "Loading..." : "Delete account"}
        </span>
        <span className="text-red-700 cursor-pointer" onClick={()=>userSignout()} >Sign out</span>
      </div>
        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">{updated ? "User info updated successfully" : ""}</p>

        <div className="text-green-700 text-center cursor-pointer" onClick={()=>setShowListing(!showListing)}>Show Listings</div>


{/* show listing */}
{showListing && <ShowListing />}

    </div>
  )
}
