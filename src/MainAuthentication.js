import React from 'react';
import { withRouter } from 'react-router';

class MainAuthentication extends React.Component{
    componentDidMount(){
        let auth = JSON.parse(localStorage.getItem('app'));
        if (auth !== null) {
            const jwt = auth.jwt_token;
            if (jwt === '') {
                this.props.history.push('/login');
            } 
        } else {
            if (!(window.location.pathname === '/login')) {
                this.props.history.push('/login');
            }
        }
    }
    render(){
        return(
            <div>{this.props.children}</div>
        );
    }
}

export default withRouter(MainAuthentication);