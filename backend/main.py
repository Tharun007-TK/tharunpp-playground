from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import tempfile
import os
import sys
import signal
import time

app = FastAPI(title="Tharunpp Playground API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EXECUTION_TIMEOUT = 5  # seconds
MAX_CODE_LENGTH = 10_000  # characters


class RunRequest(BaseModel):
    code: str


class RunResponse(BaseModel):
    output: str
    error: str | None
    execution_time: float
    success: bool


@app.get("/")
def root():
    return {"status": "ok", "service": "tharunpp-playground"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/run", response_model=RunResponse)
def run_code(req: RunRequest):
    if len(req.code) > MAX_CODE_LENGTH:
        return RunResponse(
            output="",
            error=f"Code too long da! Max {MAX_CODE_LENGTH} characters allowed.",
            execution_time=0,
            success=False,
        )

    # Write code to temp file
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".tpp", delete=False, encoding="utf-8"
    ) as f:
        f.write(req.code)
        tmp_path = f.name

    start = time.time()
    try:
        result = subprocess.run(
            [sys.executable, "-m", "tharunpp_runner", tmp_path],
            capture_output=True,
            text=True,
            timeout=EXECUTION_TIMEOUT,
            env={**os.environ, "PYTHONPATH": os.getcwd()},
        )
        elapsed = time.time() - start

        if result.returncode == 0:
            return RunResponse(
                output=result.stdout,
                error=None,
                execution_time=round(elapsed, 3),
                success=True,
            )
        else:
            return RunResponse(
                output=result.stdout,
                error=result.stderr or "Runtime error da!",
                execution_time=round(elapsed, 3),
                success=False,
            )

    except subprocess.TimeoutExpired:
        return RunResponse(
            output="",
            error=f"TICKTOCK TICKTOCK timeout da! Program ran for more than {EXECUTION_TIMEOUT} seconds.",
            execution_time=EXECUTION_TIMEOUT,
            success=False,
        )
    except Exception as e:
        return RunResponse(
            output="",
            error=f"Server error: {str(e)}",
            execution_time=0,
            success=False,
        )
    finally:
        os.unlink(tmp_path)
