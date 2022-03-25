import TableRow from "./TableRow"

function DynamicTable() {

    const table = [
        ['Name','Age','Nationality'],
        ['Ricardo', '22','PT'],
        ['Alberto', '22','PT'],
        ['Rodrigo', '22','PT']
    ]

    const renderRows = table.map((row,i) => (
        i>0 &&
        <TableRow key={i+row[0]} rowValues={row}/>
    ))

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <TableRow rowValues={table[0]}/>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    )
}

export default DynamicTable