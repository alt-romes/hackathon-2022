import {
    useNavigate
} from "react-router-dom";

function SimpleButton({text}) {
    let navigate = useNavigate();

    return (
        <div>
            <button 
            className="bg-teal hover:bg-white hover:text-black text-white font-bold py-2 px-4 border border-black rounded"
            >
                {text}
            </button>
        </div>
    )
}

export default SimpleButton;