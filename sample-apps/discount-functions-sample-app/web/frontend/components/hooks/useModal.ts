import { useState } from 'react';

export enum Modals {
	CountryModal = 'countryModal'
}

export const useModal = () => {
	const [activeModal, setActiveModal] = useState(null);

	const openModal = (modalName: Modals) => setActiveModal(modalName);
	const closeModal = () => setActiveModal(null);

	return {
		activeModal,
		closeModal,
		openModal
	}

}