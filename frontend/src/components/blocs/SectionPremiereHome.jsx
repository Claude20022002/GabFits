import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import "./styleSectionFirst.css";

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
                padding: "60px 0",
                backgroundImage: images[index],
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "450px", // pour voir l'image
                color: "#fff",
            }}
        >
            <Box
                className="section-premiere-home-content"
                sx={{ textAlign: "center", padding: "20px" }}
            >
                <Typography variant="h4" sx={{ marginTop: "20px" }}>
                    Welcome to Gab<span style={{ color: "#da1d25" }}>Fits</span>
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
            <Stack
                className="section-premiere-home-button"
                sx={{
                    width: "100%",
                    padding: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "20px",
                }}
            >
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#da1d25" }}
                    size="large"
                >
                    Get Started
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#da1d25" }}
                    size="large"
                >
                    Contact Us
                </Button>
            </Stack>
        </Stack>
    );
}
