import { useAuth } from "../../context/userContext";

const Navbar = () => {
    const {user} = useAuth()
  return (
    <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
        <p className="font-bold text-2xl">Welcome {user.name}</p>
        <button className="px-4 py-1 bg-teal-700 hover:bg-red-500 hover:cursor-pointer">Logout</button>
    </div>
  )
}

export default Navbar