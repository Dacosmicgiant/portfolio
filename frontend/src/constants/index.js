// constants/index.js

export const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

// Organized theme categories for better user experience
export const THEME_CATEGORIES = {
  "Classic": {
    description: "Timeless and professional themes",
    themes: ["light", "dark", "corporate", "business", "wireframe"]
  },
  "Vibrant": {
    description: "Bold and energetic color palettes",
    themes: ["synthwave", "cyberpunk", "acid", "bumblebee", "valentine"]
  },
  "Nature": {
    description: "Earth-inspired and organic themes",
    themes: ["garden", "forest", "emerald", "autumn", "winter"]
  },
  "Soft": {
    description: "Gentle and calming aesthetics",
    themes: ["cupcake", "pastel", "lofi", "aqua", "nord"]
  },
  "Luxury": {
    description: "Premium and sophisticated designs",
    themes: ["luxury", "black", "dracula", "night", "coffee"]
  },
  "Creative": {
    description: "Unique and artistic expressions",
    themes: ["retro", "halloween", "fantasy", "lemonade", "sunset", "cmyk", "dim"]
  }
};

// Theme characteristics for better preview and selection
export const THEME_INFO = {
  light: {
    name: "Light",
    description: "Clean and minimal light theme",
    mood: "Professional",
    contrast: "High"
  },
  dark: {
    name: "Dark",
    description: "Sleek dark mode experience",
    mood: "Modern",
    contrast: "High"
  },
  synthwave: {
    name: "Synthwave",
    description: "Retro-futuristic neon vibes",
    mood: "Energetic",
    contrast: "High"
  },
  cyberpunk: {
    name: "Cyberpunk",
    description: "Futuristic tech aesthetic",
    mood: "Edgy",
    contrast: "High"
  },
  valentine: {
    name: "Valentine",
    description: "Romantic pink and red tones",
    mood: "Romantic",
    contrast: "Medium"
  },
  halloween: {
    name: "Halloween",
    description: "Spooky orange and black theme",
    mood: "Mysterious",
    contrast: "High"
  },
  garden: {
    name: "Garden",
    description: "Fresh green nature theme",
    mood: "Peaceful",
    contrast: "Medium"
  },
  forest: {
    name: "Forest",
    description: "Deep woodland colors",
    mood: "Natural",
    contrast: "Medium"
  },
  aqua: {
    name: "Aqua",
    description: "Ocean-inspired blues",
    mood: "Calm",
    contrast: "Medium"
  },
  lofi: {
    name: "Lo-Fi",
    description: "Muted and relaxed tones",
    mood: "Chill",
    contrast: "Low"
  },
  pastel: {
    name: "Pastel",
    description: "Soft and dreamy colors",
    mood: "Gentle",
    contrast: "Low"
  },
  fantasy: {
    name: "Fantasy",
    description: "Magical and whimsical theme",
    mood: "Imaginative",
    contrast: "Medium"
  },
  wireframe: {
    name: "Wireframe",
    description: "Minimalist blueprint style",
    mood: "Technical",
    contrast: "High"
  },
  black: {
    name: "Black",
    description: "Pure black elegance",
    mood: "Sophisticated",
    contrast: "High"
  },
  luxury: {
    name: "Luxury",
    description: "Premium gold accents",
    mood: "Elegant",
    contrast: "Medium"
  },
  dracula: {
    name: "Dracula",
    description: "Popular dark theme with purple accents",
    mood: "Cool",
    contrast: "High"
  },
  cmyk: {
    name: "CMYK",
    description: "Print-inspired color palette",
    mood: "Creative",
    contrast: "High"
  },
  autumn: {
    name: "Autumn",
    description: "Warm fall season colors",
    mood: "Cozy",
    contrast: "Medium"
  },
  business: {
    name: "Business",
    description: "Professional corporate theme",
    mood: "Formal",
    contrast: "High"
  },
  acid: {
    name: "Acid",
    description: "Bold neon green theme",
    mood: "Electric",
    contrast: "High"
  },
  lemonade: {
    name: "Lemonade",
    description: "Fresh yellow summer vibes",
    mood: "Cheerful",
    contrast: "Medium"
  },
  night: {
    name: "Night",
    description: "Deep blue midnight theme",
    mood: "Serene",
    contrast: "Medium"
  },
  coffee: {
    name: "Coffee",
    description: "Warm brown coffee shop aesthetic",
    mood: "Cozy",
    contrast: "Medium"
  },
  winter: {
    name: "Winter",
    description: "Cool icy blue tones",
    mood: "Fresh",
    contrast: "Medium"
  },
  dim: {
    name: "Dim",
    description: "Subtle low-contrast dark theme",
    mood: "Relaxed",
    contrast: "Low"
  },
  nord: {
    name: "Nord",
    description: "Arctic-inspired color palette",
    mood: "Minimal",
    contrast: "Medium"
  },
  sunset: {
    name: "Sunset",
    description: "Warm orange and pink gradients",
    mood: "Warm",
    contrast: "Medium"
  },
  cupcake: {
    name: "Cupcake",
    description: "Sweet pastel pink theme",
    mood: "Playful",
    contrast: "Low"
  },
  bumblebee: {
    name: "Bumblebee",
    description: "Yellow and black bee colors",
    mood: "Energetic",
    contrast: "High"
  },
  emerald: {
    name: "Emerald",
    description: "Rich green gemstone theme",
    mood: "Luxurious",
    contrast: "Medium"
  },
  corporate: {
    name: "Corporate",
    description: "Clean business professional",
    mood: "Professional",
    contrast: "High"
  },
  retro: {
    name: "Retro",
    description: "Vintage 80s inspired colors",
    mood: "Nostalgic",
    contrast: "Medium"
  }
};

// Recommended themes for different use cases
export const THEME_RECOMMENDATIONS = {
  portfolio: ["corporate", "luxury", "dark", "nord", "business"],
  creative: ["synthwave", "cyberpunk", "fantasy", "retro", "sunset"],
  minimal: ["wireframe", "light", "dim", "lofi", "corporate"],
  colorful: ["valentine", "bumblebee", "acid", "halloween", "lemonade"],
  professional: ["business", "corporate", "dark", "luxury", "night"]
};