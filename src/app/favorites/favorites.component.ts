import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../book.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less']
})
export class FavoritesComponent implements OnInit {

  public tagFilter;
  public books;
  public tagList;

  constructor(private route: ActivatedRoute, private router: Router, private _bookService: BookService) {
  }

  ngOnInit() {
    const tags = this._bookService.getTags();
    this.books = tags;
    this.tagList = tags
    .map((el) => el.tag)
    .filter((value, index, self) => self.indexOf(value) === index);

    this.route.queryParams.subscribe(params => {
      this.tagFilter = params['tag'] || '';
      this.getBooks();
    });
  }

  tagUpdate(tag) {
    this.tagFilter = tag;
    this.router.navigate(['favorites'], {queryParams: {tag: this.tagFilter}});
  }

  getBooks() {
    const tags = this._bookService.getTags();
    this.books = this.tagFilter === '' ? tags : tags
    .filter((value) => value.tag === this.tagFilter);
  }
}
