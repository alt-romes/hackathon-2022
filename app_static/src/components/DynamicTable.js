import TableRow from "./TableRow"

function DynamicTable({tableFields}) {

    const table = [
        ['Ricardo', '22','PT'],
        ['Alberto', '22','PT'],
        ['Rodrigo', '22','PT']
    ]

    const renderRows = table.map((row,i) => (
        <TableRow key={i+row[0]} rowValues={row} />
    ))

    const renderTh = tableFields.map((item, i) => (
        <th key={i+item} className={"px-6 py-3"}>
            {item}
        </th>
    ))

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {renderTh}
                    </tr> 
                </thead>
                <tbody>
                    {renderRows}
                </tbody>
            </table>
        </div>
    )
}

export default DynamicTable
