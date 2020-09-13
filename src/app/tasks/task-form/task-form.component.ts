import { TaskService } from './../shared/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  task: Task = new Task();
  title = 'Nova Tarefa';

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    if (id){
      this.taskService.getById(id).subscribe(data => {
        this.task = data;
      });
      this.title = 'Atualizando tarefa';
    }
  }

  onSubmit(): void{
    this.taskService.save(this.task).subscribe(
      data => {
        if ( this.title === 'Atualizando tarefa'){
          alert('Tarefa alterada com sucesso!');
        }else{
          alert('Tarefa incluída com sucesso!');
        }
      }
    );
    this.router.navigate(['']);
  }

}
