export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date and time string.
   * For example, 3:50 pm on September 7, 2019 in the time zone of UTC (Coordinated Universal Time) is
   * represented as `"2019-09-07T15:50:00Z`".
   */
  DateTime: any;
  /**
   * A signed decimal number, which supports arbitrary precision and is serialized as a string.
   *
   * Example values: `"29.99"`, `"29.999"`.
   */
  Decimal: any;
  /**
   * Represents an [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) and
   * [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987)-compliant URI string.
   *
   * For example, `"https://johns-apparel.myshopify.com"` is a valid URL. It includes a scheme (`https`) and a host
   * (`johns-apparel.myshopify.com`).
   */
  URL: any;
  /** A void type that can be used to return a null value from a mutation. */
  Void: any;
};

/** Represents a generic custom attribute. */
export type Attribute = {
  __typename?: 'Attribute';
  /** Key or name of the attribute. */
  key: Scalars['String'];
  /** Value of the attribute. */
  value?: Maybe<Scalars['String']>;
};

/** Represents information about the buyer that is interacting with the cart. */
export type BuyerIdentity = {
  __typename?: 'BuyerIdentity';
  /** The customer associated with the cart. */
  customer?: Maybe<Customer>;
  /** The email address of the buyer that is interacting with the cart. */
  email?: Maybe<Scalars['String']>;
  /** Whether the buyer authenticated with a customer account. */
  isAuthenticated: Scalars['Boolean'];
  /** The phone number of the buyer that is interacting with the cart. */
  phone?: Maybe<Scalars['String']>;
  /** The purchasing company associated with the cart. */
  purchasingCompany?: Maybe<PurchasingCompany>;
};

/** A cart represents the merchandise that a buyer intends to purchase, and the cost associated with the cart. */
export type Cart = {
  __typename?: 'Cart';
  /** The attributes associated with the cart. Attributes are represented as key-value pairs. */
  attribute?: Maybe<Attribute>;
  /** Information about the buyer that is interacting with the cart. */
  buyerIdentity?: Maybe<BuyerIdentity>;
  /** A list of lines containing information about the items the customer intends to purchase. */
  lines: Array<CartLine>;
};


/** A cart represents the merchandise that a buyer intends to purchase, and the cost associated with the cart. */
export type CartAttributeArgs = {
  key?: InputMaybe<Scalars['String']>;
};

/** Represents information about the merchandise in the cart. */
export type CartLine = {
  __typename?: 'CartLine';
  /**
   * Retrieve a cart line attribute by key.
   *
   * Cart line attributes are also known as line item properties in Liquid.
   */
  attribute?: Maybe<Attribute>;
  /** The cost of the merchandise line that the buyer will pay at checkout. */
  cost: CartLineCost;
  /** The ID of the cart line. */
  id: Scalars['ID'];
  /** The merchandise that the buyer intends to purchase. */
  merchandise: Merchandise;
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars['Int'];
  /**
   * The selling plan associated with the cart line and the effect that each
   * selling plan has on variants when they're purchased.
   */
  sellingPlanAllocation?: Maybe<SellingPlanAllocation>;
};


/** Represents information about the merchandise in the cart. */
export type CartLineAttributeArgs = {
  key?: InputMaybe<Scalars['String']>;
};

/** The cost of the merchandise line that the buyer will pay at checkout. */
export type CartLineCost = {
  __typename?: 'CartLineCost';
  /** The amount of the merchandise line. */
  amountPerQuantity: MoneyV2;
  /** The compare at amount of the merchandise line. */
  compareAtAmountPerQuantity?: Maybe<MoneyV2>;
  /** The cost of the merchandise line before line-level discounts. */
  subtotalAmount: MoneyV2;
  /** The total cost of the merchandise line. */
  totalAmount: MoneyV2;
};

export type CartLineInput = {
  /** The ID of the cart line. */
  cartLineId: Scalars['ID'];
  /** The quantity of the cart line to be merged.The max quantity is 50. */
  quantity: Scalars['Int'];
};

