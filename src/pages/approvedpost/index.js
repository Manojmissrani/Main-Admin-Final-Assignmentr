import React, { useEffect, useState } from 'react'
import { CardPost, Navbar } from '../../component'
// import "./index.css"
import { useNavigate } from "react-router-dom"
import loaderimg from "./../img/loader.webp"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const Approvedpost = () => {
  const navigate = useNavigate()
  const [Blog, SetBlog] = useState([])
  const [userdata, Setuser] = useState()
  const [Loader, setloader] = useState(true)
  const [uid, Setuid] = useState("")

  onAuthStateChanged(auth, (user) => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        users.map((v, i) => {
          if (v.uid === uid) {
            Setuser(v)
          }
        })
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
        <div>  <Navbar Approvedpost={"active"} Logout={Logout} />
          <section id="content">
            <nav>
\              <a className="nav-link">Categories</a>
              <form action="#">
                <div className="form-input">
                  <input type="search" placeholder="Search..." />
                  <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                </div>
              </form>
            </nav>

            <main>
              <div class="flex justify-content-between flex-wrap">

                {Blog.map((v, i) => {
                  console.log(v)
                  if (v.stats === "Approved") {
                    console.log(v)
                    return (
                      <CardPost title={v.Title} url={v.url} des={v.Description} date={v.date} id={v.id} stats={v.stats} cat={v.Category} />
                    )
                  }
                })}
              </div>
            </main>
          </section>
        </div>}

    </div>
  )
}

export default Approvedpost