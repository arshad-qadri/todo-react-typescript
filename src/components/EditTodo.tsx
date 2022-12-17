import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputBox from "../commonComponent/InputBox";
import { IEdit } from "../model";

const EditTodo = ({ todos, todo, setTodos, inpRef, setEditID }: IEdit) => {
  const [inpVal, setInpVal] = useState<string>(todo.todo || "");
  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inpVal) {
      alert("Please type some thing...!");
      return;
    }
    const edited = todos.map((item) =>
      item.id === todo.id ? { ...item, todo: inpVal } : item
    );
    setTodos(edited);
    setEditID(null);
  };
  return (
    <>
      <Form
        className="d-flex justify-content-center align-items-center w-100 py-2"
        onSubmit={handleSubmit}
      >
        <InputBox
          type="text"
          placeholder="Type here..."
          value={inpVal}
          onChange={handleChnage}
          inpRef={inpRef}
        />
        <Button type="submit" variant="primary" className="ms-1">
          Edit
        </Button>
      </Form>
    </>
  );
};

export default EditTodo;
