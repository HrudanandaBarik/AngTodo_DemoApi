import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly url = "https://dummyjson.com/todos/";

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(this.url);
  }

  addTodo(data: any): Observable<any> {
    return this.http.post(this.url + "add", data);
  }

  deleteById(id: any): Observable<any> {
    return this.http.delete(this.url + id);
  }

  updateTodo(id: any, data: any): Observable<any> {
    return this.http.put(this.url + id, data);
  }
}
