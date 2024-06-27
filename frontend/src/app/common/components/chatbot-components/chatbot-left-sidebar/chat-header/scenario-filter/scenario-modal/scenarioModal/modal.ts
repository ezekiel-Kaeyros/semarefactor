import { ReactNode } from 'react';

export type ModalPropsType = {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose?: any;
  closeButtonTitle?: string;
  validateButtonTitle?: string;
  classStyle?: string;
  iconTitle?: string;
  showFooter?: boolean;
  onValidateButton?: () => void;
};
