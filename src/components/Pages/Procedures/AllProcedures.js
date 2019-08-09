import React from 'react';
import Page from '../../Breadcrumbs/Page';
import { backendActions } from '../../../helpers/ApiRequest';
import swal from 'sweetalert';

class AllProcedures extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            procedures:[],
        }
    }

    componentWillMount(){
        this.getProcedures();
    }

    getProcedures = () => {
        let url;
        let methodType;
        methodType = 'GET';
        url = '/get_procedures.php';
        backendActions(url,methodType)
          .then((res) => {
            if(res !== null){
                let proceduredata = res.data;
                this.setState({
                    procedures:proceduredata
                })
            }else{
                console.warn("No data found");     
            }
          })
          .catch(error => console.error(error));
    }
    viewProcedure = (id) => {
        this.props.history.push('/dashboard/procedure/'+id);
    }
    editProcedure = (id) => {
        console.log(id);
        this.props.history.push('/dashboard/editprocedure/'+id);
    }
    removeProcedure = (id) =>{
        let url;
        let methodType;
        let data={};
        data.id = id;
        url = '/delete_procedure.php';
        methodType = 'POST';

        backendActions(url,methodType,data)
          .then((res) => {
            if(res.data !== null){
                swal({
                    title: "Company Deleted Sucessfully",
                    icon: "success",
                });
            }else{
                swal({
                    title: res.data,
                    icon: "error",
                    buttons: true,
                    dangerMode: true,
                })
            }
        this.getProcedures();
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
            this.removeProcedure(id);
          } 
        });
    }    
    render(){

        return(
            <Page
            className="all_procedure"
            title="All Procedures"
            breadcrumbs={[{ name: 'allprocedure', active: true }]}
            >
            <table className="w-100 userstable table ">
                <thead>
                    <tr>
                        <th>
                            Sr.no
                        </th>
                        <th>
                            Procedure Name
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                {this.state.procedures.map((item,i)=> (
                    <tr key={i}>
                        <td>{i+1}</td>    
                        <td>{item.name}</td>
                        <td className="actionbtn"><button className="btn btn-info" onClick={() => this.viewProcedure(item.unique_id)}>View</button><button className="btn btn-success ml-2 mr-2 " onClick={() => this.editProcedure(item.unique_id)}>Edit</button> <button className="btn btn-danger" onClick={()=>this.confiramtionPopup(item.unique_id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </Page>
        );
    }
}

export default AllProcedures;