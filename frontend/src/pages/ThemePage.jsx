// ThemePage.jsx

import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemePage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-base-200/50 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold">Theme</h2>
              <p className="text-base sm:text-lg text-base-content/70">
                Choose a theme for your portfolio
              </p>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-6">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-2 p-2 sm:p-4 rounded-lg transition-all
                    ${
                      theme === t
                        ? "bg-base-300 scale-105 shadow-lg"
                        : "hover:bg-base-300/50 hover:scale-105"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div
                    className="relative h-10 sm:h-14 w-full rounded-md overflow-hidden shadow-sm"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                  {theme === t && (
                    <div className="absolute inset-0 rounded-lg ring-2 ring-primary ring-offset-2 ring-offset-base-100 pointer-events-none"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="rounded-lg bg-base-300 p-4 sm:p-6 mt-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Preview</h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <button className="btn">Default</button>
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-secondary">Secondary</button>
                  <button className="btn btn-accent">Accent</button>
                  <button className="btn btn-ghost">Ghost</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="btn btn-outline">Outline</button>
                  <button className="btn btn-primary btn-outline">Primary</button>
                  <button className="btn btn-secondary btn-outline">Secondary</button>
                  <button className="btn btn-accent btn-outline">Accent</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="badge">Default</div>
                  <div className="badge badge-primary">Primary</div>
                  <div className="badge badge-secondary">Secondary</div>
                  <div className="badge badge-accent">Accent</div>
                  <div className="badge badge-ghost">Ghost</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <input type="checkbox" className="checkbox" checked readOnly />
                  <input type="checkbox" className="checkbox checkbox-primary" checked readOnly />
                  <input type="checkbox" className="checkbox checkbox-secondary" checked readOnly />
                  <input type="checkbox" className="checkbox checkbox-accent" checked readOnly />
                </div>
                <div className="flex flex-wrap gap-2">
                  <input type="radio" className="radio" checked readOnly />
                  <input type="radio" className="radio radio-primary" checked readOnly />
                  <input type="radio" className="radio radio-secondary" checked readOnly />
                  <input type="radio" className="radio radio-accent" checked readOnly />
                </div>
                <div className="flex flex-wrap gap-2">
                  <input type="range" className="range range-xs" value="40" readOnly />
                  <input type="range" className="range range-primary range-xs" value="60" readOnly />
                  <input type="range" className="range range-secondary range-xs" value="80" readOnly />
                  <input type="range" className="range range-accent range-xs" value="100" readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
