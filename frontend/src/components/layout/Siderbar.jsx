import { Button, Stack, Typography, Drawer, Box } from "@mui/material";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Hamburger from "hamburger-react";

export default function Sidebar() {
    const [etatBouton, setEtatBouton] = useState("Connexion");
    const [isOpen, setIsOpen] = useState(false); // gère le Drawer

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
        <Stack component="nav" sx={{ padding: "10px" }}>
            {/* Bouton hamburger visible uniquement sur mobile */}
            <Stack sx={{ display: { xs: "flex", md: "none" } }}>
                <Hamburger
                    toggled={isOpen}
                    toggle={setIsOpen}
                    color="#fff"
                    size={30}
                    label="Menu"
                />
            </Stack>

            {/* Menu Desktop toujours visible */}
            <Stack
                component="ul"
                direction="row"
                sx={{
                    display: { xs: "none", md: "flex" },
                    listStyle: "none",
                    gap: "10px",
                    color: "#fff",
                    padding: 0,
                    margin: 0,
                    "& li h6": {
                        fontSize: { xs: "14px", md: "16px" },
                        cursor: "pointer",
                    },
                }}
            >
                {menuItems.map((item, index) => (
                    <Stack component="li" key={index}>
                        <Typography variant="h6">{item}</Typography>
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

            {/* Drawer pour mobile */}
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "#111", // fond sombre
                            color: "#fff",
                            width: "250px", // largeur du menu
                            padding: "20px",
                        },
                    },
                }}
            >
                <Box
                    component="ul"
                    sx={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >
                    {menuItems.map((item, index) => (
                        <Box
                            component="li"
                            key={index}
                            sx={{ marginBottom: "15px", cursor: "pointer" }}
                            onClick={() => setIsOpen(false)}
                        >
                            <Typography variant="h6">{item}</Typography>
                        </Box>
                    ))}
                    <Box component="li" sx={{ marginTop: "20px" }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color={
                                etatBouton === "Connexion" ? "success" : "error"
                            }
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
                    </Box>
                </Box>
            </Drawer>
        </Stack>
    );
}

/*
📌 Explications :
1. On utilise MUI Drawer pour créer un menu coulissant depuis la droite sur mobile.
2. Le hamburger (hamburger-react) contrôle l'état "isOpen" du Drawer.
3. Sur desktop (md et +) le menu est affiché directement en ligne avec un Stack horizontal.
4. Sur mobile (xs à sm), le menu est masqué et accessible uniquement via le Drawer.
5. Le Drawer est stylisé avec slotProps (largeur, couleur, padding).
6. Chaque clic sur un lien ferme le Drawer automatiquement pour améliorer l'expérience utilisateur.
*/
