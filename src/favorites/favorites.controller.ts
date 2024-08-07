import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('add')
  async addFavorite(
    @Body('userId') userId: number,
    @Body('movieId') movieId: number,
  ): Promise<Favorite> {
    return this.favoritesService.addFavorite(userId, movieId);
  }

  @Get('user/:userId')
  async getUserFavorites(@Param('userId') userId: number): Promise<Favorite[]> {
    return this.favoritesService.getUserFavorites(userId);
  }

  @Delete('remove')
  async removeFavorite(
    @Body('userId') userId: number,
    @Body('movieId') movieId: number,
  ): Promise<void> {
    await this.favoritesService.removeFavorite(userId, movieId);
  }
}
