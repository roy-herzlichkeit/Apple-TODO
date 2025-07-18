@echo off
REM Windows batch file for starting development environment

echo 🔧 Starting AmarTasks in development mode...

REM Create .env file from example if it doesn't exist
if not exist .env (
    echo Creating .env file from example...
    copy .env.example .env
    echo Please edit .env file with your settings before running again.
    pause
    exit /b 1
)

REM Build and start services
echo Building and starting services...
docker-compose up --build

echo Development environment is ready!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo MongoDB: localhost:27017
pause