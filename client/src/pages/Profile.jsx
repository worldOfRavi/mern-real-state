import { useSelector } from "react-redux"


export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-center text-3xl font-semibold my-4'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile"
        className="rounded-full w-24 h-24 self-center object-cover cursor-pointer mt-2" />
        <input type="text" placeholder="username" id="username"
        className="border p-3 rounded-lg" />

        <input type="email" placeholder="email" id="email"
        className="border p-3 rounded-lg" />

        <input type="password" placeholder="password" id="password"
        className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg
        p-3 uppercase hover:opacity-80 disabled:opacity-70">Update</button>
      </form>
      <d className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </d>
    </div>
  )
}
