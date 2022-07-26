import { Data } from './interfaces/Data';

export const data: Data = {
  reports: [],
};

data.reports.push(
  {
    id: 'c9403885-246a-4f1f-8d7a-bdbec47faa30',
    source: 'salary',
    type: 'expense',
    amount: 5000,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    id: 'c6c69021-f8bb-4cb3-8891-7a3dd15ff260',
    source: 'salary',
    type: 'expense',
    amount: 10000,
    createDate: new Date(),
    updateDate: new Date(),
  },
  {
    id: '30a2383e-40ef-4d64-af18-adbdc34ccaa1',
    source: 'salary',
    type: 'income',
    amount: 10000,
    createDate: new Date(),
    updateDate: new Date(),
  },
);
