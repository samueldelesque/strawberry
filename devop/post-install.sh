
echo "entering strawberry dir"
cd /var/www/strawberry

echo "installing node dependencies"
npm install

echo "installing bower dependencies"
bower install

echo "starting file server on pm2"
pm2 start server/fileserver.js --name "berry.public"

echo "starting api server on pm2"
pm2 start server/api.js --name "berry.api"
