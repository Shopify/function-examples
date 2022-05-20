import { useParams } from 'react-router-dom';

import { BundleDetailsPage } from '../../components';

export default function BundleDiscountPage() {
  const { id } = useParams();

  return <BundleDetailsPage id={id === 'new' ? undefined : id} />;
}
