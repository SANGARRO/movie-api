import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from '../movies/movie.entity'; // Verifica la ruta
import { User } from '../users/user.entity'; // Verifica la ruta

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.favorites)
  movie: Movie;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;
}
