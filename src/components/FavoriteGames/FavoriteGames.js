import './FavoriteGames.css';
import { useState, useEffect } from 'react';
import { useData } from '../../utils/DataContext';

function FavoriteGames() {

  const { userData, games, removeFavorite, setGameToEditPlay } = useData();

  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(()=>{
        let fg = userData?.favorites.map( favoriteId => {
            return games.find( g => g.id == favoriteId )
        });
        fg = fg || [];
        fg.forEach( game => {
          const myPlay = userData.todayPlays[game.id];
          game.scores = {
            me: myPlay
          };
        });
        
        setFavoriteGames(fg);
        
  },[games, userData]);

  const onClickUnfavorite = (e)=> {
    const id = parseInt(e.target.dataset.id);
    removeFavorite(id);
  }

  const onClickEditPlay = (e)=> {
    const id = parseInt(e.target.dataset.id);
    setGameToEditPlay(id);
  }

  return (
    <section id="favorite-games">
      <h2>Favorite Games</h2>
      <ul id="favorite-games-list">
        { favoriteGames?.map( f => {
          let myScore = <><button data-id={f.id} onClick={onClickEditPlay}>ADD</button></>;
          if ( f.scores?.me) myScore = <> --- {f.scores.me?.score} [{f.scores.me?.message}] <button data-id={f.id} onClick={onClickEditPlay}>EDIT</button></>;

          return <li key={f.id}>
            {f.name} 
            <button data-id={f.id} onClick={onClickUnfavorite}>-</button>
            {myScore}
          </li> 
        }) }
      </ul>
    </section>
  );
}

export default FavoriteGames;