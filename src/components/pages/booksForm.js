import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Well,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Row,
  Image,
  InputGroup,
  DropdownButton,
  Col,
  MenuItem
} from "react-bootstrap";

import * as actions from "../../actions/booksActions";
import axios from "axios";

// Questionable
import { findDOMNode } from "react-dom";

class BooksForm extends Component {
  constructor() {
    super();
    this.state = {
      images: [{}],
      img: ""
    };
  }

  componentDidMount() {
    this.props.getBooks();
    axios
      .get("/api/images")
      .then(response => this.setState({ images: response.data }))
      .catch(err => this.setState({ images: "error loading images", img: "" }));
  }

  handleClick() {
    const book = [
      {
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        image: findDOMNode(this.refs.image).value,
        price: findDOMNode(this.refs.price).value
      }
    ];
    console.log(book);
    this.props.postBook(book);
  }

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBook(bookId);
  }

  handleSelect(name) {
    this.setState({
      img: "/images/" + name
    });
  }

  resetForm() {
    //Reset the Submit Button
    this.props.resetButton();
    findDOMNode(this.refs.title).value = "";
    findDOMNode(this.refs.description).value = "";
    findDOMNode(this.refs.price).value = "";
    this.setState({ img: "" });
  }

  render() {
    // Renders the list of books to be deleted
    console.log(this.props.books);
    const booksList = this.props.books.map(book =>
      <option key={book._id} value={book._id}>
        {book.title}
      </option>
    );
    const imgList = this.state.images.map((img, i) =>
      <MenuItem
        key={i}
        eventKey={img.name}
        onClick={this.handleSelect.bind(this, img.name)}
      >
        {img.name}
      </MenuItem>
    );
    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select Image"
                  bsStyle="primary"
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup
                controlId="title"
                validationState={this.props.validation}
              >
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title"
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="description"
                validationState={this.props.validation}
              >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  ref="description"
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="price"
                validationState={this.props.validation}
              >
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
                <FormControl.Feedback />
              </FormGroup>
              <Button
                onClick={
                  !this.props.msg
                    ? this.handleClick.bind(this)
                    : this.resetForm.bind(this)
                }
                bsStyle={!this.props.style ? "primary" : this.props.style}
              >
                {!this.props.msg ? "Save Book" : this.props.msg}
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
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      postBook: actions.postBook,
      deleteBook: actions.deleteBook,
      getBooks: actions.getBooks,
      resetButton: actions.resetButton
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
