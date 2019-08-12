import React from 'react';
import { backendActions } from '../../../helpers/ApiRequest';
import Page from '../../Breadcrumbs/Page';
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import swal from 'sweetalert';

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            formdata: {},
            name: '',
            showModal: false,
            id: '',
            label: '',
            type: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        this.getData();
    }
    getData = () => {
        let url;
        let methodType;
        var data = {};
        data.rowid = this.props.match.params.id;
        data.type = 'Single form';
        methodType = 'POST';
        url = '/get_form.php';
        backendActions(url, methodType, data)
            .then((res) => {
                this.setState({
                    data: res.formdetails,
                    formdata: res.maindata,
                    name: res.maindata.name,
                    id: res.maindata.unique_id
                })
            })
            .catch(error => console.error(error));
    }

    addInput = () => {
        var label = this.state.label;
        var type = this.state.type;
        console.log(type);
        console.log(label);
        if (type !== '') {
            this.setState({
                data: {
                    ...this.state.data,
                    [label]: type
                }
            });
            this.toggle();
            console.log(this.state);
        } else {
            swal("Please select the type of field ");
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
        }));
    }

    changeEvent1 = (e) => {
        const tab = this.state.data;
        const replacements = {
            [e.target.name]: e.target.value
        };
        let replacedItems = Object.keys(tab).map((key) => {
            const newKey = replacements[key] || key;
            return { [newKey]: tab[key] };
        });
        const newTab = replacedItems.reduce(() => Object.assign({}, ...replacedItems));
        console.log(newTab);
        this.setState({
            data: newTab
        })
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    changeEvent = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        const formData = {};
        for (const field in this.refs) {
            formData[this.refs[field].value] = this.refs[field].className;
        }
        let url;
        let methodType;
        if (this.state.name !== '') {
            let data = formData;
            data.name = this.state.name;
            data.id = this.state.id;
            data.apiname = "updateform";
            url = '/update_form.php';
            methodType = 'POST';
            backendActions(url, methodType, data)
                .then((res) => {
                    if (res.status === "Updated") {
                        swal({
                            title: "Form Created Sucessfully",
                            icon: "success",
                        });
                        this.props.history.push('/dashboard/view_form/'+ this.state.id);
                    } else {
                        swal({
                            title: "PLease try again",
                            icon: "error",
                        })
                    }
                })
                .catch(error => console.error(error));
        } else {
            swal({
                title: "Form Name should be mandatory",
                icon: "error",
            })
        }
    }

    deleteField = (fieldid) => {
        let obj = this.state.data;
        let newobj = Object.assign({}, obj)
        delete newobj[fieldid]
        this.setState({
            data:newobj
        })
    }

    render() {
        let obj = this.state.data;
        let changeEvent = this.changeEvent1;
        let deleteEvent = this.deleteField;
        return (
            <Page
                className="EditForm"
                title="Edit Form "
                breadcrumbs={[{ name: 'EditForm', active: true }]}
            >
                <div className="text-right">
                    <button className="btn btn-info " onClick={this.toggle} >+</button>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Form Name</h3>
                    <input type="text" name="formname" value={this.state.name} onChange={this.changeName} />
                    {
                        Object.keys(obj).map(function (key, i) {
                            return (
                                <FormGroup key={i} className="mt-3">
                                    <h4 htmlFor={`${key}`}>{`${key}`}</h4>
                                    <input name={`${key}`} ref={`${key}`} className={`${obj[key]}`} value={`${key}`} type={`${obj[key]}`} id={`${key}`} onChange={changeEvent} />
                                    <button type="button" onClick={()=>deleteEvent(key)}>X</button>
                                </FormGroup>
                            );
                        })}
                    <button type="submit" className="btn btn-success">Update</button>
                </form>

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
        );
    }
}

export default EditForm;