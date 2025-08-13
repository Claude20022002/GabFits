import { Box, Button, Stack, Typography } from "@mui/material";
import imageFemmeAvecCoach from "../../assets/images/Femme_avec_Coach.jpg";

export default function SectionDeuxiemeHome() {
    return (
        <Stack
            className="section-deuxieme-home"
            sx={{
                backgroundColor: "ffffff",
                padding: "20px 60px",
                justifyContent: "space-around",
                alignItems: "center",
                alignItems: "flex-start",
                width: "100%",
                flexDirection: "row",
                gap: "20px",
                minHeight: "500px", // pour voir l'image
            }}
        >
            <Box
                className="section-deuxieme-home-content-title-text"
                sx={{
                    color: "#000",
                    width: "50%",
                    padding: "20px 40px",
                    textAlign: "justify",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: "bold",
                        color: "#da1d25",
                        marginBottom: "10px",
                    }}
                >
                    About Gym Clubs
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                    Your Gym Helps In This Expert Trainers
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                    With a team of highly skilled trainers, we provide
                    personalized coaching to help you reach your goals faster
                    and more efficiently. Whether you’re here to gain strength,
                    improve endurance, or adopt a healthier lifestyle, our
                    experts will design programs tailored to your needs. In our
                    club, you’ll find not only the best equipment, but also the
                    support, encouragement, and knowledge to transform your
                    fitness journey into a lasting way of life.
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#da1d25",
                            backgroundColor: "#fff",
                            borderColor: "#da1d25",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            transition: "background-color 0.3s, color 0.3s",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            "&:focus": {
                                outline: "none",
                                boxShadow: "0 0 0 3px rgba(218, 29, 37, 0.5)",
                            },
                            "&:hover": {
                                backgroundColor: "#da1d25",
                                color: "#fff",
                            },
                        }}
                        size="large"
                    >
                        READ MORE
                    </Button>
                </Box>
            </Box>
            <Box
                className="section-deuxieme-home-content-image"
                sx={{
                    width: "50%",
                    height: "600px",
                    borderRadius: "5px",
                    overflow: "hidden",
                }}
            >
                <Box
                    component={"img"}
                    src={imageFemmeAvecCoach}
                    alt="Femme avec un coach"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
                    }}
                />
            </Box>
        </Stack>
    );
}
