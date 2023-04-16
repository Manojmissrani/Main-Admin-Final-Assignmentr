import React from 'react'
import "./index.css"

import { useNavigate } from 'react-router-dom'
const CardPost = (props) => {
  const navigate = useNavigate()
  return (
    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 '>
      <div class=" p-2">
        <div class="card sizecard" onClick={()=> navigate(`/PostDetails/${props.id}`)}>
          <img src={props.url} className="card-img-top img-post" />
          <div class="card-body">
            <h6 class="card-title">{props.title.slice(0, 20) + "..."}</h6>
            <p class="card-text">{props.des.slice(0, 30) + "..."}</p>

            <div className='mt-3  flex justify-content-between align-items-center'>
              <h6>Category</h6>
              <h6>{props.cat}</h6>
            </div>
            <div className='mt-3  flex justify-content-between align-items-center'>
              <h6>Status</h6>
              {props.stats === "Pending" && <h6 className='Pending'>{props.stats}</h6>}
              {props.stats === "Approved" && <h6 className='Approved'>{props.stats}</h6>}
              {props.stats === "Rejected" && <h6 className='Rejected'>{props.stats}</h6>}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="card col-12 col-sm-12 col-md-6 col-lg-4" >
    //   <img src={props.url} className="card-img-top img-post" />
    //   <div className="card-body">
    //     <p>{props.date}</p>
    //     <h5>{props.title.slice(0, 20) + "..."}</h5>
    //     <p className="card-text">{props.des.slice(0, 30)}</p>

    //     <div className='flex justify-content-between mt-2'>
    //       <h5>Category</h5>
    //       <h5>{props.cat}</h5>
    //     </div>
    //   </div>

    // </div>
  )
}

export default CardPost

