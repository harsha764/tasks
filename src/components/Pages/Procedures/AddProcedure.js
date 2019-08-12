import React from 'react';
import Page from '../../Breadcrumbs/Page';
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Fieldtype from './FieldTypes';
import swal from 'sweetalert';
import { backendActions } from '../../../helpers/ApiRequest';

class AddProcedure extends React.Component {
    constructor() {
        super();
        this.state = {
            procedureName: '',
            procedurenameModal: false,
            label: '',
            type: '',
            fieldArray: [],
            typeArray: [],
            showModal: false,
            data: {}
        }
    }

    componentDidMount() {
        this.setState({
            procedurenameModal: true
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
        }));
    }
    procedureNameChange = () => {
        this.setState(prevState => ({
            procedurenameModal: !prevState.procedurenameModal,
        }));
    }

    changeEvent = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeEvent1 = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    }

    addInput = () => {
        var label = this.state.label;
        var type = this.state.type;
        if (type !== '') {
            var field = <Fieldtype label={label} type={type} func={this.changeEvent1} />;
            this.setState(prevState => ({
                fieldArray: [...prevState.fieldArray, field],
                typeArray: [...prevState.typeArray, type]
            }))
            this.toggle();
        } else {
            swal("Please select the type of field ");
        }
    }

    submitProcedure = () => {
        let url;
        let methodType;
        if (this.state.procedureName !== '') {
            let data = this.state.data;
            data.procedureName = this.state.procedureName;
            data.typearray = this.state.typeArray;
            data.apiname = "addprocedure";
            url = '/add_procedure.php';
            methodType = 'POST';
            console.log(data);
            backendActions(url, methodType, data)
                .then((res) => {
                    if (res.status === "Inserted") {
                        swal({
                            title: "Procedure Created Sucessfully",
                            icon: "success",
                        });
                        // this.props.history.push('dashboard/all_procedure');
                    } else {
                        swal({
                            title: "PLease try again",
                            icon: "error",
                        })
                    }
                })
                .catch(error => console.error(error));

        } else {
            swal('Procedure name cannot be empty');
            this.procedureNameChange();
        }
    }

    render() {
        var typearray = this.state.fieldArray;
        var Fields = typearray.map((field, i) =>
            <div key={i}>{field}</div>
        );
        return (
            <Page
                className="add_procedure"
                title="Add Procedure"
                breadcrumbs={[{ name: 'addprocedure', active: true }]}
            >
                <h1 className="text-center">Procedure : {this.state.procedureName}</h1>
                <button className="btn btn-info" onClick={this.toggle}>Add Field</button>
                <Form className="mt-3">
                    {Fields}
                    {this.state.fieldArray.length > 0 ? <Button color="primary" onClick={this.submitProcedure}>Create Procedure</Button> : ''}
                </Form>
                <Modal isOpen={this.state.showModal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="companyName">Label Name</Label>
                                <Input type="text" name="label" id="label" placeholder="Enter Label Name" onChange={this.changeEvent} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Field Type</Label>
                                <Input type="select" name="type" id="exampleSelect" onChange={this.changeEvent}>
                                    <option value=''>Select Field Type</option>
                                    <option value="text">Text</option>
                                    <option value="textarea">Textarea</option>
                                    <option value="radio">Radio</option>
                                    <option value="select">Select Options</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addInput}>Create Field</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.procedurenameModal} toggle={this.procedureNameChange} className={this.props.className}>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="companyName">Procedure Name</Label>
                                <Input type="text" name="procedureName" id="label" placeholder="Enter Label Name" onChange={this.changeEvent} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.procedureNameChange}>Done</Button>{' '}
                    </ModalFooter>
                </Modal>


            </Page>
        );
    }
}
export default AddProcedure;