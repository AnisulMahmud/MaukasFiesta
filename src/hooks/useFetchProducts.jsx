import  { useState, useEffect } from 'react'


export const useFetchProducts = (url, toggle) => {

    const [products, setProducts] = useState([])
    const [error, setError] = useState()
    const [isLoaded, setIsLoaded] = useState(false)


   useEffect(() => { 
    const fetchResult = async () =>{
        try{
            setIsLoaded(true)
    
         const response = await fetch(url)
         const products = await response.json()
         
         if(!response.ok){
            throw new Error('Searched item not found!')
         }
         
            setIsLoaded(false)
         if(toggle){
            setProducts(products.drinks)
         }
         else{
            setProducts(products.meals)
         }
         
         console.log(products)
    
         
    
        } catch(error){
            setError(error)
            setIsLoaded(false)   
     }
    
    };
    fetchResult();
}, [url, toggle]);
    return [products, error, isLoaded]



}






