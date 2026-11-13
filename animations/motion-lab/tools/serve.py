"""Serve the repository with sufficient backlog for parallel ES-module loading."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewServer(ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True


if __name__ == "__main__":
    repository = Path(__file__).resolve().parents[3]
    handler = partial(SimpleHTTPRequestHandler, directory=str(repository))
    with PreviewServer(("127.0.0.1", 8080), handler) as server:
        print("Motion lab preview: http://localhost:8080", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
