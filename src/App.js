import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import View from './Components/View';
import Add from './Components/Add';
import Update from './Components/Update';

function App() {
  return (
    <div className="App">
      <Router>

        <Home />

        <Switch>

          <Route path="/view/:id">
            <View />
          </Route>

          <Route path="/update/:id">
            <Update />
          </Route>

          <Route path="/addnNote">
            <Add />
          </Route>


        </Switch>

      </Router>
    </div>
  );
}

export default App;
