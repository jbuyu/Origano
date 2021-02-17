import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Table from "./components/screens/Table";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="antialiased bg-gray-200 ">
      <Header />
      <Table />
      <Footer />
    </div>
  );
}

export default App;
