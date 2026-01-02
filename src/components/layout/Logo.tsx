import nagrikLogo from "@/assets/nagrik-logo.png";

export function Logo({ className = "", scale = "scale-125" }: { className?: string; scale?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <img
                src={nagrikLogo}
                alt="NagrikSeva Logo"
                className={`h-full w-auto object-contain origin-left ${scale}`}
            />
        </div>
    );
}
