import React, { Component } from 'react';
import { Card, CardTitle, CardImg, CardImgOverlay } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
        console.log("Menu Componenet constructor is invoked.")
    }

    componentDidMount() {
        console.log("Menu Componenet componentDidMount is invoked.")
    }

    OnDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }

    render() {

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className='col-12 col-md-5 m-1 p-0'>
                    <Card onClick={() => this.OnDishSelect(dish)}>
                        <CardImg width='100%' src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        console.log("Menu Componenet render is invoked.")

        return (
            <div className='container'>
                <div className='row'>
                    {menu}
                </div>
                <DishDetail selectedDish={this.state.selectedDish} />
            </div>
            );
    }

}

export default Menu;