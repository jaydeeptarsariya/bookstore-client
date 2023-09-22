import { Component, HostBinding, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit{

  @HostBinding('class') clases = 'row';

  book: Book = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false;

  constructor(private bookService: BooksService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params['id']) {
      this.bookService.getBook(params['id']).subscribe({
        next: (res: any) => {
          console.log(res);
          this.book = res.data[0];
          this.edit = true;
        },
        error: (err: any) => { },
        complete: () => { },
      })
    }
  }

  saveNewBook() {
    delete this.book.created_at;
    delete this.book.id;
    this.bookService.saveBook(this.book).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  updateBook() {
    let id: any = this.book.id
    delete this.book.created_at;
    this.bookService.updateBook(id, this.book).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
