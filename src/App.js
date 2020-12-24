import './App.css';
import React, {useState , useEffect} from 'react';
import Post from './Post';
import { db,auth } from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {
  const classes = useStyles();
  const [modalStyle]=useState(getModalStyle);
                  const [posts, setPosts]= useState([]);
                  const [open,setOpen]= useState(false);
                  const [username,setUsername]= useState('');

                  const [password,setPassword]= useState('');

                  const [email,setEmail]= useState('');


      useEffect(() =>{
        db.collection('posts').onSnapshot(snapshot =>{
                setPosts(snapshot.docs.map((doc)=>({id:doc.id, post : doc.data()})))
        })
      },[]);
      const signUp = (event)=>{
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .catch((error)=>alert(error.message))
      }


  return (
    <div className="App">


<Modal
  open={open}
  onClose={()=>setOpen(false)}
  > 
  <div style={modalStyle} className={classes.paper}>
  <form className="app_signUp"><centre>
      <img className="app_headerImage"
           src=""
           alt=""/>

<input placeholder="username"
                  type="text"
                  value={username}
                  onChange={(e) =>setUsername(e.target.value)}
                  />

           <input placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) =>setEmail(e.target.value)}
                  />
           <input   placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) =>setPassword(e.target.value)}
                  />  

    <Button  type="submit"  onclick={signUp}>signup</Button>

               </centre></form>
  </div>

  
</Modal>

      
      {/* {Header} */}
      <div className="app__header">
        <img className="app__headerImage" 
        src="../insta.png"
        alt= " "
        />

       <Button onClick={()=>setOpen(true)}>sign up</Button>
      </div>
            { posts.map(({id,post})=>(
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
}





      {/* {Post} */}
      {/* {Post} */}
    </div>
  );
}

export default App;
