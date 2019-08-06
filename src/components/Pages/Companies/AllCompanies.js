import React from 'react';
import Page from '../../Breadcrumbs/Page';
import { backendActions } from '../../../helpers/ApiRequest';

class AllCompanies extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mycompanies:[],
        }
    }
    componentWillMount(){
        let auth = JSON.parse(localStorage.getItem('app'));
        let url;
        let methodType;
        var data = {};        
        data.name = auth.name;
        data.type = 'allcompanies';
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
    render(){
        return(
            <Page
            className="Allcompanies"
            title="All Companies"
            breadcrumbs={[{ name: 'Allcompanies', active: true }]}
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
                        {/* <td className="actionbtn"><button className="btn btn-info" onClick={() => this.toggle(item.name)}>Add Company</button> <button className="btn btn-danger" onClick={()=>this.confiramtionPopup(item.id)}>Delete</button></td> */}
                    </tr>
                ))}
                </tbody>
            </table>
            
            </Page>
        );
    }
}

export default AllCompanies;
