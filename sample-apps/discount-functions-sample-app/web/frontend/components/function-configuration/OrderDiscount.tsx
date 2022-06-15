import { useForm } from '@shopify/react-form'
import {CurrencyCode} from '@shopify/react-i18n';
import AddressFormatter, {Country} from '@shopify/address';

import { 
  ActiveDatesCard,
  AppliesTo,
  CountriesAndRatesCard, 
  DiscountClass,
  DiscountMethod,
  MethodCard, 
  MinimumRequirementsCard,
  DiscountStatus, 
  PurchaseTypeCard,
  SummaryCard,
  UsageLimitsCard,
} from '@shopify/discount-app-components-internal';
import { Layout } from '@shopify/polaris';
import { useState, useEffect } from 'react';
import { Modals, useModal } from '../hooks/useModal';
import { CountryModal } from '../CountryModal';
import { useOrderFields } from '../hooks/useOrderFields';

export default function OrderDiscount() {
  const orderFields = useOrderFields();
  const [countryList, setCountryList] = useState<Country[]>();
  const { activeModal, closeModal, openModal } = useModal();
  const currencyCode = CurrencyCode.Cad;
  const {
    fields: {
      discountTitle,
      discountCode, 
      discountMethod, 
      enableForPos,
      selectedCountries, 
      countriesSelectionType, 
      excludesShippingRates, 
      maximumShippingPrice,
      purchaseType,
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
    fields: orderFields,
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

  return (
    <>
      <Layout.Section>
        <form onSubmit={submit}>
          {loading}
          <MethodCard
            title="Percent off order"
            discountTitle={discountTitle}
            discountClass={DiscountClass.Order}
            discountCode={discountCode}
            discountMethod={discountMethod}
          />

          <PurchaseTypeCard purchaseType={purchaseType} />

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
            discountMethod: discountMethod.value,
            discountDescriptor: discountMethod.value === DiscountMethod.Automatic ? discountTitle.value : discountCode.value,
            appDiscountType: 'Custom discount type',
            isEditing: false,
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
          appliesToPurchaseType={{purchaseType: purchaseType.value}}
        />
      </Layout.Section>
    </>
  );
}
