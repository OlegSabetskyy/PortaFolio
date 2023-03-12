import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
    NavLink,
    useParams,
    useNavigate,
    Navigate,
    useSearchParams
} from "react-router-dom";
import Index from "./views/Index";
import About from "./views/About";
import NotFound from "./views/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* basic routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />

                {/* route with inline component */}
                <Route
                    path="/test"
                    element={
                        <>
                            <h1>Test page</h1>
                            <Link to="/">Index</Link>
                            <Link to="/about">About</Link>
                        </>
                    }
                />

                {/* route for everything not matching other one's (such as error 404 page) */}
                <Route path="*" element={<NotFound />} />

                {/* nested route */}
                <Route
                    path="/nested"
                    element={
                        <>
                            {/* this will be shared by all children */}
                            <div
                                style={{
                                    backgroundColor: "red"
                                }}
                            >
                                <NavLink
                                    to="sub-path"
                                    style={({ isActive }) => {
                                        return {
                                            backgroundColor: isActive
                                                ? "blue"
                                                : "gray"
                                        };
                                    }}
                                >
                                    Some shared code
                                </NavLink>
                                <h1>More shared code</h1>

                                {/* Outlet = children */}
                                <Outlet />
                            </div>
                        </>
                    }
                >
                    <Route index element={<h1>Nested route (index)</h1>} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/:id" element={<ProductPage />} />
                </Route>

                {/* useNavigate, useful for redirecting through code */}
                <Route path="/useNavigate" element={<UseNavigatePage />} />

                {/* protected route */}
                <Route
                    path="/protected-route"
                    element={
                        <ProtectedRoute>
                            <h1>Some restricted content</h1>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

const ProtectedRoute = ({ children }) => {
    if (true) return <Navigate to="/" />;

    return children;
};

const UseNavigatePage = () => {
    let navigate = useNavigate();

    return (
        <button
            onClick={() => {
                navigate("/");
            }}
        >
            useNavi
        </button>
    );
};

const ProductsPage = () => {
    return (
        <>
            <h1>Products page</h1>
            <Link to="/">Index</Link>
            <Link to="/about">About</Link>
            <Link to="/test">Test</Link>
        </>
    );
};

let ProductPage = () => {
    let { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <h1>Product ID: {id}</h1>
            <h1>Param: {searchParams.get("param")}</h1>
        </>
    );
};

export default App;
