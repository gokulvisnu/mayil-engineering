@echo off
setlocal

if exist "frontend\src" (
  echo Frontend source already exists. No files were moved.
  exit /b 1
)

move "src" "frontend\src"
move "public" "frontend\public"
move "package.json" "frontend\package.json"
if exist "package-lock.json" move "package-lock.json" "frontend\package-lock.json"
move "next.config.ts" "frontend\next.config.ts"
move "next-env.d.ts" "frontend\next-env.d.ts"
move "tsconfig.json" "frontend\tsconfig.json"
move "eslint.config.mjs" "frontend\eslint.config.mjs"
move "postcss.config.mjs" "frontend\postcss.config.mjs"

echo.
echo Frontend files moved successfully.
echo Do not move .env.local. Create frontend\.env.local with only public variables.
echo Run: cd frontend ^&^& npm install
endlocal
