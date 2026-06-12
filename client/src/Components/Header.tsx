import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={"flex items-center justify-center px-20 pt-5 mb-5"}>
            <div className="flex items-center justify-between bg-slate-800 rounded-lg w-full px-6 py-2 outline-2 outline-slate-700">
            <Link to={"/"}>
                <h2 className={"text-slate-100 italic "}>BirdsTopia</h2>
            </Link>
            <nav className={"flex items-center text-slate-200/80 hover:text-slate-200 transition-all duration-500 gap-4"}>
                <Link to="/" className=" py-2 list-none  border-b-3 border-b-slate-800 hover:text-slate-200 transition-all duration-500 hover:border-b-slate-200 ">Home</Link>
                <Link to="/Birds" className=" py-2 list-none border-b-3 border-b-slate-800 hover:text-slate-200 transition-all duration-500 hover:border-b-slate-200 ">Birds</Link>
            </nav>
            </div>
        </header>
    );
};

export default Header;