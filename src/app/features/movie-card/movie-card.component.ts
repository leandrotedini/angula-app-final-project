import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
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
import {MatIconModule} from '@angular/material/icon';
import { Movie, PostQueryResult } from '../../core/movie.interface';
import { environment } from '../../environments/environment.development';
import { MoviesService } from '../../api/movies.service';
import { Observable, of } from 'rxjs';
import { MovieCustomListsComponent } from '../movie-custom-lists/movie-custom-lists.component';

const { imgUrl } = environment;

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements OnInit{

  private moviesSvc = inject(MoviesService)

  readonly dialogRef = inject(MatDialogRef<MovieCardComponent>);
  readonly movie = inject<Movie>(MAT_DIALOG_DATA);
  fullImageUrl!: string;
  //Esto tal vez deberia ser una signal
  favorite$: Observable<boolean> = this.moviesSvc.getIsFavoriteMovie(this.movie.id)
  readonly dialog = inject(MatDialog);


  ngOnInit(): void {
    this.fullImageUrl = imgUrl + this.movie.poster_path
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToFavorite(movieId: number, favorite: boolean) {
    this.moviesSvc.postAddToFavorite(movieId, !favorite).subscribe({
      next: (res: PostQueryResult) => {
        this.favorite$ = of(!favorite);
      },
      error: (error) => console.log(error)
    })    
  }

  testFn() {
      this.moviesSvc.getCustomListMovies().subscribe({
      next: (res: any) => {
      },
      error: (error) => console.log(error)
    })
  }

  openDialog(movieId: number): void {
    const dialogRef = this.dialog.open(MovieCustomListsComponent, {
      data: movieId,
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
