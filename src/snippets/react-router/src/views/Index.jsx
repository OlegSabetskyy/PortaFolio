import { Link } from "react-router-dom";

const Index = () => {
    return (
        <>
            <h1>Index page</h1>
            <Link to="/about">About</Link>
            <Link to="/test">Test</Link>
        </>
    );
};

export default Index;
