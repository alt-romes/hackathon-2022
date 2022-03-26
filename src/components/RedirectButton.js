import {
    useNavigate
} from "react-router-dom";

function RedirectButton({page}) {
    let navigate = useNavigate();
    const buttonName = 'Redirect'

    return (
        <div>
            <button 
            className="bg-teal hover:bg-white hover:text-black text-white font-bold py-2 px-4 border border-black rounded"
            onClick={() => navigate("/"+page)}
            >
                {buttonName}
            </button>
        </div>
    )
}

export default RedirectButton;