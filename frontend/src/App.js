
import Allroutes from './components/Allroutes';
import './App.css';
import Auth from './components/Auth';
import ResponsiveAppBar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
    <Allroutes/>
    </div>
  );
}

export default App;
