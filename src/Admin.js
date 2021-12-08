import { useEffect, useState } from 'react'
import Headerbar from './layouts/Headerbar';
import Navbar from './layouts/Navbar';
import './styles/headerbar.css'
import './styles/navbar.css'
import { Switch, Route, useRouteMatch, useHistory} from 'react-router-dom'

import Dashboard from './components/Dashboard';
import Import from './components/Import';
import CustomerForm from './components/CustomerForm';
import Users from './components/Users';
import Detail from './components/Detail';
import Register from './components/Register';
import EditForm from './components/EditForm';
import ProductForm from './components/ProductForm';
import Products from './components/Products';
import Product from './components/Product';
import ProductEdit from './components/ProductEdit';

import { setToken } from './services/vaccinatedUser';

function Admin() {

  const [loggedUser, setLoggedUser] = useState(null)

  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const result = JSON.parse(loggedUserJSON)
      setLoggedUser(result)
      setToken(result.accessToken)
    } else {
      history.push('/login')
    }
  }, [history])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setLoggedUser(null)
    history.push('/landing')
  }

  let { path } = useRouteMatch();

  return (
    <div className="Admin">
      {
        loggedUser && <div>
          <Headerbar username={loggedUser.user.username} handleLogout={handleLogout} />
          <Navbar />
          <Switch>
            <Route path={`${path}/import`}>
              <Import />
            </Route>
            <Route path={`${path}/users/:id`}>
              <Detail />
            </Route>
            <Route path={`${path}/customers/create`}>
              <CustomerForm />
            </Route>
            <Route path={`${path}/customers/edit/:id`}>
              <EditForm />
            </Route>
            <Route path={`${path}/customers`}>
              <Users />
            </Route>
            <Route path={`${path}/products/create`}>
              <ProductForm />
            </Route>
            <Route path={`${path}/products/edit/:id`}>
              <ProductEdit />
            </Route>
            <Route path={`${path}/products/:id`}>
              <Product />
            </Route>
            <Route path={`${path}/products`}>
              <Products />
            </Route>
            <Route path={`${path}/register`}>
              <Register />
            </Route>
            <Route path={path}>
              <Dashboard />
            </Route>
          </Switch>
        </div>
      }
    </div>
  );
}

export default Admin;
