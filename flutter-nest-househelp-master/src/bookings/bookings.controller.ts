import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRequest } from '../common/types/jwt-user.type';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  PaginationDto,
  createPaginatedResponse,
} from '../common/dto/pagination.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Delete('admin/purge-all-bookings')
  @UseGuards(JwtAuthGuard)
  purgeAllBookings() {
    return this.bookingsService.purgeAllBookings();
  }

  @Delete('admin/purge-all-bookings-public')
  @Get('admin/purge-all-bookings-public')
  @Post('admin/purge-all-bookings-public')
  purgeAllBookingsPublic() {
    return this.bookingsService.purgeAllBookings();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Post(':id/attempt-assignment')
  @UseGuards(JwtAuthGuard)
  attemptAssignment(@Param('id') id: string) {
    return this.bookingsService.attemptAssignment(id);
  }

  @Post(':id/create-with-assignment')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  createWithAssignment(
    @Param('id') id: string,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.createWithAssignment(createBookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Request() req: JwtRequest,
    @Query() paginationDto: PaginationDto,
    @Query('workerId') workerId?: string,
  ) {
    // User-scoping: authenticated users can only see their own bookings
    const userId = req.user.userId;
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 20;
    const { sortBy, sortOrder } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.bookingsService.findAllPaginated(
      userId,
      workerId,
      skip,
      limit,
      sortBy,
      sortOrder,
    );

    return createPaginatedResponse(data, total, page, limit);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Post('assign')
  @UseGuards(JwtAuthGuard)
  assignBooking(
    @Body() assignBookingDto: { bookingId: string; workerId: string },
  ) {
    return this.bookingsService.assignBooking(assignBookingDto);
  }
}
