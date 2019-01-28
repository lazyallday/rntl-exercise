

export type Languages = 'fi' | 'en';

export type RemoteData<T>
    = { kind: 'LOADING' }
    | { kind: 'ERROR', error: string }
    | { kind: 'FETCHED', data: T, loading?: boolean };

export interface DbStructure {
    storeRentals: Array<{
        [rentalId: string]: InStoreApi
    }>,
    shops: Array<{
        [shopId: string]: ShopApi
    }>,
}

export interface UserApi {
    id: string,
    shops: { 
        [shopId: string]: boolean,
    },
    activeShopId: string,
    firstName?: string,
    lastName?: string,
    email: string,
}

export interface ShopApi {
    id: string,
    createdAt: string,
    users: {
        [userId: string]: boolean
    },
    name: string
}

export interface Product {
    id: string,
    set: boolean,
    additionalProduct: boolean,
    fixedPrice: number | '',
    image?: string,
    name: string,
    name_en?: string,
    category?: string,
    value?: number | '',
    useSavedPricingTable?: boolean,
    savedPricingTable?: string,
    pricing?: PricingItem[],
    vatPercent: number,
    shopId: string,
    description?: string,
    description_en?: string,
    collectProductCode?: boolean,
    customValuesToCollect?: CustomValue[],
    highlightProduct: boolean,
    variants?: ProductVariant[],
    variants_en?: ProductVariant[],
    segmentFilters?: Segment[],
    hidden?: boolean
}

export interface CustomValue {
    name: string,
    type: 'number' | 'text',  
}

export interface ProductVariant {
    name: string,
    price: number | '',
}

export interface AdditionalProduct extends Product {
    units: number,
    manualCharge?: number,
    manualDeposit?: number,
}

export interface RentedProduct extends Product {
    units: number,
    setProducts?: RentedProduct[],
    additionalProducts: AdditionalProduct[],
    manualCharge?: number,
    manualDeposit?: number,
    productCode?: string,
    customValues?: Array<{
        name: string,
        value: number | string,
    }>
    variant?: ProductVariant,
    rentedOut?: boolean,
}

type TimePeriod = 'hours' | 'days' | 'weeks';

export interface PricingItem {
    timePeriod: TimePeriod,
    timeValue: number | '',
    multiplier: number | '',
    price: number | ''
}

interface Discount {
    percentage?: number | '',
    amount: number | '',
}

interface ResponsiblePerson {
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    marketing: boolean,
}

interface AmountObject {
    amount: number,
    paid: number,
    refunded?: number,
    captured?: number,
}

interface Shopper {
    id: string,
    firstName: string,
    lastName: string,
    phone?: string,
    email?: string,
    marketing: boolean,
    regularCustomer?: boolean,
    language?: Languages,
    products: RentedProduct[],
    additionalProducts: RentedProduct[],
    startDate?: string,
    endDate?: string,
    category?: string,
    rentalDuration: number | '',
    segment?: Segment,
    experience?: string,
    additionalInformation?: string,
    productsReturned?: boolean
}

export type Segment = 'kid' | 'teen' | 'adult' | 'senior' | 'skischool';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type Channel = 'STORE' | 'ONLINE' | 'PAYLINK';

export interface InStoreApi {
    activeState: ActiveState,
    channel: Channel,
    charge: AmountObject,
    created?: string,
    deposit: AmountObject,
    discount: Discount,
    endDate: string // ISO date string,
    endLocation: Location,
    handlePayment: boolean,
    id: string,
    live: boolean,
    rentalState: RentalState,
    responsiblePerson: ResponsiblePerson,
    shopId: string,
    shoppers: Shopper[],
    startLocation: Location,
    startDate: string // ISO date string,
    terms: {
        signatureRef?: string,
        accepted: boolean,
        timestamp?: string,
    },
}

export type RentalState = 'INIT' | 'BOOKED' | 'ACTIVE' | 'COMPLETED';

export type ActiveState = 'RENT_INIT' | 'PAYLINK_SENT' | 'PAYLINK_OPEN' | 'PAYLINK_PAID' | 'STORE_BOOKED' | 'STORE_PAID' | 'ONLINE_PAID' | 'RENT_OUT' | 'RENT_RETURNED' | /* keep for now*/ 'RENT_CHECKED' | 'RENT_ENDED' | 'RENT_CANCEL';

