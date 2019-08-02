import AuthForm, { STATE_LOGIN } from 'components/Login/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

class AuthPage extends React.Component {
  componentWillMount(){
    if(!(window.location.pathname === '/signup')){
      this.checkingAuth();
    }
  }
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.checkingAuth();
    }else{
      this.props.history.push('/signup');
    }
  };

checkingAuth = () =>{
  let auth = JSON.parse(localStorage.getItem('app'));
      if (auth !== null) {
        const jwt = auth.jwt_token;
        if (jwt === '') {
            this.props.history.push('/login');
        } else {
            this.props.history.push('/dashboard/');
        }
    } else {
        if (!(window.location.pathname === '/login')) {
            this.props.history.push('/login');
        }
    }
}

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
