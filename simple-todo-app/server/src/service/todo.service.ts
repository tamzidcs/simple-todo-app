import Todo from "../db/models/Todo";
import User from "../db/models/User";
import TodoUser from "../db/models/TodoUser";
import TodoInput from "../interface/todo";
import TodoUserInput from "../interface/todoUser";
import * as UserRepo from "../repository/userRepo";
import * as TodoRepo from "../repository/todoRepo";
import * as TodoUserRepo from "../repository/todoUserRepo";
import { where } from "sequelize";
import { title } from "process";
import { globalConstants } from "../shared/globalConstants";

export async function addNewTodo(newTodo: TodoInput): Promise<Todo> {
  const todo = new Todo({
    title: newTodo.title,
    description: newTodo.description,
    status: globalConstants.TodoStatusPending,
  });

  const savedTodo = await todo.save();
  if (savedTodo) {
    const user = await User.findOne({ where: { username: newTodo.username } });
    if (user) {
      const todoUser = new TodoUser({
        userId: user?.id,
        todoId: todo.id,
      });
      await todoUser.save();
    } else {
      throw new Error("User not found");
    }
  } else {
    throw new Error("Invalid ToDo");
  }
  return todo;
}

export async function getAllTodosByUsername(username: string): Promise<Todo[]> {
  const todoStatus = globalConstants.TodoStatusPending;
  const todos = await TodoRepo.getAllTodosByUsernameStatus(username,todoStatus);
  return todos;
}

export async function updateTodoStatus(todoId: string): Promise<string> {
  const affectedRows = await Todo.update(
    { status: globalConstants.TodoStatusDone },
    { where: { id: todoId } }
  );
  if (affectedRows[0] === 0) {
    throw new Error("status update failed.");
  }
  return todoId;
}

export async function shareTodo(newTodoUser: TodoUserInput): Promise<TodoUser> {
  const todoUser = new TodoUser();
  const user = await UserRepo.getUserByUsername(newTodoUser.username);
  todoUser.userId = user?.id;
  todoUser.todoId = newTodoUser.todoId;
  const todoUserFound = await TodoUserRepo.getTodoUserByTodoIdUserId(todoUser.userId,todoUser.todoId);
  if (!todoUserFound) {
    await TodoUserRepo.createTodoUser(todoUser);
    return todoUser;
  }
  return todoUserFound;
}
