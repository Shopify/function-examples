import { CreatePage, UpdatePage } from './components';

interface Props {
  id?: string;
}

export default function BundleDiscountPage({ id }: Props) {
  return id == null ? <CreatePage /> : <UpdatePage id={id} />;
}
