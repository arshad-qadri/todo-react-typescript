import axios from "axios";
import React, { useRef, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { toastify } from "../custom/toastify";
import { ISingleTodo } from "../model";
import { baseUrl } from "../variable";
import EditTodo from "./EditTodo";

const SingleTodo = ({
  singleTodo,
  todos,
  setTodos,
  setEditID,
  editID,
}: ISingleTodo) => {
  // const [editID, setEditID] = useState<number | null>(null);
  const inpRef = useRef<HTMLInputElement | null>(null);
  const handleDone = async (id: string, isDone: boolean) => {
    await axios
      .put(`${baseUrl}/updateTodo`, {id, isDone: !isDone })
      .then((res) => {    
        toastify(res.data.message, "success");    
        const update = todos.map((todo) =>
          todo._id === id ? { ...todo, isDone: !todo.isDone } : todo
        );
        setTodos(update);
      })
      .catch((err) => {
        toastify("Something went wrong!", "error");
        console.log(err);
      });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?") === true) {
      await axios
        .delete(`${baseUrl}/todo/${id}`)
        .then((res) => {
          toastify(res.data.message, "success");    
          const filter = todos.filter((todo) => todo._id !== id);
          setTodos(filter);
        })
        .catch((err) => {
          toastify("Something went wrong!", "error");
          console.log(err);
        });
    }
  };
  const handleEdit = (id: string) => {
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
          {editID === singleTodo._id ? (
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
              onClick={() => handleEdit(singleTodo._id)}
              disabled={editID === singleTodo._id}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="mx-1"
              onClick={() => handleDelete(singleTodo._id)}
              disabled={editID === singleTodo._id}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={() => handleDone(singleTodo._id, singleTodo.isDone)}
              disabled={editID === singleTodo._id}
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
