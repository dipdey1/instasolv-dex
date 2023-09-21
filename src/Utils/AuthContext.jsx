import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DATABASE_ID_DEX, USERTABLE_DEX_COLLECTION_ID, account_dex, database_dex } from "../../appwriteConfigDex";
import { ID } from "appwrite";

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user,setUser] = useState(false)
    const [buttonSpin, setbuttonSpin] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        getUserOnLoad()
        
    },[])

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account_dex.get()
            setUser(accountDetails)
        } catch (error) {
            console.info(error.message)
        }
        setLoading(false)
    }

    const handleLogout = async() =>{
        try {
            await account_dex.deleteSession('current')
            setUser(null)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = async (e,loginCredentials) => {
        e.preventDefault()
        try {
        setbuttonSpin(true)
        const response = await account_dex.createEmailSession(loginCredentials.email, loginCredentials.password)
        const accountDetails = await account_dex.get()
        setUser(accountDetails)
        navigate('/home')
        } catch (error) {
           setError(error.message); 
           
        }
        setbuttonSpin(false)
        setLoading(false)
    }

    const handleRegister = async (e, registerDetails) => {
        e.preventDefault()
        setbuttonSpin(true)
        try {
            let response = await account_dex.create(ID.unique(), registerDetails.email, registerDetails.password, registerDetails.name )
            let dexObject = {
                userID: response.$id,
                name: response.name,
                email: response.email,
                phone: response.phone,
                userType: 'DEX',
                emailVerification: response.emailVerification,
                phoneVerification: response.phoneVerification,
                registrationDate: response.registration, 
                onboardingStatus: 'ongoing', 
            }
            let userTable = await database_dex.createDocument(DATABASE_ID_DEX, USERTABLE_DEX_COLLECTION_ID, ID.unique(), dexObject)
            await account_dex.createEmailSession(registerDetails.email, registerDetails.password)
            await account_dex.createVerification('http://localhost:5173/home')
            const accountDetails = await account_dex.get()
            setUser(accountDetails)
            navigate('/home')
        } catch (error) {
            setError(error.message)
        }
        setbuttonSpin(false)
        setLoading(false)
    }

    const contextData ={
        user,handleLogin,handleLogout, handleRegister, buttonSpin,error
    }


    return (<AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children }
    </AuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext