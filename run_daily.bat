@echo off
REM Pulse - Publish Today's Story Immediately
cd /d "%~dp0"
echo ========================================================
echo   Running Pulse Daily Story Publisher...
echo ========================================================
python daily_writer.py --force
echo.
echo Story published! Press any key to exit.
pause >nul
