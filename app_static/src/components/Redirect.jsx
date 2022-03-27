import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export default function Breadcrumbs({mainPage}) {
    let navigate = useNavigate()
    let location = useLocation()
    const breadcrumbs = useBreadcrumbs()

    useEffect(() => {
        if(location.pathname === '/') {
            navigate("/".concat(mainPage))
        }
    }, [location])

    useEffect(() => {
        console.log(mainPage)
    }, [mainPage])

    return (
        <></>
    )
}
