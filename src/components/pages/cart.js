import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Panel,
  Col,
  Row,
  Well,
  Button,
  ButtonGroup,
  Label,
  Modal
} from "react-bootstrap";

import { bindActionCreators } from "redux";
import * as actions from "../../actions/cartActions";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  onDelete(_id) {
    const currentCart = this.props.cart;
    const indexToDelete = currentCart.findIndex(item => item._id === _id);
    let nextCart = [
      ...currentCart.slice(0, indexToDelete),
      ...currentCart.slice(indexToDelete + 1)
    ];
    this.props.deleteCartItem(nextCart);
  }

  open() {
    this.setState({ showModal: true });
  }
  close() {
    this.setState({ showModal: false });
  }

  render() {
    if (this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty() {
    return <div />;
  }
  renderCart() {
    const cartItemList = this.props.cart.map(item =>
      <Panel key={item._id}>
        <Row>
          <Col xs={12} sm={4}>
            <h6>
              {item.title}
            </h6>
            <span> </span>
          </Col>
          <Col xs={12} sm={2}>
            <h6>
              usd. {item.price}
            </h6>
          </Col>
          <Col xs={12} sm={2}>
            <h6>
              qty. <Label bsStyle="success"> {item.quantity} </Label>
            </h6>
          </Col>
          <Col xs={12} sm={2}>
            <ButtonGroup style={{ minWidth: "300px" }}>
              <Button
                onClick={() =>
                  item.quantity > 1
                    ? this.props.updateCart(item._id, -1)
                    : this.onDelete(item._id)}
                bsStyle="default"
                bsSize="small"
              >
                -
              </Button>
              <Button
                onClick={() => this.props.updateCart(item._id, 1)}
                bsStyle="default"
                bsSize="small"
              >
                +
              </Button>
              <span> </span>
              <Button
                onClick={this.onDelete.bind(this, item._id)}
                bsStyle="danger"
                bsSize="small"
              >
                Delete
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Panel>
    );
    return (
      <Panel header="cart" bsStyle="primary">
        {cartItemList}
        <Row>
          <Col xs={12}>
            <h6>Total amount:{this.props.totalAmount}</h6>
            <Button
              onClick={this.open.bind(this)}
              bsStyle="success"
              bsSize="small"
            >
              {" "}Proceed to Checkout
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thanks for your purchase</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <h6>Total $:{this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteCartItem: actions.deleteCartItem,
      updateCart: actions.updateCart
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
