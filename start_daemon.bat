@echo off
REM Pulse - Start Server and Daily Automation Daemon
cd /d "%~dp0"
echo ========================================================
echo   Starting Pulse Server and Daily Automation Daemon...
echo ========================================================
python daily_runner.py
pause
