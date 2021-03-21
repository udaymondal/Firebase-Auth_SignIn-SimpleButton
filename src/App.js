import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        // console.log(displayName, email, photoURL);
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleSignOut = () =>{
    firebase.auth().signOut().then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: ""
      }
      setUser(signedOutUser);
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="App">
      <h3>Firebase Authentication</h3>
      <p>using google</p><br/><br/>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign-out</button> : <button onClick={handleSignIn}>Sign-in</button>
      }

      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
