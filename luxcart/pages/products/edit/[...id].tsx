import Product from '@/components/Product';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

type ProductInfo = {
  _id: string;
  title: string;
  description: string;
  price: number;
}

const EditProduct = (props: Props) => {
  const router = useRouter();
  const {id} = router.query;
  const [productsInfo,setProductsInfo] = useState<ProductInfo | null>(null);
  console.log({id});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          return;
        } else {
          const response = await axios.get('/api/products?id=' + id);
          if(response.status == 200){
            setProductsInfo(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);
  console.log({productsInfo});

  return (
    <>
    <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="m-4 text-sm text-gray-500">Let's create a new product! 🎉</p>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        </div>
      </div>

      <hr className="h-px border-0 bg-gray-200" />

      <div className='my-10'>
       {productsInfo && (
        <Product _id={productsInfo._id}
        existingTitle={productsInfo.title}
        existingDescription={productsInfo.description}
        existingPrice={productsInfo.price}
        />
       )}
      </div></>
  )
}

export default EditProduct