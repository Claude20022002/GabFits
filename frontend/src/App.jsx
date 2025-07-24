import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/main/Home.jsx";
import Header from "./components/layout/Header.jsx";
import { Stack } from "@mui/material";
import "./App.css"; // Assuming you have some global styles

export default function App() {
    return (
        <Stack position={"relative"} minHeight="100vh">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </Stack>
    );
}
