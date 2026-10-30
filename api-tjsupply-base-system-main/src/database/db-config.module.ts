import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv"
config()

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: ()=>({
      type: "postgres",
      host: process.env.HOSTDB,
      port: Number(process.env.PORTDB),
      username: process.env.USERDB,
      password: process.env.PASSWORDDB,
      database: "tjsupply-base-system",
      entities: [],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
      autoLoadEntities: true,
      poolSize: 50
    })
  })]
})
export class DbConfigModule {}
