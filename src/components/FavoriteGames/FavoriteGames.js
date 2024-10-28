import './FavoriteGames.css';

function FavoriteGames({favorites}) {
  return (
    <section id="favorite-games">
      <h2>Favorite Games</h2>
      <ul id="favorite-games-list">
        { favorites?.map( f=> <li key={f.id}>{f.name}</li> ) }
      </ul>
    </section>
  );
}

export default FavoriteGames;