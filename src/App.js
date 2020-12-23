import './App.css';
import React, {useState , useEffect} from 'react';
import Post from './Post';
import { db } from './firebase';
function App() {
                  const [posts, setPosts]= useState([]);

      useEffect(() =>{
        db.collection('posts').onSnapshot(snapshot =>{
                setPosts(snapshot.docs.map((doc)=>({id:doc.id, post : doc.data()})))
        })
      },[]);


  return (
    <div className="App">
      {/* {Header} */}
      <div className="app__header">
        <img className="app__headerImage" 
        src="../insta.png"
        alt= " "
        />

       
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
