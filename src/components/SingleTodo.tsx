import React, {  useRef, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { ISingleTodo } from "../model";
import EditTodo from "./EditTodo";

const SingleTodo = ({ singleTodo, todos, setTodos,setEditID, editID }: ISingleTodo) => {
  // const [editID, setEditID] = useState<number | null>(null);
  const inpRef = useRef<HTMLInputElement | null>(null);
  const handleDone = (id: number) => {
    const update = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(update);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure?") === true) {
      const filter = todos.filter((todo) => todo.id !== id);
      setTodos(filter);
    }
  };
  const handleEdit = (id: number) => {
    setEditID(id);

  };
  useEffect(() => {
    if (editID) {
      inpRef.current?.focus();      
    }
    
  }, [editID]);
  return (
    <>
      <Card className="mt-2">
        <Card.Header className="text-left w-100">
          <b>{singleTodo.isDone ? "Completed" : "Incomplete"}</b>
        </Card.Header>
        <Card.Body>
          { editID === singleTodo.id ? (
            <EditTodo
              todos={todos}
              todo={singleTodo}
              setTodos={setTodos}
              inpRef={inpRef}
              setEditID={setEditID}
            />
          ) : (
            <blockquote className="blockquote mb-0">
              {singleTodo.isDone ? (
                <s>{singleTodo.todo}</s>
              ) : (
                <p>{singleTodo.todo}</p>
              )}
            </blockquote>
          )}
          <div className="mt-3">
            <Button
              variant="secondary"
              onClick={() => handleEdit(singleTodo.id)}
              disabled={ editID === singleTodo.id}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="mx-1"
              onClick={() => handleDelete(singleTodo.id)}
              disabled={editID === singleTodo.id}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={() => handleDone(singleTodo.id)}
              disabled={ editID === singleTodo.id}
            >
              {singleTodo.isDone ? "Not Done" : "Done"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleTodo;
