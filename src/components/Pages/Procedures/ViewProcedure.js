import React from 'react';
import { backendActions } from '../../../helpers/ApiRequest';
import Page from '../../Breadcrumbs/Page';

class ViewProcedure extends React.Component {
    constructor() {
        super();
        this.state = {
            procedureName: '',
            procedureDetails: []
        }
    }
    componentWillMount() {
        this.getData();
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
                console.log(res.maindata);
                console.log(res.procedure_details);

                if (res.data !== null) {
                    this.setState({
                        procedureName: res.maindata.name,
                        procedureDetails: res.procedure_details
                    })
                } else {
                    console.warn("No data found");
                }
            })
            .catch(error => console.error(error));
    }

    editProcedure = (id) => {
        console.log(id);
        this.props.history.push('/dashboard/editprocedure/' + id);
    }

    render() {

        return (
            <Page
                className="SingleProcedure"
                title="Procedure Details"
                breadcrumbs={[{ name: 'SingleProcedure', active: true }]}
            >
                <h2 className="text-center">{this.state.procedureName}</h2>
                {this.state.procedureDetails.map((item, i) => (
                    <div key={i}>
                        <p>{item.field_name} : {item.field_value}</p>
                    </div>
                ))}
                <button className="btn btn-success ml-2 mr-2 " onClick={() => this.editProcedure(this.props.match.params.id)}>Edit Procedure</button>
            </Page>
        )
    }
}

export default ViewProcedure;