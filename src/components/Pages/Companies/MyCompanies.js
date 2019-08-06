import React from 'react';
import Page from '../../Breadcrumbs/Page';
import { backendActions } from '../../../helpers/ApiRequest';

class MyCompanies extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mycompanies:[],
            isopen:false
        }
    }
    componentWillMount(){
        let auth = JSON.parse(localStorage.getItem('app'));
        let url;
        let methodType;
        var data = {};        
        data.name = auth.name;
        data.type = 'mycompanies';
        methodType = 'POST';
        url = '/get_companies.php';
        backendActions(url,methodType,data)
          .then((res) => {
            if(res !== null){
                let mycompanies = res;
                this.setState({
                    mycompanies:mycompanies
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

    viewCompany = (id) => {
        console.log(id);
        this.props.history.push('/dashboard/company/'+id);
    }
    render(){
        return(
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
                {this.state.mycompanies.map((item,i)=> (
                    <tr key={item.id}>
                        <td>{i+1}</td>    
                        <td >{item.company_name}</td>
                        <td>{item.created_by}</td>
                        <td className="actionbtn"><button className="btn btn-danger mr-2" onClick={()=>this.confiramtionPopup(item.id)}>Delete</button><button className="btn btn-primary" onClick={()=>this.viewCompany(item.id)}>View</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </Page>
        );
    }
}

export default MyCompanies;