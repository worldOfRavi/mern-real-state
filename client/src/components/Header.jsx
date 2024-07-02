import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Header() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Raaj</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="flex items-center bg-slate-100 rounded-lg p-3 w-24 sm:w-64">
          <input
            type="text"
            placeholder="Search..." 
            className="bg-transparent focus:outline-none"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <li className="hidden sm:inline transition-all duration-300 delay-100 hover:underline">
            <Link to="/" className="text-slate-700">Home</Link>
          </li>
          <li className="hidden sm:inline transition-all duration-300 delay-100 hover:underline">
            <Link to="/about" className="text-slate-700">About</Link>
          </li>
          <li className="sm:inline transition-all duration-300 delay-100 hover:underline">
           <Link to={"/profile"} >
           {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
           </Link>

          {/* <Link to="/sign-in" className="text-slate-700">Sign In</Link> */}
            
          </li>
        </ul>
      </div>
    </header>
  );
}
