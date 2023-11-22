import { Controller, Get } from "@nestjs/common";
import { Public } from "src/common/decorator";

@Controller('')
export class PrismaController {
    @Get("/")
    @Public()
    getHello(){
       return "hello";

    }

}