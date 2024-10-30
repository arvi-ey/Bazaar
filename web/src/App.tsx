import BgLogo from "/b.jpg"
import Navbar from './components/Navbar';
function App() {

  const backgroundStyle = {
    backgroundImage: `url(${BgLogo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh"
  };

  return (
    <div style={backgroundStyle} className='w-full h-full' >
      <Navbar />
    </div>
  )
}

export default App
