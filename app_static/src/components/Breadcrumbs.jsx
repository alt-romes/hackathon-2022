import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export default function Breadcrumbs() {
    let navigate = useNavigate()
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className="flex" aria-label="Breadcrumb">
            {breadcrumbs.map(({ breadcrumb }, i) => (
                <span key={breadcrumb+i} className="flex">
                    {
                        i !== 0 && (
                            <h3 className="px-1">/</h3>
                        )
                    }
                    <h3>{breadcrumb}</h3>
                </span>
            ))}
        </div>
    )
}