import './FavoriteGames.css';
import { useState, useEffect } from 'react';
import { useData } from '../../utils/DataContext';

function FavoriteGames() {

  const { userData, games, removeFavorite } = useData();

  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(()=>{
        const fg = userData?.favorites.map( favoriteId => {
            return games.find( g => g.id == favoriteId )
        });
        setFavoriteGames(fg);
  },[games, userData]);

  const onClickUnfavorite = (e)=> {
    const id = parseInt(e.target.dataset.id);
    removeFavorite(id);
  }

  return (
    <section id="favorite-games">
      <h2>Favorite Games</h2>
      <ul id="favorite-games-list">
        { favoriteGames?.map( f=> <li key={f.id}>{f.name} <button data-id={f.id} onClick={onClickUnfavorite}>-</button></li> ) }
      </ul>
    </section>
  );
}

export default FavoriteGames;