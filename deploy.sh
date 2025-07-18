echo "Starting AmarTasks deployment..."

sudo yum update -y

if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo yum install docker -y
    sudo service docker start
    sudo usermod -a -G docker ec2-user
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

cd /home/ec2-user/amarTasks || exit 1

if [ -d ".git" ]; then
    echo "Pulling latest changes..."
    git pull origin main
fi

if [ -f ".env.production" ]; then
    cp .env.production .env
    echo " Production environment loaded"
else
    echo "  Warning: .env.production not found. Please create it with your production settings."
fi

echo " Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

echo "Cleaning up old images..."
docker system prune -f

echo "Building and starting containers..."
docker-compose -f docker-compose.prod.yml up --build -d

echo "Container status:"
docker-compose -f docker-compose.prod.yml ps

echo "Deployment complete!"
echo "Your app should be accessible at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"