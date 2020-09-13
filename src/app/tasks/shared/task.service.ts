import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

   url = 'http://localhost:3000/tasks';

  getAll(): Observable<Task[]>{
    return this.http.get<Task[]>(`${environment.api}/tasks`);
  }

  getById(id: string): Observable<Task>{
    return this.http.get<Task>(`${environment.api}/tasks/${id}`);
  }

  save(task: Task): Observable<Task>{
    if (task._id){
      return this.http.put<Task>(`${environment.api}/tasks/${task._id}`, task);
    }else{
      return this.http.post<Task>(`${environment.api}/tasks`, task);
    }
  }

  delete(id: string): Observable<Task>{
    return this.http.delete<Task>(`${environment.api}/tasks/${id}`);
  }

}
