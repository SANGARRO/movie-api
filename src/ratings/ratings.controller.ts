import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Rating } from './rating.entity';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('rate')
  async rateMovie(
    @Body('userId') userId: number,
    @Body('movieId') movieId: number,
    @Body('value') value: number,
  ): Promise<Rating> {
    if (!userId || !movieId || value === undefined) {
      throw new HttpException('Invalid input data', HttpStatus.BAD_REQUEST);
    }

    return this.ratingsService.rateMovie(userId, movieId, value);
  }

  @Get('average/:movieId')
  async getAverageRating(@Param('movieId') movieId: number): Promise<number> {
    if (!movieId) {
      throw new HttpException('Invalid movie ID', HttpStatus.BAD_REQUEST);
    }

    return this.ratingsService.getAverageRating(movieId);
  }
}