/** An operation to apply to the Cart. */
export type CartOperation =
  { expand: ExpandOperation; merge?: never; }
  |  { expand?: never; merge: MergeOperation; };

/** A customization which applies cart transformations to the merchandise lines. */
export type CartTransform = HasMetafields & {
  __typename?: 'CartTransform';
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};


/** A customization which applies cart transformations to the merchandise lines. */
export type CartTransformMetafieldArgs = {
  key: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
};

/** Represents whether the product is a member of the given collection. */
export type CollectionMembership = {
  __typename?: 'CollectionMembership';
  /** The ID of the collection. */
  collectionId: Scalars['ID'];
  /** Whether the product is a member of the collection. */
  isMember: Scalars['Boolean'];
};

/** Represents information about a company which is also a customer of the shop. */
export type Company = HasMetafields & {
  __typename?: 'Company';
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was created in Shopify. */
  createdAt: Scalars['DateTime'];
  /** A unique externally-supplied ID for the company. */
  externalId?: Maybe<Scalars['String']>;
  /** The ID of the company. */
  id: Scalars['ID'];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The name of the company. */
  name: Scalars['String'];
  /** The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at which the company was last modified. */
  updatedAt: Scalars['DateTime'];
};


/** Represents information about a company which is also a customer of the shop. */
export type CompanyMetafieldArgs = {
  key: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
};

/** A company's main point of contact. */
export type CompanyContact = {
  __typename?: 'CompanyContact';
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company contact was created in Shopify.
   */
  createdAt: Scalars['DateTime'];
  /** The ID of the company. */
  id: Scalars['ID'];
  /** The company contact's locale (language). */
  locale?: Maybe<Scalars['String']>;
  /** The company contact's job title. */
  title?: Maybe<Scalars['String']>;
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company contact was last modified.
   */
  updatedAt: Scalars['DateTime'];
};

/** A company's location. */
export type CompanyLocation = HasMetafields & {
  __typename?: 'CompanyLocation';
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company location was created in Shopify.
   */
  createdAt: Scalars['DateTime'];
  /** A unique externally-supplied ID for the company. */
  externalId?: Maybe<Scalars['String']>;
  /** The ID of the company. */
  id: Scalars['ID'];
  /** The preferred locale of the company location. */
  locale?: Maybe<Scalars['String']>;
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The name of the company location. */
  name: Scalars['String'];
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601))
   * at which the company location was last modified.
   */
  updatedAt: Scalars['DateTime'];
};


