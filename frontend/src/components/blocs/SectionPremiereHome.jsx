import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function SectionPremiereHome() {
    const backgroundImage = {
        firstBackgroundImage: 'url("/imageBackground/fond1.jpg")',
        secondBackgroundImage: 'url("/imageBackground/fond2.jpg")',
        thirdBackgroundImage: 'url("/imageBackground/fond3.jpg")',
    };

    const images = [
        backgroundImage.firstBackgroundImage,
        backgroundImage.secondBackgroundImage,
        backgroundImage.thirdBackgroundImage,
    ];

    const [index, setIndex] = useState(0);

    // Change automatiquement d’image toutes les 5 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); // Nettoyage
    }, []);

    return (
        <Stack
            className="section-premiere-home"
            sx={{
                paddingTop: "60px",
                backgroundImage: images[index],
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "500px", // pour voir l'image
                color: "#fff",
            }}
        >
            <Box
                className="section-premiere-home-content"
                sx={{ textAlign: "center", padding: "20px" }}
            >
                <Typography variant="h4" sx={{ marginTop: "20px" }}>
                    Welcome to GabFits
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        marginTop: "20px",
                        color: "#da1d25",
                        fontWeight: "bold",
                    }}
                >
                    Your Fitness Journey Starts Here
                </Typography>
                <Typography variant="body1" sx={{ marginTop: "20px" }}>
                    Join us to explore a wide range of fitness resources, from
                    workout plans to nutrition tips.
                </Typography>
            </Box>
        </Stack>
    );
}
