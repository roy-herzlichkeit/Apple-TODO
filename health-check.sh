echo "Health Check for AmarTasks..."

echo "Container Status:"
docker-compose -f docker-compose.prod.yml ps

echo -e "\nBackend Health:"
curl -f http://localhost:5000/health || echo "Backend is not responding"

echo -e "\nFrontend Status:"
curl -f http://localhost:80 > /dev/null 2>&1 && echo "Frontend is accessible" || echo "Frontend is not accessible"

echo -e "\nRecent Backend Logs:"
docker-compose -f docker-compose.prod.yml logs --tail=20 backend

echo -e "\nRecent Frontend Logs:"
docker-compose -f docker-compose.prod.yml logs --tail=20 frontend