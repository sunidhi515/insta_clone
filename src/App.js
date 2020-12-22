import './App.css';
import React, {useState} from 'react';
import Post from './Post';
function App() {
                  const [posts, setPosts]= useState([
                   { username:"sunidhi",
                    caption:"hey" ,
                    imageUrl:"../sunset.jpg"
                  },
                  {username:"riteek" ,
                  caption:" i m poop",
                  
                imageUrl:"../riteek.jpg"
              },
              {username:"riteek" ,
              caption:" i m poop",
              
            imageUrl:"../sunset.jpg"
          },
          {username:"riteek" ,
          caption:" i m poop",
          
        imageUrl:"../sunset.jpg"
      }
                  ]);

  return (
    <div className="App">
      {/* {Header} */}
      <div className="app__header">
        <img className="app__headerImage" 
        src="../insta.png"
        alt= " "
        />

       
      </div>
            { posts.map(post=>(
                <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
}





      {/* {Post} */}
      {/* {Post} */}
    </div>
  );
}

export default App;
