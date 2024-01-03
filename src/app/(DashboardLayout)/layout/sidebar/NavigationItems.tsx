import {
  Icon,
  IconBuildingStore,
  IconCalendar,
  IconFlagSearch,
  IconHome,
  IconReportMoney,
  IconSettings,
  IconTemplate,
  IconUser,
} from '@tabler/icons-react'

type NavigationMainItem = {
  id: number
  title: string
  icon: Icon
  href: string
  children?: NavigationSubItem[]
}

type NavigationSubItem = {
  id: number
  title: string
  href: string
}

const NavigationItems: NavigationMainItem[] = [
  {
    id: 0,
    title: 'Dashboard',
    icon: IconHome,
    href: '/',
  },
  {
    id: 1,
    title: '행사 관리',
    icon: IconCalendar,
    href: '/events',
    children: [
      {
        id: 10,
        title: '행사 목록',
        href: '/events',
      },
      {
        id: 11,
        title: '행사 등록',
        href: '/events/register',
      },
    ],
  },
  {
    id: 2,
    title: '매장 관리',
    icon: IconBuildingStore,
    href: '/stores',
    children: [
      {
        id: 20,
        title: '매장 목록',
        href: '/stores',
      },
      {
        id: 21,
        title: '메뉴 목록',
        href: '/stores/menus',
      },
      {
        id: 22,
        title: '메뉴 승인',
        href: '/stores/menus/approvals',
      },
    ],
  },
  {
    id: 3,
    title: '사용자 관리',
    icon: IconUser,
    href: '/users',
  },
  {
    id: 4,
    title: '매출관리',
    icon: IconReportMoney,
    href: '/sales',
  },
  {
    id: 5,
    title: '배너/검색 관리',
    icon: IconFlagSearch,
    href: '/events/banners',
    children: [
      {
        id: 51,
        title: '배너 설정',
        href: '/events/banners',
      },
      {
        id: 51,
        title: '검색 설정',
        href: '/events/keywords',
      },
    ],
  },
  {
    id: 6,
    title: '관리자 설정',
    icon: IconSettings,
    href: '/settings',
    children: [
      {
        id: 61,
        title: '이용약관/법적고시',
        href: '/settings/terms-conditions',
      },
      {
        id: 62,
        title: '고객센터 정보',
        href: '/settings/customer-center',
      },
      {
        id: 63,
        title: '계정 관리',
        href: '/settings/accounts',
      },
    ],
  },
  {
    id: 99,
    title: 'UI Template',
    icon: IconTemplate,
    href: '/templates',
    children: [
      {
        id: 991,
        title: 'Dashboard',
        href: '/ui-components',
      },
      {
        id: 992,
        title: 'Buttons',
        href: '/ui-components/buttons',
      },
      {
        id: 993,
        title: 'Forms',
        href: '/ui-components/forms',
      },
      {
        id: 994,
        title: 'Alerts',
        href: '/ui-components/alerts',
      },
      {
        id: 995,
        title: 'Ratings',
        href: '/ui-components/ratings',
      },
      {
        id: 996,
        title: 'Images',
        href: '/ui-components/images',
      },
      {
        id: 997,
        title: 'Pagination',
        href: '/ui-components/pagination',
      },
      {
        id: 998,
        title: 'Tables',
        href: '/ui-components/table',
      },
    ],
  },
]

export default NavigationItems
