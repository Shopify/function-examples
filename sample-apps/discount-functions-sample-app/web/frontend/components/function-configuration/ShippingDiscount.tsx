import { useForm } from '@shopify/react-form'
import {CurrencyCode} from '@shopify/react-i18n';
import AddressFormatter, {Country} from '@shopify/address';

import { 
  ActiveDatesCard,
  AppliesTo,
  CountriesAndRatesCard, 
  DiscountClass,
  MethodCard, 
  MinimumRequirementsCard,
  DiscountStatus, 
  SummaryCard,
  UsageLimitsCard,
} from '@shopify/discount-app-components-internal';
import { Layout } from '@shopify/polaris';
import { useState, useEffect } from 'react';
import { Modals, useModal } from '../hooks/useModal';
import { useShippingFields } from '../hooks/useShippingFields';
import { CountryModal } from '../CountryModal';

export default function ShippingDiscount() {
  const shippingFields = useShippingFields();
  const [countryList, setCountryList] = useState<Country[]>();
  const {activeModal, closeModal, openModal} = useModal()
  const currencyCode = CurrencyCode.Cad;
  const {
    fields: {
      discountTitle,
      discountCode, 
      discountMethod, 
      selectedCountries, 
      countriesSelectionType, 
      excludesShippingRates, 
      maximumShippingPrice,
      requirementType,
      requirementSubtotal,
      requirementQuantity,
      usageTotalLimit,
      usageOncePerCustomer,
      startDate,
      endDate,
    },
    submit,
    submitting,
    dirty,
    reset,
    submitErrors,
    makeClean,
  } = useForm({
    fields: shippingFields,
    onSubmit: async (fieldValues) => {
      return { status: 'fail', errors: [{ message: 'bad form data' }] };
    },
  });

  useEffect(() => {
    getCountries()
  }, [])

  const getCountries = async () => {
    const addressFormatter = new AddressFormatter('en-US');
    const countries = await addressFormatter.getCountries();

    setCountryList(countries);
  }

  const loading = submitting ? <p className="loading">loading...</p> : null;
  console.log(shippingFields)

  return (
    <>
      <Layout.Section>
        <form onSubmit={submit}>
          {loading}
          <MethodCard
            title="Free shipping"
            discountTitle={discountTitle}
            discountClass={DiscountClass.Order}
            discountCode={discountCode}
            discountMethod={discountMethod}
            discountMethodHidden
          />

          <CountriesAndRatesCard
            selectedCountries={selectedCountries}
            countrySelectionType={countriesSelectionType}
            excludeShippingRates={excludesShippingRates}
            maximumShippingPrice={maximumShippingPrice}
            countrySelector={
              <CountryModal
                selectedCountries={selectedCountries}
                open={activeModal === Modals.CountryModal}
                toggleModal={() =>
                  activeModal === Modals.CountryModal
                    ? closeModal()
                    : openModal(Modals.CountryModal)
                }
                countries={countryList}
              />
            }
            currencyCode={currencyCode}
          />

          <MinimumRequirementsCard
            appliesTo={AppliesTo.Products}
            discountMethod={discountMethod.value}
            currencyCode={currencyCode}
            requirementType={requirementType}
            subtotal={requirementSubtotal}
            quantity={requirementQuantity}
          />
          <UsageLimitsCard
            totalUsageLimit={usageTotalLimit}
            oncePerCustomer={usageOncePerCustomer}
            usageLimitLabel={
              'Limit the number of times this discount can be used'
            }
          />
          <ActiveDatesCard
            startDate={startDate}
            endDate={endDate}
            timezoneAbbreviation="EST"
          />
        </form>
      </Layout.Section>
      <Layout.Section secondary>
        <SummaryCard
          header={{
            discountTitle: discountTitle.value,
            discountCode: discountCode.value,
            discountMethod: discountMethod.value,
            appDiscountType: 'Custom discount type',
          }}
          performance={{
            status: DiscountStatus.Scheduled,
            usageCount: 0,
          }}
          selectedCountries={{
            countrySelectionType: countriesSelectionType.value,
            selectedCountries: selectedCountries.value,
          }}
          maximumShippingPrice={{
            maximumShippingPrice: maximumShippingPrice.value,
            currencyCode: currencyCode,
          }}
          minimumRequirements={{
            requirementType: requirementType.value,
            subtotal: requirementSubtotal.value,
            quantity: requirementQuantity.value,
            currencyCode: currencyCode,
          }}
          usageLimits={{
            oncePerCustomer: usageOncePerCustomer.value,
            totalUsageLimit: usageTotalLimit.value,
          }}
          activeDates={{
            startDate: startDate.value,
            endDate: endDate.value,
          }}
        />
      </Layout.Section>
    </>
  );
}
