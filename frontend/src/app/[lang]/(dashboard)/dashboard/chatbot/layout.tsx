import LoaderSpinner from '@/app/common/ui/loaderSpinner';
import { Spinner } from '@nextui-org/react';
import LayoutChatComponent from './LayoutChatComponent';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutChatComponent>{children}</LayoutChatComponent>;
}
