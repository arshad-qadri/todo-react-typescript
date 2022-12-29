import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputBox from "../commonComponent/InputBox";
import { toastify } from "../custom/toastify";
import { IEdit } from "../model";
import { baseUrl } from "../variable";

const EditTodo = ({ todos, todo, setTodos, inpRef, setEditID }: IEdit) => {
  const [inpVal, setInpVal] = useState<string>(todo.todo || "");
  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inpVal) {
      alert("Please type some thing...!");
      return;
    }
    await axios
      .put(`${baseUrl}/updateTodo`, { todo: inpVal })
      .then((res) => {
        toastify(res.data.message, "success");    
        const edited = todos.map((item) =>
          item._id === todo._id ? { ...item, todo: inpVal } : item
        );
        setTodos(edited);
        setEditID(null);
      })
      .catch((err) => {
        toastify("Something went wrong!", "error");
        console.log(err);
      });
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
