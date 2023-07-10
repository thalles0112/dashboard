import './App.css';
import './headwind.css'
import { RouterProvider } from 'react-router';
import { authrouter, noauthrouter } from './components/routes';
import { useSelector } from 'react-redux';


function App() {
  const {isLogged} = useSelector(state=>state.auth)

  return (
    <div className="App">
      <RouterProvider router={isLogged?authrouter:noauthrouter}>
    </RouterProvider>
      
    </div>

  );
}

export default App;
