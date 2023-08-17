import { useEffect, useState } from "react"
import {snacks} from  "../JsonData"

export const SnackTable = ()=>{
    console.log(snacks)
const [snack,setSnack] = useState(snacks)
const [filterSnackTable,setFilterSnackTable] = useState(snack)
const [clickTableHeading,setClickTableHeading] = useState('desc')

const onclickTableHeadingHandle = (attr)=>{
    if(clickTableHeading === 'aesc'){
        setClickTableHeading("desc")
    }else{
        setClickTableHeading("aesc")
    }
    if(clickTableHeading == "aesc"){
        const sorted = [...snacks].sort((a, b) => {
            if (attr === 'product_name') {
              return a[attr].localeCompare(b[attr]);
            }else if(attr === 'product_weight'){
                console.log(a,a[attr]);
                return parseInt(a["product_weight"].split('g')[0])-parseInt(b["product_weight"].split('g')[0]);
            }else if(attr == 'ingredients'){
                return a[attr][0].localeCompare( b[attr][0])
            }
             else {
              return a[attr] - b[attr];
            }
          });
          setSnack(sorted);
    }else{
        const sorted = [...snacks].sort((a, b) => {
            if (attr === 'product_name') {
              return b[attr].localeCompare(a[attr]);
            }else if(attr === 'product_weight'){
                
               return parseInt(b["product_weight"].split('g')[0])-parseInt(a["product_weight"].split('g')[0]);
            }else if(attr == 'ingredients'){
                return b[attr][0].localeCompare( a[attr][0])
            } else {
              return b[attr] - a[attr];
            }
          });
          setSnack(sorted);
    }
   
}

const searchInputHandle = (event)=>{
    console.log(event.target.value);
    let value= event.target.value;

    const filtered = value === ''? snacks : [...snack].filter(snackItem =>{
        console.log(snackItem.product_name,value)
        return snackItem.product_name.toLowerCase().includes(value.toLowerCase());
    })

    

    setSnack(filtered);
}

console.log("filtersnackTable",filterSnackTable)



    return <div className="snack-table-container">
    <h3>Snack Table</h3>
    <input onChange={searchInputHandle}  className="search-snacks"type='text' placeholder="Search here..."/>
    <div>
    <table className="snacks-table">
        <thead>
            <tr>
                <td>ID</td>
                <td onClick={() => onclickTableHeadingHandle('product_name')}>Product Name</td>
                <td onClick={() => onclickTableHeadingHandle('product_weight')}>Product Weight</td>
                <td onClick={() => onclickTableHeadingHandle('price')}>Price(INR)</td>
                <td onClick={() => onclickTableHeadingHandle('calories')}>Calories</td>
                <td onClick={()=> onclickTableHeadingHandle('ingredients')}>Ingredient</td>
            </tr>
        </thead>
        <tbody>
        {snack.length !== 0  ? snack.map((snack, i)=>{
            const {id,product_name,product_weight,price,calories,ingredients} = snack

            return <tr key={id}>
                <td>{id}</td>
                <td>{product_name}</td>
                <td>{product_weight}</td>
                <td>{price}</td>
                <td>{calories}</td>
                <td>{ingredients.join(", ")}</td>

            </tr>
        }):<tr>
            <td colSpan="6" className="text-no-found">No data Found</td>
            </tr>}
        </tbody>
        
    </table>
    </div>
    </div>
}