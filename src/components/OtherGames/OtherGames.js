import './OtherGames.css';
import { useState, useEffect } from 'react';
import { useData } from '../../utils/DataContext';

function OtherGames() {

  const { userData, games, setPreferences, addFavorite } = useData();

  const [otherGames, setOtherGames] = useState([]);

  const showOtherGames = ()=> {
    setPreferences({showOtherGames:true});
  }
  const hideOtherGames = ()=> {
    setPreferences({showOtherGames:false});
  }
  const onClickFavorite = (e)=> {
    const id = parseInt(e.target.dataset.id);
    addFavorite(id);
  }

  useEffect(()=>{
        const og = games.filter( g => !userData?.favorites.includes(g.id) );
        setOtherGames(og);
  },[games, userData]);

  if (!userData || userData.preferences.showOtherGames) {
    return (
      <section id="other-games">
        <h2>Other Games<button onClick={hideOtherGames}>Hide</button></h2>
        <ul id="other-games-list">
          { otherGames?.map( f=> <li key={f.id}>{f.name} <button data-id={f.id} onClick={onClickFavorite}>+</button></li> ) }
        </ul>
      </section>
    );
  }
  else {
    return (
      <section id="other-games">
        <h2>Other Games Hidden<button onClick={showOtherGames}>Show</button></h2>
      </section>
    )
  }
  
}

export default OtherGames;