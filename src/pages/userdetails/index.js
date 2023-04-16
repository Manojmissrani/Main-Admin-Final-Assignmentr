import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { Navbar } from '../../component';
import swal from 'sweetalert';
import "./index.css"
import loaderimg from "./../img/loader.webp"
import app from '../../config/firebase';
import { collection, query, where, getDocs, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc, deleteField, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const UserDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [user, setuser] = useState([]);
  const [Loader, setloader] = useState(true);


  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "==", params.id));
    const querySnapshot = getDocs(q);
    const a = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        setuser(users)
        setloader(false)
      });
    })
  }, [])

  const Approveuser = () => {
    swal({
      title: "Approve",
      text: "Are you sure you want to approve this user.",
      icon: "success",
      buttons: true,
      dangerMode: false,
    })
      .then((willapprove) => {
        if (willapprove) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          const washingtonRef = doc(db, "users", user[0].uid);
          updateDoc(washingtonRef, {
            stats: "Approved"
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });

  }
  const Rejecteduser = () => {
    swal({
      title: "Reject",
      text: "Are you sure you want to reject this user.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          const washingtonRef = doc(db, "users", user[0].uid);
          updateDoc(washingtonRef, {
            stats: "Rejected"
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }

  return (
    <div>
      {Loader ? <div className='loaderdiv'><img src={loaderimg} className='loaderimg' /> </div> :
        <div>  <Navbar />
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
            <main className='p-5 pt-0 vh-100 bgwhite'>
              <div className='user-main-div'>
                <div><img src={user[0].profile} /></div>
                <div className='p-5'>
                  <div className='px-3 userdetalsname name pt-3'>
                    <h6 className='f'>Full Name :</h6>
                    <h6>{user[0].firstname + " " + user[0].LastName}</h6>
                  </div>

                  <div className='px-3 userdetalsname name pt-3'>
                    <h6 className='f'>Email Address :</h6>
                    <h6>{user[0].Email}</h6>
                  </div>

                  <div className='px-3 userdetalsname name pt-3'>
                    <h6 className='f'>Contact Number :</h6>
                    <h6>{user[0].Mobilenumber}</h6>
                  </div>

                </div>
              </div>
              <div className='p-3 bx-shadow'>
                <div className='flex justify-content-between align-items-center'>
                  <h4>Status</h4>
                  {user[0].stats === "Approved" && <p className="bolder w-25 align-items-center Approved">{user[0].stats}</p>}
                  {user[0].stats === "Rejected" && <p className="bolder w-25 align-items-center Rejected">{user[0].stats}</p>}
                  {user[0].stats === "Pending" && <p className="bolder  w-25 align-items-center Pending">{user[0].stats}</p>}
                </div>
                {user[0].stats === "Pending" &&
                  <div className='button-edit-delete mt-3'>
                    <button className="edit" onClick={Approveuser}>Approved</button>
                    <button className="delete" onClick={Rejecteduser}>Rejected</button>
                  </div>
                }
              </div>


            </main>
          </section>
        </div>}

    </div>
  )
}

export default UserDetails