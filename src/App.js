import './App.css';
import Header from './components/ui/header';
import Pedidos from './components/pedidos';
import { Chart as ChartJS } from "chart.js/auto";


function App() {
  return (
    <div className="App">
      
      <Header/>
      
      <Pedidos/>
    </div>
  );
}

export default App;
