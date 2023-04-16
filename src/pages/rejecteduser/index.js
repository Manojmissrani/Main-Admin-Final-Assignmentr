import React, { useEffect, useState } from 'react'
import { CardPost, CardUser, Navbar } from '../../component'
import { useNavigate } from "react-router-dom"
import loaderimg from "./../img/loader.webp"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const Rejecteduser = () => {
    const navigate = useNavigate()
    const [Blog, SetBlog] = useState([])
    const [user, Setuser] = useState()
    const [Loader, setloader] = useState(true)
    const [uid, Setuid] = useState("")

    onAuthStateChanged(auth, (user) => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
                Setuser(users)

            });
        });
    }
    )

    useEffect(() => {
        onAuthStateChanged(auth, (blog) => {
            const q = query(collection(db, "Blogs"));
            const a = onSnapshot(q, (querySnapshot) => {
                const blog = [];
                querySnapshot.forEach((doc) => {
                    blog.push(doc.data());
                    setTimeout(() => {
                        setloader(false)
                    }, 3000);
                    SetBlog(blog)
                });
            });
        })
    }, [])

    const Logout = () => {
        signOut(auth).then(() => {
            navigate("/Login")
        }).catch((error) => {
        });
    }
    return (
        <div>
            {Loader ? <div className='loaderdiv'><img src={loaderimg} className='loaderimg' /> </div> :
                <div>  <Navbar Rejecteduser={"active"} Logout={Logout} />
                    <section id="content">
                        <nav>
                            {/* <i className='bx bx-menu' ></i> */}
                            <a className="nav-link">Categories</a>
                            <form action="#">
                                <div className="form-input">
                                    <input type="search" placeholder="Search..." />
                                    <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                                </div>
                            </form>
                        </nav>

                        <main>
                            <div class="flex justify-content-between flex-wrap">
                                {user.map((v, i) => {
                                    if (v.stats === "Rejected") {
                                        return (
                                            <CardUser uid={v.uid} fullname={v.firstname + " " + v.LastName} pro={v.profile} email={v.Email} num={v.Mobilenumber} stats={v.stats} date={v.date} />
                                        )
                                    }
                                })
                                }
                            </div>
                        </main>
                    </section>
                </div>}

        </div>
    )
}

export default Rejecteduser