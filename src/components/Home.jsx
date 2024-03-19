import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {FaAngleDown, FaAngleUp} from 'react-icons/fa'

export const Home = () => {


const [name, setName] = useState('')  
const [toggle, setToggle] = useState(false)
const [buttonClicked, setButtonClicked] = useState(false)


const fetchResult = async (url) =>{
    try{

     const response = await fetch(url)
     const products = await response.json()
     if(toggle){
        setProducts(products.drinks)
     }
     else{
        setProducts(products.meals)
     }
     
     console.log(products)

     

    } catch(error){
        console.log(error)   
 }

}
const [products, setProducts] = useState([fetchResult()])



useEffect(() => {

    if(toggle){
   fetchResult('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    }
    else{
        fetchResult('https://www.themealdb.com/api/json/v1/1/random.php')
    }
}, [toggle]);


const handleSearch = () => {
     const url1 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    const url2 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}` 

    if(toggle){
       fetchResult(url2)
    }
    else{
       fetchResult(url1)
    }  

}

const handleInputChange = (e) => {
    setName(e.target.value)
    console.log(name)

}    

const handleToggle = (e) => {
    setToggle(e.target.checked)
}



  return (
    <div className='Home' >
    <div className="searchbar">
            <input className='search-input'
                 type='text'
                 placeholder='Meal or Cocktail...'
                 value={name}
                 onChange={handleInputChange}
            />
           <button className='submit' onClick={handleSearch}>Search
           </button>
           </div>
           <div className=' toggle-container'>
           <input
               type='checkbox'
               id='temp-toggle'
               className='temp-toggle'
                onClick={handleToggle}
           />
           <label htmlFor='temp-toggle'>Cocktail</label>
           
        </div>
      <div className='products-container'>
        {
     
  
        products.map((product) => (

            toggle ? 
            <div key={ product.idDrink}   className='product-box'> 

            <img src={product.strDrinkThumb} alt={product.strDrinkThumb} />
            <h2>{product.strDrink}</h2>

            {
                buttonClicked ?
                (
                    <div className='extend'>
                    <p className='category'>Category:{product.strCategory}</p>
                    <p className='type'>Type: {product.strAlcoholic}</p>
                    <p className='ingredient'>Ingredient: {product.strIngredient1} &more</p>
                    <p className='instruction'>Instruction: {product.strInstructions}</p>

                    </div>
                ):
                (
                    <h3></h3>
                )
            }
            
            {
                buttonClicked ?
                (
                    <button className='up-button' 
                    onClick={ () => setButtonClicked(!buttonClicked)}> 
                    <FaAngleUp/> 
                    </button>

                ):
                (
                    
                    <button className='down-button' 
                    onClick={ () => setButtonClicked(!buttonClicked)}> 
                    <FaAngleDown/> 
                    </button>
                )
            }
          
        

            </div>
            
            :
            
            <div key={ product.idMeal}   className='product-box'> 
            
            <img src={product.strMealThumb} alt={product.strMealThumb} />
            <h3>{product.strMeal}</h3>
          

            {
                buttonClicked ?
                (
                    <div className='extend'>
                    <p className='category'>Category:{product.strCategory}</p>
                    <p className='Origin'>Origin: {product.strArea}</p>
                    <p className='ingredient'>Ingredient: {product.strIngredient1} &more</p>
                    <p className='instruction'>Instruction: {product.strInstructions}</p>

                    </div>
                ):
                (
                    <h3></h3>
                )
            }
            
            {
                buttonClicked ?
                (
                    <button className='up-button' 
                    onClick={ () => setButtonClicked(!buttonClicked)}> 
                    <FaAngleUp/> 
                    </button>

                ):
                (
                    
                    <button className='down-button' 
                    onClick={ () => setButtonClicked(!buttonClicked)}> 
                    <FaAngleDown/> 
                    </button>
                )
            }
            </div>
         
        ))
    
    }

        
      </div>

    </div>
  )

  }

export default Home