/** A company's location. */
export type CompanyLocationMetafieldArgs = {
  key: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
};

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 */
export enum CurrencyCode {
  /** United Arab Emirates Dirham (AED). */
  Aed = 'AED',
  /** Afghan Afghani (AFN). */
  Afn = 'AFN',
  /** Albanian Lek (ALL). */
  All = 'ALL',
  /** Armenian Dram (AMD). */
  Amd = 'AMD',
  /** Netherlands Antillean Guilder. */
  Ang = 'ANG',
  /** Angolan Kwanza (AOA). */
  Aoa = 'AOA',
  /** Argentine Pesos (ARS). */
  Ars = 'ARS',
  /** Australian Dollars (AUD). */
  Aud = 'AUD',
  /** Aruban Florin (AWG). */
  Awg = 'AWG',
  /** Azerbaijani Manat (AZN). */
  Azn = 'AZN',
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  Bam = 'BAM',
  /** Barbadian Dollar (BBD). */
  Bbd = 'BBD',
  /** Bangladesh Taka (BDT). */
  Bdt = 'BDT',
  /** Bulgarian Lev (BGN). */
  Bgn = 'BGN',
  /** Bahraini Dinar (BHD). */
  Bhd = 'BHD',
  /** Burundian Franc (BIF). */
  Bif = 'BIF',
  /** Bermudian Dollar (BMD). */
  Bmd = 'BMD',
  /** Brunei Dollar (BND). */
  Bnd = 'BND',
  /** Bolivian Boliviano (BOB). */
  Bob = 'BOB',
  /** Brazilian Real (BRL). */
  Brl = 'BRL',
  /** Bahamian Dollar (BSD). */
  Bsd = 'BSD',
  /** Bhutanese Ngultrum (BTN). */
  Btn = 'BTN',
  /** Botswana Pula (BWP). */
  Bwp = 'BWP',
  /** Belarusian Ruble (BYN). */
  Byn = 'BYN',
  /**
   * Belarusian Ruble (BYR).
   * @deprecated `BYR` is deprecated. Use `BYN` available from version `2021-01` onwards instead.
   */
  Byr = 'BYR',
  /** Belize Dollar (BZD). */
  Bzd = 'BZD',
  /** Canadian Dollars (CAD). */
  Cad = 'CAD',
  /** Congolese franc (CDF). */
  Cdf = 'CDF',
  /** Swiss Francs (CHF). */
  Chf = 'CHF',
  /** Chilean Peso (CLP). */
  Clp = 'CLP',
  /** Chinese Yuan Renminbi (CNY). */
  Cny = 'CNY',
  /** Colombian Peso (COP). */
  Cop = 'COP',
  /** Costa Rican Colones (CRC). */
  Crc = 'CRC',
  /** Cape Verdean escudo (CVE). */
  Cve = 'CVE',
  /** Czech Koruny (CZK). */
  Czk = 'CZK',
  /** Djiboutian Franc (DJF). */
  Djf = 'DJF',
  /** Danish Kroner (DKK). */
  Dkk = 'DKK',
  /** Dominican Peso (DOP). */
  Dop = 'DOP',
  /** Algerian Dinar (DZD). */
  Dzd = 'DZD',
  /** Egyptian Pound (EGP). */
  Egp = 'EGP',
  /** Eritrean Nakfa (ERN). */
  Ern = 'ERN',
  /** Ethiopian Birr (ETB). */
  Etb = 'ETB',
  /** Euro (EUR). */
  Eur = 'EUR',
  /** Fijian Dollars (FJD). */
  Fjd = 'FJD',
  /** Falkland Islands Pounds (FKP). */
  Fkp = 'FKP',
  /** United Kingdom Pounds (GBP). */
  Gbp = 'GBP',
  /** Georgian Lari (GEL). */
  Gel = 'GEL',
  /** Ghanaian Cedi (GHS). */
  Ghs = 'GHS',
  /** Gibraltar Pounds (GIP). */
  Gip = 'GIP',
  /** Gambian Dalasi (GMD). */
  Gmd = 'GMD',
  /** Guinean Franc (GNF). */
  Gnf = 'GNF',
  /** Guatemalan Quetzal (GTQ). */
  Gtq = 'GTQ',
  /** Guyanese Dollar (GYD). */
  Gyd = 'GYD',
  /** Hong Kong Dollars (HKD). */
  Hkd = 'HKD',
  /** Honduran Lempira (HNL). */
  Hnl = 'HNL',
  /** Croatian Kuna (HRK). */
  Hrk = 'HRK',
  /** Haitian Gourde (HTG). */
  Htg = 'HTG',
  /** Hungarian Forint (HUF). */
  Huf = 'HUF',
  /** Indonesian Rupiah (IDR). */
  Idr = 'IDR',
  /** Israeli New Shekel (NIS). */
  Ils = 'ILS',
  /** Indian Rupees (INR). */
  Inr = 'INR',
  /** Iraqi Dinar (IQD). */
  Iqd = 'IQD',
  /** Iranian Rial (IRR). */
  Irr = 'IRR',
  /** Icelandic Kronur (ISK). */
  Isk = 'ISK',
  /** Jersey Pound. */
  Jep = 'JEP',
  /** Jamaican Dollars (JMD). */
  Jmd = 'JMD',
  /** Jordanian Dinar (JOD). */
  Jod = 'JOD',
  /** Japanese Yen (JPY). */
  Jpy = 'JPY',
  /** Kenyan Shilling (KES). */
  Kes = 'KES',
  /** Kyrgyzstani Som (KGS). */
  Kgs = 'KGS',
  /** Cambodian Riel. */
  Khr = 'KHR',
  /** Kiribati Dollar (KID). */
  Kid = 'KID',
  /** Comorian Franc (KMF). */
  Kmf = 'KMF',
  /** South Korean Won (KRW). */
  Krw = 'KRW',
  /** Kuwaiti Dinar (KWD). */
  Kwd = 'KWD',
  /** Cayman Dollars (KYD). */
  Kyd = 'KYD',
  /** Kazakhstani Tenge (KZT). */
  Kzt = 'KZT',
  /** Laotian Kip (LAK). */
  Lak = 'LAK',
  /** Lebanese Pounds (LBP). */
  Lbp = 'LBP',
  /** Sri Lankan Rupees (LKR). */
  Lkr = 'LKR',
  /** Liberian Dollar (LRD). */
  Lrd = 'LRD',
  /** Lesotho Loti (LSL). */
  Lsl = 'LSL',
  /** Lithuanian Litai (LTL). */
  Ltl = 'LTL',
  /** Latvian Lati (LVL). */
  Lvl = 'LVL',
  /** Libyan Dinar (LYD). */
  Lyd = 'LYD',
  /** Moroccan Dirham. */
  Mad = 'MAD',
  /** Moldovan Leu (MDL). */
  Mdl = 'MDL',
  /** Malagasy Ariary (MGA). */
  Mga = 'MGA',
  /** Macedonia Denar (MKD). */
  Mkd = 'MKD',
  /** Burmese Kyat (MMK). */
  Mmk = 'MMK',
  /** Mongolian Tugrik. */
  Mnt = 'MNT',
  /** Macanese Pataca (MOP). */
  Mop = 'MOP',
  /** Mauritanian Ouguiya (MRU). */
  Mru = 'MRU',
  /** Mauritian Rupee (MUR). */
  Mur = 'MUR',
  /** Maldivian Rufiyaa (MVR). */
  Mvr = 'MVR',
  /** Malawian Kwacha (MWK). */
  Mwk = 'MWK',
  /** Mexican Pesos (MXN). */
  Mxn = 'MXN',
  /** Malaysian Ringgits (MYR). */
  Myr = 'MYR',
  /** Mozambican Metical. */
  Mzn = 'MZN',
  /** Namibian Dollar. */
  Nad = 'NAD',
  /** Nigerian Naira (NGN). */
  Ngn = 'NGN',
  /** Nicaraguan Córdoba (NIO). */
  Nio = 'NIO',
  /** Norwegian Kroner (NOK). */
  Nok = 'NOK',
  /** Nepalese Rupee (NPR). */
  Npr = 'NPR',
  /** New Zealand Dollars (NZD). */
  Nzd = 'NZD',
  /** Omani Rial (OMR). */
  Omr = 'OMR',
  /** Panamian Balboa (PAB). */
  Pab = 'PAB',
  /** Peruvian Nuevo Sol (PEN). */
  Pen = 'PEN',
  /** Papua New Guinean Kina (PGK). */
  Pgk = 'PGK',
  /** Philippine Peso (PHP). */
  Php = 'PHP',
  /** Pakistani Rupee (PKR). */
  Pkr = 'PKR',
  /** Polish Zlotych (PLN). */
  Pln = 'PLN',
  /** Paraguayan Guarani (PYG). */
  Pyg = 'PYG',
  /** Qatari Rial (QAR). */
  Qar = 'QAR',
  /** Romanian Lei (RON). */
  Ron = 'RON',
  /** Serbian dinar (RSD). */
  Rsd = 'RSD',
  /** Russian Rubles (RUB). */
  Rub = 'RUB',
  /** Rwandan Franc (RWF). */
  Rwf = 'RWF',
  /** Saudi Riyal (SAR). */
  Sar = 'SAR',
  /** Solomon Islands Dollar (SBD). */
  Sbd = 'SBD',
  /** Seychellois Rupee (SCR). */
  Scr = 'SCR',
  /** Sudanese Pound (SDG). */
  Sdg = 'SDG',
  /** Swedish Kronor (SEK). */
  Sek = 'SEK',
  /** Singapore Dollars (SGD). */
  Sgd = 'SGD',
  /** Saint Helena Pounds (SHP). */
  Shp = 'SHP',
  /** Sierra Leonean Leone (SLL). */
  Sll = 'SLL',
  /** Somali Shilling (SOS). */
  Sos = 'SOS',
  /** Surinamese Dollar (SRD). */
  Srd = 'SRD',
  /** South Sudanese Pound (SSP). */
  Ssp = 'SSP',
  /**
   * Sao Tome And Principe Dobra (STD).
   * @deprecated `STD` is deprecated. Use `STN` available from version `2022-07` onwards instead.
   */
  Std = 'STD',
  /** Sao Tome And Principe Dobra (STN). */
  Stn = 'STN',
  /** Syrian Pound (SYP). */
  Syp = 'SYP',
  /** Swazi Lilangeni (SZL). */
  Szl = 'SZL',
  /** Thai baht (THB). */
  Thb = 'THB',
  /** Tajikistani Somoni (TJS). */
  Tjs = 'TJS',
  /** Turkmenistani Manat (TMT). */
  Tmt = 'TMT',
  /** Tunisian Dinar (TND). */
  Tnd = 'TND',
  /** Tongan Pa'anga (TOP). */
  Top = 'TOP',
  /** Turkish Lira (TRY). */
  Try = 'TRY',
  /** Trinidad and Tobago Dollars (TTD). */
  Ttd = 'TTD',
  /** Taiwan Dollars (TWD). */
  Twd = 'TWD',
  /** Tanzanian Shilling (TZS). */
  Tzs = 'TZS',
  /** Ukrainian Hryvnia (UAH). */
  Uah = 'UAH',
  /** Ugandan Shilling (UGX). */
  Ugx = 'UGX',
  /** United States Dollars (USD). */
  Usd = 'USD',
  /** Uruguayan Pesos (UYU). */
  Uyu = 'UYU',
  /** Uzbekistan som (UZS). */
  Uzs = 'UZS',
  /** Venezuelan Bolivares (VED). */
  Ved = 'VED',
  /**
   * Venezuelan Bolivares (VEF).
   * @deprecated `VEF` is deprecated. Use `VES` available from version `2020-10` onwards instead.
   */
  Vef = 'VEF',
  /** Venezuelan Bolivares (VES). */
  Ves = 'VES',
  /** Vietnamese đồng (VND). */
  Vnd = 'VND',
  /** Vanuatu Vatu (VUV). */
  Vuv = 'VUV',
  /** Samoan Tala (WST). */
  Wst = 'WST',
  /** Central African CFA Franc (XAF). */
  Xaf = 'XAF',
  /** East Caribbean Dollar (XCD). */
  Xcd = 'XCD',
  /** West African CFA franc (XOF). */
  Xof = 'XOF',
  /** CFP Franc (XPF). */
  Xpf = 'XPF',
  /** Unrecognized currency. */
  Xxx = 'XXX',
  /** Yemeni Rial (YER). */
  Yer = 'YER',
  /** South African Rand (ZAR). */
  Zar = 'ZAR',
  /** Zambian Kwacha (ZMW). */
  Zmw = 'ZMW'
}

