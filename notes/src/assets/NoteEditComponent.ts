<a [routerLink]="['../notes', item.id ]" class="btn btn-secondary">Edit</a>


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html'
})
export class NoteEditComponent implements OnInit {

  id: string;
  note: Note;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Note()); }
          return this.noteService.findById(id);
        })
      )
      .subscribe(note => {
          this.note = note;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.noteService.save(this.note).subscribe(
      note => {
        this.note = note;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/notes']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/notes']);
  }
}



--- a/notes/src/app/note/note-edit/note-edit.component.ts
+++ b/notes/src/app/note/note-edit/note-edit.component.ts
@@ -30,11 +29,13 @@ export class NoteEditComponent implements OnInit {
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Note()); }
+          this.id = id;
          return this.noteService.findById(id);
        })
      )
      .subscribe(note => {
          this.note = note;
+          this.note.id = +note.id;
          this.feedback = {};
        },
        err => {
@@ -47,6 +48,7 @@ export class NoteEditComponent implements OnInit {
    this.noteService.save(this.note).subscribe(
      note => {
        this.note = note;
+        this.note.id = +this.id;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/notes']);