import { Button, Stack, Typography, Drawer, Box } from "@mui/material";
import React, { useState, useRef } from "react";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Hamburger from "hamburger-react";

export default function Sidebar() {
    const [etatBouton, setEtatBouton] = useState("Log In");
    const [isOpen, setIsOpen] = useState(false);
    const hamburgerRef = useRef(null); // Ref pour focus

    const toggleButtonState = () => {
        setEtatBouton((prevState) =>
            prevState === "Log In" ? "Log Out" : "Log In"
        );
    };

    const menuItems = [
        "Home",
        "Courses",
        "Coaches",
        "Pricing",
        "Testimonials",
        "Contact",
    ];

    const handleCloseDrawer = () => {
        setIsOpen(false);
        setTimeout(() => {
            hamburgerRef.current?.focus();
        }, 100);
    };

    return (
        <Stack component="nav" sx={{ padding: "10px" }}>
            {/* Bouton hamburger pour mobile */}
            <Stack sx={{ display: { xs: "flex", md: "none" } }}>
                <Hamburger
                    toggled={isOpen}
                    toggle={setIsOpen}
                    color="#fff"
                    size={30}
                    label="Menu"
                    ref={hamburgerRef}
                />
            </Stack>

            {/* Menu desktop */}
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
                        color={etatBouton === "Log In" ? "success" : "error"}
                        onClick={toggleButtonState}
                        startIcon={
                            etatBouton === "Log In" ? (
                                <LoginIcon />
                            ) : (
                                <LogoutIcon />
                            )
                        }
                    >
                        {etatBouton}
                    </Button>
                </Stack>
            </Stack>

            {/* Drawer mobile */}
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={handleCloseDrawer}
                ModalProps={{ keepMounted: true }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "#111",
                            color: "#fff",
                            width: "250px",
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
                            sx={{
                                marginBottom: "15px",
                                cursor: "pointer",
                                "&:hover": {
                                    color: "rgb(226, 80, 43)",
                                    backgroundColor: "rgb(187, 199, 206)",
                                },
                                width: "100%",
                                textAlign: "center",
                                borderRadius: "5px",
                                padding: "5px 0",
                            }}
                            onClick={handleCloseDrawer}
                        >
                            <Typography variant="h6">{item}</Typography>
                        </Box>
                    ))}
                    <Box
                        component="li"
                        sx={{ marginTop: "20px", width: "100%" }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            color={
                                etatBouton === "Log In" ? "success" : "error"
                            }
                            onClick={toggleButtonState}
                            startIcon={
                                etatBouton === "Log In" ? (
                                    <LoginIcon />
                                ) : (
                                    <LogoutIcon />
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
1. Drawer mobile avec keepMounted pour éviter le problème aria-hidden.
2. Ref sur le bouton hamburger pour restaurer le focus après fermeture.
3. Menu desktop affiché en flex horizontal, masqué sur mobile.
4. slotProps.paper utilisé à la place de PaperProps (API récente MUI).
5. Chaque lien ferme le Drawer pour meilleure UX mobile.
*/
