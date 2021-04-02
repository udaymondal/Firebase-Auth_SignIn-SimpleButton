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

  const handleSignOut = () => {
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
  const handleSubmit = () =>{

  }
  const handleBlur = (e) =>{
    console.log(e.target.name,e.target.value);
    if(e.target.name === 'email'){
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isEmailValid);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      console.log(isPasswordValid && passwordHasNumber);
    }
  }
  return (
    <div className="App">
      <h3>Firebase Authentication</h3>
      <p>using google</p><br /><br />
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

      <h1>Our own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input onBlur={handleBlur} name="email" type="text" placeholder='Your Email Address' required />
        <br />
        <input onBlur={handleBlur} type="password" name="password" id="" placeholder='Password' required />
        <br />
        <input type="submit" value="Submit"/>
      </form>

    </div>
  );
}

export default App;
