{
  "compilerOptions": {
    "target": "ES2020",                     // Soporte para async/await y otras features modernas
    "module": "ESNext",                    // Usa módulos nativos, ideal para bundlers modernos
    "lib": ["DOM", "ES2020"],              // Incluye APIs del navegador y ES2020
    "moduleResolution": "Node",            // Resolución de módulos estilo Node.js
    "esModuleInterop": true,               // Permite importar módulos CommonJS
    "allowSyntheticDefaultImports": true,  // Mejora compatibilidad con librerías JS
    "strict": true,                        // Activa todas las comprobaciones estrictas
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,                  // Evita chequeo de tipos en dependencias
    "noImplicitAny": true,                 // Evita tipos implícitos "any"
    "noUnusedLocals": true,                // Limpieza de código
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,             // Permite importar archivos .json
    "isolatedModules": true,               // Compatible con herramientas como Babel
    "outDir": "./dist",                    // Carpeta de salida
    "rootDir": "./src",                    // Carpeta raíz del código fuente
    "types": ["node"],                     // Incluye definiciones de Node.js si usás scripts
    "jsx": "react-jsx"                     // Si usás React con JSX moderno
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}