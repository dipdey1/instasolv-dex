import { useEffect, useState } from 'react'
import { useAuth } from '../../Utils/AuthContext'
import './DoubtBar.scss'
import client_dex, { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX, USERTABLE_DEX_COLLECTION_ID, account_dex } from '../../../appwriteConfigDex'
import client_user, { DATABASE_ID_USER, DOUBT_COLLECTION_ID } from '../../../appwriteConfigUser'

const DoubtBar = () => {
    const {user,activeDexID} = useAuth()
    const [routingID, setRoutingID] = useState('')
    const [accepted, setAccepted] = useState(false)

  useEffect(() => {
      const unsubscribe = client_dex.subscribe(`databases.${DATABASE_ID_DEX}.collections.${ACTIVE_DEX_COLLECTION_ID}.documents.${activeDexID}`, response =>{
          if(response.events.includes("databases.*.collections.*.documents.*.update")){
                if(response.payload.routingStatus === true){
                  setRoutingID(response.payload.doubtID)
              }}})
      return () => {unsubscribe()}
  },[])

  useEffect(() => {
    const unsubscribe = client_user.subscribe(`databases.${DATABASE_ID_USER}.collections.${DOUBT_COLLECTION_ID}.documents.${routingID}`, response =>{
        if(response.events.includes("databases.*.collections.*.documents.*.update")){
              if(response.payload.status === 'accepted'){
              setAccepted(true)
            }
            
          }})
    return () => {unsubscribe()}
  },[])

  return (
    <>  
        <div className='test'>
            <h1>This is the Doubt Bar Of {user.name}</h1>
        </div>
        {routingID && !accepted ? <h1 style={{color:'white'}} >current routing Doubt ID: {routingID}</h1> : <h1 style={{color:'white'}}>No Routing</h1>}
    </>
  )
}

export default DoubtBar