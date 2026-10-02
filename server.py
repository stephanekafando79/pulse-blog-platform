#!/usr/bin/env python3
"""
Pulse Publishing Platform - Local Development Server
Starts a local HTTP server and automatically opens the browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("X-XSS-Protection", "1; mode=block")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        super().end_headers()

def run():
    os.chdir(DIRECTORY)
    
    # Ensure today's daily story is published
    try:
        import daily_writer
        daily_writer.generate_daily_story(force=False)
    except Exception as e:
        print(f"Notice: {e}")

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"======================================================")
        print(f"  ⚡ Pulse Publishing & Community Platform is running! ")
        print(f"  URL: {url}")
        print(f"  Press Ctrl+C to stop the server.")
        print(f"======================================================")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server. Goodbye!")
            sys.exit(0)

if __name__ == "__main__":
    run()
