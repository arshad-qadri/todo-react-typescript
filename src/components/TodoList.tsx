import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PropsType } from "../model";
import SingleTodo from "./SingleTodo";

const TodoList = ({ todos, setTodos }: PropsType) => {
  const [editID, setEditID] = useState<number | null>(null);
  return (
    <Container className="mt-2">
      <div>
        <Row>
          {todos &&
            todos.length > 0 &&
            todos.map((item) => (
              <Col lg={3} md={6} sm={12} key={item.id}>
                <SingleTodo
                  singleTodo={item}
                  todos={todos}
                  setTodos={setTodos}
                  editID={editID}
                  setEditID={setEditID}
                />
              </Col>
            ))}
        </Row>
      </div>
    </Container>
  );
};

export default TodoList;
