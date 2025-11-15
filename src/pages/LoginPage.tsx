import { useState } from "react";
import { Input } from "../components/shared/Input";
import { Button } from "../components/shared/Button";
import Logo1 from '../assets/Logo1.svg';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        
        try {
            await loginService(email, password);
        } catch (err) {
            setError('Email atau password salah.');
        } finally {
            setLoading(false);
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
                        Masuk Ke TalentHub
                    </h1>
                    <p className="text-neutral-70 text-sm mt-2">
                        Kelola proses rekrutmen Anda dengan mudah
                    </p>
                </div>

                <div id="Form" className="w-full max-w-md">
                    <form onSubmit={(e) => {e.preventDefault(); handleLogin();}}>
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
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Masukkan Password"
                                value={password}
                                onChange={setPassword}
                                required
                            />
                            
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
                                disabled={loading}>
                                {loading ? 'Memuat...' : 'Masuk'}
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