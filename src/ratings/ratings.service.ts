import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { User } from '../users/user.entity'; // Verifica la ruta
import { Movie } from '../movies/movie.entity'; // Verifica la ruta

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async rateMovie(
    userId: number,
    movieId: number,
    value: number,
  ): Promise<Rating> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const movie = await this.moviesRepository.findOneBy({ id: movieId });

    if (!user || !movie) {
      throw new Error('User or Movie not found');
    }

    const rating = this.ratingsRepository.create({ user, movie, value });
    return this.ratingsRepository.save(rating);
  }

  async getAverageRating(movieId: number): Promise<number> {
    const ratings = await this.ratingsRepository.find({
      where: { movie: { id: movieId } },
      relations: ['movie'],
    });

    if (ratings.length === 0) {
      return 0;
    }

    const average =
      ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length;
    return average;
  }
}
