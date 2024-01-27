import Image from 'next/image'
import data from '../lib/data'
import ProductItem from '@/components/products/ProductItem'
import { Metadata } from 'next'
import productService from '../lib/services/productService'
import Link from 'next/link'
import { convertDocToObj } from '../lib/utils'

export const metadata: Metadata={
  title:"ECOMM",
  description:"Nextjs,Ecomm,"
}

export default async function Home() {
  const featuredProduct = await productService.getFeatured()
  const latestProduct = await productService.getLatest()
  return (
      <>
      <div className='carousel w-full rounded-box mt-4'>
        {
          featuredProduct.map(
            (product,index)=>(
              <div key={product._id}
              id= {`slide-${index}`} 
              className="carousel-item relative w-full">
                <Link href={`/product/${product.slug}`}>
                  <img src={product.banner} className='w-full' alt= {product.name}/>

                </Link>
                <div className="absolute flex justify-between transform translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={`#slide-${
                    index === 0 ? featuredProduct.length-1:index-1
                  }`}
                  className='btn btn-circle'
                  >
                    &lt;
                  </a> 
                  <a href={`#slide-${
                    index === featuredProduct.length-1?0:index+1
                  }`}
                  className='btn btn-circle'>
                    &gt;
                  </a>

                </div>

              </div>
            )
          )
        }
      </div>
      
      <h2 className='text-2xl py-2'> Latest Products </h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols3 lg:grid-cols-4'>
        {
          latestProduct.map((product)=><ProductItem key={product.slug} product={convertDocToObj(product)}/>)
        }
      </div>
      
      
      </>  
  )
}
