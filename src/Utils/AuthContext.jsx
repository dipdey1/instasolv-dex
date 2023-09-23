import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX, USERTABLE_DEX_COLLECTION_ID, account_dex, database_dex } from "../../appwriteConfigDex";
import { ID, Query } from "appwrite";

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user,setUser] = useState(false)
    const [buttonSpin, setbuttonSpin] = useState(false)
    const [error, setError] = useState(null)
    const [activeDexID, setActiveDexID] = useState('')
    const [routingStatus, setRoutingStatus] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        getUserOnLoad()
        
    },[])

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account_dex.get()
            setUser(accountDetails)
            let activeDexrouting = await database_dex.listDocuments(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexId', accountDetails.$id)])
            setActiveDexID(activeDexrouting.documents[0].$id)
            console.log(activeDexrouting.documents[0].$id);
            console.log(activeDexrouting.documents[0].routingStatus);
            setRoutingStatus(activeDexrouting.documents[0].routingStatus)
        } catch (error) {
            console.info(error.message)
        }
        setLoading(false)
    }

    const handleLogout = async() =>{
        try {
            const dexIdString = user.$id
            setbuttonSpin(true)
            let response = await database_dex.listDocuments(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexId', dexIdString)])
            let dexDocumentID = response.documents[0].$id
            let activeDexrouting = await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,dexDocumentID, {onlineStatus: false, routingStatus: false})
            await account_dex.deleteSession('current')
            setUser(null)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
        setbuttonSpin(false)
        setLoading(false)
    }

    const handleLogin = async (e,loginCredentials) => {
        e.preventDefault()
        try {
        setbuttonSpin(true)
        const response = await account_dex.createEmailSession(loginCredentials.email, loginCredentials.password)
        const accountDetails = await account_dex.get()
        setUser(accountDetails)
        let activeDexrouting = await database_dex.listDocuments(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexId', accountDetails.$id)])
        await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,activeDexrouting.documents[0].$id, {onlineStatus: true})
        setActiveDexID(activeDexrouting.documents[0].$id)
        setRoutingStatus(activeDexrouting.documents[0].routingStatus)
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
            let activeDexObject = {
                dexId: response.$id,
                dexName: response.name,
                dexSpeciality: 'Physics',
                score: 50,
                onlineStatus: true,
                solvingStatus: false,
                onboardingStatus: false,
                routingStatus: false, 
            }
            let userTable = await database_dex.createDocument(DATABASE_ID_DEX, USERTABLE_DEX_COLLECTION_ID, ID.unique(), dexObject)
            let activeDex = await database_dex.createDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID, ID.unique(), activeDexObject)
            await account_dex.createEmailSession(registerDetails.email, registerDetails.password)
            await account_dex.createVerification('http://localhost:5173/home')
            const accountDetails = await account_dex.get()
            setUser(accountDetails)
            let activeDexrouting = await database_dex.listDocuments(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexId', accountDetails.$id)])
            setActiveDexID(activeDexrouting.documents[0].$id)
            navigate('/home')
        } catch (error) {
            setError(error.message)
        }
        setbuttonSpin(false)
        setLoading(false)
    }
    const handleRoutingON = async(e,userID) => {
        e.preventDefault()
        let response = await database_dex.listDocuments(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexId', userID)])
        let dexDocumentID = response.documents[0].$id
        let activeDex = await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,dexDocumentID, {routingStatus: true})
        setRoutingStatus(true)

    }
    const handleRoutingOFF = async(e,userID) => {
        e.preventDefault()
        let response = await database_dex.listDocuments(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexId', userID)])
        let dexDocumentID = response.documents[0].$id
        console.log(dexDocumentID);
        let activeDex = await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,dexDocumentID, {routingStatus: false})
        setRoutingStatus(false)
    }

    const contextData ={
        user,handleLogin,handleLogout, handleRegister, buttonSpin,error,activeDexID,routingStatus, handleRoutingON, handleRoutingOFF
    }


    return (<AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children }
    </AuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext