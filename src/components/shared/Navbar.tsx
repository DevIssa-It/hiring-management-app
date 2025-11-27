import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { DarkModeToggle } from './DarkModeToggle';

interface NavbarProps {
    title?: string;
    showAvatar?: boolean;
    avatarText?: string;
    onAvatarClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
    title,
    showAvatar = true,
    avatarText = 'A',
    onAvatarClick,
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const auth = useAuth();
    const { logout, user } = auth || { logout: () => {}, user: null };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleAvatarClick = () => {
        if (onAvatarClick) {
            onAvatarClick();
        } else {
            setShowDropdown(!showDropdown);
        }
    };

    return (
        <div id="navbar" className="mb-4">
        <div id="content" className="flex items-center justify-between mb-4">
            {title ? (
                <h1 className="text-2xl font-bold text-neutral-100">{title}</h1>
            ) : (
                <div />
            )}
            
            <div className="flex items-center gap-3">
                {/* Dark Mode Toggle */}
                <DarkModeToggle />
                
                {showAvatar && (
                    <div className="relative">
                        <button
                            onClick={handleAvatarClick}
                            className="w-10 h-10 bg-primary-main rounded-full flex items-center justify-center text-white font-semibold hover:bg-primary-hover transition-colors">
                                {avatarText}
                            </button>
                    
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                            <div className="py-1">
                                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                    <div className="font-medium">{user?.email}</div>
                                    <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                                </div>
                                
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                    <FiLogOut className="mr-2" size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        <div id="divider" className="border-b border-neutral-40 -mx-6"></div>
        
        {/* Overlay to close dropdown */}
        {showDropdown && (
            <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowDropdown(false)}
            />
        )}
    </div>
    );
};