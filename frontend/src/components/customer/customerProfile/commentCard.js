import React, { Component } from "react";
import {Card} from "react-bootstrap";
import { Link } from 'react-router-dom';

class Comment extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
        render(){
            return(
                <div>
                    <Card>
                    <Card.Header>
                            Comments on products
                        </Card.Header>
                        <Card.Title>
                        Product: Comment Content<br/> 
                        </Card.Title>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }


export default Comment;