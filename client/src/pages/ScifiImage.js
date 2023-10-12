import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const ScifiImage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/scifi-image", { text });
      setImage(data.imageUrl); // Assuming the API response contains an 'imageUrl' property
      setError(""); // Clear any previous errors
      toast.success("Image generated successfully");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred while generating the scifi image.");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      height="100vh" // Make the component full-screen
      bgcolor="gray" // Set the background color to gray
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Scifi Image</Typography>

        <TextField
          placeholder="add your text"
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Submit
        </Button>
        <Typography mt={2}>
          Not what you're looking for? <Link to="/">GO BACK</Link>
        </Typography>
      </form>

      {image ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "100vh", // Set the height to full-screen
            borderRadius: 0, // Remove border radius
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Center the content vertically
            }}
          >
            <img src={image} alt="scifiimage" style={{ maxHeight: "100%" }} />
          </Box>
        </Card>
      ) : null}
    </Box>
  );
};

export default ScifiImage;
