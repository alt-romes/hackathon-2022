import { useEffect, useState } from "react"
import { getTable } from "../axios";
import TableRow from "./TableRow"

function DynamicTable({ tableFields }) {
    const [tableData, setTable] = useState(undefined);

    const table = [
        ['Ricardo', '22', 'PT'],
        ['Alberto', '22', 'PT'],
        ['Rodrigo', '22', 'PT']
    ]

    useEffect(() => {
        console.log(tableFields)
        if (!tableData) {
            getTable().then(
                res => {
                    console.log(res)
                    let proccessedData = res?.data?.data?.map(x =>
                        Object.entries(x).filter(x => x[0] != "id")
                            .map(y => y[1]))
                    setTable(proccessedData)
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }, [tableData])

    const renderRows = tableData?.map((row, i) => (
            <TableRow key={i + row[0]} rowValues={row} />
        ))

    const renderTh = tableFields.map((item, i) => (
        <th key={i + item} className={"px-6 py-3"}>
            {item}
        </th>
    ))

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
            {
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {renderTh}
                        </tr>
                    </thead>
                    {
                        tableData && (
                            <tbody>
                                {renderRows}
                            </tbody>
                        )
                    }
                </table>
            }
        </div>
    )
}

export default DynamicTable
