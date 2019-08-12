import React from 'react';
import ReactDOM from 'react-dom';
import { STATE_LOGIN, STATE_SIGNUP } from './components/Login/AuthForm';
import { MainLayout } from 'components/Layout';
import PageSpinner from './components/Pages/PageSpinner';
import AuthPage from './components/Auth/AuthPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/styles/reduction.scss';
import Overview from "./components/Pages/Dashboard/Overview";
import MainAuthentication from './MainAuthentication';
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
                <Route exact path="/dashboard" component={Overview} />
              </React.Suspense>
            </MainLayout>
          </MainAuthentication>
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
