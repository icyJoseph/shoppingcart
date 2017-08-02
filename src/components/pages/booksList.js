import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/booksActions";

import { Row, Col, Grid, Button } from "react-bootstrap";

import BookItem from "./bookItem";
import BooksForm from "./booksForm";
import Cart from "./cart";

export class BooksList extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const booksList = this.props.books.map(book =>
      <Col xs={12} sm={6} md={4} key={book._id}>
        <BookItem book={book} />
      </Col>
    );
    return (
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Row style={{ marginTop: "10px" }}>
          {booksList}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBooks: actions.getBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
