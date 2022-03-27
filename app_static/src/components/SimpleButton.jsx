import {
    useNavigate
} from "react-router-dom";

function SimpleButton({handleClick, text}) {
    let navigate = useNavigate();

    return (
        <div class="inline-flex rounded-lg shadow-md mr-6" role="group">
            <button type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                    onClick={handleClick} >
                {text}
            </button>
        </div>
    )
}

export default SimpleButton;
