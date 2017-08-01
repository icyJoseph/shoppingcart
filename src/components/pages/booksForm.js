import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Well,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";

import * as actions from "../../actions/booksActions";

// Questionable
import { findDOMNode } from "react-dom";

class BooksForm extends Component {
  handleClick() {
    const book = [
      {
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        price: findDOMNode(this.refs.price).value
      }
    ];
    this.props.postBook(book);
  }

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;
    console.log(bookId)
    this.props.deleteBook({_id:bookId});
  }

  render() {
    const booksList = this.props.books.map(book =>
      <option key={book._id}>
        {book._id}
      </option>
    );
    return (
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="Enter Title" ref="title" />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Description"
              ref="description"
            />
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl type="text" placeholder="Enter Price" ref="price" />
          </FormGroup>
          <Button onClick={this.handleClick.bind(this)} bsStyle="primary">
            Save Book
          </Button>
        </Panel>
        <Panel style={{ marginTop: "25px" }}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select a book</ControlLabel>
            <FormControl
              ref="delete"
              componentClass="select"
              placeholder="select"
            >
              <option value="select">select</option>
              {booksList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.onDelete.bind(this)} bsStyle="danger">
            Delete
          </Button>
        </Panel>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { postBook: actions.postBook, deleteBook: actions.deleteBook },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);