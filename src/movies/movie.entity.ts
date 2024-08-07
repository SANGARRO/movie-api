import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favorite } from '../favorites/favorite.entity'; // Verifica la ruta
import { Rating } from '../ratings/rating.entity'; // Verifica la ruta

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Favorite, (favorite) => favorite.movie)
  favorites: Favorite[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];
}
