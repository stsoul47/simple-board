import { Component, ReactNode } from "react";
/* import bootstrap : S */
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
/* import bootstrap : E */
/**
 * Write class
 */
class Write extends Component {
  render(): ReactNode {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="제목을 입력하세요" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" />
          </Form.Group>
        </Form>
        <Button variant="info">작성완료</Button>
        <Button variant="secondary">취소</Button>
      </div>
    );
  }
}

export default Write;