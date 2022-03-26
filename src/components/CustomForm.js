import { useEffect, useState } from "react"

export default function CustomForm({ fieldNames }) {
    const [inputObj, setInputObj] = useState({})

    const handleChange = (event, index) => {
        let obj = {...inputObj}
        obj[fieldNames[index]] = event.target.value
        setInputObj(obj)
    }

    const handleSubmit = (event) => {
        console.log(inputObj)
    }
    
    const renderInputs = fieldNames.map((fieldN, i) => (
        <div key={fieldN+i}>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {fieldN}
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id={i + fieldN}
                type="text"
                placeholder={fieldN}
                onChange={event => handleChange(event, i)} />
        </div>
    ))

    return (
        <div className="w-full max-w-lg">
            {renderInputs}
            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    )
}