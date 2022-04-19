import axios from "axios"
import { useEffect, useState } from "react"

export default function Layout() {
    const [html, setHtml] = useState("")
    const [template, setTemplate] = useState("L1")

    const [layouts, setLayouts] = useState([])

    const firstname = "Champ"
    const lastname = "Decay"

    useEffect(() => {
        const gettemplates = async () => {
            const response = await axios.get("./templates/templates.json")
            setLayouts(response.data.templates)
        }
        gettemplates()
    }, [])


    useEffect(() => {
        const getLayout = async () => {
            const response = await axios.get(`./templates/${template}.html`)
            const newData = response.data.replace("{{firstname}}", firstname).replace("{{lastname}}", lastname)
            setHtml(newData)
        }
        getLayout()
    }, [template])

    if (layouts.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <>
            <select name="template" onChange={(e) => setTemplate(e.target.value)}>
                {layouts.map((layout, i) => (
                    <option key={i} value={layout}>{layout}</option>
                ))}
            </select>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </>
    )
}
