import FavoriteGames from './components/FavoriteGames/FavoriteGames';
import OtherGames from './components/OtherGames/OtherGames';
import Login from './components/Login/Login';
import './App.css';
import EditScoreForm from './components/EditScoreForm/EditScoreForm';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        5Minute.Games
      </header>
      <Login></Login>
      <FavoriteGames></FavoriteGames>
      <OtherGames></OtherGames>
      <EditScoreForm></EditScoreForm>
    </div>
  );
}

export default App;
