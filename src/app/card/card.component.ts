import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  public id;
  public tag;
  public book = {
    title: '',
    authors: []
  };

  constructor(private _bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getBook(this.id);

    this.tag = this.getTag();
  }

  getBook(isbn) {
    this._bookService.getBook(isbn).subscribe(
      data => {
        this.book = data[Object.keys(data)[0]];
      },
      err => console.error(err),
      () => console.log('done loading books')
    );
  }

  getTag() {
    const tags = JSON.parse(window.localStorage.getItem('tags'));
    if (!tags) { return ''; }

    const tag = tags.find((el) => {
      return el.id === this.id;
    });

    return tag ? tag.tag : '';
  }

  setTag(tag) {
    const tags = JSON.parse(window.localStorage.getItem('tags')) || [];
    const oldIndex = tags.indexOf(tags.find((el) => el.id === this.id));

    if (oldIndex >= 0) {
      tags.splice(oldIndex, 1);
    }

    if (tag === '') {
      this.tag = null;
      window.localStorage.setItem('tags', JSON.stringify(tags));
      return;
    }

    this.tag = tag;
    const newTag = {
      tag: tag,
      id: this.id,
      title: this.book.title
    };

    tags.push(newTag);
    window.localStorage.setItem('tags', JSON.stringify(tags));

  }

  tagChanged(e) {
    this.setTag(e.target.value);
  }
}
