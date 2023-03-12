const Card = ({ paddingSize, children }) => {
    let paddingClass;

    if (paddingSize == "medium") paddingClass = "p-7";
    else paddingSize = "p-8";

    return (
        <div className={`flex flex-col bg-white rounded-2xl ${paddingSize}`}>
            {children}
        </div>
    );
};

export default Card;
