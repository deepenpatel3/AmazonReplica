export const getProducts = (productData) => {
    if(productData){
        return productData.products;
    }
    return [];
};