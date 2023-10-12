import React, { useState } from "react";
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

const JsConverter = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate JavaScript code based on user input
      const jsCode = `function greet() {
  console.log("Hello, ${text}!");
}`;

      setGeneratedCode(jsCode);
      setError("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating the code.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "100%"}
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
        <Typography variant="h3">JavaScript Code Generator</Typography>

        <TextField
          placeholder="Enter a name"
          type="text"
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
          Generate Code
        </Button>
      </form>

      {generatedCode ? (
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
            <Typography p={2}>
              <code>{generatedCode}</code>
            </Typography>
          </pre>
        </Card>
      ) : null}
    </Box>
  );
};

export default JsConverter;
