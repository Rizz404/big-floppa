import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin, useRegister } from "../hooks/authHooks";
import {
  LoginSchema,
  loginSchema,
  RegisterSchema,
  registerSchema,
} from "../lib/zod/authSchema";

interface AuthModalProps {
  open: boolean;
  handleClose: () => void;
}

const AuthModal = ({ open, handleClose }: AuthModalProps) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: mutateLogin, isPending: isPendingLogin } = useLogin();
  const { mutate: mutateRegister, isPending: isPendingRegister } =
    useRegister();

  const handleLoginSubmit: SubmitHandler<LoginSchema> = (data) => {
    mutateLogin(data);
  };

  const handleRegisterSubmit: SubmitHandler<RegisterSchema> = (data) => {
    mutateRegister(data);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid gray",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" marginBottom={2}>
          {isLoginMode ? "Login" : "Register"}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <form
          onSubmit={
            isLoginMode
              ? loginForm.handleSubmit(handleLoginSubmit)
              : registerForm.handleSubmit(handleRegisterSubmit)
          }
        >
          {!isLoginMode && (
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              {...registerForm.register("username")}
              error={!!registerForm.formState.errors.username}
              helperText={registerForm.formState.errors.username?.message}
            />
          )}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...(isLoginMode
              ? loginForm.register("email")
              : registerForm.register("email"))}
            error={
              !!(isLoginMode
                ? loginForm.formState.errors.email
                : registerForm.formState.errors.email)
            }
            helperText={
              isLoginMode
                ? loginForm.formState.errors.email?.message
                : registerForm.formState.errors.email?.message
            }
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            {...(isLoginMode
              ? loginForm.register("password")
              : registerForm.register("password"))}
            error={
              !!(isLoginMode
                ? loginForm.formState.errors.password
                : registerForm.formState.errors.password)
            }
            helperText={
              isLoginMode
                ? loginForm.formState.errors.password?.message
                : registerForm.formState.errors.password?.message
            }
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={isPendingLogin || isPendingRegister}
          >
            {isLoginMode ? "Login" : "Register"}
          </Button>
        </form>

        <Box sx={{ marginTop: 2, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
