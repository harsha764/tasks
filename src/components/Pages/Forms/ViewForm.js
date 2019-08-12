import React from 'react';
import Fieldtype from '../Procedures/FieldTypes';
import Page from '../../Breadcrumbs/Page';
import { backendActions } from '../../../helpers/ApiRequest';


class ViewForm extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {},
            formdata: {},
            name: '',
            id: ''
        }
    }

    componentWillMount(){
        this.getData();
    }

    getData = () =>{
        let url;
        let methodType;
        var data = {};        
        data.rowid = this.props.match.params.id;
        data.type = 'Single form';
        methodType = 'POST';
        url = '/get_form.php';
        backendActions(url,methodType,data)
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

    editForm = () => {
        this.props.history.push('/dashboard/edit_forms/'+this.state.id);
    }

    render(){
        let obj = this.state.data;
        return(
            <Page
                className="ViewForm"
                title="View Form "
                breadcrumbs={[{ name: 'ViewForm', active: true }]}
            >
                <h1 className="text-center">{this.state.name}</h1>
                 {
                    Object.keys(obj).map(function (key, i) {
                        return (
                            <Fieldtype key={i} label={`${key}`} type={`${obj[key]}`} className="mt-3"></Fieldtype>
                        );
                })}

                <button className="btn btn-success" onClick={this.editForm}>Edit Form</button>

            </Page>
        );
    }
}

export default ViewForm;