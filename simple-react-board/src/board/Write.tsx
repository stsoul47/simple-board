import { Component, ReactNode } from "react";
/* import bootstrap : S */
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import config from '../config/config'
/* import bootstrap : E */
/**
 * Write class
 */
class Write extends Component {
  state = {
    isModifyMode: false,
    title: '',
    content: ''
  }

  write = () => {
    axios.post(config.BaseUrl)
      .then((res) => {
        console.log("[Write write] ", res);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  update = () => {
    axios.post(config.BaseUrl)
      .then((res) => {
        console.log("[Write update] ", res);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render(): ReactNode {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" onChange={this.handleChange} placeholder="제목을 입력하세요" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" onChange={this.handleChange} placeholder="내용을 입력하세요" />
          </Form.Group>
        </Form>
        <Button variant="info" onClick={this.state.isModifyMode ? this.write : this.update}>
          작성완료
        </Button>
        <Button variant="secondary">취소</Button>
      </div>
    );
  }
}

export default Write;