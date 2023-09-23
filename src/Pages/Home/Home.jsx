import { useState, useEffect } from "react"
import DoubtBar from "../../Components/DoubtBar/DoubtBar"
import NavbarMenu from "../../Components/NavBar/Navbar"
import './Home.scss'
import client_dex, { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX } from "../../../appwriteConfigDex"
import { useAuth } from "../../Utils/AuthContext"


const Home = () => {

  const [routingStatus, setRoutingStatus] = useState(false)
  const [routingID, setRoutingID] = useState(null)
  const {activeDexID} = useAuth()

  useEffect(() => {
    const unsubscribe = client_dex.subscribe(`databases.${DATABASE_ID_DEX}.collections.${ACTIVE_DEX_COLLECTION_ID}.documents.${activeDexID}`, response =>{
        if(response.events.includes("databases.*.collections.*.documents.*.update")){
              if(response.payload.routingStatus === true){
                console.log()
                setRoutingStatus(true)
                setRoutingID(response.payload.doubtID)
            }
        }
    })
    return () => {
        unsubscribe()
    }
},[])
  return (
    <div className="body">
        <NavbarMenu routingStatus={routingStatus}/>

      <DoubtBar routingID={routingID}/>
    </div>
  )
}

export default Home