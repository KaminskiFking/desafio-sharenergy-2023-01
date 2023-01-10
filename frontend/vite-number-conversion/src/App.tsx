import { Route, Routes } from 'react-router-dom';
import './App.css'
import ReactProvider from './context/ReactProvider';
import CatPage from './pages/CatPage';
import ClientPage from './pages/ClientPage';
import DogPage from './pages/DogPage';
import Home from './pages/Home';
import HomeSucessuful from './pages/HomeSucessuful';
import { PrivateRoute } from './routes/privateRoutes';

function App() {
  return (
    <ReactProvider>
    <Routes>
    <Route path="/" element={ <Home /> } />
    <Route path="/Home" element={ <PrivateRoute/> }>
    <Route path="/Home" element={ <HomeSucessuful /> } />
    <Route path="/Home/dog" element={ <DogPage /> } />
    <Route path="/Home/cat" element={ <CatPage /> } />
    <Route path="/Home/clients" element={ <ClientPage /> } />
    </Route>
    </Routes>
    </ReactProvider>
  );
}



export default App;