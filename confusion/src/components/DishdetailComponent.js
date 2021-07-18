import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card className='col-12 col-md-5 m-1 p-0'>
                    <CardImg width='100%' src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div />
            );
        }
    }

    renderComments(dish) {
        if (dish != null) {

            const dishComment = dish.comments.map((dComment) => {
                var date = new Date(dComment.date);
                return (
                    <li key={dComment.id}><br />{dComment.comment}<br /><br /> -- {dComment.author}, {date.toLocaleDateString()}</li>
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

    render() {
        return (
            <div className='row mt-4'>
                {this.renderDish(this.props.selectedDish)}
                {this.renderComments(this.props.selectedDish)}

            </div>
                );
    }
}

export default DishDetail;