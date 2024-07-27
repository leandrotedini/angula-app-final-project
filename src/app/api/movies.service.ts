import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { CustomList, Movie, MovieGenre, MovieImages, PostQueryResult, QueryResult, QueryTokenResult } from "../core/movie.interface";
import { environment } from "../environments/environment.development";
import { FavoriteMovieAdapter, MovieCollectionAdapter } from "../adapters/movie.adapter";

const { apiKey, apiUrl, account_id, auth_token } = environment

@Injectable({ providedIn: 'root' })
export class MoviesService {

  private tokenKey = 'token'
  private favoriteMoviesKey = 'favoriteMovies'

  private httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${auth_token}`
  });

  private favoriteMoviesId!: number[]

  private readonly _http = inject(HttpClient)

  constructor() { }

  getApiToken(): Observable<QueryTokenResult> {
    return this._http.get<QueryTokenResult>(`${apiUrl}authentication/token/new?api_key=${apiKey}`)
      .pipe(map((res) => {
        if (res.success) {
          localStorage.setItem(this.tokenKey, res.request_token);
        }
        return res;
      }))

  }

  // Esto es horrible, tengo que mejorarlo
  getToken(): string | null{
    let token = localStorage.getItem(this.tokenKey);
    if (!token) {
      console.log('llamada a la api')
      this.getApiToken().subscribe({
        next: (res: any) => {
          console.log('suscribe')
          token = localStorage.getItem(this.tokenKey)
        },
        error: (error) => console.log(error)
      });
    }
    return token;
  }

  // No entiendo por que no funciona pero no me interesa :)
  getUserAuth(): Observable<any> {
    const token = this.getToken()
    console.log('URL: ', `https://www.themoviedb.org/authenticate/${token}`)
    return this._http.get<any>(`https://www.themoviedb.org/authenticate/${token}`)
  }

  postCreateSession(): Observable<any> {
    const token = this.getToken()
    console.log('URL: ', `${apiUrl}movie/11?api_key=${apiKey}`)
    return this._http.get<any>(`https://www.themoviedb.org/authenticate/${token}`)
  }

  getAllMovies(): Observable<Movie> {
    return this._http.get<Movie>(`${apiUrl}movie/11?api_key=${apiKey}`)
  }

  getMoviesGenres(): Observable<MovieGenre[]> {
    return this._http.get<MovieGenre[]>(`${apiUrl}genre/movie/list?api_key=${apiKey}`)
  }

  getMoviesByGenres(genreId: Number): Observable<Movie> {
    return this._http.get<Movie>(`${apiUrl}discover/movie?api_key=${apiKey}&with_genres=${genreId.toString()}`)
  }

  getMoviesTopRated(): Observable<QueryResult> {
    return this._http.get<QueryResult>(`${apiUrl}movie/top_rated?api_key=${apiKey}`)
  }

  getMovieImages(movieId: Number): Observable<MovieImages> {
    return this._http.get<MovieImages>(`${apiUrl}movie/${movieId}/images?api_key=${apiKey}`)

  }

  getWatchListMovies(): Observable<Movie[]> {
    return this._http
      .get<QueryResult>(`${apiUrl}account/${account_id}/watchlist/movies`, { headers: this.httpHeaders })
      .pipe(map((res) => MovieCollectionAdapter(res)))
  }

  getFavoriteMovies(): Observable<QueryResult> {
    return this._http.get<QueryResult>(`${apiUrl}account/${account_id}/favorite/movies`, { headers: this.httpHeaders })
  }

  getIsFavoriteMovie(movieId: number): Observable<boolean> {
    return this._http
      .get<QueryResult>(`${apiUrl}account/${account_id}/favorite/movies`, { headers: this.httpHeaders })
      .pipe(map((res) => FavoriteMovieAdapter(res, movieId)))
  }

  getCustomListMovies(): Observable<CustomList[]> {
    return this._http
      .get<QueryResult>(`${apiUrl}account/${account_id}/lists`, { headers: this.httpHeaders })
      .pipe(map((res: any) => res.results))
  }

  postLikeMovie(movieId: Number): Observable<PostQueryResult> {
    return this._http.post<PostQueryResult>(`${apiUrl}3/movie/${movieId}/rating?api_key=${apiKey}`, { "value": 8.5 })
  }

  postAddToFavorite(movieId: Number, favorite: boolean): Observable<PostQueryResult> {
    return this._http
      .post<PostQueryResult>(`${apiUrl}account/${account_id}/favorite`, {
        "media_type": "movie",
        "media_id": movieId,
        "favorite": favorite
      },
      { headers: this.httpHeaders }
    )
  }

  postAddToWatchList(movieId: Number): Observable<PostQueryResult> {
    return this._http
      .post<PostQueryResult>(`${apiUrl}account/${account_id}/watchlist`, {
        "media_type": "movie",
        "media_id": movieId,
        "watchlist": true
      },
      { headers: this.httpHeaders }
    )
  }

  postAddToCustomList(movieId: number, listId: number): Observable<PostQueryResult> {
    return this._http
      .post<PostQueryResult>(`${apiUrl}list/${listId}/add_item`, {"media_id": movieId},
      { headers: this.httpHeaders }
    )
  }

}