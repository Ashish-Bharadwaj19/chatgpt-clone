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

const Paragraph = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [para, setPara] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/paragraph", { text });
      setPara(data.paragraph);
      setError("");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred while generating the paragraph.");
      }
      toast.error("Generation failed");
    }
  };

  return (
    <Box
      width={isNotMobile ? "100%" : "100%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Generate Paragraph</Typography>

        <TextField
          placeholder="Add your text"
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
          sx={{ color: "white", mt: 2, bgcolor: "blue" }}
        >
          Generate
        </Button>
        <Typography mt={2}>
          <Link to="/" style={{ color: "blue" }}>GO BACK</Link>
        </Typography>
      </form>

      <Card
        sx={{
          mt: 4,
          border: 1,
          boxShadow: 0,
          borderRadius: 5,
          borderColor: "natural.medium",
          bgcolor: "background.default",
          overflow: "auto",
        }}
      >
        <pre>
          <Typography p={2} style={{ whiteSpace: "pre-wrap" }}>
            {para ? para : "Your Paragraph Will Appear Here"}
          </Typography>
        </pre>
      </Card>
    </Box>
  );
};

export default Paragraph;
