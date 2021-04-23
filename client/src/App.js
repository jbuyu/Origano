import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { ProductTable } from "./components/screens/ProductTable";
import { Product } from "./components/screens/Product";
import Footer from "./components/Footer";
import { CartScreen } from "./components/screens/CartScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { ShippingScreen } from "./components/screens/ShippingScreen";
import { PaymentScreen } from "./components/screens/PaymentScreem";
import { PlaceOrderScreen } from "./components/screens/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <div  className="m-0">
        <Header />
        <Route exact path="/" component={ProductTable} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route exact path="/shipping" component={ShippingScreen} />
        <Route exact path="/payment" component={PaymentScreen} />
        <Route exact path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/product/:id" component={Product} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Footer />
      </div>

    </Router>
  );
}

export default App;
