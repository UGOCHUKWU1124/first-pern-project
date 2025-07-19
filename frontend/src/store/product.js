import { create } from "zustand"; //zustand is a state management library for React
//zustand is used to create global state that can be accessed in any component

//global state can be used in any component
export const useProductStore = create((set) => ({
    products: [], //state
    setProducts: (products) => set({ products }), //setstate

    createProduct: async (newProduct)=>{
        if (!newProduct.name || !newProduct.image || !newProduct.price){
            return{success:false, message:"Please fill in all fields."}
        }

    const res = await fetch(`http://localhost:3000/api/products`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
    });


    const data = await res.json();
    set((state) => ({products:[...state.products, data.data]})) //from backend product controller
    return{success:true, message:"Product created successfuly."}
    },

    fetchProducts:async() =>{ // This function fetches products from the backend
        // It makes a GET request to the /api/products endpoint
        const res = await fetch(`http://localhost:3000/api/products`); // This is the endpoint to fetch products
        const data = await res.json();// This parses the JSON response from the server
        //set the products state with the fetched data
       set({ products: data.data || data }); // supports both formats
 // This updates the products state with the fetched data
    },

    deleteProducts:async(pid)=>{
        const res = await fetch(`http://localhost:3000/api/products/${pid}`, {
            method:"DELETE",
        });
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        } 
        
        set((state) => ({
            products: state.products.filter((product) => product.id !== pid),
        }));
        return { success: true, message: data.message};
    },

    updateProduct: async (pid, updatedProduct) => {
        if (!updatedProduct.name || !updatedProduct.image || !updatedProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }

        const res = await fetch(`http://localhost:3000/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });



        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }

        set((state) => ({
            products: state.products.map((product) =>
                product.id === pid ? data.data : product
            ),
        }));
        return { success: true, message: data.message };
    }
})); //returning an object

//same as const [state,setState] = useState([]) local state
