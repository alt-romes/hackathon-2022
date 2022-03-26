import TableRow from "./TableRow"

function DynamicTable({table}) {

    const renderRows = table.map((row,i) => (
        <TableRow key={i+row[0]} rowValues={row}/>
    ))

    const rowNames = ['Name','Age','Nationality']

    return (
        <table className="w-full mx-auto text-sm text-left text-white">
            <thead className="text-white uppercase bg-white">
                <TableRow rowValues={rowNames}/>
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    )
}

export default DynamicTable