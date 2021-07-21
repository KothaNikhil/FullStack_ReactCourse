import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
    return (
        <Card className='col-12 col-md-5 m-1 mr-4 p-0'>
            <CardImg width='100%' src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comments }) {
    if (comments != null) {

        const dishComment = comments.map((dComment) => {
            let options = { year: 'numeric', month: 'short', day: 'numeric' };
            var date = new Date(dComment.date);
            return (
                <li key={dComment.id}><br />{dComment.comment}<br /><br /> -- {dComment.author}, {date.toLocaleDateString("en-US", options)}</li>
                );
        });

        return (
            <ul className='list-unstyled col-12 col-md-5 m-1 p-0'>
                <h4>Comments</h4>
                {dishComment}
            </ul>
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
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
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