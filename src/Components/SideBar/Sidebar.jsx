import { useEffect } from 'react'
import { useAuth } from '../../Utils/AuthContext'
import './Sidebar.scss'
import { useDoubt } from '../../Utils/DoubtContext'

const Sidebar = () => {

  const {ongoingDoubtObject, getOngoingDoubtOnLoad, handleEndDoubt,handleJoinDoubtBack} = useDoubt()
  useEffect(() => {
      getOngoingDoubtOnLoad();
  },[])

  return (
    // <div className='parent-sidebar'>
    //   <div className='sidebar'>
    //     <div className='header'>
    //       <span className='header-name'>Active Doubts</span>
    //     </div>
    //     {ongoingDoubtObject !== null ? 
    //     <div className='active-doubt'>
    //       <div className='info'>
    //         <div className='doubtimg'>
    //           <img src="https://th.bing.com/th/id/OIP.2sA_t9fLcvDFMqNfjWhEkAHaE8?pid=ImgDet&rs=1" alt="" />
    //         </div>
    //         <div className='doubt-info'>
    //           <div className='chapter'><span>{ongoingDoubtObject.info.chapter}</span></div>
    //           <div className='subject'><span>{ongoingDoubtObject.info.subject}</span></div>
    //           <div className='solution-type'><span>{ongoingDoubtObject.info.solutionType}</span></div>
    //         </div>
    //       </div>
    //       <div className='doubt-btn'>
    //         <div className='btn-join'>Join</div>
    //         <div className='btn-end' onClick={() => handleEndDoubt(ongoingDoubtObject.info.doubtID ,ongoingDoubtObject.info.$id)}>End Doubt</div>
    //       </div>
    //     </div>
    //     : null}
    //   </div>
    // </div>
    <div className='parent-sidebar'>
    <div className='sidebar'>
      <div className='header'>
        <span className='header-name'>Active Doubts</span>
      </div>
      {ongoingDoubtObject !== null ? 
      <div className='active-doubt'>
        <div className='info'>
          <div className='doubtimg'>
            <img className='doubtimage' src={ongoingDoubtObject.image.href} alt="" />
          </div>
          <div className='doubt-info'>
            <div className='chapter'><span>{ongoingDoubtObject.info.chapter}</span></div>
            <div className='subject'><span>{ongoingDoubtObject.info.subject}</span></div>
            <div className='solution-type'><span>{ongoingDoubtObject.info.solutionType}</span></div>
          </div>
        </div>
        <div className='doubt-btn'>
          <div className='btn-join' onClick ={()=> handleJoinDoubtBack(ongoingDoubtObject.info.doubtID, ongoingDoubtObject.info.dexUserID, ongoingDoubtObject.info.dexName)}><span>Join</span></div>
          <div className='btn-end' onClick={() => handleEndDoubt(ongoingDoubtObject.info.doubtID ,ongoingDoubtObject.info.$id)}><span>End Doubt</span></div>
        </div>
      </div>
      : null}
    </div>
  </div>
  )
}

export default Sidebar