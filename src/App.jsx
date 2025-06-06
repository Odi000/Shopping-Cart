import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";

function App() {
    const [link, setLink] = useState(null);
    useEffect(() => {
        fetch('/products.json').then(response => {
            return response.json();
        }).then(data => {
            setLink(data.smartphones[0].image)
        })
    }, [])


    return (
        <>
        <HomePage>
        <img id="abcddhefgjsad" src={link} alt="" />
        </HomePage>
        </>
    )
}
export default App