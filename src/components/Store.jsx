import { useOutletContext } from "react-router-dom"
import ProductContainer from "./ProductConteiner";

function Store({products}){
    const props = useOutletContext();

    let allProds = []

for(let prop in props){
    allProds = [...allProds,...props[prop]]
}

console.log(allProds)

return (
    <div>
        {
            allProds.map(prod=> <ProductContainer productData={prod}/>)
        }
    </div>
)
}

export default Store