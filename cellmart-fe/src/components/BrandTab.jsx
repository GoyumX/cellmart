function BrandTab(props) {

    const handleClick = () => {
        props.onClick(props.name); 
    }

    if (props.selectedbrand === props.name || props.selectedtypes === props.name) {
        return (
            <div className="text-sm md:text-base font-semibold bg-gray-200 border rounded-md px-2 py-1 cursor-pointer whitespace-nowrap" onClick={handleClick}>
                {props.name}
            </div>
        );
    }
    return (
        <div className="text-sm md:text-base border rounded-md px-2 py-1 cursor-pointer whitespace-nowrap" onClick={handleClick}>
            {props.name}
        </div>
    );
}

export default BrandTab;