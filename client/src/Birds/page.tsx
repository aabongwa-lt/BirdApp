import {useQuery} from "@tanstack/react-query";
import GeneralLoading from "../Components/general-loading.tsx";
import ErrorPage from "../Components/ErrorPage.tsx";
import {birdQueryOptions} from "../api/queries.ts";
import PrimaryWrapper from "../Components/PrimaryWrapper.tsx";

const BirdsDashboard = () => {
    const {data, error, isPending} = useQuery(birdQueryOptions.all())

    if (isPending) return (<GeneralLoading isLoading={isPending}/>);
    if (error) return (<ErrorPage errors={error}/>);

    return (
        <PrimaryWrapper>
            <div
                className={"min-w-152 w-full mx-auto h-150  bg-slate-800 rounded-lg outline-2 outline-slate-700 p-5 flex flex-col items-center justify-center"}>
                <h1 className={"text-slate-100"}>Birds Dashboard!</h1>
                <ul className={"flex flex-col w-full gap-1"}>
                    {data?.map(bird => (
                        <li key={bird.id}
                            className={"w-full bg-slate-700 rounded-md flex items-center justify-start gap-4 py-2 px-6"}>
                            <div className={"w-14 h-14 rounded-lg bg-slate-400"}></div>
                            {bird.name}</li>
                    ))}
                </ul>
            </div>
        </PrimaryWrapper>)
}

export default BirdsDashboard;