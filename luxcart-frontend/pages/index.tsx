import Image from 'next/image';
import Hero from './components/Hero';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Products';
import Products from './components/Products';
import Collection from './components/Collection';

type HomeProps = {
  featuredProduct: {
    _id: string;
    title: string;
    description: string;
    price: number;
    images: [string]
  };
  newProducts:[
    {
      _id: string;
      title: string;
      description: string;
      price: number;
      images: [string]
    }
  ],
  collectionProduct:{
    _id: string;
    title: string;
    description: string;
    price: number;
    images: [string]
  }
};

const Home: React.FC<HomeProps> = ({ featuredProduct, newProducts, collectionProduct}) => {
  // console.log({newProducts});
  return (
    <>
      <Hero {...featuredProduct}/>
      <hr className="my-4 h-px border-0 bg-gray-300" />
      <Products {...newProducts}/>
      <hr className="my-4 h-px border-0 bg-gray-300" />
      <Collection {...collectionProduct}/>
    </>
  );
};

export const getServerSideProps = async () => {
  await mongooseConnect();

  const featuredId = '65a148b8ca539cb172bb415b';
  const collectionId = '65a148b8ca539cb172bb415b';

  const featuredProduct = await Product.findById(featuredId);
  const collectionProduct = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {sort: {'_id':1},limit:5});
  console.log(newProducts);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct))
    },
  };
};

// getServerSideProps()

export default Home;
