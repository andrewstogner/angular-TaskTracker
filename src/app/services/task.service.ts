import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs' //for if we use observables w/ a server
import {Task} from '../Task'
//import {TASKS} from '../mock-task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http:HttpClient) { }

  //If we arent using observables and using mock-task
  /*getTasks(): Task[] {
      return TASKS;
  }*/

  //if we use observables
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);  
    
    /*const tasks = of(TASKS);
      return tasks;*/
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
