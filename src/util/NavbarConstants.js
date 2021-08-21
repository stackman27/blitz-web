export default [
  {
    label: 'Active Customers',
    href: '/active',
  },
  {
    label: 'Sales & Receipts',
    children: [
      {
        label: 'All Sales',
        href: '/sales',
      },
      {
        label: 'Pending Transactions',
        href: '/pending',
      },
    ],
  },
  {
    label: 'Inventory',
    children: [
      {
        label: 'Inventory Details',
        href: '/inventory',
      },
      {
        label: 'Inventory Batch Items',
        href: '/inventoryBatch',
      },
    ],
  },
  {
    label: 'Analytics',
    href: '/analytics',
  },
];
