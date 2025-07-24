import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Sidebar() {
    const [etatBouton, setEtatBouton] = useState("Connexion");
    const [isOpen, setIsOpen] = useState(false);

    const toggleButtonState = () => {
        setEtatBouton((prevState) =>
            prevState === "Connexion" ? "Déconnexion" : "Connexion"
        );
    };

    const menuItems = [
        "Accueil",
        "Cours",
        "Coachs",
        "Tarifs",
        "Témoignage",
        "Contact",
    ];

    return (
        <Stack
            component="nav"
            sx={{ display: { xs: "none", md: "flex" }, padding: "10px" }}
        >
            <Stack
                component="ul"
                direction="row"
                sx={{
                    listStyle: "none",
                    display: "flex",
                    gap: "10px",
                    color: "#fff",
                    "& li h6": {
                        fontSize: { xs: "14px", md: "16px" },
                        cursor: "pointer",
                    },
                }}
            >
                {menuItems.map((item, index) => (
                    <Stack component="li" key={index}>
                        <Typography>{item}</Typography>
                    </Stack>
                ))}
                <Stack component="li">
                    <Button
                        variant="contained"
                        color={etatBouton === "Connexion" ? "success" : "error"}
                        onClick={toggleButtonState}
                        startIcon={
                            etatBouton === "Connexion" ? (
                                <LoginIcon />
                            ) : (
                                <PersonAddIcon />
                            )
                        }
                    >
                        {etatBouton}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
