import React from 'react';
import ReactDOM from 'react-dom';
import { STATE_LOGIN, STATE_SIGNUP } from './components/Login/AuthForm';
import { MainLayout } from 'components/Layout';
import PageSpinner from './components/Pages/PageSpinner';
import AuthPage from './components/Auth/AuthPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/styles/reduction.scss';
// import { createUser, viewUser, dashboardPage } from './components/Pages/Dashboard';
// import { ViewUser } from './components/Pages/Dashboard';

import Overview from "./components/Pages/Dashboard/Overview";
import CreateUser from "./components/Pages/Dashboard/CreateUsers";
import ViewUser from "./components/Pages/Dashboard/ViewUser";
import MainAuthentication from './MainAuthentication';
import { MyCompanies , AllCompanies , SingleCompany} from './components/Pages/Companies';

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
                component={props => (
                  <AuthPage {...props} authState={STATE_LOGIN} />
                )}
              />
              <Route
                exact
                path="/"
                component={props => (
                  <AuthPage {...props} authState={STATE_LOGIN} />
                )}
              />
              <Route
                exact
                path="/signup"
                component={props => (
                  <AuthPage {...props} authState={STATE_SIGNUP} />
                )}
              />
              <MainAuthentication>
                <MainLayout breakpoint={this.props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route exact path="/dashboard" component={Overview}/>
                    <Route exact path="/dashboard/create_user" component={CreateUser} />
                    <Route exact path="/dashboard/view_user" component={ViewUser} />
                    <Route exact path="/dashboard/my_companies" component={MyCompanies} />
                    <Route exact path="/dashboard/all_companies" component={AllCompanies} />
                    <Route path='/dashboard/company/:id' render={(props) => <SingleCompany {...props} />} />
                  </React.Suspense>
                </MainLayout>
              </MainAuthentication>
            </Switch>
        </BrowserRouter>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
