import homeIcon from '../../../../public/left_side_bar_icons/home.png';
import homeSelectedIcon from '../../../../public/left_side_bar_icons/chart_square.svg';

import chatBotIcon from '../../../../public/left_side_bar_icons/headsetUser.png';
import chatBotSelectedIcon from '../../../../public/left_side_bar_icons/headChatBot.png';

import bulkMessageIcon from '../../../../public/left_side_bar_icons/message.png';
import bulkMessageSelectedIcon from '../../../../public/left_side_bar_icons/selectedMessage.png';

import serviceThreeIcon from '../../../../public/left_side_bar_icons/service_three.png';
import serviceThreeSelectedIcon from '../../../../public/left_side_bar_icons/serviceThreeSelected.svg';

import productIcon from '../../../../public/icons/sidebar/product.svg';
import modulesIcon from '../../../../public/icons/sidebar/modules.svg';
import helpIcon from '../../../../public/icons/sidebar/help.svg';
import settingsIcon from '../../../../public/icons/sidebar/setting-2.svg';

export const navigation = [
  // {
  //   id: 1,
  //   title: 'Home',
  //   url: 'dashboard',
  //   icon: homeIcon,
  //   selectedIcon: homeSelectedIcon,
  // },
  {
    id: 2,
    title: 'ChatBot',
    url: 'dashboard/chatbot',
    icon: chatBotIcon,
    selectedIcon: chatBotSelectedIcon,
  },
  {
    id: 3,
    title: 'Bulk Message',
    url: 'dashboard/bulk-messages',
    icon: bulkMessageIcon,
    selectedIcon: bulkMessageSelectedIcon,
  },
  // {
  //   id: 4,
  //   title: 'Loyalty Program',
  //   // url: '/loyalty-program',
  //   url: '/dashboard/loyalty-program?step=1',
  //   icon: serviceThreeIcon,
  //   selectedIcon: serviceThreeSelectedIcon,
  // },
];

export const navigationBottom = [
  {
    id: 1,
    title: 'Product',
    url: '#',
    icon: productIcon,
    selectedIcon: productIcon,
  },
  {
    id: 2,
    title: 'Modules',
    url: '#',
    icon: modulesIcon,
    selectedIcon: modulesIcon,
  },
  {
    id: 3,
    title: 'Help',
    url: '#',
    icon: helpIcon,
    selectedIcon: helpIcon,
  },
  {
    id: 4,
    title: 'Settings',
    // url: '/loyalty-program',
    url: '#',
    icon: settingsIcon,
    selectedIcon: settingsIcon,
  },
];
