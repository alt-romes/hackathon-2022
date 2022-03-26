import {
    useNavigate
} from "react-router-dom";

function SimpleButton({handleClick, text}) {
    let navigate = useNavigate();

    return (
        <div>
            <button
            onClick={handleClick} 
            className="bg-teal hover:bg-white hover:text-black text-white font-bold py-2 px-4 border border-black rounded"
            >
                {text}
            </button>
        </div>
    )
}

export default SimpleButton;