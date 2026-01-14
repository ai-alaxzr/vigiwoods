@echo off
echo ========================================
echo  VigiWoods Interior Design Website
echo  Starting Local Server...
echo ========================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting server with Python...
    echo.
    echo Open your browser and visit: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    :: If Python is not available, open file directly
    echo Python not found. Opening website directly in browser...
    start index.html
)

pause
