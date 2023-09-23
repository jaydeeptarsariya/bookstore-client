import { Component, OnInit, HostBinding } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  books: any = [];

  constructor(private bookservice: BooksService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getBooks();
  }

  openConfirmationDialog(bookId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // User confirmed the delete action
        this.deleteBook(bookId);
      }
    });
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
    this.bookservice.deleteBook(id).subscribe(
      (res) => {
        console.log(res);
        this.getBooks();
      },
      (err) => console.error(err)
    );
  }
}
