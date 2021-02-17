import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { ProductTable } from "./components/screens/ProductTable";
import { Product } from "./components/screens/Product";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <div className="antialiased bg-gray-200">
        <Header />
        <Route exact path="/" component={ProductTable} />
        <Route path="/product/:id" component={Product} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
