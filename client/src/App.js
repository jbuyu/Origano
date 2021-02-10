import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Navigation} />
        <Route path="/dash">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
