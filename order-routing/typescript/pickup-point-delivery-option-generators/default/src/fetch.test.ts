import { describe, it, expect } from 'vitest';
import { fetch } from './fetch';

import { CountryCode, FunctionFetchResult, HttpRequestMethod } from '../generated/api';

describe('fetch function', () => {
  it('returns a request when country is Canada', () => {
    const result = fetch({
      deliveryAddress: {
        countryCode: CountryCode.Ca,
        longitude: 12.3,
        latitude: 45.6,
      }
    });
    const expected: FunctionFetchResult = ({
      request: {
        body: null,
        headers: [
          { name: "Accept", value: "application/json; charset=utf-8" },
        ],
        method: HttpRequestMethod.Get,
        policy: {
          readTimeoutMs: 500,
        },
        url: 'https://cdn.shopify.com/s/files/1/0628/3830/9033/files/pickup-points-external-api-v2.json?v=1714588690&lat=45.6&lon=12.3',
      }
    });

    expect(result).toEqual(expected);
  });

  it('returns no request when country is not Canada', () => {
    const result = fetch({
      deliveryAddress: {
        countryCode: CountryCode.Us,
        longitude: 12.3,
        latitude: 45.6,
      }
    });
    const expected: FunctionFetchResult = ({ request: null });

    expect(result).toEqual(expected);
  });
});
