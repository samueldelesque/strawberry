echo "create www user (robert)"
useradd -d /var/www/ -m -c "Robert WWW" robert

echo "Update robert's password"
passwd robert

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

echo "make robert the owner of app dir"
chown -R robert:robert /var/www