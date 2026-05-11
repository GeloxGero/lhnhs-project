import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export const ToggleThemeButton = () => {
  const [isDark, setIsDark] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.checked ? "synthwave" : "luxury";
    setIsDark(e.target.checked);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    console.log(isDark);
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        onChange={handleChange}
      />

      <Sun className="swap-on fill-current" />
      <Moon className="swap-off fill-current" />
    </label>
  );
};
