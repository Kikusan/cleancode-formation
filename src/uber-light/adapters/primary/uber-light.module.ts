import { Module } from '@nestjs/common';
import { BookingController } from './controllers/bookingController';
import { BookUber } from '../../business-logic/usecases/bookUber';
import { FakeAddressGeolocator } from "../secondary/gateways/address-geolocation/fakeAddressGeolocator";
import { RandomUuidGenerator } from "../secondary/gateways/uuid-generation/randomUuidGenerator";
import { DeterministicDateProvider } from "../secondary/gateways/date-provision/deterministicDateProvider";
import { KnexBookingRepository } from "../secondary/gateways/repositories/sql/knexBookingRepository";
import knex from "knex";
import knexConfig from "../secondary/gateways/database-config/knexfile";
import { KnexTravellerRepository } from "../secondary/gateways/repositories/sql/knexTravellerRepository";

const sqlConnection = knex(knexConfig.development);

export const UberLightModuleConfig = {
  imports: [],
  controllers: [BookingController],
  providers: [
    {
      provide: BookUber,
      useFactory: (
        bookingRepository,
        uuidGenerator,
        addressGeolocator,
        travellerRepository,
      ) => {
        const dateProvider = new DeterministicDateProvider();
        dateProvider.dateNow = new Date(2009, 3, 4);
        return new BookUber(
          bookingRepository,
          uuidGenerator,
          addressGeolocator,
          travellerRepository,
          dateProvider,
        );
      },
      inject: [
        'bookingRepository',
        'uuidGenerator',
        'addressGeolocator',
        'travellerRepository',
      ],
    },
    {
      provide: 'bookingRepository',
      useValue: new KnexBookingRepository(sqlConnection),
    },
    {
      provide: 'uuidGenerator',
      useClass: RandomUuidGenerator,
    },
    {
      provide: 'addressGeolocator',
      useClass: FakeAddressGeolocator,
    },
    {
      provide: 'travellerRepository',
      useValue: new KnexTravellerRepository(sqlConnection),
    },
  ],
};

@Module(UberLightModuleConfig)
export class UberLightModule { }
