
import {useEffect, useState} from 'react';
import { signInWithGoogle, signOutUser, loadData } from './utils/firebase';
import FavoriteGames from './components/FavoriteGames/FavoriteGames';
import OtherGames from './components/OtherGames/OtherGames';
import Login from './components/Login/Login';
import './App.css';
import { games } from './games';

function App() {

  const today = new Date().toISOString().split("T")[0];

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [todayPlays, setTodayPlays] = useState({});
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect( ()=> {
      loadUserData();
  },[isUserLoaded]);

  const loadUserData = async () => {
    const userData = await loadData(today);
    setFavoriteIds( userData.favorites );
    setPreferences( userData.preferences );
    setTodayPlays( userData.todayPlays );
  };

  const favoriteGames = favoriteIds?.map( id => {
      return games.find( g => g.id == id )
  });
  return (
    <div className="App">
      <header className="App-header">
        5Minute.Games
      </header>
      <Login setIsUserLoaded={setIsUserLoaded}></Login>
      <FavoriteGames></FavoriteGames>
      <OtherGames></OtherGames>
    </div>
  );
}

export default App;
