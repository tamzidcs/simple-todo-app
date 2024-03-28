import { TodoUser } from "../db/models";

export function createTodoUser(todoUser: TodoUser) {
  return todoUser.save();
}

export function getAllTodoUserByUserId(userId: string){
  return TodoUser.findAll({ where: { userId: userId } });
}

export function getTodoUserByTodoIdUserId(userId: number, todoId: number ){
  return TodoUser.findOne({
    where: { userId: userId, todoId: todoId },
  });
}
