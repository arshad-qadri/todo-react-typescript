import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import InputBox from "../commonComponent/InputBox";
import { fetchData } from "../custom/fetchData";
import { toastify } from "../custom/toastify";
import { PropsType } from "../model";
import { baseUrl } from "../variable";
import {BiPlusMedical} from "react-icons/bi"


const InputForm = ({ todos, setTodos}: PropsType) => {
  const inpRef = useRef<HTMLInputElement | null>(null);
  const [inpVal, setInpVal] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inpVal) {
      alert("Please type some thing...!");
      return;
    }
    await axios
      .post(`${baseUrl}/create`, { todo: inpVal })
      .then(() => {
        toastify("Created successfully !", "success");
      })
      .catch((err) => {
        toastify("Something went wrong!", "error");
        console.log(err);
      });
    await fetchData()
      .then((ress) => {
        setTodos(ress.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setTodos([
    //   ...todos,
    //   { _id: Date.now().toString(), todo: inpVal, isDone: false, __v: 1.1 },
    // ]);
    setInpVal("");
    inpRef.current?.blur();
  };

  return (
    <Container>
      <Row className="justify-content-center ">
        <Col lg={4} md={6} sm={12}>
          <Form
            className="d-flex justify-content-center align-items-center w-100 py-2"
            onSubmit={handleSubmit}
          >
            <InputBox
              type="text"
              placeholder="Type here..."
              value={inpVal}
              inpRef={inpRef}
              onChange={handleChange}
            />

            <Button variant="primary" type="submit" className="ms-1">
              <BiPlusMedical/>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    // <form onSubmit={handleSubmit}>
    //   <input type="text" value={inpVal} ref={inpRef} onChange={handleChange} placeholder="Enter text..." />
    //   <button type="submit">Add</button>
    // </form>
  );
};

export default InputForm;
