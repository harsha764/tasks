import React from 'react';
import Page from '../../Breadcrumbs/Page';
import { backendActions } from '../../../helpers/ApiRequest';
import swal from 'sweetalert';

class MyCompanies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mycompanies: [],
            isopen: false
        }
    }
    componentWillMount() {
        this.myCompanies();
    }


    myCompanies = () => {
        let auth = JSON.parse(localStorage.getItem('app'));
        let url;
        let methodType;
        var data = {};
        data.name = auth.name;
        data.type = 'mycompanies';
        methodType = 'POST';
        url = '/get_companies.php';
        backendActions(url, methodType, data)
            .then((res) => {
                if (res !== null) {
                    let mycompanies = res;
                    this.setState({
                        mycompanies: mycompanies
                    })
                } else {
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

    viewCompany = (id) => {
        console.log(id);
        this.props.history.push('/dashboard/company/' + id);
    }

    removeCompany = (id) => {
        let url;
        let methodType;
        let data = {};
        data.id = id;
        url = '/delete_company.php';
        methodType = 'POST';

        backendActions(url, methodType, data)
            .then((res) => {
                if (res.data !== null) {
                    swal({
                        title: "Company Deleted Sucessfully",
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
                this.myCompanies();
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
                    this.removeCompany(id);
                }
            });
    }
    render() {
        return (
            <Page
                className="Mycompanies"
                title="My Companies"
                breadcrumbs={[{ name: 'Mycompanies', active: true }]}
            >
                <table className="w-100 userstable table ">
                    <thead>
                        <tr>
                            <th>
                                Sr.no
                        </th>
                            <th>
                                Company Name
                        </th>
                            <th>
                                Created By
                        </th>
                            {/* <th>
                            Action
                        </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.mycompanies.map((item, i) => (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td >{item.company_name}</td>
                                <td>{item.created_by}</td>
                                <td className="actionbtn"><button className="btn btn-danger mr-2" onClick={() => this.confiramtionPopup(item.id)}>Delete</button><button className="btn btn-primary" onClick={() => this.viewCompany(item.id)}>View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Page>
        );
    }
}

export default MyCompanies;