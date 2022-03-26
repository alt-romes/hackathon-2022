

function TableRow({ rowValues }) {

    const renderItems = rowValues.map((item, i) => (
        <td key={i+item} className="px-6 py-4">
            {item}
        </td>
    ))

    return (
        <tr className="bg-teal hover:bg-white hover:text-black border-y border-black">
            {renderItems}
        </tr>
    )
}

export default TableRow