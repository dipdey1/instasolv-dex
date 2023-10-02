import { useEffect, useState } from 'react'
import { useAuth } from '../../Utils/AuthContext'
import './DoubtBar.scss'
import client_dex, { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX } from '../../../appwriteConfigDex'
import client_user, { DATABASE_ID_USER, STORAGE_BUCKET_ID, USER_DOUBTS_COLLECTION_ID, database_user, storage_user } from '../../../appwriteConfigUser'

const DoubtBar = () => {
    const {activeDexID, acceptDoubt, doubtIdOnLoad} = useAuth()
    const [routingID, setRoutingID] = useState(null)
    const [accepted, setAccepted] = useState(false)
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);
    const [doubt, setDoubt] = useState({
      body: ''
    })
    const [doubtImage, setDoubtImage] = useState({
      href:''
    })
    const maxLength = 400
    const truncatedText = isFullTextVisible ? doubt.body :  doubt.body.slice(0, maxLength);
  
  useEffect(() => {
    if(doubtIdOnLoad !== null){
      routingDoubt(doubtIdOnLoad)
      setRoutingID(doubtIdOnLoad)
    }
  },[doubtIdOnLoad])
  

  useEffect(() => {
      const unsubscribe = client_dex.subscribe(`databases.${DATABASE_ID_DEX}.collections.${ACTIVE_DEX_COLLECTION_ID}.documents.${activeDexID}`, response =>{
          if(response.events.includes("databases.*.collections.*.documents.*.update")){
                if(response.payload.routingStatus === true && response.payload.solvingStatus === false){
                  setAccepted(false)
                  setRoutingID(response.payload.doubtID)
                  const doubtID = response.payload.doubtID
                  routingDoubt(doubtID)
              }
            }})
      return () => {unsubscribe()}
  },[activeDexID])

  useEffect(() => {
    const unsubscribe = client_user.subscribe(`databases.${DATABASE_ID_USER}.collections.${USER_DOUBTS_COLLECTION_ID}.documents.${routingID}`, response =>{
        if(response.events.includes("databases.*.collections.*.documents.*.update")){
              if(response.payload.status === 'accepted'){
                console.log(
                  routingID
                );
              setAccepted(true)
            }
          }
        })
    return () => {unsubscribe()}
  },[routingID])

  const toggleFullText = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  const routingDoubt = async (doubtID) => {
    try {
      let response = await database_user.getDocument(DATABASE_ID_USER, USER_DOUBTS_COLLECTION_ID, doubtID)
      setDoubt(response)
      let doubtImage = storage_user.getFilePreview(STORAGE_BUCKET_ID, response.pictureID)
      setDoubtImage(doubtImage)
    } catch (error) {
      console.log(error.message);
    } 
}


  return (
    <>
     {(routingID) && !accepted ? 
      <div className='doubt-card'>
        <div className='lg-flex'>
          <div className='image'>
            <img src={doubtImage.href} alt="" />
          </div>
          <div className='info'>
            <div className='chapter-subject'>
                <div className='chapter'><h3>{doubt.chapter}</h3></div>
                <div className='subject-solution-type'><span className='subject-name'>{doubt.subject}</span><span className='solution-type'>Live</span></div>
            </div>
            <div className='accept-pass'>
                <div><button className='accept' onClick={() => acceptDoubt(routingID, doubt)}>Accept</button></div>
                <div><button className='pass'>Pass</button></div>
            </div>
          </div>
          <div className='description'>
              <p className='description-text'>{truncatedText} {doubt.body.length > maxLength && (
              <button onClick={toggleFullText} className='show-text'>
              {isFullTextVisible ? 'Show Less' : 'Show More'}
              </button>
                )}</p> 
              </div>
        </div>
      </div>
       : null}
    </>
  )
}

export default DoubtBar