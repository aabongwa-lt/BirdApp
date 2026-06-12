
function PrimaryWrapper(props : {children: React.ReactNode}) {
    return (
        <div className={"w-full px-20"}>
            {props.children}
        </div>
    );
}

export default PrimaryWrapper;