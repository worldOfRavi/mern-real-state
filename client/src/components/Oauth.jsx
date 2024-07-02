import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Oauth() {
    const dispatch = useDispatch();
    const handleGoogleOauth = async() =>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
        } catch (error) {
            console.log("could not sign in with google", error.message);
        }
    }
  return (
    <button onClick={handleGoogleOauth} type='button' className='bg-red-700 text-white p-3 rounded-lg
    uppercase hover:opacity-90'>
    Continue with google</button>
  )
}
