import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Movie } from './movies/movie.entity';
import { Rating } from './ratings/rating.entity';
import { Favorite } from './favorites/favorite.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Admin123',
  database: 'movies_DB',
  entities: [User, Movie, Rating, Favorite],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

module.exports = { AppDataSource };
