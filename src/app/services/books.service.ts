import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(`${this.API_URI}/books`);
  }

  getBook(id: string) {
    return this.http.get(`${this.API_URI}/books/${id}`);
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.API_URI}/books/${id}`);
  }

  saveBook(book: Book) {
    return this.http.post(`${this.API_URI}/books`, book);
  }

  updateBook(id: string|number, updatedGame: Book): Observable<Book> {
    return this.http.put(`${this.API_URI}/books/${id}`, updatedGame);
  }
}
