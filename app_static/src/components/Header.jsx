import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"


export default function Header({ mainPage }) {
    const [page, setPage] = useState("")
    const [previous, setPrevious] = useState("")

    let navigate = useNavigate()
    let location = useLocation()

    const canGoBack = () => {
        if(page === mainPage && previous != "") {
            return false;
        }
        return true;
    }

    useEffect(() => {
        console.log(previous)
        let pagePath = location.pathname.replace('/', '')
        pagePath = pagePath.replace("%20", " ")
        if (pagePath != page) {
            setPrevious(page)
            setPage(pagePath)
        }
    }, [location])

    return (
        <div className="flex items-center bg-gray-50 p-6">
            <div className="w3-container w3-xlarge">
                {
                    canGoBack() != "" &&
                    <i onClick={() => navigate(-1)} class="fa fa-arrow-left"></i>
                }
            </div>
            <div>
                {
                    page && <h1>{page}</h1>
                }
            </div>
        </div>
    )
}

/*
  <div>
                {
                    tabs && (
                        <ul className="flex">
                            {
                                tabs.map((p, i) => (
                                    <li key={p + i} className="mr-2">
                                        <h2 className="text-center py-2 px-4 hover:bg-blue-700 text-black">{p}</h2>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        */