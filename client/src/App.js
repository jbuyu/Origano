import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import HomeScreen from "./components/screens/HomeScreen";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="antialiased bg-gray-200 ">
      <Header />
      <HomeScreen />
      <Footer />
    </div>
  );
}

export default App;
