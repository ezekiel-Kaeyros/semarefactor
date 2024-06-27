import React from 'react';
const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Program name', uid: 'name', sortable: true },
  { name: 'N° of products', uid: 'numProduct' },
  { name: 'Status', uid: 'status', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Inactive', uid: 'paused' },
  { name: 'Vacation', uid: 'vacation' },
];

const users = [
  {
    id: 1,
    name: 'Program-1',
    status: 'completed',
    numProduct: '0 Products',
  },
  {
    id: 2,
    name: 'Program-2',
    status: 'completed',
    numProduct: '0 Products',
  },
];

export { columns, users, statusOptions };
