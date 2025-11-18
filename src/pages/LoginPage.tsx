import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../components/shared/Input";
import { Button } from "../components/shared/Button";
import { useAuth } from "../context/AuthContext";
import Logo1 from '../assets/Logo1.svg';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserRole } from "@/types";
import { InlineSpinner } from "../components/shared/LoadingSpinner";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const { login, isAuthenticated, isLoading, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || '/';
    
    // Redirect jika sudah login saat pertama kali load halaman
    useEffect(() => {
        if (!isLoading && isAuthenticated && user) {
            if (from !== '/') {
                navigate(from, { replace: true });
            } else {
                navigate(user.role === UserRole.ADMIN ? '/admin' : '/applicant', { replace: true });
            }
        }
    }, [isLoading]); // Hanya trigger saat loading selesai

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const loggedInUser = await login(email, password);
            // Navigasi langsung setelah login berhasil
            if (loggedInUser) {
                const targetPath = loggedInUser.role === UserRole.ADMIN ? '/admin' : '/applicant';
                navigate(targetPath, { replace: true });
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Email atau password salah.');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-20 flex items-center justify-center px-4">
            <div id="container" className="bg-white p-8 rounded-xl p-8 shadow-sm">
                <div id="Header" className="text-center mb-8">
                    <div id="logo" className="flex items-center justify-left gap-2 mb-4">
                        <img src={Logo1} alt="Logo" className="w-32 h-auto" />
                    </div>
                    <h1 className="text-2xl font-semibold text-neutral-100">
                        Masuk Ke TalentHunt
                    </h1>
                    <p className="text-neutral-70 text-sm mt-2">
                        Kelola Proses Rekrutmen Anda Dengan Mudah
                    </p>
                </div>

                <div id="Form" className="w-full max-w-max">
                    <form onSubmit={handleLogin}>
                        <div className="space-y-5">
                            <Input
                                label="Alamat Email"
                                type="email"
                                placeholder="Masukkan Email"
                                value={email}
                                onChange={setEmail}
                                required
                                error={error}
                                className="w-full min-w-[420px] max-w-md"
                            />

                            <div className="relative">
                                <Input
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan Password"
                                    value={password}
                                    onChange={setPassword}
                                    required
                                />
                                <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] text-neutral-60 hover:text-neutral-80">
                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </button>
                            </div>
                            
                            {error && (
                                <div className="bg-danger-surface border-l-4 border-danger-main p-3 rounded">
                                    <p className="text-danger-main">{error}</p>
                                </div>
                            )}

                            <div id="forgotPassword" className="text-right">
                                <a href="/forgot-password" 
                                    className="text-sm text-primary-main hover:text-primary-hover">
                                    Lupa Password?
                                </a>
                            </div>

                            <Button 
                                type="submit"
                                variant="alternative"
                                className="w-full h-12 text-semibold font-medium" 
                                loading={isLoading}
                                disabled={isLoading}>
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <InlineSpinner />
                                        Memuat
                                    </div>
                                ) : 'Masuk'}
                            </Button>

                            < p className="text-center text-sm text-neutral-70">
                                Belum punya akun?{' '}
                                <a href="/register" 
                                    className="text-primary-main hover:text-primary-hover font-medium">
                                    Daftar di sini
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}