import style from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className={style.app__container}>
      <Navbar itemNumber={5}/>
      <Outlet />
    </div>
  );
}

export default App;
