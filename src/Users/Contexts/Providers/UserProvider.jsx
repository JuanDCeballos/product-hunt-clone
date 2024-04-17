import { useState } from "react"
import { UserContext } from "../Context/UserContext.jsx"

export const UserProvider = ({ children }) => {

    const [User, SetUser] = useState();

    return (
        <UserContext.Provider value={{ User, SetUser }}>
            {children}
        </UserContext.Provider>
    );
};