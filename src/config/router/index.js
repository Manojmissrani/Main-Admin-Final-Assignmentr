import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Approvedpost, Approveduser, Home, Pendingpost, Pendinguser, UserDetails, PostDetails, RejectedPost, Rejecteduser, Login } from '../../pages'
const RouterNavigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Approvedpost' element={<Approvedpost />} />
                <Route path='/Approveduser' element={<Approveduser />} />
                <Route path='/Pendingpost' element={<Pendingpost />} />
                <Route path='/Pendinguser' element={<Pendinguser />} />
                <Route path='/RejectedPost' element={<RejectedPost />} />
                <Route path='/Rejecteduser' element={<Rejecteduser />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/PostDetails/:id' element={<PostDetails />} />
                <Route path='/UserDetails/:id' element={<UserDetails />} />
            </Routes>
        </BrowserRouter>
    )
}
export default RouterNavigation