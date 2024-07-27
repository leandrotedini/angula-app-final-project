import { CustomList, Movie, PostQueryResult, QueryResult } from '../core/movie.interface';

export const FavoriteMovieAdapter = (queryResult: QueryResult, movieId: number): boolean => {
  return queryResult.results.some((movie) => movie.id === movieId)
};

export const MovieCollectionAdapter = (queryResult: QueryResult): Movie[] => {
  return queryResult.results
};
