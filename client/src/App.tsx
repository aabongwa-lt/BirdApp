import './App.css'
import PrimaryWrapper from "./Components/PrimaryWrapper.tsx";

function App() {

    return (
        <PrimaryWrapper>
            <div
                className={" mx-auto w-152 h-150 bg-slate-800 rounded-lg outline-2 outline-slate-700 p-5 flex flex-col items-center justify-center"}>
                <h1 className={"text-slate-100"}>Welcome to Dashboard!</h1>
                <p className={"text-slate-400"}>
                    You can find all your favorite feature and fun facts about them!
                </p>
            </div>
        </PrimaryWrapper>
    )
}

export default App
