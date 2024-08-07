import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { User } from '../users/user.entity'; // Ajusta la ruta según tu estructura de carpetas
import { Movie } from '../movies/movie.entity'; // Ajusta la ruta según tu estructura de carpetas

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async addFavorite(userId: number, movieId: number): Promise<Favorite> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const movie = await this.moviesRepository.findOne({
      where: { id: movieId },
    });

    if (!user || !movie) {
      throw new Error('User or Movie not found');
    }

    const favorite = this.favoritesRepository.create({ user, movie });
    return this.favoritesRepository.save(favorite);
  }

  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return this.favoritesRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'],
    });
  }

  async removeFavorite(userId: number, movieId: number): Promise<void> {
    const result = await this.favoritesRepository.delete({
      user: { id: userId },
      movie: { id: movieId },
    });
    if (result.affected === 0) {
      throw new Error('Favorite not found');
    }
  }
}
