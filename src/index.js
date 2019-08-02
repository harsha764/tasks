import React from 'react';
import ReactDOM from 'react-dom';
import { STATE_LOGIN, STATE_SIGNUP } from './components/Login/AuthForm';
import { EmptyLayout, MainLayout } from 'components/Layout';
import PageSpinner from './components/Pages/PageSpinner';
import AuthPage from './components/Auth/AuthPage';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './assets/styles/reduction.scss';
// import { createUser, viewUser, dashboardPage } from './components/Pages/Dashboard';
import CreateUser from "./components/Pages/Dashboard/CreateUser";
import DashboardPage from "./components/Pages/Dashboard/DashboardPage";
import ViewUser from "./components/Pages/Dashboard/ViewUsers";
import MainAuthentication from "./MainAuthentication";


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
        <BrowserRouter basename={getBasename()}>
            <Switch>
            
              <Route
                exact
                path="/login"
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_LOGIN} />
                )}
              />
              <Route
                exact
                path="/"
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_LOGIN} />
                )}
              />
              <Route
                exact
                path="/signup"
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_SIGNUP} />
                )}
              />
              <MainAuthentication>
                <MainLayout breakpoint={this.props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route exact path="/dashboard" component={DashboardPage}/>
                    <Route exact path="/dashboard/create_user" component={CreateUser} />
                    <Route exact path="/dashboard/view_user" component={ViewUser} />
                  </React.Suspense>
                </MainLayout>
                <Redirect to="/" />
              </MainAuthentication>

            </Switch>
        </BrowserRouter>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
