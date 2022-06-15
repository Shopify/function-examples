import { useState, useEffect } from 'react';
import { Modal, Button, ChoiceList } from '@shopify/polaris';
import { Field } from '@shopify/discount-app-components-internal';
import {Country} from '@shopify/address';

interface CountryModalProps {
  selectedCountries: Field<string[]>
  open: boolean;
  toggleModal: () => void;
  countries: Country[];
}

export const CountryModal = ({
	selectedCountries,
	open,
	toggleModal,
	countries,
}: CountryModalProps) => {
	const [selected, setSelected] = useState<string[]>(
		() => selectedCountries.value,
	);
	useEffect(
		() => setSelected(selectedCountries.value),
		[selectedCountries],
	);

	const handleClose = () => {
		selectedCountries.onChange(selected);
		toggleModal();
	};

	const resetModal = () => {
		setSelected(selectedCountries.value);
		toggleModal();
	};

	return (
		<Modal
			activator={<Button onClick={toggleModal}>Browse</Button>}
			open={open}
			onClose={handleClose}
			title="Select countries"
			primaryAction={{
				content: 'Confirm',
				onAction: handleClose,
			}}
			secondaryActions={[
				{
					content: 'Cancel',
					onAction: resetModal,
				},
			]}
			sectioned
		>
			<ChoiceList
				allowMultiple
				title="Select countries"
				choices={countries.map((country) => ({
					label: country.name,
					value: country.code,
				}))}
				selected={selected.map((country) => country)}
				onChange={(nextValue: string[]) => {
					setSelected(
						nextValue.map(
							(selectedCountryCode) => countries.find((country) => country.code === selectedCountryCode)!.code,
						),
					);
				}}
			/>
		</Modal>
	);
}