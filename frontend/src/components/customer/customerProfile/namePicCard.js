import React, { Component } from "react";
import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import CreateIcon from '@material-ui/icons/Create';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import IconButton from '@material-ui/core/IconButton';
import Avatar from 'react-avatar';
import CardActions from '@material-ui/core/CardActions';
import '../customerProfile/customerProfile.css';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import Axios from "axios";

class NamePic extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name:"",
            profileURL:"",
            profileImage: ""
        }
        
        this.handleChange= this.handleChange.bind(this);
        this.SubmitChange= this.SubmitChange.bind(this);
    }    

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    
    handleChangePic(e){
        const target=e.target;
        console.log(target.files);
        var profilePhoto= target.files[0];
        var data= new FormData();
        data.append("photos",profilePhoto);
        Axios.defaults.withCredentials=true;
        Axios
        .post("http://localhost:3001/upload_file",data)
        .then(response=>{
            if(response.status === 200){
                console.log("Profile photo name:",profilePhoto.name);
                this.setState({
                    profileURL:profilePhoto.name
                });
            }
        })
        .catch(err=>{
            if(err){
            this.setState({ 
                errorRedirect:true
            });
            }
        });
    };

    SubmitChange(e){
        e.preventDefault();
        console.log("Inside submit changes");
        var email= this.props.loginStateStore.result.email;
        console.log("Email ID",email);
        //let Token=localStorage.jwtToken;
        const user={
            email:email,
            Name: this.state.name,
            profileURL:this.state.profileURL       
        };
        console.log("user",user);
        Axios
            .post("http://localhost:3001/updatenamepic",user)
            //,{
              //  headers: {
                //    Authorization: Token
               // }
           // }
            
            .then(response=>{
                if(response.status===200){
                    console.log("inside response status 200!")
                    var isupdated= this.state.isupdated+ 1;
                    this.setState({
                        isupdated: isupdated
                    });
                    this.fetchprofiledbcall();
                }else{
                    console.log("error updating");
                }
                console.log("state",this.state.isupdated);
            })
    };

    fetchprofiledbcall=()=>{
        console.log("component did mount");
        if (
            this.props.loginStateStore.result !== null && this.props.loginStateStore.result !== undefined){
                var email = this.props.loginStateStore.result.email;
                console.log("Emaild id is:", email);
                const data = { 
                    email: email 
                };
                Axios.post("http://localhost:3001/fetchProfile", data).then(response => {
                //update the state with the response data
                console.log(response.data);
                console.log("Response of didmount", response);
                var output = response.data;
                console.log("output is", output.docs);
                this.setState({
                    name:output.docs.data.Name
                });
          });
    }
};

    componentDidMount(){
        this.fetchprofiledbcall();
    }

        render(){
            var redirectVar=null;
       /*
            if(!this.props.loginStateStore.result) {
              redirectVar = <Redirect to= "/customerLogin" />
          }
          */
            return(
                <div>
                    <Card>
                        <div className="photo">
                            <Card.Img className="cover-photo" variant="top" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazoncover"/>
                        </div>
              
                                <Card.Body>
                                <table>
                                    <div className="class1">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="avatar">
                                                        <Avatar size="200" round={true} color="grey" src={this.state.profileImage} alt="upload profile picture" />

                                                        
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="cameraicon">
                                                        <CardActions>
                                                            <IconButton style={{width:50}}>
                                                                <CameraAltIcon label="profileURL" group type="file" onChange={this.handleChangePic} />      
                                                            </IconButton>
                                                        </CardActions>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="inner-name">
                                                        <div className="customername">
                                                            <Card.Title>   
                                                              <Card.Title type="text" value={this.state.name} onChange={this.SubmitChange}/>
                                                               
                                                                <IconButton style={{width:50}}>
                                                                    <CreateIcon onClick={this.handleChange}></CreateIcon>
                                                                </IconButton>                                                  
                                                            </Card.Title>
                                                        </div>
                                                </div>
                                                </td>
                                            </tr>    
                                        </tbody>
                                    </div>
                                </table>
                                </Card.Body>
                    </Card>
                </div>
            )
        }
}  

/*
CreateNamePic.PropTyppes={
    namepic:PropTypes.object.isRequired
};
*/

const mapStateToProps = state => ({
    loginStateStore:state.namepic
});

export default connect(mapStateToProps,{})(NamePic);

//014348503 matthew esteban