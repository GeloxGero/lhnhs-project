import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export const ToggleThemeButton = () => {
  const [isDark, setIsDark] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.checked ? "silk" : "abyss";
    setIsDark(e.target.checked);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        checked={isDark}
        onChange={handleChange}
      />

      <Sun className="swap-on fill-current" />
      <Moon className="swap-off fill-current" />
    </label>
  );
};
