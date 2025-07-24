import { Box, Stack } from "@mui/material";
import Siderbar from "./Siderbar";

export default function Header() {
    return (
        <>
            <Stack
                component="header"
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{
                    padding: "0 20px",
                    height: "100px",
                    width: "100%",
                    backgroundColor: "#363636ff",
                    borderBottom: "1px solid #e0e0e0",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    position: "fixed",
                }}
            >
                <Box
                    component={"img"}
                    src="./logo/logo1.png"
                    alt="Logo"
                    sx={{ height: "90px" }}
                />
                <Siderbar />
            </Stack>
        </>
    );
}
