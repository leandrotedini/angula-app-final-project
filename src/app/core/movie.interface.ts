
export interface MovieGenre {
  id: number
  name: string
}

export interface CustomList {
  description: string
  favorite_count: number
  id: number
  item_count: number
  iso_639_1: string
  list_type: string
  name: string
  poster_path: any
}

export interface QueryTokenResult {
  success: boolean
  expires_at: string
  request_token: string
}


export interface QueryResult {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface PostQueryResult {
  success: boolean
  status_code: number
  status_message: string
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  url_backdrop?: string
  favorite?: boolean
}

export interface MovieImages {
  backdrops: Backdrop[]
  id: number
  logos: any[]
  posters: Poster[]
}

export interface Backdrop {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Poster {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface MovieDetail {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  
  export interface Genre {
    id: number
    name: string
  }
  
  export interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }
