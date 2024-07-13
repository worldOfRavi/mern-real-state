import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";
import useCreateListing from "../hooks/useCreateListing";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'


const UpdateListing = () => {
    const navigate = useNavigate();
    const {currentUser} = useSelector((state)=>state.user);
    const {loading, createListing} = useCreateListing();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrl:[],
        name:"",
        description:"",
        address:"",
        type:"rent",
        bedroom:1,
        bathroom:1,
        regularPrice:50,
        discountedPrice:0,
        offer:false,
        parking:false,
        furnished:false,
        userRef:currentUser._id

    })
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const[error, setError] = useState("");

    // logic for image upload
    const handleImageUpload = ()=>{
        if(files.length > 0 && files.length + formData.imageUrl.length < 7){
            setUploading(true);
            const promises = [];
            for(let i = 0;i<files.length;i++){
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrl:formData.imageUrl.concat(urls)})
                setError(false)
                setUploading(false)
                setImageUploadError(false)
            }).catch((err)=>{
                setImageUploadError("Image upload failed (2 mb max per image)");
                setUploading(false)
                // setFrontEndError(false)
            })
        }else{
            setImageUploadError('You can uplaod only 6 images per listing');
        }
    };
    // function to return the address of the uploaded image
    const storeImage = async(file)=>{
        return new Promise((resolve, reject)=>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                        resolve(downloadUrl);
                    })
                }

            )
        })
    }
    // function to handle the onChange event
    const handleChange= (e)=>{
        if(e.target.id==="sale" || e.target.id === "rent"){
            setFormData({
                ...formData, type:e.target.id
            })
        }
        if(e.target.id === 'parking' || e.target.id==='furnished' || e.target.id==='offer'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }
        if(e.target.type === 'number' || e.target.type === 'text'|| e.target.type==='textarea'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }



    }

    // function to delete image from the fromData
    const handleImageDelete = (id) =>{
        setFormData({
            ...formData, imageUrl:formData.imageUrl.filter((_,index)=>index!=id)
        })
    }

    // function to handle the form submission
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(formData.imageUrl.length<1){
            return setError("You must uplaod at least one image")
        }
        if(+formData.discountedPrice > +formData.regularPrice){
            return setError("Discounted price must me lesser than the regular price");
        }
        createListing({formData}).then((data)=>{
            if(data.success){
                navigate(`/listing${data.data._id}`)
            }else{setError(data.message)}
        }).catch((err)=>{
            console.log("Error",err.message);
            setError(err)
        })
    }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            id="name"
            placeholder="Title"
            className="border 
            p-3 rounded-lg"
            minLength="8"
            maxLength="62"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            id="description"
            placeholder="Description"
            className="border 
            p-3 rounded-lg"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border 
            p-3 rounded-lg"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" 
                onChange={handleChange} checked = {formData.type==="sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4"
              onChange={handleChange} checked={formData.type ==="rent"} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4" 
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4" 
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4" 
              onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bedroom"
                min="1"
                max="10"
                required
                className="border border-gray-300"
                onChange={handleChange}
                value={formData.bedroom}
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bathroom"
                min="1"
                max="10"
                required
                className="border border-gray-300"
                onChange={handleChange}
                value={formData.bathroom}
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="border border-gray-300"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                {formData.type==="rent" && <span className="text-xs">($ / Month)</span> }
              </div>
            </div>
            {formData.offer && 
            (
                <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="discountedPrice"
                min="0"
                max="10000000"
                required
                className="border border-gray-300"
                onChange={handleChange}
                value={formData.discountedPrice}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                {formData.type==="rent" && <span className="text-xs">($ / Month)</span> }
              </div>
            </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 xl-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="p-3 border border-gary-300 rounded w-full"
              onChange={(e)=>setFiles(e.target.files)}
            />
            <button type="button" onClick={handleImageUpload} disabled={uploading}
              className="border border-green-700 text-green-700 uppercase p-3
             rounded hover:shadow-lg disabled:opacity-85"
            >
              {uploading ? "uploading" : "upload"}
            </button>
          </div>
            <p className="text-red-700 text-xs">{imageUploadError && imageUploadError}</p>
            {
            formData.imageUrl.map((url,index)=>(
                <div key={url} className="flex justify-between items-center border  p-2">
                    <img src={url} className="w-20 h-20 object-contain rounded-lg" />
                    <button type="button" className="text-red-700 hover:opacity-75" onClick={()=>handleImageDelete(index)}>Delete</button>
                </div>
            ))
            }
          <button disabled={loading || uploading} className="uppercase p-3 border bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80 ">{loading?"creating...": "create listing"}</button>
          <p className="text-xs text-red-700">{error && error}</p>
        </div>
      </form>   
    </main>
  );
};

export default UpdateListing;
