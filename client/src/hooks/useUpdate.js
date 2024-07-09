import { useDispatch } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice";
import { useState } from "react";
 const  useUpdate = ()=> {
     const dispatch = useDispatch();
     const [updated, setUpdated] = useState(false)
    const updateUser = async (formData, id)=>{
        dispatch(updateUserStart());
        try {
            const res = await fetch(`/api/user/update/${id}`,{
                method:"POSt",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            });
            const data = await res.json();
            if(data.success === false){
                dispatch(updateUserFailure(data.message));
            }
            dispatch(updateUserSuccess(data))
            setUpdated(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }

    }
    return {updateUser, updated};

  
}

export default useUpdate