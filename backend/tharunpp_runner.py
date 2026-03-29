"""
tharunpp_runner.py — called by the API as a subprocess
Usage: python -m tharunpp_runner <file.tpp>
"""
import sys
from pathlib import Path

def main():
    if len(sys.argv) < 2:
        print("Usage: tharunpp_runner <file.tpp>", file=sys.stderr)
        sys.exit(1)

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"File not found: {path}", file=sys.stderr)
        sys.exit(1)

    try:
        from Tharunpp.core.interpreter import Interpreter, TharunppError
        code = path.read_text(encoding="utf-8")
        interpreter = Interpreter()
        interpreter.run(code)
    except TharunppError as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
