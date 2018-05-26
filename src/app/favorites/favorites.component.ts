import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less']
})
export class FavoritesComponent implements OnInit {

  public tagFilter;
  public books;
  public tagList;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const tags = JSON.parse(window.localStorage.getItem('tags')) || [];
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
    const tags = JSON.parse(window.localStorage.getItem('tags')) || [];
    this.books = this.tagFilter === '' ? tags : tags
    .filter((value, index, self) => value.tag === this.tagFilter);
  }

}
