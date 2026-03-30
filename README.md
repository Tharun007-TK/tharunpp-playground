![Tharunpp Banner](./banner.png)

# Tharunpp Playground 🎬

A powerful, full-stack playground and documentation hub for the **Tharunpp** esoteric language made inspired by famous tamil words and dialogues. This project provides a robust browser-based IDE to write, execute, and share Tharunpp code instantly.

Check out the live playground: **[tharunkumar.dev/tharunpp](https://tharunkumar.dev/tharunpp)**

---

## 🚀 Features

- **Interactive IDE**: Monaco editor integrated with custom syntax highlighting for Tharunpp keywords.
- **Built-in Examples**: 6 predefined example programs (from 'Hello World' to 'Lists' to 'Error Handling') available via a quick access dropdown.
- **Live Code Execution**: backend execution API capable of executing Tharunpp scripts securely.
- **Sharable Code Links**: Generate Base64 encoded URLs to easily share your snippets with others.
- **Execution Performance Tracking**: Displays the dynamic execution time for each run.
- **Dedicated Documentation Hub**: Fully styled standalone `/docs` and `/examples` pages acting as the definitive guide to coding in Tamil.
- **Mobile Responsive Design**: Code comfortably on any device.

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Monaco Editor (for advanced code editing)
- Vercel (Hosting)

**Backend**
- Python 3.11
- FastAPI
- Uvicorn
- Base `tharunpp` interpreter library
- Render (Hosting)

---

## 📂 Project Structure

```
tharunpp-playground/
├── frontend/                 # Next.js Application
│   ├── src/app/tharunpp/     # Main playground routes, docs, and examples
│   ├── public/               # Static assets
│   ├── .env.local            # Environment variables
│   └── package.json          # Dependencies
│
├── backend/                  # FastAPI Backend Service
│   ├── main.py               # API Endpoints
│   ├── tharunpp_runner.py    # Script compilation and security restrictions
│   ├── requirements.txt      # Python dependencies
│   └── render.yaml           # Deployment configurations
│
├── .gitignore                # Centralized git ignores
└── README.md                 # Project documentation
```

---

## 💻 Local Development

### 1. Setup the Backend

The backend safely executes snippets passed from the frontend and returns the output.

```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install requirements
pip install -r requirements.txt
pip install tharunpp

# Run the development server
uvicorn main:app --reload --port 8000
```
The API will be available at `http://localhost:8000`.

### 2. Setup the Frontend

The frontend is a Next.js application that provides the playground UI.

```bash
cd frontend

# Set up environment variables
cp .env.example .env.local

# Edit .env.local to point to the local backend:
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Install dependencies
npm install

# Start the dev server
npm run dev
```
Open your browser and navigate to `http://localhost:3000/tharunpp`.

---

## 🚀 Deployment

### Deploy Backend (Render)

1. Push the repository to GitHub.
2. Go to **[Render](https://render.com/)** → New Web Service.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Root directory**: `backend`
   - **Build command**: `pip install -r requirements.txt`
   - **Start command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Python version**: `3.11`
5. Deploy and copy the resulting API URL (e.g., `https://tharunpp-api.onrender.com`).

### Deploy Frontend (Vercel)

1. Go to **[Vercel](https://vercel.com/)** → Import Project.
2. Connect your GitHub repository.
3. Set the **Root directory** to `frontend`.
4. Add the following **Environment Variable**:
   - `NEXT_PUBLIC_API_URL` = `<your_render_backend_url>`
5. Click **Deploy**.
6. (Optional) Add a custom domain such as `tharunkumar.dev` to map to this vercel project.

---

## 🤝 Contributing

Contributions to improve the syntax highlighting, UI, or backend sandbox security are highly encouraged! Please fork the repository, make your changes, and submit a pull request.

**NANDRI VANNAKAM!** ✨
