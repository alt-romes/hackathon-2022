import { useEffect, useState } from "react"
import { getTable } from "../axios";
import TableRow from "./TableRow"

function DynamicTable({tableFields}) {
    const [tableData, setTable] = useState();

    const table = [
        ['Ricardo', '22','PT'],
        ['Alberto', '22','PT'],
        ['Rodrigo', '22','PT']
    ]

    useEffect(() => {
        if(!tableData) {
            getTable().then(
                res => {
                    setTable(res.data)
                }
            ).catch(
                err => {
                    if(err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [tableData])

    const renderRows = table.map((row,i) => (
        <TableRow key={i+row[0]} rowValues={row}/>
    ))

    return (
        <table className="w-full mx-auto text-sm text-left text-white">
            <thead className="text-white uppercase bg-white">
                <TableRow rowValues={tableFields}/>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    )
}

export default DynamicTable