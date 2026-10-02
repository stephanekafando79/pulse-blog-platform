@echo off
setlocal
cd /d "%~dp0"
echo ===================================================================
echo   Publishing Pulse to GitHub Pages (Owner: Stephane Kafando)
echo ===================================================================
echo.
echo Step 1: Checking Git remote repository...
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Adding GitHub remote origin: https://github.com/stephanekafando79/pulse-blog-platform.git
    git remote add origin https://github.com/stephanekafando79/pulse-blog-platform.git
)

echo.
echo Step 2: Committing any recent updates...
git add .
git commit -m "Update Pulse platform content and daily publication" >nul 2>&1

echo.
echo Step 3: Pushing codebase to GitHub...
echo (If prompted, sign in to your GitHub account: stephanekafando79)
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo ===================================================================
    echo.
    echo Next Step to activate free public hosting:
    echo 1. Open: https://github.com/stephanekafando79/pulse-blog-platform/settings/pages
    echo 2. Under 'Branch', select 'main' and click Save.
    echo 3. Your website will be live at:
    echo    https://stephanekafando79.github.io/pulse-blog-platform/
    echo.
) else (
    echo.
    echo [NOTE] If the repository does not exist on GitHub yet:
    echo 1. Go to https://github.com/new
    echo 2. Name your repository: pulse-blog-platform
    echo 3. Leave it Public, do NOT check README or .gitignore
    echo 4. Click 'Create repository'
    echo 5. Run this script again!
    echo.
)

pause
