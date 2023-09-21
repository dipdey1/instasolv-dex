import {useEffect, useState}from 'react'
import client_dex, { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX } from '../../../appwriteConfigDex'

const DoubtBar = () => {
    const documentActiveDexID = '650851876b5b9f84fd00'
    const [status, setStatus] = useState(false)
    const [routingID, setRoutingID] = useState(null)

    useEffect(() => {
        setStatus(true)

        const unsubscribe = client_dex.subscribe(`databases.${DATABASE_ID_DEX}.collections.${ACTIVE_DEX_COLLECTION_ID}.documents.${documentActiveDexID}`, response =>{
            if(response.events.includes("databases.*.collections.*.documents.*.update")){
                if(response.payload.routingStatus === true){
                    setRoutingID(response.payload.doubtID)

                }else if(response.payload.routingStatus === false){
                    setRoutingID(null)
                }

            }
        })
        return () => {
            unsubscribe()
        }
    },[])



  return (
    <>  
        <div>
            <h1>This is the Doubt Bar Of Harshul</h1>
        </div>
        {status ? !routingID ? <h1>No Routing</h1>: <h1>current routing Doubt ID: {routingID}</h1> : <h1>you are active but there is no routing</h1> }
    </>
  )
}

export default DoubtBar