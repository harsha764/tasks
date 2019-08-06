import React from 'react';
import Page from '../../../Breadcrumbs/Page';
import { backendActions } from '../../../../helpers/ApiRequest';
import swal from 'sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input } from 'reactstrap';

class ViewUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users:[],
            deleteId:'',
            modal:false,
            creatingFor:'',
            createdBy: '',
            companyName:''
        }
        this.toggle = this.toggle.bind(this);

    }
    componentDidMount(){
        let app = JSON.parse(localStorage.getItem('app'));
        let username = app.name;
        this.setState({
            createdBy : username
        })

    }
    componentWillMount(){
        let url;
        let methodType;
        methodType = 'GET';
        url = '/get_users.php';
        backendActions(url,methodType)
          .then((res) => {
            if(res !== null){
                let usersdata = res;
                this.setState({
                    users:usersdata
                })
            }else{
                console.warn("No data found");     
            }
          })
          .catch(error => console.error(error));
    }

    toggle = (email = '') => {
        this.setState(prevState => ({
          modal: !prevState.modal,
          creatingFor:email 
        }));
      }

    removeUser = (userid) =>{
        let url;
        let methodType;
        let data={};
        data.id = userid;
        url = '/delete_user.php';
        methodType = 'POST';

        backendActions(url,methodType,data)
          .then((res) => {
            if(res.data !== null){
                this.setState({
                    users:res.users
                })

                swal({
                    title: "User Deleted Sucessfully",
                    icon: "success",
                });
            }else{
                swal({
                    title: res.data,
                    icon: "error",
                    buttons: true,
                    dangerMode: true,
                })
            }
          })
          .catch(error => console.error(error));

    }
        
    confiramtionPopup = (id) => {
        swal({
            title: "Are you sure ??",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.removeUser(id);
          } 
        });
    }    

    changeEvent =(e) =>{
        // console.log(e.target.value);
        this.setState({
            companyName: e.target.value
        })
    }
    addCompany = () =>{
        let url;
        let methodType;
        let data={};
        data.companyname = this.state.companyName;
        data.createdby = this.state.createdBy;
        data.createdfor = this.state.creatingFor;
        data.type = 'Create Company';
        url = '/create_company.php';
        methodType = 'POST';
        backendActions(url,methodType,data)
          .then((res) => {
            console.log(res);
            this.toggle();
            swal({
                title: "Company Created Sucessfully",
                icon: "success",
            });
          })
          .catch(error => console.error(error));
    }   
    render(){
        return(
            <Page
            className="Userslist"
            title="UsersList"
            breadcrumbs={[{ name: 'UsersList', active: true }]}
            >
            <table className="w-100 userstable table ">
                <thead>
                    <tr>
                        <th>
                            Sr.no
                        </th>
                        <th>
                            User Id
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                {this.state.users.map((item,i)=> (
                    <tr key={item.id}>
                        <td>{i+1}</td>    
                        <td >{item.id}</td>
                        <td>{item.name}</td>
                        <td className="actionbtn"><button className="btn btn-info" onClick={() => this.toggle(item.name)}>Add Company</button> <button className="btn btn-danger" onClick={()=>this.confiramtionPopup(item.id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Create Company</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                    <Label for="companyName">Name</Label>
                    <Input type="text" name="companyName" id="companyName" placeholder="Enter Name of Company" onChange={this.changeEvent} />
                    </FormGroup>
                </Form>    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addCompany}>Create</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </Page>
        )
    }

}

export default ViewUser;