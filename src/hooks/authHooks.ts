import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";
import { LoginData, RegisterData, User } from "../types/User";
import { AxiosError } from "axios";
import { MutationResponse } from "../types/Response";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<MutationResponse<User>, AxiosError, RegisterData>({
    mutationKey: ["register"],
    mutationFn: async (data) => {
      return (await axiosInstance.post("/auth/register", data)).data;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        toast.error(errorMessage);
        console.log(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
        console.log("Error:", error.message);
      }
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  return useMutation<
    MutationResponse<User> & { accessToken: string },
    AxiosError,
    LoginData
  >({
    mutationKey: ["register"],
    mutationFn: async (data) => {
      return (await axiosInstance.post("/auth/login", data)).data;
    },
    onSuccess: async (response) => {
      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setUser(response.data);
      setToken(response.accessToken);
      toast.success(response.message);
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        toast.error(errorMessage);
        console.log(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
        console.log("Error:", error.message);
      }
    },
  });
};
