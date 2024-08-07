import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity'; // Verifica la ruta
import { Movie } from '../movies/movie.entity'; // Verifica la ruta

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  movie: Movie;

  @Column()
  value: number;
}
