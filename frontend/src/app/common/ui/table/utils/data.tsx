import React from 'react';
const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'Broadcast name', uid: 'name', sortable: true },
  { name: 'Recipients', uid: 'recipients', sortable: true },

  { name: 'Time', uid: 'time', sortable: true },
  { name: 'Successful', uid: 'successful', sortable: true },
  { name: 'Read', uid: 'read', sortable: true },
  { name: 'Failed', uid: 'failed' },
  // { name: 'Status', uid: 'status', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusOptions = [
  { name: 'Active', uid: 'active' },
  { name: 'Inactive', uid: 'paused' },
  { name: 'Vacation', uid: 'vacation' },
];

const users:any[] = [
  {
    id: 1,
    name: 'Template-1',
    recipients: '150 contacts',
    time: '03-02-2024',
    successful: '100',
    read: '100',
    status: 'completed',
    failed: '0 contacts',
    avatar: 'TM',
  },
  {
    id: 2,
    name: 'Template-2',
    recipients: '20 contacts',
    time: '03-02-2024',
    successful: '0',
    read: '0',
    status: 'pending',
    failed: '0 contacts',
    avatar: 'EM',
  },
  {
    id: 3,
    name: 'Template-3',
    recipients: '80 contacts',
    time: '03-02-2024',
    successful: '80',
    read: '50',
    status: 'completed',
    failed: '40 contacts',
    avatar: 'TM',
  }
];

export { columns, users, statusOptions };
