import { Stack } from "@mui/material";

export default function Login() {
    return (
        <>
            <Stack
                sx={{
                    width: "100%",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Stack
                    sx={{
                        position: "relative",
                        width: "500px",
                        height: "500px",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: 3,
                        padding: 2,
                    }}
                >
                    <h2>Login</h2>
                </Stack>
            </Stack>
        </>
    );
}
