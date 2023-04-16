import React, { useState } from 'react'
import "./index.css"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);
const db = getFirestore(app);

const Login = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [message, setmessage] = useState("")
  const [messagetype, setmessagetype] = useState("")
  const Login = () => {
    if (email === "") {
      setmessage("Email Address Required!")
      setmessagetype("error")
      setTimeout(() => {
        setmessage("")
      }, 2000);
    }
    else if (email !== "dosit42787@hrisland.com") {
      setmessage("Email correct Required!")
      setmessagetype("error")
      setTimeout(() => {
        setmessage("")
      }, 2000);
    }
    else if (password === "") {
      setmessage("Password Required!")
      setmessagetype("error")
      setTimeout(() => {
        setmessage("")
      }, 2000);
    }
    else if (password !== "Manoj123!") {
      setmessage("Password Required!")
      setmessagetype("error")
      setTimeout(() => {
        setmessage("")
      }, 2000);
    } else {
      signInWithEmailAndPassword(
        auth,
        email,
        password
      ).then((e) => {
        setmessage("Succeccful")
        setmessagetype("Succeccful")
        setTimeout(() => {
          navigate("/")
          setmessage("")
        }, 2000);
      }
      ).catch((error) => {
        setmessage(error.message)
        setmessagetype("error")
        setTimeout(() => {
          setmessage("")
        }, 2000);
      })
    }
  }
  return (
    <section class="container">
      <section class="row align-items-center bgcolorlogin justify-content-center">
        <section class="col-12 col-md-9 col-md-7 col-lg-4">
          <div class="form-container">
            <div class="form-group">
              <h4 class="text-center font-weight-bold"> Login </h4>
              <label for="InputEmail1" className='mt-3'>Email Address</label>
              <input type="email" value={email} onChange={(e) => { setemail(e.target.value) }} class="form-control" id="InputEmail1" aria-describeby="emailHelp" placeholder="Enter Email Address" />
            </div>
            <div class="form-group mt-3">
              <label for="InputPassword1">Password</label>
              <input type="password" class="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} id="InputPassword1" placeholder="Password" />
            </div>
            <p style={{ color: messagetype === "error" ? "red" : "green" }} className='mt-3'>{message}</p>
            <button class="btn w-100 mt-4 btn-primary btn-block" onClick={Login}>Login</button>
          </div>
        </section>
      </section>
    </section>
  )
}

export default Login