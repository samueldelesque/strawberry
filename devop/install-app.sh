cd /var/www

echo "cloning strawberry into app dir"
git clone https://github.com/samueldelesque/strawberry.git

echo "entering strawberry dir"
cd /var/www/strawberry

echo "installing node dependencies"
npm install

echo "installing bower dependencies"
bower install --allow-root

echo "starting file server on pm2"
pm2 start server/fileserver.js --name "berry.public"

echo "starting api server on pm2"
pm2 start server/api.js --name "berry.api"
