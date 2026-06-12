import {useNavigate} from "react-router-dom";

function ErrorPage(props: { errors: Error }) {

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/');
    }

    return (
        <div
            className={"w-152 mx-auto h-150  bg-slate-800 rounded-lg outline-2 outline-slate-700 p-5 flex flex-col items-center justify-between "}>
            <div className="text-center flex-5  w-full ">
                <h2 className={"mb-4"}>Error !</h2>
                <h3>{props.errors.name}</h3>
                <pre>{JSON.stringify(props.errors.message)}</pre>
            </div>

            <button
                className={"w-full py-2 fl bg-slate-700 rounded-md text-slate-200 hover:scale-102 transform-all duration-500 cursor-pointer"}
                onClick={handleOnClick}>Return Home
            </button>
        </div>
    );
}

export default ErrorPage;