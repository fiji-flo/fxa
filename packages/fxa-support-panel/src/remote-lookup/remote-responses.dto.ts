/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Note that these `*.Response` interfaces are purely for access to known
// response keys and not an attempt to validate the return payloads from
// the database.

interface Subscription {
  created: string;
  current_period_end: string;
  current_period_start: string;
  plan_changed: string;
  previous_product: string;
  product_name: string;
  status: string;
  subscription_id: string;
}

export interface SubscriptionResponse extends Array<Subscription> {}

interface SigninLocation {
  city: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  lastAccessTime: number | Date;
}

export interface SigninLocationResponse extends Array<SigninLocation> {}

export interface TotpTokenResponse {
  sharedSecret: string;
  epoch: number;
  verified: boolean;
  enabled: boolean;
}

/** SupportController configuration */
export type SupportConfig = {
  authHeader: string;
  authServer: {
    secretBearerToken: string;
    signinLocationsSearchPath: string;
    subscriptionsSearchPath: string;
    url: string;
  };
};
