import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from './ratings.service';
import { Rating } from './rating.entity';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, User, Movie])],
  providers: [RatingsService],
  exports: [RatingsService],
})
export class RatingsModule {}