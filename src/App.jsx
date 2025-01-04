import style from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  console.log('App rendered');
  return (
    <div className={style.app__container}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
