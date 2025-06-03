// ThemePage.jsx

import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Palette, Check, Star, Heart, Zap } from "lucide-react";

const ThemePage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Palette className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Choose Your Theme
            </h1>
          </div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Transform your portfolio's look with our carefully crafted themes. Each theme offers a unique color palette and personality.
          </p>
        </div>

        {/* Current Theme Showcase */}
        <div className="card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 shadow-2xl mb-12 border border-primary/20">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              Current Theme: <span className="text-primary capitalize">{theme}</span>
            </h2>
            
            {/* Color Palette Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary rounded-lg shadow-lg border-2 border-white"></div>
                <span className="text-xs font-medium">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-secondary rounded-lg shadow-lg border-2 border-white"></div>
                <span className="text-xs font-medium">Secondary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-accent rounded-lg shadow-lg border-2 border-white"></div>
                <span className="text-xs font-medium">Accent</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-neutral rounded-lg shadow-lg border-2 border-white"></div>
                <span className="text-xs font-medium">Neutral</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-info rounded-lg shadow-lg border-2 border-white"></div>
                <span className="text-xs font-medium">Info</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-success rounded-lg shadow-lg border-2 border-white"></div>
                <span className="text-xs font-medium">Success</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-warning rounded-lg shadow-lg border-2 border-white"></div>
                <span className="text-xs font-medium">Warning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-error rounded-lg shadow-lg border-2 border-white"></div>
                <span className="text-xs font-medium">Error</span>
              </div>
            </div>

            {/* Enhanced Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Buttons Preview */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base-content/90">Buttons</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-secondary">Secondary</button>
                  <button className="btn btn-accent">Accent</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="btn btn-outline btn-primary">Outline</button>
                  <button className="btn btn-ghost">Ghost</button>
                  <button className="btn btn-link">Link</button>
                </div>
              </div>

              {/* Cards Preview */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base-content/90">Cards</h3>
                <div className="card bg-base-100 shadow-xl border border-primary/20">
                  <div className="card-body p-4">
                    <h4 className="card-title text-sm">Sample Card</h4>
                    <p className="text-xs text-base-content/70">This is how cards look in this theme.</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary btn-xs">Action</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts Preview */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base-content/90">Alerts</h3>
                <div className="alert alert-info">
                  <span className="text-xs">Info alert example</span>
                </div>
                <div className="alert alert-success">
                  <span className="text-xs">Success alert example</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
          {THEMES.map((t) => (
            <div
              key={t}
              className={`relative group cursor-pointer transition-all duration-300 ${
                theme === t ? "scale-105" : "hover:scale-105"
              }`}
              onClick={() => setTheme(t)}
            >
              <div
                className={`card bg-base-100 shadow-xl border-2 transition-all duration-300 ${
                  theme === t
                    ? "border-primary shadow-2xl shadow-primary/25"
                    : "border-transparent hover:border-primary/50 hover:shadow-lg"
                }`}
                data-theme={t}
              >
                <div className="card-body p-3">
                  {/* Theme Preview */}
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    <div className="h-6 bg-primary rounded"></div>
                    <div className="h-6 bg-secondary rounded"></div>
                    <div className="h-6 bg-accent rounded"></div>
                    <div className="h-6 bg-neutral rounded"></div>
                  </div>
                  
                  {/* Theme Name */}
                  <h3 className="text-sm font-semibold text-center capitalize truncate">
                    {t}
                  </h3>
                  
                  {/* Mini Preview Elements */}
                  <div className="flex justify-center gap-1 mt-2">
                    <div className="btn btn-primary btn-xs">●</div>
                    <div className="btn btn-secondary btn-xs">●</div>
                    <div className="btn btn-accent btn-xs">●</div>
                  </div>
                  
                  {/* Selection Indicator */}
                  {theme === t && (
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-content rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comprehensive Theme Preview */}
        <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border border-primary/20">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-accent" />
              Full Component Preview
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Form Elements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Form Elements</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Text input" className="input input-bordered w-full" />
                    <input type="text" placeholder="Primary input" className="input input-primary w-full" />
                    <select className="select select-bordered w-full">
                      <option>Select option</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                    <textarea className="textarea textarea-bordered w-full" placeholder="Textarea"></textarea>
                  </div>
                </div>

                {/* Progress and Loading */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-secondary">Progress & Loading</h3>
                  <div className="space-y-3">
                    <progress className="progress progress-primary w-full" value={70} max="100"></progress>
                    <progress className="progress progress-secondary w-full" value={40} max="100"></progress>
                    <progress className="progress progress-accent w-full" value={90} max="100"></progress>
                    <div className="flex gap-2">
                      <span className="loading loading-spinner loading-sm text-primary"></span>
                      <span className="loading loading-dots loading-md text-secondary"></span>
                      <span className="loading loading-ring loading-lg text-accent"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Statistics */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">Statistics</h3>
                  <div className="stats shadow bg-base-200 w-full">
                    <div className="stat">
                      <div className="stat-figure text-primary">
                        <Heart className="w-8 h-8" />
                      </div>
                      <div className="stat-title">Total Likes</div>
                      <div className="stat-value text-primary">25.6K</div>
                      <div className="stat-desc">21% more than last month</div>
                    </div>
                  </div>
                </div>

                {/* Badges and Tags */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Badges & Status</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="badge badge-primary">Primary</div>
                    <div className="badge badge-secondary">Secondary</div>
                    <div className="badge badge-accent">Accent</div>
                    <div className="badge badge-ghost">Ghost</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="badge badge-info">Info</div>
                    <div className="badge badge-success">Success</div>
                    <div className="badge badge-warning">Warning</div>
                    <div className="badge badge-error">Error</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="badge badge-outline badge-primary">Outline Primary</div>
                    <div className="badge badge-outline badge-secondary">Outline Secondary</div>
                  </div>
                </div>

                {/* Toggle and Checkbox */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Interactive Elements</h3>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <input type="checkbox" className="toggle toggle-primary" checked readOnly />
                      <input type="checkbox" className="toggle toggle-secondary" checked readOnly />
                      <input type="checkbox" className="toggle toggle-accent" checked readOnly />
                    </div>
                    <div className="flex gap-4">
                      <input type="radio" className="radio radio-primary" checked readOnly />
                      <input type="radio" className="radio radio-secondary" checked readOnly />
                      <input type="radio" className="radio radio-accent" checked readOnly />
                    </div>
                  </div>
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