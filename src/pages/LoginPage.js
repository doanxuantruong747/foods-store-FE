import React, { useState } from 'react';

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import { Container, Alert, Link, Stack, InputAdornment, IconButton, Button, Typography } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from '@mui/lab';

import FacebookIcon from '@mui/icons-material/Facebook';
import { Box } from '@mui/system';



const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const defaultValues = {
    email: "",
    password: "",
    remember: true,
};

function LoginPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = methods;


    const onSubmit = async (data) => {
        const from = location.state?.from?.pathname || "/";
        let { email, password } = data;

        try {
            await auth.login({ email, password }, () => {
                navigate(from, { replace: true });
            });
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    };


    const google = () => {
        window.open("http://localhost:5500/api/auth/google", "_self");
    };



    return (
        <Container maxWidth="xs">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    {!!errors.responseError && (
                        <Alert severity="error">{
                            errors.responseError.response.data.errors.message
                        }</Alert>
                    )}
                    <Alert severity="info">
                        Don’t have an account?{" "}
                        <Link variant="subtitle2" component={RouterLink} to="/register">
                            Get started
                        </Link>
                    </Alert>

                    <FTextField name="email" label="Email address" />

                    <FTextField
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                >
                    <FCheckbox name="remember" label="Remember me" />
                    <Link component={RouterLink} variant="subtitle2" to="/">
                        Forgot password?
                    </Link>
                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Login
                </LoadingButton>

                <Typography sx={{ mt: 3, fontSize: 12 }}> Or Login With</Typography>

                <Box sx={{ mt: 1, }}>
                    <Button onClick={google}
                        fullWidth
                        size="large"
                        variant="contained"
                        sx={{ backgroundColor: "#FFF", }}>
                        <img
                            style={{ with: 20, height: 20 }}
                            alt='google'
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png' />

                    </Button>

                </Box>
                <Box sx={{ mt: 1, }}>
                    <Box
                        sx={{
                            height: 40,
                            backgroundColor: "#3b5998", cursor: "pointer",
                            borderRadius: 1, display: "flex",
                            flexDirection: 'row', justifyContent: 'center'
                        }}>
                        <FacebookIcon sx={{ color: "#fff", mt: 1 }} />
                        <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#fff", mt: 1 }}>Facebook</Typography>

                    </Box>

                </Box>

            </FormProvider>
        </Container>
    )
}

export default LoginPage