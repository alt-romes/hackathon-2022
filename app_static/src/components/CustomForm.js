import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createRow } from "../axios"

function CustomForm({ formFields, SubmitRoute, SubmitText }) {
    const [inputObj, setInputObj] = useState({})
    let navigate = useNavigate();

    const handleChange = (event, index) => {
        let obj = { ...inputObj }
        obj[formFields[index][0]] = event.target.value
        setInputObj(obj)
    }

    const handleSubmit = (event) => {
        console.log(inputObj)
        if (inputObj) {
            createRow(inputObj).then(
                res => {
                    navigate('/' + SubmitRoute)
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
        <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form>
                {renderInputs}
                <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default CustomForm;
