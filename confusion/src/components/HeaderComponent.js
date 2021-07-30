import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand='md'>
                    <div className='container'>
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className='mr-auto' href="/"><img src='../assets/images/logo.png' height='30' width='41' alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className='nav-link' to="/home"><span className='fa fa-home fa-lg'></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to="/aboutus"><span className='fa fa-info fa-lg'></span> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to="/menu"><span className='fa fa-list fa-lg'></span> Menu</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to="/contactus"><span className='fa fa-address-card fa-lg'></span> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className='fa fa-sign-in fa-lg'> Login</span>
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-sm-6'>
                                <h1>Ristorante Con fusion</h1>
                                <p>
                                    We take inspiration from the worl's best cuisines, and create a unique fusion experiance. Our lipsmacking creations will tickel your culinary senses!
                                    </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Row>
                                    <Label htmlFor="username" xs={3}>Username</Label>
                                    <Col xs={9}>
                                        <Input type="text" id="username" name="username"
                                            innerRef={(input) => this.username = input} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Label htmlFor="password" xs={3}>Password</Label>
                                    <Col xs={9}>
                                        <Input type="password" id="password" name="password"
                                            innerRef={(input) => this.password = input}  />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup check>
                                <Row>
                                <Label check xs={12}>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Button type="submit" value="submit" color="primary">Login</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;