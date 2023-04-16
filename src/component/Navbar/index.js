import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./index.css"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);


const Navbar = (props) => {
    const navigate = useNavigate()
    const [uid, Setuid] = useState("")


    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                // navigate("/")
                Setuid(user.uid)
            } else {
                console.log(user.email)
            }
        } else {
            navigate("/Login")
        }
    })

    const Logout = () => {
        signOut(auth).then(() => {
            navigate("/Login")
        }).catch((error) => {
        });
    }

    return (

        <div>
            <section id="sidebar">
                <a className="brand">
                    <i className='bx bxs-smile'></i>
                    <span className="text">Admin Main</span>
                </a>
                <ul className="side-menu top">
                    <li className={props.home} onClick={() => navigate("/")}>
                        <a>
                            <i class="fa-solid fa-house p fa-lg"></i>
                            <span className="text">Home</span>
                        </a>
                    </li>
                    <li className={props.Approveduser} onClick={() => navigate("/Approveduser")}>
                        <a>
                            <i class="fa-solid fa-user-check fa-lg p"></i>
                            <span className="text">Approved Users</span>
                        </a>
                    </li>
                    <li className={props.Pendinguser} onClick={() => navigate("/Pendinguser")}>
                        <a>
                            <i class="fa-solid fa-user-clock fa-lg p"></i>
                            <span className="text">Pending Users</span>
                        </a>
                    </li>
                    <li className={props.Rejecteduser} onClick={() => navigate("/Rejecteduser")}>
                        <a>
                            <i class="fa-solid fa-user-slash fa-lg p"></i>
                            <span className="text">Rejected Users</span>
                        </a>
                    </li>
                    <li className={props.Approvedpost} onClick={() => navigate("/Approvedpost")}>
                        <a>
                            <i class="fa-sharp fa-solid fa-signs-post p fa-lg"></i>
                            <span className="text">Approved Post</span>
                        </a>
                    </li>
                    <li className={props.pendingpost} onClick={() => navigate("/Pendingpost")}>
                        <a>
                            <i class="fa-solid fa-clock-rotate-left fa-lg p" ></i>
                            <span className="text">Pending Post</span>
                        </a>
                    </li>
                    <li className={props.rejectedPost} onClick={() => navigate("/RejectedPost")}>
                        <a>
                            <i class='bx bx-block bx-sm p'></i>
                            <span className="text">Rejected Post</span>
                        </a>
                    </li>
                </ul>
                <ul className="side-menu">
                    <li>
                        <a className="logout">
                            <i class="fa-solid fa-right-from-bracket fa-rotate-180 p fa-lg"></i>
                            <span className="text" onClick={Logout}>Logout</span>
                        </a>
                    </li>
                </ul>
            </section>


            {/* TOP NAVBAR  */}
            <div className='navbar2'>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a className="brand">
                            <i className='bx bxs-smile'></i>
                            <span className="text">Admin Main</span>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="side-menu top mt-3">
                                <li className={props.home + " " + "nav-item p-3"}>
                                    <a class="nav-link" onClick={() => navigate("/")}>Home</a>
                                </li>
                                <li className={props.Approveduser + " " + "nav-item p-3"}>
                                    <a class="nav-link" onClick={() => navigate("/Approveduser")}>Approved User</a>
                                </li>
                                <li className={props.Pendinguser + " " + "nav-item p-3"}>
                                    <a class="nav-link" onClick={() => navigate("/Pendinguser")}>Pending User</a>
                                </li>
                                <li className={props.Rejecteduser + " " + "nav-item p-3"}>
                                    <a class="nav-link" onClick={() => navigate("/Rejecteduser")}>Rejected User</a>
                                </li>

                                <li className={props.Approvedpost + " " + "nav-item p-3"}>
                                    <a class="nav-link" onClick={() => navigate("/Approvedpost")}>Approved Post</a>
                                </li>
                                <li className={props.pendingpost + " " + "nav-item p-3"}>
                                    <a class="nav-link" onClick={() => navigate("/Pendingpost")}>Pending Post</a>
                                </li>
                                <li className={props.rejectedpost + " " + "nav-item p-3"}>
                                    <a class="nav-link" onClick={() => navigate("/Rejectedpost")}>Rejected Post</a>
                                </li>
                                <l className={"nav-item p-3"} i>
                                    <a className="logout">
                                        <span className="text" onClick={Logout}>Logout</span>
                                    </a>
                                </l>
                            </ul>

                        </div>
                    </div>
                </nav>
            </div >
        </div >
    )
}

export default Navbar