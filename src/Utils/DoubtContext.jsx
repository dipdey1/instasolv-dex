import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { DATABASE_ID_USER, STORAGE_BUCKET_ID, TOKEN_FUNCTION, USER_DOUBTS_COLLECTION_ID, database_user, function_user, storage_user } from "../../appwriteConfigUser";
import { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX, DEX_DOUBTS_COLLECTION_ID, TOKEN_SERVER, database_dex, function_dex } from "../../appwriteConfigDex";
import { Functions, ID, Query } from "appwrite";
import { useNavigate } from "react-router-dom";

const DoubtContext = React.createContext(null)

export const DoubtProvider = (props) => {
    const {user, activeDexID} = useAuth()
    const [ongoingDoubtObject, setOngoingDoubtObject] = useState(null)
    const [zegoObject, setZegoObject] = useState({})
    const [agoraObject, setAgoraObject] = useState({})
    const navigate = useNavigate()

    const acceptDoubt = async (doubtId,doubt) => {
        try {
            
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
        await database_user.updateDocument(DATABASE_ID_USER, USER_DOUBTS_COLLECTION_ID, doubtId, acceptancePayload)
        await database_dex.updateDocument(DATABASE_ID_DEX, ACTIVE_DEX_COLLECTION_ID, activeDexID, updatePayload)

        let response = await database_dex.createDocument(DATABASE_ID_DEX, DEX_DOUBTS_COLLECTION_ID, ID.unique(),dexDoubtPayload)
        let doubtImage = storage_user.getFilePreview(STORAGE_BUCKET_ID, response.pictureID)
        const ongoingDoubtObject = {
            info: response,
            image: doubtImage
        }
        setOngoingDoubtObject(ongoingDoubtObject)
        let max32 = Math.pow(2, 32) - 1 
        var uid = Math.floor(Math.random() * max32)
        let tokenjson = {
            channelName : doubt.$id,
            uid: uid,
            role: 'publisher',
            expiryTime : 3600,
        }
        try {
            const executionData = await function_dex.createExecution(TOKEN_SERVER, JSON.stringify(tokenjson), false, '/', 'GET' ,{})
            const tokenJson = JSON.parse(executionData.responseBody)
            console.log(tokenJson);
            setAgoraObject({
                channelName: doubt.$id,
                token: tokenJson.token,
                uid: uid
            })
            navigate(`/room/${doubt.$id}`)
        } catch (error) {
            console.log(error.message);
        }
        // setZegoObject({
        //     roomID: doubt.$id,
        //     userID: user.$id,
        //     username: user.name
        // })
        } catch (error) {
            console.log(error.message);
        }
    }
    const getOngoingDoubtOnLoad = async () => {
        try {
        let response = await database_dex.listDocuments(DATABASE_ID_DEX, DEX_DOUBTS_COLLECTION_ID,[Query.equal('dexUserID',user.$id), Query.equal('status','accepted')])
        console.log(response)
        if(response.documents.length !== 0){
            let doubtImage = storage_user.getFilePreview(STORAGE_BUCKET_ID, response.documents[0].pictureID)
                const ongoingDoubtObject = {
                info: response.documents[0],
                image: doubtImage
                }
            setOngoingDoubtObject(ongoingDoubtObject)
        }else{
            setOngoingDoubtObject(null)
        }
        } catch (error) {
            
        }
    }
    const handleJoinDoubtBack = (roomID, userID, name) => {
        // setZegoObject({
        //     roomID: roomID,
        //     userID: userID,
        //     username: name
        // })
        // navigate(`/room/${roomID}`)
    }

    const handleEndDoubt = async (doubtID, dexDocumentID) => {
        setOngoingDoubtObject(null)
        setZegoObject({})
        let responseOne = await database_dex.updateDocument(DATABASE_ID_DEX,DEX_DOUBTS_COLLECTION_ID, dexDocumentID, {status: 'Solved'})
        let responseTwo = await database_dex.updateDocument(DATABASE_ID_DEX,ACTIVE_DEX_COLLECTION_ID, activeDexID, {'solvingStatus' : false})
        let responseThree = await database_user.updateDocument(DATABASE_ID_USER, USER_DOUBTS_COLLECTION_ID, doubtID, {status: 'Solved'})
        navigate("/home")
    }  

    const contextData = {ongoingDoubtObject, acceptDoubt, getOngoingDoubtOnLoad, zegoObject, handleJoinDoubtBack, handleEndDoubt,agoraObject}
    return (
    <DoubtContext.Provider value={contextData}>
        {props.children}
    </DoubtContext.Provider>
    )
}
export const useDoubt = () => {
    return(
        React.useContext(DoubtContext)
    )
}