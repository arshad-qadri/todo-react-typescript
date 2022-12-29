import { ChangeEvent } from "react";

export interface Todo {
  _id:string;
  todo:string;
  __v:number;
  isDone:boolean;
}

export interface PropsType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface ISingleTodo extends PropsType {
  singleTodo: Todo;
  editID: string | null;
  setEditID: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface IInputBox {
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
  id?: string;
  inpRef?: React.MutableRefObject<HTMLInputElement | null>;
}

export interface IEdit extends PropsType {
  todo: Todo;
  inpRef: React.MutableRefObject<HTMLInputElement | null>;
  setEditID: React.Dispatch<React.SetStateAction<string | null>>;
}
