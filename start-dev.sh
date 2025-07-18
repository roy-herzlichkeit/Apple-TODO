echo "Starting AmarTasks in development mode..."

if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo "Please edit .env file with your settings before running again."
    exit 1
fi

echo "Building and starting services..."
docker-compose up --build

echo "Development environment is ready!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo "MongoDB: localhost:27017"
