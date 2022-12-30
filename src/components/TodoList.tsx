import { useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { PropsType } from "../model";
import SingleTodo from "./SingleTodo";
import axios from "axios";
import { baseUrl } from "../variable";

const TodoList = ({ todos, setTodos }: PropsType) => {
  const [editID, setEditID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/allTodo`)
      .then((res: any) => {
        setIsLoading(false);
        setTodos(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="mt-2">
      <div>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"40vh"}}>
            <Spinner animation="grow" />
            Loading...
          </div>
        ) : (
          <Row>
            {todos &&
              todos.length > 0 ?
              todos.map((item) => (
                <Col lg={3} md={6} sm={12} key={item._id}>
                  <SingleTodo
                    singleTodo={item}
                    todos={todos}
                    setTodos={setTodos}
                    editID={editID}
                    setEditID={setEditID}
                  />
                </Col>
              )):<h3>
              
              <small className="text-muted">Todo is empty !</small>
            </h3>}
          </Row>
        )}
      </div>
    </Container>
  );
};

export default TodoList;
