#!/usr/bin/env python3
"""
Pulse Daily Automation Runner
Runs the local HTTP server and automatically schedules the daily story writer
to publish every day at 08:00 AM (or on a periodic cycle).
"""

import os
import sys
import time
import threading
import subprocess
from datetime import datetime, timedelta

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVER_SCRIPT = os.path.join(BASE_DIR, "server.py")
WRITER_SCRIPT = os.path.join(BASE_DIR, "daily_writer.py")

# Target hour to publish daily story (8:00 AM)
DAILY_PUBLISH_HOUR = 8
DAILY_PUBLISH_MINUTE = 0

def run_writer_script(force=False):
    """Executes the daily_writer.py script"""
    args = [sys.executable, WRITER_SCRIPT]
    if force:
        args.append("--force")
    try:
        print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Triggering daily story writer...")
        result = subprocess.run(args, cwd=BASE_DIR, capture_output=True, text=True, encoding="utf-8", errors="replace")
        print(result.stdout)
        if result.stderr:
            print(f"Errors: {result.stderr}")
    except Exception as e:
        print(f"Failed to run daily writer: {e}")

def daily_scheduler_loop():
    """Background loop that schedules publication every day"""
    print(f"[*] Automation scheduler activated.")
    
    # Check and generate today's story on startup if not already published
    run_writer_script(force=False)

    while True:
        now = datetime.now()
        # Calculate target time for next publish
        target = now.replace(hour=DAILY_PUBLISH_HOUR, minute=DAILY_PUBLISH_MINUTE, second=0, microsecond=0)
        if target <= now:
            target += timedelta(days=1)

        seconds_until_next = (target - now).total_seconds()
        hours_until = seconds_until_next / 3600.0
        print(f"[*] Next daily story publication scheduled at {target.strftime('%Y-%m-%d %H:%M:%S')} (in {hours_until:.2f} hours)")

        # Sleep in intervals so process remains responsive to Ctrl+C
        sleep_chunk = 60
        while seconds_until_next > 0:
            time.sleep(min(seconds_until_next, sleep_chunk))
            now = datetime.now()
            seconds_until_next = (target - now).total_seconds()

        # Target reached: publish today's edition
        print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Daily schedule triggered!")
        run_writer_script(force=True)

def start_server():
    """Starts server.py as a subprocess"""
    print(f"[*] Launching Pulse web server...")
    subprocess.run([sys.executable, SERVER_SCRIPT], cwd=BASE_DIR)

def main():
    print("======================================================")
    print("  Pulse Daily Automation Daemon")
    print(f"  Working Directory: {BASE_DIR}")
    print(f"  Schedule: Every day at {DAILY_PUBLISH_HOUR:02d}:{DAILY_PUBLISH_MINUTE:02d}")
    print("======================================================")

    # Launch the scheduler loop in a background daemon thread
    scheduler_thread = threading.Thread(target=daily_scheduler_loop, daemon=True)
    scheduler_thread.start()

    # Run the web server in the main thread
    try:
        start_server()
    except KeyboardInterrupt:
        print("\nShutting down automation daemon. Goodbye!")
        sys.exit(0)

if __name__ == "__main__":
    main()
