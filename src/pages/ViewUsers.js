import React from 'react';
import Page from 'components/Page';
import { postData } from '../helpers/ApiRequest';
import swal from 'sweetalert';
import { withRouter } from 'react-router';

class viewUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users:[],
            deleteId:'',
        }
    }
    componentWillMount(){
        let url;
        url = 'http://localhost:80/react_project_backend/get_users.php';
        postData(url)
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


        // ApiService.getUsers()
        //     .then((res) => {
        //             if(res !== null){
        //                 let usersdata = res;
        //                 this.setState({
        //                     users:usersdata
        //                 })
        //             }else{
        //                 console.warn("No data found");     
        //             }
        //     })
        //     .catch((err) => {
        //         console.log('Get Users api error, ', err);
        //     })  
    }

    // removeUser = (userid) =>{
    //     swal({
    //         title: "Are u sure?",
    //         text: "You want are u want delete!",
    //         icon: "warning",
    //         buttons: {
    //             cancel: {
    //                 text: "Cancel",
    //                 value: null,
    //                 visible: true,
    //                 className: "",
    //                 closeModal: true,
    //             },
    //             confirm: {
    //                 text: "Delete",
    //                 value: true,
    //                 visible: true,
    //                 className: "",
    //                 closeModal: true
    //             }
    //         }

    //     })

        // let url;
        // let data={};
        // data.id = userid;
        // url = 'http://localhost:80/react_project_backend/delete_user.php';
        // postData(url,data)
        //   .then((res) => {
        //     if(res.data !== null){
        //         this.setState({
        //             users:res.users
        //         })
        //         swal(res.data)
        //     }else{
        //         swal(res.data)
        //     }
        //   })
        //   .catch(error => console.error(error));

    // }

    confiramtionPopup = (id) => {
        
        swal("Are you sure?", {
            dangerMode: true,
            buttons: true,
          });
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
                        <td className="actionbtn"><button className="btn btn-info" onClick={()=>this.viewUser(item.id)}>View</button> <button className="btn btn-danger" onClick={()=>this.removeUser(item.id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </Page>
        )
    }

}

export default withRouter(viewUser);