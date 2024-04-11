// components/ThemeSwitcher.tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            {theme === "light" ? (
                <button onClick={() => setTheme("dark")}>
                    <Moon size={"16"} strokeWidth={1} />
                </button>
            ) : (
                <button onClick={() => setTheme("light")}>
                    <Sun size={"16"} strokeWidth={1} />
                </button>
            )}
        </div>
    );
};
