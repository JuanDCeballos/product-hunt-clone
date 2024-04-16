import { useContext } from "react"
import { UserContext } from "../../Users/Contexts/Context/UserContext.jsx"
import { Link } from "react-router-dom";

export const LogInComponent = () => {

    const { SetUser } = useContext(UserContext)

    const LogInUser = () => {
        SetUser({ "name": "JH de la cruz", "Logged": "True" });
    }

    return (
        <>

            <div className="flex justify-center mt-16 rounded-lg">
                <div className="flex flex-col drop-shadow-xl bg-slate-50 size-2/6 rounded-2xl">
                    <h2 className="mt-4 ml-16"> Name </h2>
                    <input className="w-3/4 ml-16 mt-1.5 rounded-full h-8 text-center border-0" type="text" />

                    <h2 className="mt-6 ml-16"> PassWord </h2>
                    <input className="w-3/4 rounded-full ml-16 mt-1.5 h-8 text-center " type="password" />

                    <Link to="/">
                        <button className="bg-gray-800 rounded-full mt-16 ml-16 mb-8 w-3/4 h-8 text-white"
                            onClick={LogInUser}>
                            Log In
                        </button>
                    </Link>
                </div>
            </div>

        </>
    )
}