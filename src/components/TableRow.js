

function TableRow({ rowValues }) {

    const renderItems = rowValues.map((item, i) => (
        <td key={i+item} className="px-6 py-4">
            {item}
        </td>
    ))

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {renderItems}
        </tr>
    )
}

export default TableRow