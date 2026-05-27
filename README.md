# Rumi

Rumi is a skincare companion app with an Expo React Native mobile app and a FastAPI backend.

## Project Structure

```text
backend/   FastAPI API server
mobile/    Expo React Native app
```

## Prerequisites

- Node.js 20 or newer
- npm
- Python 3.11 or newer
- A phone with the Expo Go app installed, or an Android/iOS simulator

## Backend Setup

From the repository root:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will run at:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/health
```

### Backend CORS

The backend allows Expo web on port `8081` by default. To override allowed origins:

```powershell
$env:CORS_ALLOWED_ORIGINS="http://localhost:8081,http://127.0.0.1:8081"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Mobile Setup

Open a second terminal from the repository root:

```powershell
cd mobile
npm install
npm start
```

Expo will start Metro and print a QR code in the terminal.

Useful scripts:

```powershell
npm start        # Start Expo dev server
npm run android  # Open on Android emulator or connected Android device
npm run ios      # Open on iOS simulator, macOS only
npm run web      # Run in the browser
```

## Running With Expo Go

Expo Go lets you run the mobile app on your phone without creating a native build.

1. Install Expo Go on your phone.
   - Android: install "Expo Go" from the Google Play Store.
   - iPhone: install "Expo Go" from the App Store.
2. Make sure your phone and computer are on the same Wi-Fi network.
3. In the `mobile` folder, run:

```powershell
npm start
```

4. Scan the QR code shown by Expo.
   - Android: scan the QR code from inside the Expo Go app.
   - iPhone: scan the QR code with the Camera app, then open it in Expo Go.
5. Keep the terminal running while you use the app.

### If Expo Go Cannot Connect

- Confirm your phone and computer are on the same Wi-Fi network.
- Disable VPNs or firewall rules that block local network traffic.
- In the Expo terminal UI, switch the connection mode to Tunnel if LAN does not work.
- Restart the Expo server with a clean cache:

```powershell
npx expo start --clear
```

## Running In The Browser

From the `mobile` folder:

```powershell
npm run web
```

Expo will open the web app, usually at:

```text
http://localhost:8081
```

## Development Notes

- Start the backend before testing features that call the API.
- Keep the Expo terminal open while developing.
- If dependencies change, rerun `npm install` inside `mobile`.
- If Python dependencies change, rerun `pip install -r requirements.txt` inside the active backend virtual environment.
