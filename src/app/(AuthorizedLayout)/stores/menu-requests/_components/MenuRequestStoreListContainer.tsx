import { QueryClient } from '@tanstack/react-query'
import MenuRequestStoreListView from './MenuRequestStoreListView'
import { getMenus } from '@/app/(AuthorizedLayout)/stores/menus/_lib/getMenus'
import { MenuPageParameters } from '@/app/(AuthorizedLayout)/stores/menus/_models/parameters'
import ListContainer from '@/app/(AuthorizedLayout)/_components/container/ListContainer'
import { MenuRequestStorePageParameters } from '@/app/(AuthorizedLayout)/stores/menu-requests/_models/parameters'
import { getMenuRequestStores } from '@/app/(AuthorizedLayout)/stores/menu-requests/_lib/getMenuRequestStores'

const MenuRequestStoreListContainer = async () => {
  const initPageParameter = {
    searchCondition: 'STORE_NAME',
    searchValue: '',
    page: 1
  } as MenuRequestStorePageParameters

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['stores', 'menu-requests', initPageParameter],
    queryFn: getMenuRequestStores,
  })

  return (
    <ListContainer queryClient={queryClient}>
        <MenuRequestStoreListView pageParameters={initPageParameter} />
    </ListContainer>
  )
}

export default MenuRequestStoreListContainer
