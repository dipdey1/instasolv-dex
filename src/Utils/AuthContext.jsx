import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX, DEX_DOUBTS_COLLECTION_ID, USERTABLE_DEX_COLLECTION_ID, account_dex, database_dex, storage_dex } from "../../appwriteConfigDex";
import { ID, Query } from "appwrite";
import { DATABASE_ID_USER, STORAGE_BUCKET_ID, USER_DOUBT_COLLECTION_ID, account_user, database_user, storage_user } from "../../appwriteConfigUser";

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user,setUser] = useState(false)
    const [buttonSpin, setbuttonSpin] = useState(false)
    const [error, setError] = useState(null)
    const [doubtIdOnLoad, setdoubtIdOnLoad] = useState(null)
    const [activeDexID, setActiveDexID] = useState('')
    const [routingStatus, setRoutingStatus] = useState(null)
    const [ongoingDoubtObject, setOngoingDoubtObject] = useState(null)
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
            setRoutingStatus(activeDexrouting.documents[0].routingStatus)
            setdoubtIdOnLoad(activeDexrouting.documents[0].doubtID)
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
            await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,dexDocumentID, {onlineStatus: false, routingStatus: false})
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
        await account_dex.createEmailSession(loginCredentials.email, loginCredentials.password)
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
            await database_dex.createDocument(DATABASE_ID_DEX, USERTABLE_DEX_COLLECTION_ID, ID.unique(), dexObject)
            await database_dex.createDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID, ID.unique(), activeDexObject)
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
        console.log(dexDocumentID);
        await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,dexDocumentID, {routingStatus: true})
        setRoutingStatus(true)

    }
    const handleRoutingOFF = async(e,userID) => {
        e.preventDefault()
        let response = await database_dex.listDocuments(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,[Query.equal('dexId', userID)])
        let dexDocumentID = response.documents[0].$id
        await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID,dexDocumentID, {routingStatus: false})
        setRoutingStatus(false)
    }

    const acceptDoubt = async(doubtId,doubt) => {
        let dexDoubtPayload = { 
            studentUserID: doubt.userId,
            dexUserID: user.$id,
            subject: doubt.subject,
            chapter: doubt.chapter,
            solutionType: doubt.solutionType,
            doubtID: doubt.$id,
            studentName: doubt.name,
            dexName: user.name,
            status: 'accepted',
            pictureID: doubt.pictureID
        }
        let acceptancePayload = {
            'status' : 'accepted', 
            'dexId': user.$id,
            'dexEmail': user.email,
            'dexName': user.name}
        let updatePayload = {'solvingStatus': true}
        await database_user.updateDocument(DATABASE_ID_USER, USER_DOUBT_COLLECTION_ID, doubtId, acceptancePayload)
        await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID, activeDexID, updatePayload)
        let response = await database_dex.createDocument(DATABASE_ID_DEX, DEX_DOUBTS_COLLECTION_ID, ID.unique(),dexDoubtPayload)
        let doubtImage = storage_user.getFilePreview(STORAGE_BUCKET_ID, response.pictureID)
        const ongoingDoubtObject = {
            info: response,
            image: doubtImage
        }
        setOngoingDoubtObject(ongoingDoubtObject)
    }
    const inactivity = () => {
        setRoutingStatus(false)
    }

    const getOngoingDoubtOnLoad = async () => {
        let response = await database_dex.listDocuments(DATABASE_ID_DEX, DEX_DOUBTS_COLLECTION_ID,[Query.equal('dexUserID',user.$id), Query.equal('status','accepted')])
        if(response.documents.length !== 0){
            let doubtImage = await storage_user.getFilePreview(STORAGE_BUCKET_ID, response.documents[0].pictureID)
        const ongoingDoubtObject = {
            info: response.documents[0],
            image: doubtImage
        }
        setOngoingDoubtObject(ongoingDoubtObject)
        console.log(ongoingDoubtObject)
        }else{
            setOngoingDoubtObject(null)
        }
        
    }

    const handleEndDoubt = async (doubtID, dexDocumentID) => {
        let responseOne = await database_dex.updateDocument(DATABASE_ID_DEX,DEX_DOUBTS_COLLECTION_ID, dexDocumentID, {status: 'Solved'})
        let responseTwo = await database_dex.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID, activeDexID, {'solvingStatus' : false})
        let responseThree = await database_user.updateDocument(DATABASE_ID_USER, USER_DOUBT_COLLECTION_ID, doubtID, {status: 'Solved'})
        setOngoingDoubtObject(null)
    }   

    const contextData ={
        user,handleLogin,handleLogout, handleRegister,
        buttonSpin,error,activeDexID,routingStatus, handleRoutingON, 
        handleRoutingOFF, acceptDoubt,doubtIdOnLoad, inactivity,getOngoingDoubtOnLoad,
        ongoingDoubtObject,handleEndDoubt
    }


    return (<AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children }
    </AuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext