import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Details from './Pages/Details';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/details/:id" exact={true} component={Details}/>
        </Switch>
      </Router>
  );
}

export default App;
