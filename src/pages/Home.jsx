import Navbar from '../components/Navbar/Navbar';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Navbar
        onClick={() => {
          console.log('clicked');
        }}
      />
    </div>
  );
}
