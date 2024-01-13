import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Products';
import { NextApiRequest, NextApiResponse } from 'next';

const handle = async(req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { method } = req;
    await mongooseConnect();

    try {
        if(method==='POST'){
            const {title,price,description,images} = req.body;
            const productDoc = await Product.create({
                title, price, description, images
            })
    
            res.status(200).json(productDoc);
        }  
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'})
    }

    try {
        if(method==='GET'){
            if(req.query.id){
                res.status(200).json(await Product.findById(req.query.id));
            }
            else{
                res.json(await Product.find());
            }
        }  
    } catch (error){
        res.status(500).json({error:'Internal Server Error'})
    }

    try {
        if(method==='DELETE'){
            if(req.query.id){
                await Product.deleteOne({_id: req.query.id})
            }
            res.status(200).json("Product deleted successfully");
        }  
    } catch (error) {
        res.status(500).json({error:'Internal Server Error'})
    }

    try {
        if (method === 'PUT') {
            console.log('hello');
            const { title, _id, description, price, images } = req.body;
    
            console.log(images);
    
            // Check if images is an array and has elements
            const updatedData = {
                title,
                description,
                price,
                images
            };
    
            // if (Array.isArray(images) && images.length > 0) {
            //     updatedData.images = images;
            // }
    
            const result = await Product.findByIdAndUpdate(_id, updatedData);
            console.log(result);
            res.status(200).json({
                success: true,
                message: 'edited successfully',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

export default handle;
