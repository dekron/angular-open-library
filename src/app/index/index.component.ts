import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  public books;
  public offset;
  public filter = {
    genre: '',
    title: ''
  };

  constructor(private _bookService: BookService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.offset = Number(params['offset']) || 1;
      this.filter.genre = params['genre'] || '';
      this.getBooks({
        offset: this.offset,
        filter: this.filter
      });
    });
  }

  getBooks(params) {
    this._bookService.getBooks(params).subscribe(
      data => {
        this.books = data;
      },
      err => console.error(err),
      () => console.log('done loading books')
    );
  }

  setOffset(num) {
    if (this.offset + num < 1) {
      this.router.navigate([''], {queryParams: {offset: 1, genre: this.filter.genre}});
    } else {
      this.router.navigate([''], {queryParams: {offset: this.offset + num, genre: this.filter.genre}});
    }
  }

  genreUpdate(newValue) {
    this.filter.genre = newValue;
    this.navigating();
  }

  navigating() {
    this.router.navigate([''], {queryParams: {offset: this.offset, genre: this.filter.genre}});
  }
}
