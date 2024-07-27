import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MoviesService } from '../../api/movies.service';
import { CustomList } from '../../core/movie.interface';


@Component({
  selector: 'app-movie-custom-lists',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './movie-custom-lists.component.html',
  styleUrl: './movie-custom-lists.component.css'
})
export class MovieCustomListsComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<MovieCustomListsComponent>);
  readonly movieId = inject<number>(MAT_DIALOG_DATA);
  private moviesSvc = inject(MoviesService)
  customMovieLists: CustomList[] = [] 


  ngOnInit(): void {
    this.loadMovieLists()
  }

  loadMovieLists() {
    this.moviesSvc.getCustomListMovies().subscribe({
      next: (res:any) => {
        this.customMovieLists = res;
      },
      error: (error) => console.log(error)
    })
  }
  
  addToList(listId: number) {
    this.moviesSvc.postAddToCustomList(this.movieId, listId).subscribe({
      next: (res:any) => {
        console.log(res)
      },
      error: (error) => console.log(error)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
