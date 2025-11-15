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
        <div id="navbar" className="flex items-center justify-between mb-6">
            {title && (
                <h1 className="text-2xl font-bold text-neutral-100">{title}</h1>
            )}

            {!title && <div />}

            {showAvatar && (
                <button
                    onClick={onAvatarClick}
                    className="w-10 h-10 bg-primary-main rounded-full flex items-center justify-center text-white font-semibold hover:bg-primary-hover transition-colors">
                        {avatarText}
                    </button>
            )}

        </div>
    );
};