import EditIcon from '../../../../../../../../../../public/icons/edit.svg';
import bagPack from '../../../../../../../../public/tombola/bagPack.svg';
import fashion from '../../../../../../../../public/tombola/bagPack.svg';
import gucci from '../../../../../../../../public/tombola/gucciBag.svg';
import Tenis from '../../../../../../../../public/tombola/tenis.svg';

interface IProduct {
  imgProduct: string;
  nameProduct: string;
  descriptionProduct: string;
  numberProduct: string;
}

export const initialProducts: IProduct[] = [
  {
    imgProduct: gucci,
    nameProduct: 'Gucci Bag',
    descriptionProduct: 'Fashionable bag that can be carried everywhere',
    numberProduct: '30pts',
  },
  {
    imgProduct: Tenis,
    nameProduct: 'Tennis Shoes',
    descriptionProduct: 'Fashionable bag that can be carried everywhere',
    numberProduct: '20pts',
  },
  {
    imgProduct: bagPack,
    nameProduct: 'Bag Pack',
    descriptionProduct: 'Fashionable bag that can be carried everywhere',
    numberProduct: '20pts',
  },
  {
    imgProduct: fashion,
    nameProduct: 'Fashion Combo',
    descriptionProduct: 'Fashionable bag that can be carried everywhere',
    numberProduct: '20pts',
  },
];

//export const initialCategory: ['All','Data Analytics','Agro-Food Sciences','Microbiologist']
