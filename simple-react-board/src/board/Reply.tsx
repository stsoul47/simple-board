import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import axios from 'axios';
import config from '../config/config'

class Reply extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      replyList: this.props.replyList,
      content: '',
      name: '',
      password: ''
    }
  }

  state = {
    replyList: this.props.replyList,
    content: '',
    name: '',
    password: ''
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  createReply = () => {
    axios.post(config.BaseUrl + "add-reply", {
      BOARD_ID: this.props.boardId,
      REPLY_NAME: this.state.name,
      REPLY_CONTENT: this.state.content,
      REPLY_PWD: this.state.password,
    })
    .then((res)=>{
      console.log("res", res);
    })
    .catch((error)=>console.error(error))
  }

  render() {
    console.log("댓글 안나오냐?", this.props.replyList)
    return (
      <>
      <h1 style={{marginTop: '3%'}}>댓글 기능 <Badge bg="info">New</Badge></h1>
      <Card style={{width:'500px', margin:'20px 35%'}}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>작성자</Form.Label>
            <Form.Control
              type='text'
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="작성자를 입력하세요"
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
        </Form>
        <Button variant="info" style={{width:'180px', margin:'2% 32%'}} onClick={this.createReply}>
          작성완료
        </Button>

        {this.props.replyList.map((v: any) => {
          return (
            <>
              <Card style={{ width: '500px'}}>
                <ListGroup variant="flush">
                  <ListGroup.Item><span style={{ float: 'left' }}>{v.REPLY_NAME}</span>{v.REPLY_CONTENT}<span style={{ float: 'right' }}>{v.REPLY_DATE}</span></ListGroup.Item>
                </ListGroup>
              </Card>
            </>
          )
        })}
      </Card>
      </>
    )
  }
}

export default Reply;