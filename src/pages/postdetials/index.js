import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./index.css"
import { Navbar } from '../../component';
import swal from 'sweetalert';
import loaderimg from "./../img/loader.webp"
import app from '../../config/firebase';
import { collection, query, where, getDocs, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc, deleteField, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);
const PostDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [Blog, setBlog] = useState([])
  const [Loader, setloader] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "Blogs"), where("id", "==", params.id));
    const querySnapshot = getDocs(q);
    const a = onSnapshot(q, (querySnapshot) => {
      const Blogs = [];
      querySnapshot.forEach((doc) => {
        Blogs.push(doc.data());
        setBlog(Blogs)
        setloader(false)
      });
    })
  }, [])

  const Rejected = () => {
    swal({
      title: "Reject",
      text: "Are you sure you want to reject this post.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          const washingtonRef = doc(db, "Blogs", Blog[0].id);
          updateDoc(washingtonRef, {
            stats: "Rejected"
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });

  }
  const Approved = () => {
    swal({
      title: "Approve",
      text: "Are you sure you want to approve this post.",
      icon: "success",
      buttons: true,
      dangerMode: false,
    })
      .then((willapprove) => {
        if (willapprove) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          const washingtonRef = doc(db, "Blogs", Blog[0].id);
          updateDoc(washingtonRef, {
            stats: "Approved"
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }
  return (
    <div>
      <Navbar />
      <section id="content">
        <nav>
          <a className="nav-link">Categories</a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
            </div>
          </form>
        </nav>
        <div className="row align-items-center " >
          {Loader ?
            <div className='loaderdiv'><img src={loaderimg} className='loaderimg' /> </div> :
            Blog.map((v, i) => {
              return (
                <div className="pending-post mb-1">
                  <img src={v.url} className="post-details-img mb-5" />

                  <div className="stats-post pb-3">
                    <p className="bolder">Status</p>
                    <div className="stats-div">
                      {v.stats === "Approved" && <p className="bolder Approved">{v.stats}</p>}
                      {v.stats === "Rejected" && <p className="bolder Rejected">{v.stats}</p>}
                      {v.stats === "Pending" && <p className="bolder Pending">{v.stats}</p>}
                    </div>
                  </div>

                  <div className="stats-post pb-3">
                    <p className="bolder">Selected Category</p>
                    <p className="bolder">{v.Category}</p>
                  </div>

                  {v.stats === "Pending" &&
                    <div className="button-edit-delete p-3 pt-0">
                      <button className="edit" onClick={Approved}>Approved</button>
                      <button className="delete" onClick={Rejected}>Rejected</button>
                    </div>
                  }
                  <div className="pt-3 p-2 border-title-des">
                    <h4 className="mb-3 color">{v.Title}</h4>
                    <h6>{v.Description}</h6>
                  </div>
                </div>)
            })}
        </div>
      </section>

    </div>
  )
}

export default PostDetails
