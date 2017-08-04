import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/cartActions";

import { Row, Col, Well, Button, Image } from "react-bootstrap";

class BookItem extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false
    };
  }

  onReadMore() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleCart() {
    const book = [
      ...this.props.cart,
      {
        _id: this.props.book._id,
        title: this.props.book.title,
        description: this.props.book.description,
        price: this.props.book.price,
        image: this.props.book.image,
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
        this.props.updateCart(_id, 1, this.props.cart);
      }
    } else {
      this.props.addToCart(book);
    }
  }

  render() {
    const { book: { _id, title, price, description, image } } = this.props;
    const { isClicked } = this.state;
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={image} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h6>
              {title}
            </h6>
            <p>
              {description.length > 50 && isClicked === false
                ? description.substring(0, 50)
                : description}
            </p>
            <button className="link" onClick={this.onReadMore.bind(this)}>
              {isClicked === false &&
              description !== null &&
              description.length > 50
                ? "Read more"
                : "Close"}
            </button>
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
