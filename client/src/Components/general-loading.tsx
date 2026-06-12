import {useEffect} from 'react';
import Loader from "./Loader.tsx";

const GeneralLoading = (props: { isLoading: boolean}) => {

    useEffect(() => {
        // Simulate data fetching
        // const timer = setTimeout(() => setLoading(false), 2000);
        // return () => clearTimeout(timer);
    }, []);


    return props.isLoading ? <Loader /> : <div>Data Loaded</div>


};

export default GeneralLoading;