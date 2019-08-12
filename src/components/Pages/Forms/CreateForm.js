import React from 'react';
import Fieldtype from '../Procedures/FieldTypes';
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Page from '../../Breadcrumbs/Page';
import swal from 'sweetalert';
import { backendActions } from '../../../helpers/ApiRequest';

class CreateForm extends React.Component {
    constructor() {
        super();
        this.state = {
            procedureName: '',
            showModal: false,
            data: {},
            label: '',
            type: '',
            title: ''
        }
    }

    changeEvent = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addInput = () => {
        console.log("adding input");
        var label = this.state.label;
        var type = this.state.type;
        if (type !== '') {
            this.setState({
                data: {
                    ...this.state.data,
                    [label]: type
                }
            });

            this.toggle();
        } else {
            swal("Please select the type of field ");
        }
        console.log(this.state);
    }

    toggle = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
        }));
    }

    submitForm = () => {
        let url;
        let methodType;
        if (this.state.title !== '') {
            let data = this.state.data;
            data.title = this.state.title;
            data.apiname = "addform";
            url = '/add_form.php';
            methodType = 'POST';
            backendActions(url, methodType, data)
                .then((res) => {
                    if (res.status === "Inserted") {
                        swal({
                            title: "Form Created Sucessfully",
                            icon: "success",
                        });
                        this.setState({
                            data: {},
                            title: ''
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
            swal('Title cannot be empty');
            this.procedureNameChange();
        }
    }

    removeItem = (keylabel) => {
        let obj = this.state.data;
        let newobj = Object.assign({}, obj)
        delete newobj[keylabel]
        this.setState({
            data: newobj
        })
    }
    render() {
        let obj = this.state.data;
        let removeItem = this.removeItem;
        return (
            <Page
                className="CreateForm"
                title="Create Form "
                breadcrumbs={[{ name: 'CreateForm', active: true }]}
            >
                <div className="text-right">
                    <button className="btn btn-info " onClick={this.toggle} >+</button>
                </div>

                <div className="text-left">
                    <input placeholder="Enter Form Name" name="title" value={this.state.name} onChange={this.changeEvent} />
                </div>
                {
                    Object.keys(obj).map(function (key, i) {
                        return (
                            <div key={i}>
                                <Fieldtype label={`${key}`} type={`${obj[key]}`} />
                                <button className="d-inline-block" onClick={() => removeItem(key)}>X</button>
                            </div>
                        )
                    })}
                {
                    Object.keys(obj).length !== 0 ?
                        <div className="text-center">
                            <button className="btn btn-info " onClick={this.submitForm} >Create Form</button>
                        </div>
                        :
                        ''
                }
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
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addInput}>Create Field</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Page>
        );
    }
}

export default CreateForm;