/** A custom product. */
export type CustomProduct = {
  __typename?: 'CustomProduct';
  /** Whether the merchandise is a gift card. */
  isGiftCard: Scalars['Boolean'];
  /** Whether the merchandise requires shipping. */
  requiresShipping: Scalars['Boolean'];
  /** The localized title of the product in the customer’s locale. */
  title: Scalars['String'];
  /** The weight of the product variant in the unit system specified with `weight_unit`. */
  weight?: Maybe<Scalars['Float']>;
  /** Unit of measurement for weight. */
  weightUnit: WeightUnit;
};

/** Represents a customer with the shop. */
export type Customer = HasMetafields & {
  __typename?: 'Customer';
  /**
   * The total amount of money spent by the customer. Converted from the shop's
   * currency to the currency of the cart using a market rate.
   */
  amountSpent: MoneyV2;
  /** The customer’s name, email or phone number. */
  displayName: Scalars['String'];
  /** The customer’s email address. */
  email?: Maybe<Scalars['String']>;
  /** Whether the customer has any of the given tags. */
  hasAnyTag: Scalars['Boolean'];
  /** Whether the customer has the given tags. */
  hasTags: Array<HasTagResponse>;
  /** A unique identifier for the customer. */
  id: Scalars['ID'];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The number of orders made by the customer. */
  numberOfOrders: Scalars['Int'];
};


