import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./index.css"
const CardUser = (props) => {
  const navigate = useNavigate()
  return (
    <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 '>
      <div class=" p-2">
        <div class="card sizecard p-1">

          <div className='profile-div'>
            <img src={props.pro} className='profile-user' />
          </div>
          <div className='px-3 name pt-3'>
            <h6 className='f'>Full Name :</h6>
            <h6>{props.fullname}</h6>
          </div>

          <div className='px-3 name pt-3'>
            <h6 className='f'>Email Address :</h6>
            <h6>{props.email}</h6>
          </div>

          <div className='px-3 name pt-3'>
            <h6 className='f'>Contact Number : </h6>
            <h6>{props.num}</h6>
          </div>


          <div className='px-3 name pt-3'>
            <button  onClick={() => navigate(`/UserDetails/${props.uid}`)}>View</button>
          </div>


        </div>
      </div>
    </div>
  )
}

export default CardUser