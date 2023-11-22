import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
    constructor(private readonly configService: ConfigService){
        super({
            datasources:{
                db: { 
                    url: configService.get("DATABASE_URL")
                } 
            }
        })

    }
    async onModuleInit() {
        this.$connect
    }
    async onModuleDestroy() {
        this.$disconnect
    }
}
