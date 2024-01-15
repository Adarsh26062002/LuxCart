import { CartContext } from "@/lib/CartContext"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import Link from "next/link"
import { useContext } from "react"
import toast from "react-hot-toast"

type Props = {}

const formatPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const index = ({ allProducts }) => {
    const {addProduct} = useContext(CartContext);
    return (
        <>
            <div className="flex justify-center min-h-screen w-full">
                <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 xl:gap-x-8 px-2">
                    {allProducts.length > 0 && allProducts.map((product) => (
                        <div key={product._id}>
                            <div className="group block overflow-hidden border border-accent rounded-xl border-opacity-10">
                                <div className="relative md:h-[300px] h-[200px]">
                                    <img src={product.images[0]} alt="product-image" className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0" />
                                    <img src={product.images[1]} alt="product-image" className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100" />
                                </div>

                                <div className="relative p-3 border-t">
                                    <Link href={'/products/' + product._id}>
                                        <h3 className="text-md text-text group-hover:underline truncate">
                                            {product.title}
                                        </h3>
                                    </Link>

                                    <div className="my-1.5 flex flex-col items-center justify-between text-text ">
                                        <p className="tracking-wide text-primary text-sm md:text-md">
                                            $ {formatPrice(product.price)}
                                        </p>
                                        <div className="col-span-12 text-center w-full">
                                            <button onClick={()=>{addProduct(product._id); toast.success("Item added to cart!")}}
                                                className="disabled block rounded bg-secondary px-5 py-3 text-md text-text transition hover:bg-purple-300 w-full"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const allProducts = await Product.find({}, null, { sort: { _id: 1 } })

    return {
        props: {
            allProducts: JSON.parse(JSON.stringify(allProducts))
        }
    }
}

export default index