import { describe, it, expect } from 'vitest';
import { run } from './run';
import { CountryCode, FunctionRunResult, Weekday } from '../generated/api';


describe('run function', () => {
  it('returns operations when fetch result is successful', () => {
    const result = run({
      fetchResult: {
        status: 200,
        body: JSON.stringify({
          deliveryPoints: [
            {
              location: {
                addressComponents: {
                  country: 'Canada',
                  countryCode: 'CA',
                  streetNumber: '123',
                  route: 'Main St',
                  locality: 'Toronto',
                  administrativeArea: {
                    name: 'Ontario',
                    code: 'ON'
                  },
                  postalCode: 'M5V 2T6',
                },
                geometry: {
                  location: {
                    lat: 43.70,
                    lng: -79.42,
                  },
                },
              },
              openingHours: {
                weekdayText: [
                  'Monday: 9:00 AM – 5:00 PM',
                  'Tuesday: 9:00 AM – 5:00 PM',
                  'Wednesday: 9:00 AM – 5:00 PM',
                  'Thursday: 9:00 AM – 5:00 PM',
                  'Friday: 9:00 AM – 5:00 PM',
                  'Saturday: Closed',
                  'Sunday: Closed',
                ],
              },
              pointId: '1',
              pointName: 'Point 1',
            },
          ],
        }),
      },
    });

    const expected: FunctionRunResult = {
      operations: [
        {
          add: {
            cost: null,
            pickupPoint: {
              address: {
                address1: '123 Main St',
                address2: null,
                city: 'Toronto',
                country: 'Canada',
                countryCode: CountryCode.Ca,
                latitude: 43.70,
                longitude: -79.42,
                phone: null,
                province: 'Ontario',
                provinceCode: 'ON',
                zip: 'M5V 2T6',
              },
              businessHours: [
                { day: Weekday.Monday, periods: [{ openingTime: '09:00:00', closingTime: '17:00:00' }] },
                { day: Weekday.Tuesday, periods: [{ openingTime: '09:00:00', closingTime: '17:00:00' }] },
                { day: Weekday.Wednesday, periods: [{ openingTime: '09:00:00', closingTime: '17:00:00' }] },
                { day: Weekday.Thursday, periods: [{ openingTime: '09:00:00', closingTime: '17:00:00' }] },
                { day: Weekday.Friday, periods: [{ openingTime: '09:00:00', closingTime: '17:00:00' }] },
                { day: Weekday.Saturday, periods: [] },
                { day: Weekday.Sunday, periods: [] },
              ],
              provider: {
                name: 'Shopify TypeScript Demo',
                logoUrl: 'https://cdn.shopify.com/s/files/1/0628/3830/9033/files/shopify_icon_146101.png?v=1706120545',
              },
              externalId: '1',
              name: 'Point 1',
            },
          },
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  it('returns no operations when fetch result is unsuccessful', () => {
    const result = run({
      fetchResult: {
        status: 404,
        body: null,
      },
    });
    const expected: FunctionRunResult = {
      operations: []
    }

    expect(result).toEqual(expected);
  });

  it("returns an add operation with null pickup point business hours when the external API's delivery point has null opening hours", () => {
    const result = run({
      fetchResult: {
        status: 200,
        body: JSON.stringify({
          deliveryPoints: [
            {
              location: {
                addressComponents: {
                  country: 'Canada',
                  countryCode: 'CA',
                  streetNumber: '123',
                  route: 'Main St',
                  locality: 'Toronto',
                  administrativeArea: {
                    name: 'Ontario',
                    code: 'ON'
                  },
                  postalCode: 'M5V 2T6',
                },
                geometry: {
                  location: {
                    lat: 43.70,
                    lng: -79.42,
                  },
                },
              },
              openingHours: null,
              pointId: '1',
              pointName: 'Point 1',
            },
          ],
        }),
      },
    });

    const expected: FunctionRunResult = {
      operations: [
        {
          add: {
            cost: null,
            pickupPoint: {
              address: {
                address1: '123 Main St',
                address2: null,
                city: 'Toronto',
                country: 'Canada',
                countryCode: CountryCode.Ca,
                latitude: 43.70,
                longitude: -79.42,
                phone: null,
                province: 'Ontario',
                provinceCode: 'ON',
                zip: 'M5V 2T6',
              },
              businessHours: null,
              provider: {
                name: 'Shopify TypeScript Demo',
                logoUrl: 'https://cdn.shopify.com/s/files/1/0628/3830/9033/files/shopify_icon_146101.png?v=1706120545',
              },
              externalId: '1',
              name: 'Point 1',
            },
          },
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});
