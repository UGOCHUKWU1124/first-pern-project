import { Container,SimpleGrid,Text,VStack} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => { // This is the home page where we will display all products
  const {fetchProducts,products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products:", products)
  return (
    <Container maxW="container.xl" py={12} >
      <VStack spacing={8}> {/* This is a vertical stack to align items vertically */}
        {/* This is the heading for the home page */}
    <Text
					fontSize="30px"
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

        <SimpleGrid // This is a grid layout to display products
        columns={{
          base: 2,//on base screen and above display is column
          sm: 2, //on smaller screen row
          md: 3, //on medium screen row
          lg: 3, //on large screen row
          xl: 4, //on extra large screen row
        }}
        spacing={10}//spacing between grid items
        w={"full"}//full width
        > 
        {products.map((product) => {
  return <ProductCard key={product.id} product={product} />;
})}

        </SimpleGrid>

        {products.length===0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                    No products found 😢{" "} {/* This is a message to display when there are no products */}
                    <Link to={"/create"}> {/* This is a link to the create product page */}
                      <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                        Create a product
                      </Text>
                    </Link>
                  </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage;