import {
  IconBuildingStore,
  IconCalendar,
  IconFlagSearch,
  IconHome,
  IconReportMoney,
  IconSettings,
  IconUser
} from '@tabler/icons-react'
import { NavigationGroupType } from '@/app/(AuthorizedLayout)/_components/layout/sidebar/navigation/NavigationGroup'

const Navigations: NavigationGroupType[] = [
  {
    id: 0,
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboard',
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
        id: 50,
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
    href: '/admin-accounts',
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
        href: '/admin-accounts',
      },
    ],
  },
]

export default Navigations
