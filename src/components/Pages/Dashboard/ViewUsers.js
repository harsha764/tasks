import React from 'react';
import Page from '../../Breadcrumbs/Page';
import { backendActions } from '../../../helpers/ApiRequest';
import swal from 'sweetalert';
import { withRouter } from 'react-router';

class ViewUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users:[],
            deleteId:'',
        }
    }
    componentWillMount(){
        let url;
        let methodType;
        methodType = 'POST';

        url = '/get_users.php';
        backendActions(url,methodType)
          .then((res) => {
            if(res !== null){
                let usersdata = res;
                this.setState({
                    users:usersdata
                })
            }else{
                console.warn("No data found");     
            }
          })
          .catch(error => console.error(error));


      
    }
    removeUser = (userid) =>{
        let url;
        let methodType;
        let data={};
        data.id = userid;
        url = '/delete_user.php';
        methodType = 'POST';

        backendActions(url,methodType,data)
          .then((res) => {
            if(res.data !== null){
                this.setState({
                    users:res.users
                })

                swal({
                    title: "User Deleted Sucessfully",
                    icon: "success",
                });
                // swal(res.data)
            }else{
                swal({
                    title: res.data,
                    icon: "error",
                    buttons: true,
                    dangerMode: true,
                })
            }
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
            this.removeUser(id);
          } 
        });
    }    

    viewUser = (userid) =>{
        let url;
        let methodType;
        let data={};
        data.id = userid;
        url = '/view_user.php';
        methodType = 'POST';

        backendActions(url,methodType,data)
          .then((res) => {
            if(res.data !== null){
                console.log(res.data);
            }else{
                swal({
                    title: res.data,
                    icon: "error",
                    buttons: true,
                    dangerMode: true,
                })
            }
          })
          .catch(error => console.error(error));
    }   


    render(){
        return(
            <Page
            className="Userslist"
            title="UsersList"
            breadcrumbs={[{ name: 'UsersList', active: true }]}
            >
            <table className="w-100 userstable table ">
                <thead>
                    <tr>
                        <th>
                            Sr.no
                        </th>
                        <th>
                            User Id
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                {this.state.users.map((item,i)=> (
                    <tr key={item.id}>
                        <td>{i+1}</td>    
                        <td >{item.id}</td>
                        <td>{item.name}</td>
                        <td className="actionbtn"><button className="btn btn-info" onClick={()=>this.viewUser(item.id)}>View</button> <button className="btn btn-danger" onClick={()=>this.confiramtionPopup(item.id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </Page>
        )
    }

}

export default withRouter(ViewUser);