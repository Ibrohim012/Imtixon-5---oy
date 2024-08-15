import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MealsModule } from './meals/meals.module';
import { OrdersModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { RestaurantsModule } from './restaurant/restaurant.module';
import { CategoryModule } from './categories/categories.module';
import { OrderItemsModule } from './order_item/order_item.module';
import { PaymentsModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: "gmail",
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASS'),
          },
        },
        defaults: {
          from: 'No reply <officialbegzodbek@gmail.com>',
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule, 
    AuthModule,
    UserModule,
    MealsModule,
    OrdersModule,
    ReviewModule,
    RestaurantsModule,
    CategoryModule,
    OrderItemsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
