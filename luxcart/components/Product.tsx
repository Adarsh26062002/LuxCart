'use client'

import axios from "axios"
import router from "next/router"
import { useState } from "react"
import Spinner from "./Spinner"
import toast from "react-hot-toast"
// import { ReactSortable } from 'react-sortablejs';

type ProductProps = {
    _id?: string;
    existingTitle: string;
    existingDescription: string;
    existingPrice: number;
};

const Product = ({ _id, existingTitle, existingDescription, existingPrice }: ProductProps) => {

    const [redirect, setRedirect] = useState(false);

    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState([]); // Specify string[] type
    const [isUploading, setIsUploading] = useState(false);

    // console.log({_id,existingTitle,existingDescription,existingPrice});

    const createProject = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if(isUploading){
            await Promise.all(uploadImagesQueue);
        }

        const data = { title, description, price, images };
        console.log({data});
        if(_id){
            console.log('data send')
            const res = await axios.put('/api/products', {...data,_id});
            if(res.status == 200){
                router.push('/products'); 
                toast.success('Product edited!')
            }
        }
        else{
        const res = await axios.post('/api/products', data);
        if(res.status == 200)
            router.push('/products');  
            toast.success('Product created!')
        }
        
    }

    const uploadImagesQueue: Promise<void>[] = [];

    const uploadImages = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true);
        const files = ev.target?.files;
        if (files && files.length > 0) {
            for (const file of Array.from(files)) {
                const data = new FormData();
                data.append('file', file);

                uploadImagesQueue.push(
                    axios.post('/api/upload', data)
                        .then((res) => {
                            setImages((oldImages) => [...oldImages, ...res.data.links]);
                        })
                );
            }
            await Promise.allSettled(uploadImagesQueue);
            setIsUploading(false);
        } else {
            console.error('An error occured');
        }
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1)
        setImages(updatedImages);
    }

    return (
        <>
            <form onSubmit={createProject} className="mx-auto max-w-screen-md">
                <div className="mx-auto my-4">
                    <div>
                        <label className="mb-1 block text-lg font-medium text-gray-600 py-2">Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="example1" className="border block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-4" placeholder="Enter Product Title" />
                    </div>
                </div>

                <div className="mx-auto my-4">
                    <div>
                        <label className="mb-1 block text-lg font-medium text-gray-600 py-2">Select Category</label>
                        <select className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3">
                            <option value="">No category selected</option>
                            <option value="">Option02</option>
                            <option value="">Option03</option>
                        </select>
                    </div>
                </div>

                <div className="mx-auto my-4">
                    <div className="mx-auto">
                        <label className="mb-1 block text-lg font-medium text-gray-600 py-2">Images</label>
                        <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-violet-200 p-6 transition-all hover:border-primary-300">
                            <div className="space-y-1 text-center">
                                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                </div>
                                <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Click to upload</a> or drag and drop</div>
                                <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </div>
                            <input id="filename" type="file" className="hidden" accept="image/" multiple onChange={uploadImages} />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center rounded">
                    {isUploading && (
                        <Spinner className="p-4 absolute top-1/2 left-1/2 transform-translate-x-1/2 -translate-y-1/2" />
                    )}
                </div>

                <div className="grid grid-cols-2 items-center rounded">
                    {!isUploading && (
                        <div className="grid grid-cols-2 gap-4">
                            {/* <ReactSortable> */}
                            {/* {images.map((image) => (
                                    <img key={image} src={image} alt="Product Image" />
                                ))} */}
                            {/* </ReactSortable> */}
                            {Array.isArray(images) && images.map((link, index) => (
                                <div key={link} className="relative group bg-slate-500 h-32 w-44 border rounded-sm">
                                    <img src={link} alt="image" className="object-cover h-full w-full border rounded-sm" />

                                    <div className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100">
                                        <button onClick={() => handleDeleteImage(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-orange-600 bg-white rounded-full">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}
                </div>

                <div className="mx-auto my-4">
                    <div>
                        <label className="mb-1 block text-lg font-medium text-gray-600 py-2">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} id="example1" className="border block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-4" placeholder="Enter Product Description" />
                    </div>
                </div>

                <div className="mx-auto my-4">
                    <div>
                        <label className="mb-1 block text-lg font-medium text-gray-600 py-2">Price</label>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" id="example1" className="border block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-4" placeholder="Enter Product Price" />
                    </div>
                </div>

                <div className="mx-auto my-4">
                    <button type="submit"
                        className="w-full inline-block rounded border border-indigo-600 hover:border-green-300 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-indigo-500"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </>
    )
}

export default Product