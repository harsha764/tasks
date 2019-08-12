import React from 'react';
import { backendActions } from '../../../helpers/ApiRequest';
import Page from '../../Breadcrumbs/Page';
import swal from 'sweetalert';


class AllForms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allforms: [],
        }
    }
    componentWillMount() {
        this.getForms();
    }

    getForms = () => {
        let url;
        let methodType;
        methodType = 'GET';
        url = '/get_forms.php';
        backendActions(url, methodType)
            .then((res) => {
                if (res !== null) {
                    let formsdata = res.data;
                    this.setState({
                        allforms: formsdata
                    })
                } else {
                    console.warn("No data found");
                }
            })
            .catch(error => console.error(error));
    }
    editForm = (id) => {
        this.props.history.push('/dashboard/edit_forms/' + id);
    }

    viewForm = (id) => {
        this.props.history.push('/dashboard/view_form/' + id);
    }
    removeForm = (id) => {
        let url;
        let methodType;
        let data = {};
        data.id = id;
        url = '/delete_form.php';
        methodType = 'POST';

        backendActions(url, methodType, data)
            .then((res) => {
                if (res.data !== null) {
                    swal({
                        title: "Form Deleted Sucessfully",
                        icon: "success",
                    });
                } else {
                    swal({
                        title: res.data,
                        icon: "error",
                        buttons: true,
                        dangerMode: true,
                    })
                }
                this.getForms();
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
                    this.removeForm(id);
                }
            });
    }
    render() {
        return (
            <Page
                className="all_forms"
                title="All Forms"
                breadcrumbs={[{ name: 'allforms', active: true }]}
            >
                <table className="w-100 userstable table ">
                    <thead>
                        <tr>
                            <th>
                                Sr.no
                        </th>
                            <th>
                                Name
                        </th>
                            <th>
                                Action
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allforms.map((item, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td className="actionbtn"><button className="btn btn-info" onClick={() => this.viewForm(item.unique_id)}>View</button><button className="btn btn-success ml-2 mr-2 " onClick={() => this.editForm(item.unique_id)}>Edit</button> <button className="btn btn-danger" onClick={() => this.confiramtionPopup(item.unique_id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Page>
        );
    }
}

export default AllForms;