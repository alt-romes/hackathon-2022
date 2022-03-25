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

    //w-full
    return (
        <table className="w-full mx-auto text-sm text-left text-white">
            <thead className="text-xs text-white uppercase bg-white">
                <TableRow rowValues={table[0]}/>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    )
}

export default DynamicTable