"""Serve the repository for local ES-module and asset verification."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class Server(ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[3]
    with Server(
        ("127.0.0.1", 8080), partial(SimpleHTTPRequestHandler, directory=str(root))
    ) as server:
        print("Preview: http://localhost:8080/gsap-animations.html", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
