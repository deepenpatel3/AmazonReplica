import React, { Component } from "react";
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
            multerImage: ""
        }
        
        this.onChange= this.onChange.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
    }   
        setDefaultImage(uploadType){
            if(uploadType === "multer"){
                this.setState({
                    multerImage: this.setState.multerImage
                });
            }
        }

        uploadImage(e,method){
            let imageObj={};

            if(method=== "multer"){
                let imageFormObj=new FormData();

                imageFormObj.append("imageName","multer-image");
                imageFormObj.append("imageData",e.target.files[0]);

                this.setState({
                    multerImage: URL.createObjectURL(e.target.files[0])
                });

                Axios.post('http://localhost:3001/customer/customerprofilePic',imageFormObj)
                .then((data)=>{
                    if(data.data.success){
                        alert("Profile picture uploaded!!");
                        this.setDefaultImage("multer");
                    }
                })
                .catch((err)=>{
                    alert("Error while uploading profile picture!");
                    this.setDefaultImage("multer");
                });
            }
        }
    

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    
    onChangePic(e){
        this.setState({ });
    }

    onSubmit(e){
        e.preventDefault();
        let Token=localStorage.jwtToken;
        const user={
            name: this.state.name        
        };
        Axios
            .post("http://localhost:3001/customerprofile",user)
            //,{
              //  headers: {
                //    Authorization: Token
               // }
           // }
            
            .then(response=>{
                if(response.status===200){
                    console.log("inside response status 200!",response.data);
                    this.setState({
                        name: response.data.name
                    });
                }
            })
    }
   
        render(){
            
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
                                                        <Avatar size="200" round={true} color="grey" src={this.state.multerImage} alt="upload profile picture" />

                                                        
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="cameraicon">
                                                        <CardActions>
                                                            <IconButton style={{width:50}}>
                                                                <CameraAltIcon onClick={(e)=>this.uploadImage(e,"multer")}/>      
                                                            </IconButton>
                                                        </CardActions>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="inner-name">
                                                        <div className="customername">
                                                            <Card.Title>      
                                                                {this.state.name}
                                                                <IconButton style={{width:50}}>
                                                                    <CreateIcon onChange={this.onChange}></CreateIcon>
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
export default NamePic;