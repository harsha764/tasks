import React from 'react';
import Page from '../../Breadcrumbs/Page';
import { backendActions } from '../../../helpers/ApiRequest';
import { Jumbotron, Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';

class SingleCompany extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isopen : false,
            modal:false,
            editMachines:false,
            company_details:{},
            machine_name:'',
            companyname:'',
            machines:''
        }
        this.toggle1 = this.toggle1.bind(this);
    }
    componentWillMount(){
        let url;
        let methodType;
        var data = {};        
        data.rowid = this.props.match.params.id;
        data.type = 'Single company';
        methodType = 'POST';
        url = '/get_companydetails.php';
        backendActions(url,methodType,data)
          .then((res) => {
            if(res.data !== null){
                let companydetails = res.data;
                this.setState({
                    company_details : companydetails,
                    machines: companydetails.machines
                })
            }else{
                console.warn("No data found");     
            }
          })
          .catch(error => console.error(error));
    }

    getData = () =>{
        let url;
        let methodType;
        var data = {};        
        data.rowid = this.props.match.params.id;
        data.type = 'Single company';
        methodType = 'POST';
        url = '/get_companydetails.php';
        backendActions(url,methodType,data)
          .then((res) => {
            if(res.data !== null){
                let companydetails = res.data;
                this.setState({
                    company_details : companydetails,
                    machines: companydetails.machines
                })
            }else{
                console.warn("No data found");     
            }
          })
          .catch(error => console.error(error));
    }

    toggle = () => {
        this.setState(prevState => ({
          isopen: !prevState.isopen,
        }));
    }

    toggle1 = () => {
        this.setState(prevState => ({
          modal: !prevState.modal,
        }));
    }
    toggle2 = () => {
        this.setState(prevState => ({
            editMachines: !prevState.editMachines,
        }));
    }

    changeEvent = (e) => {
        this.setState({
            machine_name : e.target.value
        });
    }
    changeCompanyname = (e) => {
        this.setState({
            companyname: e.target.value
        });
    }
    submitForm = () =>{
        let url;
        let methodType;
        var data = {};        
        data.company_id = this.props.match.params.id;
        data.machine_name = this.state.machine_name;
        data.type = 'update machines';
        methodType = 'POST';
        url = '/add_machine.php';
        backendActions(url,methodType,data)
          .then((res) => {
            this.setState({
                machine_name:''
            })
            if(res.ifpresent !== 'Machine Already Present'){
                swal({
                    title: res.ifpresent,
                    icon: "success",
                });
            }else{
                swal({
                    title: res.ifpresent,
                    icon: "error",
                });
            }    
            this.getData();
          })
          .catch((error) => {
            console.error(error);
            
        });
    }
    editPopup = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    updateCompany = () =>{
        let url;
        let methodType;
        var data = {};        
        data.company_id = this.props.match.params.id;
        data.companyname = this.state.companyname;
        data.type = 'update company';
        methodType = 'POST';
        url = '/update_company.php';    

        backendActions(url,methodType,data)
          .then((res) => {
            this.setState({
                companyname:''
            });
            this.setState(prevState => ({
                modal: !prevState.modal,
            }));
            this.getData();
            swal({
                title: "Company Updated Sucessfully",
                icon: "success",
            });
        })
          .catch((error) => {
            console.error(error);
        });
    }

    changeMachines = (e) => {
        this.setState({
            machines: e.target.value
        })

    }
    updateMachines = () =>{
        let url;
        let methodType;
        var data = {};        
        data.company_id = this.props.match.params.id;
        data.machine_name = this.state.machines;
        data.type = 'edit machines';
        methodType = 'POST';
        url = '/add_machine.php';
        backendActions(url,methodType,data)
          .then((res) => {
            swal({
                title: res.ifpresent,
                icon: "success",
            });
            this.getData();
            this.toggle2();
          })
          .catch((error) => {
            console.error(error);
            this.getData();
        });
    }
    render(){
        return(
            <Page
            className="SingleCompany"
            title="Company Details"
            breadcrumbs={[{ name: 'SingleCompany', active: true }]}
            >
            <Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-6 text-left">
                            <p className="lead">Company Name : {this.state.company_details.company_name}</p>
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-danger mr-3" onClick={this.toggle1} > Edit Company</button>
                            <button className="btn btn-info" onClick={this.toggle}><i className="fa fa-user"></i> Add Machine </button>
                        </div>
                    </div>
                    <hr className="my-2" />
                    <p>Owner : {this.state.company_details.created_for}</p>
                    <p>Created By : {this.state.company_details.created_by}</p>
                    <p>Machines : {this.state.company_details.machines} <button className="btn btn-danger ml-3" onClick={this.toggle2}>Edit Machines</button></p>
                </div>
            </Jumbotron>
            {
                this.state.isopen ? 
                (<Form>
                    <FormGroup className="text-center">
                        <h2>Update Machines</h2>
                    </FormGroup>
                    <FormGroup>
                        <Label for="machineName">Machine Name</Label>
                        <Input type="text" name="machineName" id="machineName" placeholder="Enter Name of Machine ( For multiple entries, add names separated by ',' )" onChange = {this.changeEvent} value={this.state.machine_name}  />
                    </FormGroup>
                    <Button onClick={this.submitForm}>Submit</Button>
                </Form>)
                 : null
            }
            <Modal isOpen={this.state.modal} toggle={this.toggle1} className={this.props.className}>
                <ModalHeader toggle={this.toggle1}>Update Company Details</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                    <Label for="companyName">Name</Label>
                    <Input type="text" name="companyName" id="companyName" placeholder="Enter Name of Company" onChange={this.changeCompanyname} />
                    </FormGroup>
                </Form>    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.updateCompany}>Update</Button>
                    <Button color="secondary" onClick={this.toggle1}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.editMachines} toggle={this.toggle2} className={this.props.className}>
                <ModalHeader toggle={this.toggle2}>Edit Company Machines</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                    <Label for="companyName">Edit Machines</Label>
                    <Input type="text" name="machines" placeholder="Machines Available" onChange={this.changeMachines} value={this.state.machines} />
                    </FormGroup>
                </Form>    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.updateMachines}>Update Machines</Button>
                    <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </Page>
        );
    }
}

export default SingleCompany;
