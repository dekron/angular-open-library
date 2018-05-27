import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BookService {

  constructor(private http: HttpClient) {}
  getBooks(params) {
    let filter = '';
    if (params.filter && params.filter.genre !== '') {
      filter += `&subjects=${params.filter.genre}`;
    }
    if (params.filter && params.filter.title !== '') {
      filter += `&title=${params.filter.title}`;
    }
    return this.http.get(`http://openlibrary.org/query.json?type=/type/edition&limit=50&*=&offset=${params.offset}` + filter);
  }
  /*

  searchBooks(params) {
    let filter = '';
    if (params.filter.genre !== '') {
      filter += `subject:%20"${params.filter.genre}"%20`;
    }
    if (params.filter.title !== '') {
      filter += `title:%20"${params.filter.title}"`;
    }
    return this.http.get(`https://openlibrary.org/search.json?q=${filter}&limit=10&mode=ebooks`);
  }
*/
  getBook(OLID) {
    return this.http.get(`https://openlibrary.org/api/books?bibkeys=OLID:${OLID}&jscmd=data&format=json`);
  }

  getTags() {
    return JSON.parse(window.localStorage.getItem('tags')) || [];
  }

  saveTags(tags) {
    window.localStorage.setItem('tags', JSON.stringify(tags));
  }
}
