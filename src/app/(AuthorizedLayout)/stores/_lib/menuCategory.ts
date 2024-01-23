import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/store'

export const menuCategoryName = (category: MenuCategory) => {
  switch (category) {
    case 'MEALS': return '식사류'
    case 'SNACKS': return '스낵류'
    case 'DESSERTS': return '디저트류'
    case 'CAFES': return '카페류'
  }
}
