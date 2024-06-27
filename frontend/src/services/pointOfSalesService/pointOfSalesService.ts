import DataService from '../dataService';

export  class PointOfSalesService extends DataService {
  createPointOfSales = (data: any) => {
    return this.post('/auth/login', data);
  };

  getPointOfSales = (id: number) => {
    return this.get('/auth/register');
  };

  getAllPointOfSales = () => {
    return this.get('/auth/register');
  };
}