/** Represents a customer with the shop. */
export type CustomerHasAnyTagArgs = {
  tags?: Array<Scalars['String']>;
};


/** Represents a customer with the shop. */
export type CustomerHasTagsArgs = {
  tags?: Array<Scalars['String']>;
};


/** Represents a customer with the shop. */
export type CustomerMetafieldArgs = {
  key: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
};

export type ExpandOperation = {
  /** The cart line id to expand. */
  cartLineId: Scalars['ID'];
  /** The cart items to expand. */
  expandedCartItems: Array<ExpandedItem>;
  /** The price adjustment to the group. */
  price?: InputMaybe<PriceAdjustment>;
};

export type ExpandedItem = {
  /** The merchandise id of the expanded item. */
  merchandiseId: Scalars['ID'];
  /** The quantity of the expanded item.The max quantity is 50. */
  quantity: Scalars['Int'];
};

/** Transformations to apply to the Cart. */
export type FunctionResult = {
  /** Cart operations to run on Cart. */
  operations: Array<CartOperation>;
};

/** Represents a gate configuration. */
export type GateConfiguration = HasMetafields & {
  __typename?: 'GateConfiguration';
  /** An optional string identifier. */
  appId?: Maybe<Scalars['String']>;
  /** A non-unique string used to group gate configurations. */
  handle?: Maybe<Scalars['String']>;
  /** The ID of the gate configuration. */
  id: Scalars['ID'];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};


