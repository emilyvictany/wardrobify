import { useEffect, useState } from "react";
import "./index.css"

function HatList() {
    const [hats, setHats] = useState ([])

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/hats/")

    if (response.ok) {
        const data = await response.json()
        setHats(data.hats)
    }
}

    useEffect(() => {
        getData()
    }, [])

    return (
        <table className="table table-striped">
        <thead>
            <tr>
                <th>Fabric</th>
                <th>Style Name</th>
                <th>Color</th>
                <th>Picture</th>
                <th>Location</th>
            </tr>
        </thead>
        <tbody>
            {hats.map(hat => {
                return (
                    <tr key={hat.import_href}>
                        <td>{ hat.fabric }</td>
                        <td>{ hat.style }</td>
                        <td>{ hat.color }</td>
                        <td><img src={ hat.picture_url }></img></td>
                        <td>{ hat.location }</td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    )
}
export default HatList