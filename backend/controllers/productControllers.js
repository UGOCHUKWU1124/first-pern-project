import pool from "../config/db.js"; // Import the PostgreSQL connection pool

export const getProducts = async (req, res) => {
    try{
        const products = await pool.query("SELECT * FROM products");
        res.status(200).json({success: true, data: products.rows});
    }
    catch (error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const createProducts = async (req, res) => {
     const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please fill all the fields"});
    }

    const newProduct = {
        name: product.name,
        price: product.price,
        image: product.image
    };

    try{
        const result = await pool.query("INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *", [newProduct.name, newProduct.price, newProduct.image]);
        res.status(201).json({success: true, data: result.rows[0]});
    }
    catch(error){
        console.log("Error in creating product:",error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }

}

export const updateProducts = async (req, res) => {
    const { id } = req.params;

    const product = req.body; //name, price, image
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please fill all the fields"});
    }

    try{
        const result = await pool.query("UPDATE products SET name = $1, price = $2, image = $3 WHERE id = $4 RETURNING *", [product.name, product.price, product.image, id]);
        res.status(200).json({success: true, data: result.rows[0]});
    }
    catch(error){
        res.status(500).json({success: false, message: "server error"});
    }
}

export const deleteProducts = async (req, res) => {
    const {id} = req.params;
    console.log("id:", id);

    if(!id){
        return res.status(400).json({success: false, message: "Invalid product id"});
    }

    try{
        const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
        res.status(200).json({success:true,  data: result.rows[0]});
    }
    catch (error){
        console.log("Error in deleting product:", error.message);
        res.status(500).json({success:false, message:"server error"});
    }
}