/** Represents a gate configuration. */
export type GateConfigurationMetafieldArgs = {
  key: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
};

/** Represents a connection from a subject to a gate configuration. */
export type GateSubject = {
  __typename?: 'GateSubject';
  /** The bound gate configuration. */
  configuration: GateConfiguration;
  /** The ID of the gate subject. */
  id: Scalars['ID'];
};


/** Represents a connection from a subject to a gate configuration. */
export type GateSubjectConfigurationArgs = {
  appId?: InputMaybe<Scalars['String']>;
};

/** Gate subjects associated to the specified resource. */
export type HasGates = {
  /** Returns active gate subjects bound to the resource. */
  gates: Array<GateSubject>;
};


/** Gate subjects associated to the specified resource. */
export type HasGatesGatesArgs = {
  handle?: InputMaybe<Scalars['String']>;
};

/** Represents information about the metafields associated to the specified resource. */
export type HasMetafields = {
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
};


/** Represents information about the metafields associated to the specified resource. */
export type HasMetafieldsMetafieldArgs = {
  key: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
};

/** Represents whether the current object has the given tag. */
export type HasTagResponse = {
  __typename?: 'HasTagResponse';
  /** Whether the current object has the tag. */
  hasTag: Scalars['Boolean'];
  /** The tag. */
  tag: Scalars['String'];
};

/** The image of an object. */
export type ImageInput = {
  /** The URL of the image. */
  url: Scalars['URL'];
};

export type Input = {
  __typename?: 'Input';
  /** The cart. */
  cart: Cart;
  /** The CartTransform containing the function. */
  cartTransform: CartTransform;
};

/** The merchandise to be purchased at checkout. */
export type Merchandise = CustomProduct | ProductVariant;

