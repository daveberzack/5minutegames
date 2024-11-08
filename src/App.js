import FavoriteGames from './components/FavoriteGames/FavoriteGames';
import OtherGames from './components/OtherGames/OtherGames';
import Login from './components/Login/Login';
import './App.css';
import EditScoreForm from './components/EditScoreForm/EditScoreForm';
import Signup from './components/Signup/Signup';
import Friends from './components/Friends/Friends';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        5Minute.Games
      </header>
      <FavoriteGames></FavoriteGames>
      <OtherGames></OtherGames>
      <EditScoreForm></EditScoreForm>
      <Login></Login>
      <Signup></Signup>
      <Friends></Friends>
    </div>
  );
}

export default App;
