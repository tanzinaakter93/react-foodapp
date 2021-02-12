import React, {useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import "./App.css";
import Recipe from './components/Recipe';
import alert from './components/alert';

const App = () => {
    const [query,setQuery]= useState("");
    const [recipes, setRecipes]=useState([]);
    const [alert, setAlert]=useState("");
    const APP_ID="bf33565c";
    const APP_KEY="0d3e1618a9b96f212b6e7bad0c3f5ef2";
    const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData =async ()=> {
        if(query!==""){
            const result= await Axios.get(url);
        setRecipes(result.data.hits);
        console.log(result);
        setQuery("");
        }
        else{
            setAlert("Please fill the form")
        }
    }
    const onChange=(e)=>{
        setQuery(e.target.value);
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        getData();
    }
    return (
        <div className="App">
            <h1 onClick={getData}>Food Recipe</h1>
            <form className="search-form" onSubmit={onSubmit}>
                {alert!== "" && <alert alert={alert}/>}
                <input type="text" placeholder="Search recipe" autoComplete="off" onChange={onChange} value={query}/>
                <input type="submit" value="search" />
            </form>
             <div className="recipes">
                 {recipes!==[] && recipes.map(recipe=><Recipe key={uuidv4()} recipe={recipe}/>)}
             </div>
        </div>
    )
}

export default App
