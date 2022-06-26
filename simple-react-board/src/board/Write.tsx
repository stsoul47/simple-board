import { Component, ReactNode } from "react";
/* import bootstrap : S */
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import axios from 'axios';
import config from '../config/config'
import Reply from "./Reply";
// import { ListGroup } from "react-bootstrap";
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
      registerId: '',
      replyList: [],
    }
  }
  state = {
    isModifyMode: false,
    title: '',
    content: '',
    password: '',
    registerId: '',
    replyList: [],
  }

  write = () => {
    axios.post(config.BaseUrl + "add-board", {
      BOARD_TITLE: this.state.title,
      BOARD_CONTENT: this.state.content,
      BOARD_PWD: this.state.password,
      REGISTER_ID: this.state.registerId,
    })
      .then((res) => {
        console.log("[Write write] ", res);
        this.setState({
          isModifyMode: false,
        })
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
        this.setState({
          isModifyMode: false,
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  detail = () => {
    axios.get(config.BaseUrl + "detail?BOARD_ID=" + this.props.boardId)
      .then((res) => {
        console.log("[Write Detail ]", res.data.reply);
        if (res.data.board.length > 0) {
          this.setState({
            title: res.data.board[0].BOARD_TITLE,
            content: res.data.board[0].BOARD_CONTENT,
            registerId: res.data.board[0].REGISTER_ID,
            replyList: res.data.reply,
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
      this.setState({
        isModifyMode: true,
      })
      this.detail();
    }
  }

  render(): ReactNode {
    const { replyList }: { replyList: any } = this.state;
    return (
      <div>
        <h1 style={{marginTop: '3%'}}>입력 창</h1>
        <Form style={{width: '50%', margin: '2% 24%'}}>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control
              as="textarea"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="제목을 입력하세요"
              disabled={this.state.isModifyMode ? true : false}
            />
          </Form.Group>
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
            <Form.Label>등록자 아이디</Form.Label>
            <Form.Control
              type="text"
              name="registerId"
              value={this.state.registerId}
              onChange={this.handleChange}
              placeholder="아이디를 입력하세요"
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
        <hr />
        <Reply replyList={replyList} boardId={this.props.boardId}/>
      </div>
    );
  }
}

export default Write;