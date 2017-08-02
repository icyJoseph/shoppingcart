"use-strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import Menu from "./components/menu";
import Footer from "./components/footer";

import * as actions from "../src/actions/cartActions";

class Main extends Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    return (
      <div>
        <Menu cartItemsNumber={this.props.totalQty} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalQty: state.cart.totalQty
  };
}

export default connect(mapStateToProps, { getCart: actions.getCart })(Main);
