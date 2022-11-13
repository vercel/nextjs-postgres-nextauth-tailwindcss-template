import {
  Card,
  Metric,
  Text,
  Flex,
  ColGrid,
  Title,
  BarList
} from '@tremor/react';
import Chart from './chart';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    metricPrev: '$ 9,456'
  },
  {
    title: 'Profit',
    metric: '$ 40,598',
    metricPrev: '$ 45,564'
  },
  {
    title: 'Customers',
    metric: '1,072',
    metricPrev: '856'
  }
];

export default function PlaygroundPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="items-start">
              <Text>{item.title}</Text>
            </Flex>
            <Flex
              justifyContent="justify-start"
              alignItems="items-baseline"
              spaceX="space-x-3"
              truncate={true}
            >
              <Metric>{item.metric}</Metric>
              <Text truncate={true}>from {item.metricPrev}</Text>
            </Flex>
          </Card>
        ))}
      </ColGrid>
      <ColGrid
        numColsSm={2}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
        marginTop="mt-8"
      >
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="justify-start"
              alignItems="items-baseline"
              spaceX="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex marginTop="mt-6">
              <Text>Pages</Text>
              <Text textAlignment="text-right">Views</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={dataFormatter}
              marginTop="mt-2"
            />
          </Card>
        ))}
      </ColGrid>
      <Chart />
    </main>
  );
}
