import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, } from 'react-router-dom';
import SignIn from './components/pages/SignIn/index';
import SignUp from './components/pages/SignUp/index';
import Dashboard from './components/pages/Dashboard/index';
import ProductsPage from './components/pages/Products/index';
import CardPage from './components/pages/Card/index';
import OrderPage from './components/pages/Order/index';
import { UserContextProvider } from './context/userContext';
import ProductPage from './components/pages/Product/index';
import './style.scss'


const Routes = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      history.push('/signIn')
    } else {
      // history.push('/dashboard')
    }
  }, [token])
  return (
    <Switch>
      <Redirect exact path='/' to='signIn' />
      <Route exact path='/signIn' component={SignIn} />
      <Route exact path='/signUp' component={SignUp} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/products' component={ProductsPage} />
      <Route exact path='/products/:id' component={ProductPage} />
      <Route exact path='/card' component={CardPage} />
      <Route exact path='/order' component={OrderPage} />
      <Route component={() => <> 404: Page not found </>} />
    </Switch>
  )
};


function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes />
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
