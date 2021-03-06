import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing';
import Admin from './Admin'
import DetailQR from './components/DetailQR';
import Login from './components/Login';
import ProductQR from './components/ProductQR';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/users/:id">
          <DetailQR />
        </Route>
        <Route path="/products/:id">
          <ProductQR />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
