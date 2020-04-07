import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo {
  id?: string;
  title: string;
  description: string;
  creationDate: string;
  editDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://test-todos-10bd3.firebaseio.com/';
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${this.url}/todos.json`).pipe(
      map(tasks => {
        if (!tasks) {
          return [];
        }
        return Object.keys(tasks).map(key => ({ ...tasks[key], id: key }));
      })
    );
  }

  createData(todo: any): Observable<Todo> {
    return this.http.post<Todo>(`${this.url}/todos.json`, todo);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/todos/${id}.json`);
  }

  editData(todo: Todo) {
    return this.http.put(`${this.url}/todos/${todo.id}.json`, todo);
  }
}
