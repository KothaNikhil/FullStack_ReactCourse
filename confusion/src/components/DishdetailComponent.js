import React, {Component} from 'react';
import { Card, CardTitle, CardText, CardImg, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, FormGroup, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';

const required = (val) => (val) && (val.length);
const minLength = (len) => (val) => val && (val.length>=len);
const maxLength = (len) => (val) => val && (val.length<=len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state ={
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        alert(JSON.stringify(this.props) + JSON.stringify(values));
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil'> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label for='rating' xs={3}>Rating</Label>
                                <Col xs={9}>
                                    <Control.select model='.rating' name='rating' id='rating' className='form-control'validators = {{
                                            required
                                        }}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>
                                    <Errors model='.rating' show='touched' className='text-danger'
                                        messages={{
                                            required: 'This field is requied.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label xs={3} htmlFor='author'>Your Name</Label>
                                <Col xs={9}>
                                    <Control.text model='.author' name='author' id='author' className='form-control' placeholder='Your Name' 
                                        validators = {{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors model='.author' show='touched' className='text-danger'
                                        messages={{
                                            required: 'This field is requied.',
                                            minLength: '>=3 characters are must',
                                            maxLength: 'maximum 15 characters.'
                                        }}
                                    />

                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label xs={3} for='comment'>Comment</Label>
                                <Col xs={9}>
                                    <Control.textarea model='.comment' name='comment' id='comment' className='form-control' rows='6' /> 
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col xs={{size:9, offset:3}}>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}


function RenderDish({ dish }) {
    return (
        <Card className='p-0'>
            <CardImg width='100%' src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comments, addComment, dishId }) {
    if (comments != null) {

        const dishComment = comments.map((dComment) => {
            let options = { year: 'numeric', month: 'short', day: 'numeric' };
            var date = new Date(dComment.date);
            return (
                <li key={dComment.id}><br />{dComment.comment}<br /><br /> -- {dComment.author}, {date.toLocaleDateString("en-US", options)}</li>
                );
        });

        return (
            <div>
                <ul className='list-unstyled p-0'>
                    <h4>Comments</h4>
                    {dishComment}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    }
    else {
        return (
            <div />
        );
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className='container mt-4'>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-12 col-md-5 m-1 mr-4'>
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderComments comments={props.comments} 
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
            </div>
        );
    }
}

export default DishDetail;