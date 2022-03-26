import TableRow from "./TableRow"

function DynamicTable({fieldNames}) {

    const table = [
        ['Ricardo', '22','PT'],
        ['Alberto', '22','PT'],
        ['Rodrigo', '22','PT']
    ]
    
    const renderRows = table.map((row,i) => (
        <TableRow key={i+row[0]} rowValues={row}/>
    ))

    return (
        <table className="w-full mx-auto text-sm text-left text-white">
            <thead className="text-white uppercase bg-white">
                <TableRow rowValues={fieldNames}/>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    )
}

export default DynamicTable