# Setup Windows Task Scheduler for Pulse Daily Story Publisher
# Runs python daily_writer.py every day at 08:00 AM automatically

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$WriterScript = Join-Path $ScriptDir "daily_writer.py"
$PythonPath = (Get-Command python).Source

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Pulse Daily Story Publisher - Windows Task Setup" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Python Path:    $PythonPath"
Write-Host "Writer Script:  $WriterScript"
Write-Host "Schedule:       Daily at 08:00 AM"
Write-Host ""

$TaskName = "PulseDailyPublisher"
$Action = "$PythonPath `"$WriterScript`""

# Register the scheduled task
$result = schtasks.exe /create /tn $TaskName /tr "$Action" /sc daily /st 08:00 /f

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Task '$TaskName' has been created in Windows Task Scheduler!" -ForegroundColor Green
    Write-Host "Windows will automatically run this script everyday at 08:00 AM."
    Write-Host ""
    Write-Host "To test or run it immediately on demand:"
    Write-Host "  schtasks.exe /run /tn $TaskName" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To view task status:"
    Write-Host "  schtasks.exe /query /tn $TaskName" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To remove task:"
    Write-Host "  schtasks.exe /delete /tn $TaskName /f" -ForegroundColor Yellow
} else {
    Write-Host "[ERROR] Failed to register task. Please run PowerShell as Administrator." -ForegroundColor Red
}
