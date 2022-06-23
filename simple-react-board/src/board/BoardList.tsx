import { Component, ReactNode } from "react";

/* import bootstrap : S */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
/* import bootstrap : E */

import config from '../config/config';

const Board = ({
  id,
  title,
  content,
  //pwd,
  registerId,
  registerDate,

}: {
  id: number;
  title: string;
  content: string;
  //pwd: string;
  registerId: string;
  registerDate: string;
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

class BoardList extends Component {
  state = {
    boardList: [],
  }

  /**
   * 데이터를 받아오는 부분
   * 
   * @author yjj
   * @since 2022-06-23
   */
  getList = () => {
    axios.get(config.BaseUrl)
    .then((res) => {
        const { data } = res;
        this.setState({
            boardList: data,
        });
    })
    .catch((e) => {
        console.error(e);
    });
  };

  componentDidMount(){
    this.getList();
  }

  render(): ReactNode {
    const { boardList }: { boardList: any } = this.state;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>선택</th>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              {/*<th>비밀번호</th>*/}
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {
              // eslint-disable-next-line
              boardList.map((v: any) => {
                return (
                  <Board
                    id={v.BOARD_ID}
                    title={v.BOARD_TITLE}
                    content={v.BOARD_CONTENT}
                    //pwd={v.BOARD_PWD}
                    registerId={v.REGISTER_ID}
                    registerDate={v.REGISTER_TIME}
                    key={v.BOARD_ID}
                  />
                );
              })}
          </tbody>
        </Table>
        <Button variant="info">글쓰기</Button>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger">삭제하기</Button>
      </div>
    );
  }
}

export default BoardList;