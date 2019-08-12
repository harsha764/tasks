import React from 'react';
import { backendActions } from '../../../helpers/ApiRequest';
import Page from '../../Breadcrumbs/Page';
import Fieldtype from './FieldTypes';
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import swal from 'sweetalert';

class EditProcedure extends React.Component {
    constructor() {
        super();
        this.state = {
            procedureName: '',
            procedureId: '',
            procedureDetails: [],
            fieldArray: [],
            typeArray: [],
            showModal: false,
            data: {},
            label: '',
            type: ''
        }
    }

    componentWillMount() {
        this.getData();
    }

    toggle = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
        }));
    }

    getData = () => {
        let url;
        let methodType;
        var data = {};
        data.rowid = this.props.match.params.id;
        data.type = 'Single procedure';
        methodType = 'POST';
        url = '/get_procedure.php';
        backendActions(url, methodType, data)
            .then((res) => {
                for (var i = 0; i < res.procedure_details.length; i++) {
                    var field = <Fieldtype label={res.procedure_details[i].field_name} type={res.procedure_details[i].field_type} value={res.procedure_details[i].field_value} func={this.changeEvent1} />;
                    this.setState(prevState => ({
                        fieldArray: [...prevState.fieldArray, field]
                    })
                    )
                }

                if (res.data !== null) {
                    this.setState({
                        procedureName: res.maindata.name,
                        procedureId: res.maindata.unique_id,
                        procedureDetails: res.procedure_details,
                        typeArray: res.type_array,
                        data: res.data
                    })
                } else {
                    console.warn("No data found");
                }
            })
            .catch(error => console.error(error));
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

    changeEvent1 = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    }

    changeEvent = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateProcedure = () => {
        let url;
        let methodType;
        let data = this.state.data;
        data.procedureName = this.state.procedureName;
        data.procedureId = this.state.procedureId;
        data.typearray = this.state.typeArray;
        data.apiname = "updateprocedure";
        url = '/update_procedure.php';
        methodType = 'POST';
        backendActions(url, methodType, data)
            .then((res) => {
                if (res.status === "Updated") {
                    swal({
                        title: "Procedure Updated Sucessfully",
                        icon: "success",
                    });
                } else {
                    swal({
                        title: "Please try again",
                        icon: "error",
                    })
                }
            })
            .catch(error => console.error(error));
    }
    render() {
        var typearray = this.state.fieldArray;
        var Fields = typearray.map((field, i) =>
            <div key={i}>{field}</div>
        );
        return (
            <Page
                className="EditProcedure"
                title="Edit Procedure "
                breadcrumbs={[{ name: 'EditProcedure', active: true }]}
            >
                <h2 className="text-center">{this.state.procedureName}</h2>
                <button className="btn btn-info" onClick={this.toggle}>Add Field</button>
                {Fields}
                <button className="btn btn-success ml-2 mr-2 " onClick={() => this.updateProcedure(this.props.match.params.id)}>Update Procedure</button>

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
            </Page>
        )
    }
}

export default EditProcedure;