export const CylinderTypes = [
  {
    name: 'Assigned',
    value: 'assigned',
  },
  {
    name: 'Buffer',
    value: 'buffer',
  },
]

export const cylinderFilters = {
  status: {
    list: [
      {
        title: 'Cylinder with Air Separation',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Cylinder with Customer',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Customer Cylinders with ASNL',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Marked for Maintenance',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Bad Customer Cylinders with ASNL',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Bad ASNL Cylinders',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Cylinder with Internal Suppliers',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Cylinder with External Suppliers',
        type: 'checkbox',
        selected: false,
      },
    ],
  },
  type: {
    list: [
      {
        title: 'Assigned',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Buffer',
        type: 'checkbox',
        selected: false,
      },
      {
        title: 'Customer Cylinders with ASNL',
        type: 'checkbox',
        selected: false,
      },
    ],
  },
}
