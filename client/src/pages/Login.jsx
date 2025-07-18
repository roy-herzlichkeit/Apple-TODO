import { useState, useCallback, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate, Link } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';
import { store, setSignedIn } from '../utils';
import { apiService } from '../services/api';
import PageTransition from '../components/ui/PageTransition';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import Footer from '../components/layout/Footer';

const Login = () => {
    const snap = useSnapshot(store);
    const navigate = useNavigate();
    const { triggerTransition } = useTransition();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const controlStyle = useMemo(() => ({
        backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
        color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
        borderColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
    }), [snap.dark]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const response = await apiService.login(formData);

            if (response && response.token) {
                localStorage.setItem('amarTasks-token', response.token);
                localStorage.setItem('amarTasks-user', JSON.stringify(response.user));

                triggerTransition(() => {
                    setSignedIn(true);
                    navigate('/user');
                });
            }
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [formData, triggerTransition, navigate]);

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col">
                <div className="flex justify-end p-4 gap-2">
                    <button
                        aria-label="Home"
                        className="ml-3 p-2"
                        onClick={() => {
                            triggerTransition(() => {
                                navigate('/');
                            });
                        }}
                    >
                        <img
                            src="logout.svg"
                            alt=""
                        />
                    </button>
                    <DarkModeToggle className='' />
                </div>
                <div className="flex-1 flex items-center justify-center font-i px-4">
                    <div className="w-full max-w-sm sm:max-w-md">
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 sm:p-10"
                            style={controlStyle}
                            autoComplete="off"
                        >
                            <h1 className="text-3xl sm:text-5xl mb-6 sm:mb-8 text-center">Sign In</h1>

                            {errors.submit && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {errors.submit}
                                </div>
                            )}

                            <div className="mb-4">
                                <label htmlFor="username" className="block mb-2 text-lg sm:text-xl">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    className="w-full p-3 border-2 text-base"
                                    style={controlStyle}
                                    autoComplete="new-password"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    required
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-lg sm:text-xl">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full p-3 border-2 text-base"
                                    style={controlStyle}
                                    autoComplete="new-password"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full p-4 mb-4 flex items-center justify-center gap-2"
                                style={controlStyle}
                            >
                                {isLoading ? (
                                    <span>Signing in...</span>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                    </>
                                )}
                            </button>

                            <div className="text-center">
                                <p className="mb-2">Don't have an account?</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        triggerTransition(() => {
                                            navigate('/signup');
                                        });
                                    }}
                                    className="inline-flex items-center gap-2 p-1 sm:p-2 bg-transparent border-none cursor-pointer"
                                    style={controlStyle}
                                >
                                    <span className='text-sm sm:text-md'>Sign Up</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </PageTransition>
    );
};

export default Login;