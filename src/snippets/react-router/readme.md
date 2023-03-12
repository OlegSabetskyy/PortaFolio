# React-router

## Installation

```bash
npm i
```

## Kickstart project

```bash
npm run dev
```

Project URL: http://localhost:5173

## Short summary

### Components

-   BrowserRouter: parent of everything
-   Routes: parent of the routes
-   Route: individual route
    -   path (attribute) = ruta
        -   use :id for path's with id's, such as /product/1234
    -   element (attribute) = element that you want to render on the path
-   Route: within route work as expected (that's a sub-route), can be useful for Layout component
-   index (attribute) indicates that's the default route for that specific sub-route
-   Outlet: (on the sub-route's component) will show the real content (again, useful for layout), everything else will be shared between all children's
-   Link: to navigate between pages instead of the \<a href\>\</a\>
    -   to (attribute) = to where xD
-   NavLink: Acts as a Link + lets you add custom styles if the path matches the current one on the children. By default it adds the "active" class. Example:
    ```js
    // className is allowed as well
    style={({ isActive }) => {
            return {
                backgroundColor: isActive ? "red": "gray"
            };
        }
    }
    ```
-   Navigate: useful for protecting routes. If a certain condition is not met, then we can return this element instead of the content that the component has, it will redirect.
    -   to (attribute) = to where xD

### Hooks (functions)

-   useNavigate: redirect user
-   useSearchParams: query params. Example:

    ```js
    const [searchParams, setSearchParams] = useSearchParams();
    {
        searchParams.get("param");
    }
    ```

-   useParams: get url params. Example:
    ```js
    let { id } = useParams();
    ```

## Useful project info

-   Important code is in App.jsx
-   Available routes:
    -   /
    -   /about
    -   (404 error page)
    -   /nested
    -   /nested/sub-path
    -   /nested/products
    -   /nested/products/:id
    -   /useNavigate
    -   /protected-route

## Snippets

#### Basic example

```js
import { BrowserRouter, Routes, Route } from "react-router-dom";

let App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="testing"
                    element={
                        <div>
                            <h2>inline component</h2>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

let Home = () => {
    return <h1>Home component</h1>;
};
```

#### Links

```js
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Link to="/about" className="btn">
            About
        </Link>
    );
};
```

#### Error Page

-   App.js

```js
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* error page */}
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};
```

#### Nested Pages & Shared Layout & index attribute

-   Index routes render in the parent routes outlet at the parent route's path
-   Index routes match when a parent route matches but none of the other children match

```js
import { Outlet } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const Layout = () => {
    return (
        <>
            <header></header>

            {/* outlet = children */}
            <Outlet />

            <footer></footer>
        </>
    );
};
```

#### NavLink

```js
import { NavLink } from "react-router-dom";

const Item = () => {
    return (
        <NavLink
            to="/about"
            style={({ isActive }) => {
                return { color: isActive ? "red" : "grey" };
            }}
            className={({ isActive }) =>
                isActive ? "some-active-class active-x2" : "not-active-class"
            }
        >
            Home
        </NavLink>
    );
};
```

#### useParams: reading URL Params

```js
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const { id } = useParams();
    return <h2>{id}</h2>;
};
```

#### useNavigate: redirect through hook

```js
import { useNavigate } from "react-router-dom";

const UseNavigate = () => {
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
```

#### Protected Route

```js
import { Navigate } from "react-router-dom";

<Route
    path="dashboard"
    element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard user={user} />
        </ProtectedRoute>
    }
/>;

const ProtectedRoute = ({ children, isLoggedIn }) => {
    if (!isLoggedIn) return <Navigate to="/" />;
    return children;
};
```
