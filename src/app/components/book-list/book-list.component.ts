import { Component, OnInit, HostBinding } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  books: any = [];

  constructor(private bookservice: BooksService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookservice.getBooks().subscribe({
      next: (res) => {
        this.books = res.data;
        console.log('res', res);
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }

  deleteBook(id: string) {
    this.bookservice.deleteBook(id)
      .subscribe(
        res => {
          console.log(res);
          this.getBooks();
        },
        err => console.error(err)
      )
  }
}
