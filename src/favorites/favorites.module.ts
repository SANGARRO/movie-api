import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.entity';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Movie])],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
