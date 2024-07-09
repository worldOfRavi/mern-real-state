import { useDispatch } from "react-redux"
import { userDeleteStart, userDeleteSuccess, userDeleteFailure } from "../redux/user/userSlice";
const useDelete = () => {
    const dispatch = useDispatch();
  const deleteUser = async (id)=>{
    dispatch(userDeleteStart());
    try {
        const res = await fetch(`/api/user/delete/${id}`,{
            method:"DELETE"
        }
        )
        const data = await res.json();
        if(data.success === false){
            dispatch(userDeleteFailure(data.message));
            return;
        }
        dispatch(userDeleteSuccess());
    } catch (error) {
        dispatch(userDeleteFailure(error.message))
    }
  }
  return {deleteUser}
}

export default useDelete
