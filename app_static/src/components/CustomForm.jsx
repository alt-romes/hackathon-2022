import { useEffect, useState } from "react"

export default function CustomForm({ formFields }) {
    const [inputObj, setInputObj] = useState({})

    const fieldNamez = [['Name', 'N'], ['Age', 'U'], ['Nationality', 'L']]
    const handleChange = (event, index) => {
        let obj = { ...inputObj }
        obj[fieldNamez[index][0]] = event.target.value
        setInputObj(obj)
    }

    const handleSubmit = (event) => {
        console.log(inputObj)
    }


    const renderInputs = fieldNamez.map((fieldN, i) => (
        fieldN[1] === "N" ? (
            <div key={fieldN[0] + i}>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {fieldN[0]}
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id={i + fieldN[0]}
                    type="text"
                    placeholder={fieldN[0]}
                    onChange={event => handleChange(event, i)} />
            </div>
        ) : (
            fieldN[1] === "L" ? (
                <div key={fieldN[0] + i}>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {fieldN[0]}
                    </label>
                    <textarea
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id={i + fieldN[0]}
                        type="text"
                        placeholder={fieldN[0]}
                        rows="3"
                        onChange={event => handleChange(event, i)} />
                </div>
            ) : (
                <>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Upload file</label>
                    <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                </>
            )
        )
    ))

    return (
        <div className="w-full max-w-lg">
            {renderInputs}
            <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    )
}