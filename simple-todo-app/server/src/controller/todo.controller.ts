import { Request, Response, NextFunction } from 'express';
import { TodoUser } from '../db/models';
import Todo from '../db/models/Todo';
import * as todoService from '../service/todo.service';
import * as todoUserService from '../service/todoUser.service';
import { CREATED } from "http-status";

export async function addNewTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const todo = req.body;

  try {
    const result = await todoService.addNewTodo(todo);
    res.status(CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export async function getAllTodosByUsername(
  req: Request,
  res: Response<Todo[]>,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.params;
    const data = await todoService.getAllTodosByUsername(user.username);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

export async function updateTodoStatus(
  req: Request,
  res: Response<string>,
  next: NextFunction
): Promise<void> {
  const todoId = req.params.todoId;
  try {
    const data = await todoService.updateTodoStatus(todoId);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

export async function shareTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const newTodoUser = req.body;
  try {
    const result = await todoService.shareTodo(newTodoUser);
    res.send(result);
  } catch (error) {
    next(error);
  }
}