export type MergeOperation = {
  /** The list of cart lines to merge. */
  cartLines: Array<CartLineInput>;
  /** The image of the group. */
  image?: InputMaybe<ImageInput>;
  /** The product variant that models the group of lines. */
  parentVariantId: Scalars['ID'];
  /** The price adjustment to the group. */
  price?: InputMaybe<PriceAdjustment>;
  /** The name of the group of lines to merge. If it isn't specified, it will use the parent_variant' name. */
  title?: InputMaybe<Scalars['String']>;
};

/**
 * [Metafields](https://shopify.dev/apps/metafields)
 * enable you to attach additional information to a
 * Shopify resource, such as a [Product](https://shopify.dev/api/admin-graphql/latest/objects/product)
 * or a [Collection](https://shopify.dev/api/admin-graphql/latest/objects/collection).
 * For more information about the Shopify resources that you can attach metafields to, refer to
 * [HasMetafields](https://shopify.dev/api/admin/graphql/reference/common-objects/HasMetafields).
 */
export type Metafield = {
  __typename?: 'Metafield';
  /**
   * The type of data that the metafield stores in the `value` field.
   * Refer to the list of [supported types](https://shopify.dev/apps/metafields/types).
   */
  type: Scalars['String'];
  /** The data to store in the metafield. The data is always stored as a string, regardless of the metafield's type. */
  value: Scalars['String'];
};

