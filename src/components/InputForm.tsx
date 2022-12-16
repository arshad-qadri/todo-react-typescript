import React, {  useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import InputBox from "../commonComponent/InputBox";
import { PropsType } from "../model";
interface IProps extends PropsType{
  btn:string
}

const InputForm = ({ todos, setTodos,btn }: IProps) => {
  const inpRef = useRef<HTMLInputElement | null>(null);
  const [inpVal, setInpVal] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpVal(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), todo: inpVal, isDone: false }]);
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
              {btn}
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
