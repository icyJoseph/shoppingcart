import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/cartActions";

import { Row, Col, Well, Button } from "react-bootstrap";

class BookItem extends Component {
  handleCart() {
    const book = [
      ...this.props.cart,
      {
        _id: this.props.book._id,
        title: this.props.book.title,
        description: this.props.book.description,
        price: this.props.book.price,
        quantity: 1
      }
    ];

    // check if cart is empty
    // this should be done in reducer
    if (this.props.cart.length > 0) {
      let _id = this.props.book._id;
      let cartIndex = this.props.cart.findIndex(item => item._id === _id);
      if (cartIndex === -1) {
        this.props.addToCart(book);
      } else {
        this.props.updateCart(_id, 1);
      }
    } else {
      this.props.addToCart(book);
    }
  }

  render() {
    const { book: { _id, title, price, description } } = this.props;
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <h6>
              {title}
            </h6>
            <p>
              {description}
            </p>
            <h6>
              usd. {price}
            </h6>
            <Button onClick={this.handleCart.bind(this)} bsStyle="primary">
              Buy now
            </Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addToCart: actions.addToCart, updateCart: actions.updateCart },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
