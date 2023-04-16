import React, { useEffect, useState } from 'react'
import { CardPost, CardUser, Navbar } from '../../component'
import "./index.css"
import { useNavigate } from "react-router-dom"
import loaderimg from "./../img/loader.webp"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const Home = () => {
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
                <div>  <Navbar home={"active"} Logout={Logout} />
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
                            {/* <ul class="box-info">
                        <li >
                            <i class="fa-solid fa-user-check approved h"></i>
                            <span class="text">
                                <h3>1020</h3>
                                <p>Approved Users</p>
                            </span>
                        </li>
                        <li>
                            <i class="fa-solid fa-user-clock pending h"></i>
                            <span class="text">
                                <h3>2834</h3>
                                <p>Pending Users</p>
                            </span>
                        </li>
                        <li>
                            <i class="fa-solid fa-user-slash rejected h fa-lg"></i>
                            <span class="text">
                                <h3>2834</h3>
                                <p>Rejected Users</p>
                            </span>
                        </li>
                        <li>
                            <i class="fa-sharp fa-solid fa-signs-post fa-lg approved h"></i>
                            <span class="text">
                                <h3>2834</h3>
                                <p>Approved Posts</p>
                            </span>
                        </li>
                        <li>
                            <i class="fa-solid fa-clock-rotate-left fa-lg pending h" ></i>
                            <span class="text">
                                <h3>2834</h3>
                                <p>Pending Posts</p>
                            </span>
                        </li>
                        <li>
                            <i class='bx bx-block bx-lg p rejected'></i>
                            <span class="text">
                                <h3>2834</h3>
                                <p>Rejected Posts</p>
                            </span>
                        </li>
                    </ul> */}
                            <h5>Pending Users</h5>

                            <div class="flex justify-content-between flex-wrap">
                                {user.map((v, i) => {
                                    if (v.stats === "Pending") {
                                        return (
                                            <CardUser uid={v.uid} fullname={v.firstname + " " + v.LastName} pro={v.profile} email={v.Email} num={v.Mobilenumber} stats={v.stats} date={v.date} />
                                        )
                                    }
                                })
                                }
                            </div>

                            <div class="flex justify-content-between flex-wrap">
                                {Blog.map((v, i) => {
                                    // console.log(v)
                                    if (v.stats === "Pending") {
                                        // console.log(v)
                                        return (
                                            <CardPost title={v.Title} url={v.url} des={v.Description} date={v.date} id={v.id} stats={v.stats} cat={v.Category} />
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

export default Home