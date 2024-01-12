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
                title, price, description
            })
    
            res.status(200).json(productDoc);
        }  
    } catch (error) {
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
}

export default handle;
