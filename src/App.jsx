import { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar";

function App() {
    const [link, setLink] = useState(null);
    useEffect(() => {
        fetch('/products.json').then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data.smartphones);
            setLink(data.smartphones[0].image)
        })
    }, [])


    return (
        <>
        <NavBar></NavBar>
        <img id="abcddhefgjsad" src={link} alt="" />
        </>
    )
}
export default App