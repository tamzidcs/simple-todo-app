import { Todo, User } from "../db/models";

export function createUser(user: User) {
   return user.save();
}

export function getUserByUsername(username: string){
    return User.findOne({ where: { username: username } });
}

export function getAllUser(){
    return User.findAll({attributes:['id','username']});
}