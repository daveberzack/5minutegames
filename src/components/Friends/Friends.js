import './Friends.css';
import { useState } from 'react';
import { useData } from '../../utils/DataContext';

function Friends() {

  const { userData, addFriend, removeFriend } = useData();

  const [newFriendName, setNewFriendName] = useState([]);

  const onClickRemove = (e)=> {
    const id = parseInt(e.target.dataset.id);
    removeFriend(id);
  }

  const onClickAdd = (e)=> {
    addFriend(newFriendName);
  }

  console.log("friends", userData?.friends)
  return (
    <section id="friends">
      <h2>Friends</h2>
      <ul id="friends-list">
        { userData?.friends?.map( f => {
          
          return <li key={f.id}>
            {f.username} 
            <button data-id={f.id} onClick={onClickRemove}>-</button>
          </li> 
        }) }
      </ul>

      <input 
          id="new-friend-name" 
          placeholder="username" 
          value={newFriendName} 
          onChange={(e)=>{ setNewFriendName(e.target.value) }}
      />
      <button onClick={onClickAdd}>Add Friend</button>
    </section>
  );
}

export default Friends;