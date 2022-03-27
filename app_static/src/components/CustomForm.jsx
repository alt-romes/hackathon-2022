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

    const handleSubmit = (event) => {
        if (inputObj) {
            createRow(inputObj).then(
                res => {
                    navigate("/".concat(submitRoute))
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
        <div>
            {renderInputs}
            <div className="inline-flex rounded-lg shadow-md" role="group">
                <button onClick={handleSubmit} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">{submitText}</button>
            </div>
        </div>
    )
}

export default CustomForm;
