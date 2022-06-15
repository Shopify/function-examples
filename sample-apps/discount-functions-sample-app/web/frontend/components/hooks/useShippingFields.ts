import { useField } from '@shopify/react-form';
import {
	CountrySelectionType,
	DateTime,
	DiscountMethod,
	PositiveNumericValue,
	RequirementType
} from '@shopify/discount-app-components-internal';


export const useShippingFields = () => {
	return {
		discountTitle: useField<string>(''),
		discountMethod: useField<DiscountMethod>(DiscountMethod.Code),
		discountCode: useField<string>(''),
		selectedCountries: useField<string[]>([]),
		countriesSelectionType: useField<CountrySelectionType>(CountrySelectionType.AllCountries),
		excludesShippingRates: useField<boolean>(false),
		maximumShippingPrice: useField<PositiveNumericValue>(null),
		requirementType: useField<RequirementType>(RequirementType.None),
		requirementSubtotal: useField<PositiveNumericValue>(null),
		requirementQuantity: useField<PositiveNumericValue>(null),
		usageTotalLimit: useField<PositiveNumericValue>(null),
		usageOncePerCustomer: useField<boolean>(false),
		startDate: useField<DateTime>('2022-06-13T04:30:00.000Z'),
		endDate: useField<DateTime>(null)
	}
}