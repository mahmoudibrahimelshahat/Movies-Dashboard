import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apiURLMovies = 'https://test-api.storexweb.com/api/movies';
  apiUrlCategory = 'https://test-api.storexweb.com/api/category';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<{ message: Movie[] }> {
    return this.http.get<{ message: Movie[] }>(this.apiURLMovies);
  }

  getCategories(): Observable<{ message: Category[] }> {
    return this.http.get<{ message: Category[] }>(this.apiUrlCategory);
  }

  getMovieDetails(id:string): Observable<any>{
    return this.http.get<{ message: Movie }>(`${this.apiURLMovies}/${id}`)
  }
  deleteMovie(movieId: number): Observable<{ message: Movie[] }> {
    return this.http.delete<{ message: Movie[] }>(this.apiURLMovies + "/" + movieId);
  }

  postMovie(movieData: FormData): Observable<any> {
    return this.http.post<{ message: Movie }>(this.apiURLMovies, movieData);
  }

  editMovie(movieData: FormData, movieId: any): Observable<any> {
    return this.http.put<{ message: Movie[] }>(this.apiURLMovies+ `/${movieId}`,movieData);
  }

}
