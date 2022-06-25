import { Component, ReactNode } from "react";
/* import bootstrap : S */
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import config from '../config/config'
/* import bootstrap : E */
interface IProps {
  isModifyMode: boolean;
  boardId: number;
  handleCancel: any;
}

/**
 * Write class
 */
class Write extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      content: "",
      isModifyMode: false,
      password: '',
    }
  }
  state = {
    isModifyMode: false,
    title: '',
    content: '',
    password: ''
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
    console.log("[Write update parameter]", this.state);
    axios.put(config.BaseUrl + "update-board", {
      BOARD_CONTENT: this.state.content,
      BOARD_ID: this.props.boardId,
      BOARD_PWD: this.state.password
    })
      .then((res) => {
        console.log("[Write update] ", res);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  detail = () => {
    axios.get(`http://localhost:8000/detail?id=${this.props.boardId}`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            title: res.data[0].BOARD_TITLE,
            content: res.data[0].BOARD_CONTENT,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  componentDidUpdate = (prevProps: any) => {
    if (this.props.isModifyMode && this.props.boardId != prevProps.boardId) {
      this.detail();
    }
  }

  render(): ReactNode {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="내용을 입력하세요"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </Form.Group>
        </Form>
        <Button variant="info" onClick={this.props.isModifyMode ? this.update : this.write}>
          작성완료
        </Button>
        <Button variant="secondary" onClick={this.props.handleCancel}>
          취소
        </Button>
      </div>
    );
  }
}

export default Write;