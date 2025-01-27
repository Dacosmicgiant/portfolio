// import { THEMES } from "../constants";
// import { useThemeStore } from "../store/useThemeStore";

// const ThemePage = () => {
//   const { theme, setTheme } = useThemeStore();

//   return (
//     <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
//       <div className="space-y-6">
//         <div className="flex flex-col gap-1">
//           <h2 className="text-lg font-semibold">Theme</h2>
//           <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
//         </div>

//         <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
//           {THEMES.map((t) => (
//             <button
//               key={t}
//               className={`
//                 group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
//                 ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
//               `}
//               onClick={() => setTheme(t)}
//             >
//               <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
//                 <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
//                   <div className="rounded bg-primary"></div>
//                   <div className="rounded bg-secondary"></div>
//                   <div className="rounded bg-accent"></div>
//                   <div className="rounded bg-neutral"></div>
//                 </div>
//               </div>
//               <span className="text-[11px] font-medium truncate w-full text-center">
//                 {t.charAt(0).toUpperCase() + t.slice(1)}
//               </span>
//             </button>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };
// export default ThemePage;

import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemePage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-base-100 rounded-lg p-10 shadow-lg max-w-6xl w-[95%]">
        <div className="space-y-8 text-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">Theme</h2>
            <p className="text-lg text-base-content/70">
              Choose a theme for your chat interface
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-2 p-4 rounded-lg transition-colors
                  ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                `}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-14 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-sm font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
