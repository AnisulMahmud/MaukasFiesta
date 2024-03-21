import React from 'react'
import { useState } from 'react'
import {FaAngleDown, FaAngleUp} from 'react-icons/fa'
import { useFetchProducts } from '../hooks/useFetchProducts'

export const Home = () => {


const [name, setName] = useState('')  
const [toggle, setToggle] = useState(false)
const [buttonClicked, setButtonClicked] = useState({})
const [url, setUrl] = useState('https://www.themealdb.com/api/json/v1/1/random.php')
const [products, error, isLoaded] = useFetchProducts(url, toggle)


const handleSearch = (e) => {

    if(e.type === 'click' || (e.type === 'keydown' &&  e.key === 'Enter')){
     const url1 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    const url2 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}` 

    const newUrl = toggle? url2 : url1
    setUrl(newUrl)
    }
    else{
        return
    }

}

// useEffect ( ()=>{
     
//     const randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php'
//     const randomDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
//     const randomUrl = toggle? randomDrinks : randomMeal
//     setUrl(randomUrl)
// },[url,toggle] )


const handleInputChange = (e) => {
    setName(e.target.value)
    console.log(name)

}    

const handleToggle = (e) => {
    const newToggle = e.target.checked;
    setToggle(newToggle);
  
    const randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const randomDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const randomUrl = newToggle ? randomDrinks : randomMeal;
    setUrl(randomUrl);
  }


  return (
    <div className='Home' >
    <div className="searchbar">
            <input className='search-input'
                 type='text'
                 placeholder='Meal or Cocktail...'
                 value={name}
                 onChange={handleInputChange}
                 onKeyDown={handleSearch}
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
        error &&
        <div> {error} </div>
      }
        {
     
        isLoaded ? <div className='loader'> </div> :
        products.map((product) => (

            toggle ? 
            <div key={ product.idDrink}   className='product-box'> 

            <img src={product.strDrinkThumb} alt={product.strDrinkThumb} />
            <h2>{product.strDrink}</h2>

            {
                buttonClicked[product.idDrink] ?
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
                buttonClicked[product.idDrink] ?
                (
                    <button className='up-button' 
                    onClick={ () => setButtonClicked({...buttonClicked, [product.idDrink]: false})}> 
                    <FaAngleUp/> 
                    </button>

                ):
                (
                    
                    <button className='down-button' 
                    onClick={ () => setButtonClicked({...buttonClicked, [product.idDrink]: true})}> 
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
                buttonClicked[product.idMeal] ?
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
                buttonClicked[product.idMeal] ?
                (
                    <button className='up-button' 
                    onClick={ () => setButtonClicked({...buttonClicked, [product.idMeal]: false})}> 
                    <FaAngleUp/> 
                    </button>

                ):
                (
                    
                    <button className='down-button' 
                    onClick={ () => setButtonClicked({...buttonClicked, [product.idMeal]: true})}> 
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