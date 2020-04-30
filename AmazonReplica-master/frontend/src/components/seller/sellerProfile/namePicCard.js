import React, { Component } from "react";
import {Card} from "react-bootstrap";
import CreateIcon from '@material-ui/icons/Create';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import IconButton from '@material-ui/core/IconButton';
import Avatar from 'react-avatar';
import CardActions from '@material-ui/core/CardActions';
import {logo} from '../../../images/amazonseller.png';
import '../sellerProfile/sellerProfile.css';
import { Link } from 'react-router-dom';
import Axios from "axios";

class NamePic extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userData:"",
            name:"",
            profilepic:""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      onSubmit(e) {
        e.preventDefault();
        let Token = localStorage.jwtToken;
        const user = {
          name: this.state.name
        };

        Axios
        .post("http://localhost:3001/sellerprofile",user)
        //,{
        //headers: {
        //Authorization: Token
        //}
        //})
        .then(response=>{
            console.log(response.data);
            this.setState({
                name:response.data.name
            });
        });
    }
        render(){
          
            return(
                <div>
                    <Card>
                        <div className="photo">
                            <Card.Img className="cover-photo1" variant="top" src={require('../../../images/amazonseller.png')} alt="amazonseller"/>
                        </div>
              
                                <Card.Body>
                                <table>
                                    <div className="class1">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="avatar">
                                                        <Avatar size="200" round={true} color="orange"/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="cameraicon">
                                                        <CardActions>
                                                            <IconButton style={{width:50}}>
                                                                <CameraAltIcon />      
                                                            </IconButton>
                                                        </CardActions>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="inner-name">
                                                        <div className="customername">
                                                            <Card.Title>      
                                                                Seller Name     
                                                                <IconButton style={{width:50}}>
                                                                    <CreateIcon/>
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
