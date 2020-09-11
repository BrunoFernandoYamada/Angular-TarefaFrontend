import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [
    {id: 1, description: 'Tarefa1', completed: false},
    {id: 2, description: 'Tarefa2', completed: false},
    {id: 3, description: 'Tarefa3', completed: true},
    {id: 4, description: 'Tarefa4', completed: false},
    {id: 5, description: 'Tarefa5', completed: false},
    {id: 6, description: 'Tarefa6', completed: false},
    {id: 7, description: 'Tarefa7', completed: false},
    {id: 8, description: 'Tarefa8', completed: false},
    {id: 9, description: 'Tarefa9', completed: false},
    {id: 10, description: 'Tarefa10', completed: false}
  ];


  constructor() { }

  getAll(): Task[]{
    const list = window.localStorage.getItem('lista-tarefas');
    if (list){
      this.tasks = JSON.parse(list);
    }
    return this.tasks;
  }

  getById(id: number): Task{
    const task = this.tasks.find((value) => value.id == id);
    return task;
  }

  save(task: Task): void{
    if (task.id){
      const taskArr = this.getById(task.id);
      taskArr.description = task.description;
      taskArr.completed = task.completed;
    }else{
      let lastId = 0;
      if (this.tasks.length > 0){
        lastId = this.tasks[this.tasks.length - 1].id;
      }

      task.id = lastId + 1;
      task.completed = false;
      this.tasks.push(task);
    }
    window.localStorage.setItem('lista-tarefas', JSON.stringify(this.tasks));
  }

  delete(id: number): void{
    const taskIndex = this.tasks.findIndex((value) => value.id == id);
    this.tasks.splice(taskIndex, 1);
    window.localStorage.setItem('lista-tarefas', JSON.stringify(this.tasks));
  }

}
