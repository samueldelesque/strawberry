echo "updating packages"
apt-get update

echo "install git"
apt-get install git

echo "install node"
apt-get install node

echo "install npm"
apt-get install npm

echo "install nginx"
apt-get install nginx

echo "install pm2"
npm install -g pm2

echo "install bower"
npm install -g bower

echo "creating root app dir"
mkdir /var/www && cd /var/www

echo "cloning strawberry into app dir"
git clone https://github.com/samueldelesque/strawberry.git

echo "restart server to make sure all apps are loaded and bash profile is clear"
shutdown -r now
