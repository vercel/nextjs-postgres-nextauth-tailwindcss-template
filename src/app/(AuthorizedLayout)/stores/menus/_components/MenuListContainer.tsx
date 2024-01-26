import { QueryClient } from '@tanstack/react-query'
import MenuListView from './MenuListView'
import { getMenus } from '@/app/(AuthorizedLayout)/stores/menus/_lib/getMenus'
import { MenuPageParameters } from '@/app/(AuthorizedLayout)/stores/menus/_models/parameters'
import ListContainer from '@/app/(AuthorizedLayout)/_components/container/ListContainer'

const MenuListContainer = async () => {
  const initPageParameter = {
    searchCondition: 'STORE_NAME',
    searchValue: '',
    createdStartDate: '',
    createdEndDate: '',
    menuCategories: [
      'MEALS',
      'SNACKS',
      'DESSERTS',
      'CAFES'
    ],
    page: 1
  } as MenuPageParameters

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['stores', 'menus', initPageParameter],
    queryFn: getMenus,
  })

  return (
    <ListContainer queryClient={queryClient}>
        <MenuListView pageParameters={initPageParameter} />
    </ListContainer>
  )
}

export default MenuListContainer