/** A monetary value with currency. */
export type MoneyV2 = {
  __typename?: 'MoneyV2';
  /** Decimal money amount. */
  amount: Scalars['Decimal'];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/** The root mutation for the API. */
export type MutationRoot = {
  __typename?: 'MutationRoot';
  /** Handles the function result. */
  handleResult: Scalars['Void'];
};


/** The root mutation for the API. */
export type MutationRootHandleResultArgs = {
  result: FunctionResult;
};

export type PriceAdjustment = {
  /** The percentage price decrease of the price adjustment. */
  percentageDecrease?: InputMaybe<PriceAdjustmentValue>;
};

export type PriceAdjustmentValue = {
  /** The value of the price adjustment. */
  value: Scalars['Decimal'];
};

/** Represents a product. */
export type Product = HasGates & HasMetafields & {
  __typename?: 'Product';
  /** Returns active gate subjects bound to the resource. */
  gates: Array<GateSubject>;
  /** A unique human-friendly string of the product's title. */
  handle: Scalars['String'];
  /** Whether the product has any of the given tags. */
  hasAnyTag: Scalars['Boolean'];
  /** Whether the product has the given tags. */
  hasTags: Array<HasTagResponse>;
  /** A globally-unique identifier. */
  id: Scalars['ID'];
  /** Whether the product is in any of the given collections. */
  inAnyCollection: Scalars['Boolean'];
  /** Whether the product is in the given collections. */
  inCollections: Array<CollectionMembership>;
  /** Whether the product is a gift card. */
  isGiftCard: Scalars['Boolean'];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The product type specified by the merchant. */
  productType?: Maybe<Scalars['String']>;
  /** The localized title of the product in the customer’s locale. */
  title: Scalars['String'];
  /** The name of the product's vendor. */
  vendor?: Maybe<Scalars['String']>;
};


/** Represents a product. */
export type ProductGatesArgs = {
  handle?: InputMaybe<Scalars['String']>;
};


/** Represents a product. */
export type ProductHasAnyTagArgs = {
  tags?: Array<Scalars['String']>;
};


/** Represents a product. */
export type ProductHasTagsArgs = {
  tags?: Array<Scalars['String']>;
};


/** Represents a product. */
export type ProductInAnyCollectionArgs = {
  ids?: Array<Scalars['ID']>;
};


/** Represents a product. */
export type ProductInCollectionsArgs = {
  ids?: Array<Scalars['ID']>;
};


/** Represents a product. */
export type ProductMetafieldArgs = {
  key: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
};

/** Represents a product variant. */
export type ProductVariant = HasMetafields & {
  __typename?: 'ProductVariant';
  /** A globally-unique identifier. */
  id: Scalars['ID'];
  /** Returns a metafield by namespace and key that belongs to the resource. */
  metafield?: Maybe<Metafield>;
  /** The product that this variant belongs to. */
  product: Product;
  /** Whether the merchandise requires shipping. */
  requiresShipping: Scalars['Boolean'];
  /** An identifier for the product variant in the shop. Required in order to connect to a fulfillment service. */
  sku?: Maybe<Scalars['String']>;
  /** The localized title of the product variant in the customer’s locale. */
  title?: Maybe<Scalars['String']>;
  /** The weight of the product variant in the unit system specified with `weight_unit`. */
  weight?: Maybe<Scalars['Float']>;
  /** Unit of measurement for weight. */
  weightUnit: WeightUnit;
};


/** Represents a product variant. */
export type ProductVariantMetafieldArgs = {
  key: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
};

/** Represents information about the buyer that is interacting with the cart. */
export type PurchasingCompany = {
  __typename?: 'PurchasingCompany';
  /** The company associated to the order or draft order. */
  company: Company;
  /** The company contact associated to the order or draft order. */
  contact?: Maybe<CompanyContact>;
  /** The company location associated to the order or draft order. */
  location: CompanyLocation;
};

/** Represents how products and variants can be sold and purchased. */
export type SellingPlan = {
  __typename?: 'SellingPlan';
  /** The description of the selling plan. */
  description?: Maybe<Scalars['String']>;
  /** A globally-unique identifier. */
  id: Scalars['ID'];
  /** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
  name: Scalars['String'];
  /** Whether purchasing the selling plan will result in multiple deliveries. */
  recurringDeliveries: Scalars['Boolean'];
};

/**
 * Represents an association between a variant and a selling plan. Selling plan
 * allocations describe the options offered for each variant, and the price of the
 * variant when purchased with a selling plan.
 */
export type SellingPlanAllocation = {
  __typename?: 'SellingPlanAllocation';
  /**
   * A list of price adjustments, with a maximum of two. When there are two, the
   * first price adjustment goes into effect at the time of purchase, while the
   * second one starts after a certain number of orders. A price adjustment
   * represents how a selling plan affects pricing when a variant is purchased with
   * a selling plan. Prices display in the customer's currency if the shop is
   * configured for it.
   */
  priceAdjustments: Array<SellingPlanAllocationPriceAdjustment>;
  /**
   * A representation of how products and variants can be sold and purchased. For
   * example, an individual selling plan could be '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  sellingPlan: SellingPlan;
};

/** The resulting prices for variants when they're purchased with a specific selling plan. */
export type SellingPlanAllocationPriceAdjustment = {
  __typename?: 'SellingPlanAllocationPriceAdjustment';
  /**
   * The effective price for a single delivery. For example, for a prepaid
   * subscription plan that includes 6 deliveries at the price of $48.00, the per
   * delivery price is $8.00.
   */
  perDeliveryPrice: MoneyV2;
  /**
   * The price of the variant when it's purchased with a selling plan For example,
   * for a prepaid subscription plan that includes 6 deliveries of $10.00 granola,
   * where the customer gets 20% off, the price is 6 x $10.00 x 0.80 = $48.00.
   */
  price: MoneyV2;
};

/** Units of measurement for weight. */
export enum WeightUnit {
  /** Metric system unit of mass. */
  Grams = 'GRAMS',
  /** 1 kilogram equals 1000 grams. */
  Kilograms = 'KILOGRAMS',
  /** Imperial system unit of mass. */
  Ounces = 'OUNCES',
  /** 1 pound equals 16 ounces. */
  Pounds = 'POUNDS'
}

export type InputQueryVariables = Exact<{ [key: string]: never; }>;


export type InputQuery = { __typename?: 'Input', cart: { __typename?: 'Cart', lines: Array<{ __typename?: 'CartLine', id: string, quantity: number, merchandise: { __typename: 'CustomProduct' } | { __typename: 'ProductVariant', id: string, title?: string | null, expandBundleComponents?: { __typename?: 'Metafield', value: string } | null, expandBundleComponentQuantities?: { __typename?: 'Metafield', value: string } | null } }> } };
