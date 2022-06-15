import { useField } from '@shopify/react-form';
import {
	CombinableDiscountTypes,
	CountrySelectionType,
	DateTime,
	DiscountMethod,
	PositiveNumericValue,
	PurchaseType,
	RequirementType
} from '@shopify/discount-app-components-internal';


export const useOrderFields = () => {
	return {
		discountTitle: useField<string>(''),
		discountMethod: useField<DiscountMethod>(DiscountMethod.Code),
		discountCode: useField<string>(''),
		enableForPos: useField<boolean>(false),
		purchaseType: useField<PurchaseType>(PurchaseType.OneTimePurchase),
		selectedCountries: useField<string[]>([]),
		countriesSelectionType: useField<CountrySelectionType>(CountrySelectionType.AllCountries),
		excludesShippingRates: useField<boolean>(false),
		maximumShippingPrice: useField<PositiveNumericValue>(null),
		requirementType: useField<RequirementType>(RequirementType.None),
		requirementSubtotal: useField<PositiveNumericValue>('0'),
		requirementQuantity: useField<PositiveNumericValue>('0'),
		usageTotalLimit: useField<PositiveNumericValue>(null),
		usageOncePerCustomer: useField<boolean>(false),
		startDate: useField<DateTime>('2022-06-13T04:30:00.000Z'),
		endDate: useField<DateTime>(null),
	}
}