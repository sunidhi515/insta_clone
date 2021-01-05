import './App.css';
import React, {useState , useEffect} from 'react';
import Post from './Post';
import { db,auth } from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

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
                  const [openSignIn, setOpenSignIn] = useState(false);
                  const [email,setEmail]= useState('');
                  const [user,setUser]= useState(null);

         useEffect(()=> {   
             const unsubscribe = auth.onAuthStateChanged((authUser)=> {       //listens any time any change occurs and fires authUser
               if(authUser)      //if authUser is fired
               { setUser(authUser);     //user has logged in or authuser is the user

               }

   
               else
               { setUser(null);}  //user has logged out
             })
             return () =>{
               unsubscribe();     //perform some cleanup act before useEffect runs again if may be 10 users sign up
             }

         },[user,username]); //*


      useEffect(() =>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{       //so that the newly uploaded photo is put to the top
                setPosts(snapshot.docs.map((doc)=>({id:doc.id, post : doc.data()})))
        })
      },[]);
      const signUp = (event)=>{
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)  //for successful signup
        .then((authUser)=>{
        return   authUser.user.updateProfile({
            displayName : username
          })
        })
        .catch((error)=>alert(error.message))

        setOpen(false);
      }


      const signIn = (event)=>{
        event.preventDefault();
        auth
        .signInWithEmailAndPassword(email,password)
        .catch((error)=>alert(error.message));

        setOpenSignIn(false);
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

<Input placeholder="username"
                  type="text"
                  value={username}
                  onChange={(e) =>setUsername(e.target.value)}
                  />

           <Input placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) =>setEmail(e.target.value)}
                  />
           <Input   placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) =>setPassword(e.target.value)}
                  />  

    <Button  type="submit"  onClick={signUp}>signup</Button>

               </centre></form>
  </div>

  
</Modal>




<Modal
  open={openSignIn}
  onClose={()=>setOpenSignIn(false)}
  > 
  <div style={modalStyle} className={classes.paper}>
  <form className="app__signUp"><centre>
      <img className="app_headerImage"
           src=""
           alt=""/>



           <Input placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) =>setEmail(e.target.value)}
                  />
           <Input   placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) =>setPassword(e.target.value)}
                  />  

    <Button  type="submit"  onClick={signIn}>signin</Button>

               </centre></form>
  </div>

  
</Modal>


      
      {/* {Header} */}
      <div className="app__header">
        <img className="app__headerImage" 
        src="../insta.png"
        alt= " "
        />
 { user ? (<Button onClick={()=>auth.signOut()}>log out</Button>) : //to logout

( <div>
 <Button onClick={()=>setOpenSignIn(true)}>sign in</Button>
 <Button onClick={()=>setOpen(true)}>sign up</Button>
 </div> 
 )}
       
      </div>

         
           <div className="app_posts">
           { posts.map(({id,post})=>(
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
}
           </div>


{user?.displayName ? (
<ImageUpload username={user.displayName}/>) :
(<h3>sorry you need to login first</h3> )   }


      {/* {Post} */}
      {/* {Post} */}
    </div>
  );
}


<div>
  <InstagramEmbed
                      url='https://instagr.am/p/Zw9o4/'
                      clientAccessToken='123|456'
                      maxWidth={320}
                      hideCaption={false}
                      containerTagName='div'
                      protocol=''
                      injectScript
                      onLoading={() => {}}
                      onSuccess={() => {}}
                      onAfterRender={() => {}}
                      onFailure={() => {}}
         />
</div>

export default App;
