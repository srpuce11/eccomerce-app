import { Link, Outlet } from 'react-router-dom'
import Banner from '../components/banner/Banner'

export const Products = () => {
  return (
    <>   
      

      <div>
      <Banner></Banner>
        <input type='search' placeholder='Search products' />
      </div>
   
      <nav>
        <Link to='featured'>Featured</Link>
        <Link to='new'>New</Link>
      </nav>
      <Outlet />
    </>
  )
}
