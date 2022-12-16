import { Form } from "react-bootstrap";
import { IInputBox } from "../model";

const InputBox = ({
  value,
  onChange,
  inpRef,
  className,
  placeholder,
  id,
  type,
}: IInputBox) => {
  return (
    <>
      <Form.Group className="w-100" controlId="formBasicEmail">
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          ref={inpRef}
          onChange={onChange}
          className={className}
          id={id}
        />
      </Form.Group>
    </>
  );
};

export default InputBox;
