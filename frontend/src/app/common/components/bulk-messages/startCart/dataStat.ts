import eyeIcon from '../../../../../../public/icons/stat/eye (1).svg';
import TickIcon from '../../../../../../public/icons/stat/tick-square.svg';
import delivIcon from '../../../../../../public/icons/stat/deliverd.svg';
import sendIcon from '../../../../../../public/icons/stat/send.svg';
import warningIcon from '../../../../../../public/icons/stat/warning-2.svg';
import infoIcon from '../../../../../../public/icons/stat/message-question.svg';

export interface IStatistique {
    nameStat: string,
    iconStat: string,
    status: string,
    infoIcon: string,
}

export const initialStatistiques: IStatistique[] = [
  {
    nameStat: '150',
    iconStat: eyeIcon,
    status: "Read",
    infoIcon: infoIcon
  },
  {
    nameStat: '250',
    iconStat: TickIcon,
    status: "Sent",
    infoIcon: infoIcon
  },
  {
    nameStat: '250',
    iconStat: delivIcon,
    status: "Delivered",
    infoIcon: infoIcon
  },
  {
    nameStat: '20',
    iconStat: TickIcon,
    status: "Replied",
    infoIcon: infoIcon
  },
  {
    nameStat: '0',
    iconStat: sendIcon,
    status: "Sending",
    infoIcon: infoIcon
  },
  {
    nameStat: '20',
    iconStat: warningIcon,
    status: "Failed",
    infoIcon: infoIcon
  },
  {
    nameStat: '250',
    iconStat: warningIcon,
    status: "Processing",
    infoIcon: infoIcon
  },
  {
    nameStat: '250',
    iconStat: warningIcon,
    status: "Pending",
    infoIcon: infoIcon
  },
];
