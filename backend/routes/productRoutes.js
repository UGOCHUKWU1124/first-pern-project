import express from "express";
import { getProducts} from "../controllers/productControllers.js";
import { createProducts } from "../controllers/productControllers.js";
import { updateProducts } from "../controllers/productControllers.js";
import { deleteProducts } from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts)//fetch all products from database
router.post("/",createProducts);//create products
router.put("/:id",updateProducts)//update a product
router.delete("/:id",deleteProducts)//delete products

export default router;

//get = find all products in database 
//use patch to update some fileds on the product resource
//use put to update all the fields on the product resource
//or import { getProducts,createProducts,updateProducts,deleteProducts } from "../controllers/productControllers.js";
