import { useEffect, useState } from 'react'
import { useAuth } from '../../Utils/AuthContext'
import './DoubtBar.scss'
import client_dex, { ACTIVE_DEX_COLLECTION_ID, DATABASE_ID_DEX } from '../../../appwriteConfigDex'
import client_user, { DATABASE_ID_USER, DOUBT_COLLECTION_ID } from '../../../appwriteConfigUser'

const DoubtBar = () => {
    const {user,activeDexID,routingStatus} = useAuth()
    const [routingID, setRoutingID] = useState('')
    const [accepted, setAccepted] = useState(false)
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);
    const text = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem nulla fugit sapiente quaerat quo atque eum accusantium excepturi incidunt aperiam! Architecto veritatis dolores iste itaque autem quam animi saepe officia. Porro dolorum officia natus eos voluptates optio, eaque asperiores deserunt quae, quisquam veritatis magni aperiam fugit error eveniet nemo sit ducimus? Sapiente officiis, amet in nemo laudantium fugiat tempore nihil. A ab aperiam, molestias est impedit, repellat animi debitis adipisci cupiditate, aspernatur error officia unde ipsum aut officiis quasi accusantium voluptatum vitae sint. Earum fugiat dicta pariatur ipsum quaerat aperiam.'
    const maxLength = 400
    const truncatedText = isFullTextVisible ? text : text.slice(0, maxLength);

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

  const toggleFullText = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  return (
    <>
      {/* <div className='test'>
        <h1 style={{ color: 'black', textAlign: 'center' }}>Doubt Bar Of {user.name}</h1>
      </div>
      <div>
        {routingStatus ? <h3 style={{ textAlign: 'center' }}>You will receive doubts shortly...</h3> : <h3>You are currently not receiving doubts</h3>}
      </div>
      {routingID && !accepted ? <h1 style={{ color: 'black' }} >current routing Doubt ID: {routingID}</h1> : null} */}
      <div className='doubt-card'>
        <div className='lg-flex'>
          <div className='image'>
            <img src="https://blog.mystart.com/wp-content/uploads/shutterstock_124222435-e1521832609986.jpg" alt="" />
          </div>
          <div className='info'>
            <div className='chapter-subject'>
                <div className='chapter'><h3>Chapter Name</h3></div>
                <div className='subject-solution-type'><span className='subject-name'>Subject</span><span className='solution-type'>Live</span></div>
            </div>
            <div className='accept-pass'>
                <div><button className='accept'>Accept</button></div>
                <div><button className='pass'>Pass</button></div>
            </div>
          </div>
          <div className='description'>
              <p className='description-text'>{truncatedText} {text.length > maxLength && (
              <button onClick={toggleFullText} className='show-text'>
              {isFullTextVisible ? 'Show Less' : 'Show More'}
              </button>
                )}</p> 
              </div>
        </div>
      </div>
    </>
  )
}

export default DoubtBar