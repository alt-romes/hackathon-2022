import DynamicTable from "../components/DynamicTable"
import RedirectButton from "../components/RedirectButton"

function TablePage({fieldNames}) {

    const table = [
        ['Ricardo', '22','PT'],
        ['Alberto', '22','PT'],
        ['Rodrigo', '22','PT']
    ]

    return (
        <div>
            <DynamicTable table={table} fieldNames={fieldNames}/>
        </div>
    )
}

export default TablePage