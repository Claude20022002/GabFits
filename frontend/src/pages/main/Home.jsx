import { Stack } from "@mui/material";
import React from "react";
import SectionPremiereHome from "../../components/blocs/SectionPremiereHome";
import SectionDeuxiemeHome from "../../components/blocs/SectionDeuxiemeHome";

export default function Home() {
    return (
        <Stack sx={{ paddingTop: "60px", marginTop: "20px" }}>
            <SectionPremiereHome />
            <SectionDeuxiemeHome />
        </Stack>
    );
}
