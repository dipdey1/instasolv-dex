import {useEffect, useState}from 'react'
import client_dex, { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX } from '../../../appwriteConfigDex'
import { useAuth } from '../../Utils/AuthContext'
import './DoubtBar.scss'

const DoubtBar = () => {
    const {user} = useAuth()
    const documentActiveDexID = user.$id
    const [routingID, setRoutingID] = useState(null)

  return (
    <>  
        <div className='test'>
            <h1>This is the Doubt Bar Of {user.name}</h1>
        </div>
        {user ? !routingID ? <h1>No Routing</h1>: <h1>current routing Doubt ID: {routingID}</h1> : <h1>you are active but there is no routing</h1> }
    </>
  )
}

export default DoubtBar