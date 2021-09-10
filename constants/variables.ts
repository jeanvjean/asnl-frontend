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
export interface CylinderStat {
  topTitle: String
  value: Number
  subCategories: Array<CylinderStat>
}

export const cylinderStatistics = [
  [
    {
      topTitle: 'Total ASNL Cylinders',
      value: 0,
      subCategories: [
        {
          title: 'Buffer',
          value: 0,
          subCategories: [
            {
              title: 'Good',
              value: 0,
            },
            {
              title: 'Bad',
              value: 0,
            },
          ],
        },
        {
          title: 'Assigned',
          value: 0,
          subCategories: [
            {
              title: 'Good',
              value: 0,
            },
            {
              title: 'Bad',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      topTitle: 'ASNL Cylinders with customers',
      value: 0,
      subCategories: [
        {
          title: 'Buffer',
          value: 0,
        },
        {
          title: 'Assigned',
          value: 0,
        },
      ],
    },
    {
      topTitle: 'Cylinders with ASNL',
      value: 0,
      subCategories: [
        {
          title: 'Filled',
          value: 0,
          subCategories: [
            {
              title: 'Buffer',
              value: 0,
            },
            {
              title: 'Assigned',
              value: 0,
            },
            {
              title: 'Customers',
              value: 0,
            },
          ],
        },
        {
          title: 'Empty',
          value: 0,
          subCategories: [
            {
              title: 'Buffer',
              value: 0,
            },
            {
              title: 'Assigned',
              value: 0,
            },
            {
              title: 'Customers',
              value: 0,
            },
          ],
        },
      ],
    },
  ],
  [
    {
      topTitle: 'Total Customer Cylinders',
      value: 0,
      subCategories: [
        {
          title: 'Filled',
          value: 0,
          subCategories: [
            {
              title: 'Good',
              value: 0,
            },
            {
              title: 'Bad',
              value: 0,
            },
          ],
        },
        {
          title: 'Empty',
          value: 0,
          subCategories: [
            {
              title: 'Good',
              value: 0,
            },
            {
              title: 'Bad',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      topTitle: 'Total Bad Cylinders',
      value: 0,
      subCategories: [
        {
          title: 'Customer',
          value: 0,
          subCategories: [
            {
              title: 'Filled',
              value: 0,
            },
            {
              title: 'Empty',
              value: 0,
            },
          ],
        },
        {
          title: 'ASNL',
          value: 0,
          subCategories: [
            {
              title: 'Filled',
              value: 0,
            },
            {
              title: 'Empty',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      topTitle: 'Total Bad ASNL Cylinders',
      value: 0,
      subCategories: [
        {
          title: 'Filled',
          value: 0,
          subCategories: [
            {
              title: 'Buffer',
              value: 0,
            },
            {
              title: 'Assigned',
              value: 0,
            },
          ],
        },
        {
          title: 'Empty',
          value: 0,
          subCategories: [
            {
              title: 'Buffer',
              value: 0,
            },
            {
              title: 'Assigned',
              value: 0,
            },
          ],
        },
      ],
    },
  ],
  [
    {
      topTitle: 'Total Cylinders with Suppliers',
      value: 0,
      subCategories: [
        {
          title: 'Internal Suppliers',
          value: 0,
        },
        {
          title: 'External Suppliers',
          value: 0,
        },
      ],
    },
    {
      topTitle: 'Cylinder with Internal Suppliers',
      value: 0,
      subCategories: [
        {
          title: 'ASNL Cylinders',
          value: 0,
          subCategories: [
            {
              title: 'Buffer',
              value: 0,
            },
            {
              title: 'Assigned',
              value: 0,
            },
          ],
        },
        {
          title: 'Customers Cylinders',
          value: 0,
        },
      ],
    },
    {
      topTitle: 'Cylinder with External Suppliers',
      value: 0,
      subCategories: [
        {
          title: 'ASNL Cylinders',
          value: 0,
          subCategories: [
            {
              title: 'Buffer',
              value: 0,
            },
            {
              title: 'Assigned',
              value: 0,
            },
          ],
        },
        {
          title: 'Customers Cylinders',
          value: 0,
        },
      ],
    },
  ],
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
