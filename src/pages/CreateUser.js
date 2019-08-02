import React from 'react';
import Page from 'components/Page';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { backendActions } from '../helpers/ApiRequest';
import { withRouter } from 'react-router';
import swal from 'sweetalert';

class createUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username :'',
            password :'',
            errors :''
        }
    }

    changeEvent = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        let url;
        var data = {};        
        let methodType;

        data.username = this.state.username;
        data.password = this.state.password;
        data.type = 'signup';
        methodType = 'POST';
        url = '/signup.php';
        backendActions(url, methodType,data)
          .then((data) => {
            swal({
                icon: "success",
                title: "User Created Sucessfully"
            });
            this.setState({
                username:'',
                password:''
            })
          })
          .catch(error => console.error(error));
      };

    render(){
        return(
            <Page
            className="CreateUser"
            title="CreateUser"
            breadcrumbs={[{ name: 'CreateUser', active: true }]}
            >
            <Form onSubmit={this.handleSubmit} className="mt-3">    
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input onChange={this.changeEvent} name="username" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input onChange={this.changeEvent} name="password" />
                </FormGroup>
                <FormGroup className="text-center" style={{ color: 'red' }}>
                    <p>{this.state.errors}</p>
                </FormGroup>
                <Button
                    size="lg"
                    className="bg-gradient-theme-left border-0"
                    block
                    onClick={this.handleSubmit}>
                    Create User
                </Button>
            </Form>    
            </Page>
        )
    }
}

export default withRouter(createUser);