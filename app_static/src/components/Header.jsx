import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


export default function Header({ pages }) {
    const [tabs, setTabs] = useState(undefined)
    let navigate = useNavigate()

    useEffect(() => {
        console.log(tabs)
        if(!tabs) {
            setTabs(pages)
        }
    }, [tabs])

    return (
        <div className="flex max-auto items-center justify-between flex-wrap bg-teal p-6">
            <div className="w-full block flex-grow ">
                <div className="text-sm lg:flex-grow">
                {
                    tabs && tabs.map((p,i) => (
                        <h2 key={p+i}>{p}</h2>
                    ))
                }
                </div>
            </div>
        </div>
    )
}