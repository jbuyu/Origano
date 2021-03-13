import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { ProductTable } from "./components/screens/ProductTable";
import { Product } from "./components/screens/Product";
import Footer from "./components/Footer";
import { CartScreen } from "./components/screens/CartScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";

function App() {
  return (
    <Router>
      <div className="antialiased bg-gray-100">
        <Header />
        <Route exact path="/" component={ProductTable} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route path="/product/:id" component={Product} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
