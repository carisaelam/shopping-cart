import style from './App.module.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className={style.app__container}>
      <Navbar />
    </div>
  );
}

export default App;
