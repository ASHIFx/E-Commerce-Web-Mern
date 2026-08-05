import productModel from "../model/productModel.js";
import cloudinary from "../config/cloudinary.js";

export async function getProducts(req, res){
    try{
        const products = await productModel.find({});
        res.json(products);
    } catch(error){
        res.status(500).json({message:error.message})
    }
}

export async function getProductById(req, res){
    try{
        const product = await productModel.findById(req.params.id);
        if(product){
            res.json(product);
        } else {
            res.status(404).json({message:'Product not found'});
        }
    } catch (error){
        res.status(500).json({message:error.message})
    }
}

export async function createProduct(req, res){
    try{
        const {name, description, price, category, stock} = req.body;
        let imageUrl='';
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url
        }
        const product = await productModel.create({
            name,
            description,
            stock,
            category,
            price,
            imageUrl
        });

        return res.status(201).json(product);

    } catch (error){
        res.status(500).json({message:error.message})
    }
}

export async function deleteProduct(req, res){
    try{
        const product = await productModel.findById(req.params.id);
        if(product){
            await product.deleteOne();
            return res.json({message:'Product deleted'});
        } else{
            return res.status(400).json({message:'product not found'});
        }
    } catch (error){
        res.status(500).json({message:error.message})
    }
}

export async function updateProduct(req, res){
    try{
        const {name, description, price, category, stock} = req.body;
        const product = await productModel.findById(req.params.id);
        if(product){
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct)
        }
    } catch (error){
        res.status(500).json({message:error.message})
    }
}