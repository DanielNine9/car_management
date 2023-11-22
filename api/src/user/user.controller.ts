import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
  Body,
  Global,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Admin, AllUser } from '../common/decorator/role.decorator';
import { RoleGuard } from '../common/guard/role';
import { UserUpdateDTO } from './dto/user.dto';
import { User } from '../common/decorator/userInfo.decorator';
import { Public } from '../common/decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/my-seller')
  @Public()
  getSellers() {
    return this.userService.getSellers();
  }

  @Get()
  @UseGuards(RoleGuard)
  @Admin()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:userId')
  @UseGuards(RoleGuard)
  // @Admin()
  @Public()
  getUser(@Param('userId', ParseIntPipe) param) {
    return this.userService.getUser(param);
  }

  @Get('/userGlobal/:userId')
  @UseGuards(RoleGuard)
  @Public()
  getUserGlobal(@Param('userId', ParseIntPipe) param) {
    return this.userService.getUserGlobal(param);
  }

  @Delete('/:userId')
  @UseGuards(RoleGuard)
  @Admin()
  deleteUser(@Param('userId', ParseIntPipe) param) {
    return this.userService.deleteUser(param);
  }

  @Put('/:userId')
  @UseGuards(RoleGuard)
  @Admin()
  updateUser(
    @Param('userId', ParseIntPipe) param,
    @Body() body: UserUpdateDTO,
    @User() user,
  ) {
    return this.userService.updateUser(param, body, user);
  }

  
  @Get('/reveune/:userId')
  @UseGuards(RoleGuard)
  @Public()
  getReveune(@Param('userId', ParseIntPipe) param) {
    return this.userService.revenueById(param);
  }
  

    

}
