import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createRow } from "../axios"

function CustomForm({ formFields, submitRoute, submitText }) {
    const [inputObj, setInputObj] = useState({})
    let navigate = useNavigate();

    const handleChange = (event, index) => {
        let obj = { ...inputObj }
        obj[formFields[index][0]] = event.target.value
        setInputObj(obj)
    }

    useEffect(() => {
        console.log(inputObj)
    }, [inputObj])

    const handleSubmit = (event) => {
        console.log(inputObj)
        if (inputObj) {
            createRow(inputObj).then(
                res => {
                    navigate('/' + submitRoute)
                    console.log("Success")
                }
            ).catch(
                err => {
                    if (err.response) {
                        console.log(err.response)
                    }
                }
            )
        }
    }

    const renderInputs = formFields.map((fieldN, i) => (
        fieldN[1] === "N" ? (
            <div key={fieldN[0] + i} className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {fieldN[0]}
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder={fieldN[0]}
                    onChange={event => handleChange(event, i)} />
            </div>
        ) : (
            fieldN[1] === "L" ? (
                <div key={fieldN[0] + i} className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                        {fieldN[0]}
                    </label>
                    <textarea
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        placeholder={fieldN[0]}
                        rows="3"
                        onChange={event => handleChange(event, i)} />
                </div>
            ) : (
                <div key={i} className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload file</label>
                    <input type="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            )
        )
    ))

    return (
        <form>
            {renderInputs}
            <button onClick={handleSubmit} type="submit" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">{submitText}</button>
        </form>
    )
}

export default CustomForm;
