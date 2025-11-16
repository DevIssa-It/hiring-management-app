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
    return (
        <div id="navbar" className="mb-4">
        <div id="content" className="flex items-center justify-between mb-4">
            {title ? (
                <h1 className="text-2xl font-bold text-neutral-100">{title}</h1>
            ) : (
                <div />
            )}
            
            {showAvatar && (
                <button
                    onClick={onAvatarClick}
                    className="w-10 h-10 bg-primary-main rounded-full flex items-center justify-center text-white font-semibold hover:bg-primary-hover transition-colors">
                        {avatarText}
                    </button>
            )}
        </div>

        <div id="divider" className="border-b border-neutral-40 -mx-6"></div>
    </div>
    );
};