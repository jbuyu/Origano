import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { HomeScreen } from "./components/screens/HomeScreen";
import { ProductScreen } from "./components/screens/ProductScreen";
import Footer from "./components/Footer";
import { CartScreen } from "./components/screens/CartScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { ShippingScreen } from "./components/screens/ShippingScreen";
import { PaymentScreen } from "./components/screens/PaymentScreem";
import { PlaceOrderScreen } from "./components/screens/PlaceOrderScreen";
import { OrderScreen } from "./components/screens/OrderScreen";
import { UserListScreen } from "./components/screens/UserListScreen";
import { ProductListScreen } from "./components/screens/ProductListScreen";
import { UserEditScreen } from "./components/screens/UserEditScreen";
import { ProductEditScreen } from "./components/screens/ProductEditScreen";
import { OrderListScreen } from "./components/screens/OrderListScreen";

function App() {
  return (
    <Router>
      <div className="h-full">
        <Header />
        <Route exact path="/" component={HomeScreen} exact />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route exact path="/shipping" component={ShippingScreen} />
        <Route exact path="/payment" component={PaymentScreen} />
        <Route exact path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/admin/productList" component={ProductListScreen} exact />
        <Route
          path="/admin/productList/:pageNumber"
          component={ProductListScreen}
          exact
        />
        <Route path="/admin/orderList" component={OrderListScreen} />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
