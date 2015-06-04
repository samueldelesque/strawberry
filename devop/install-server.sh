# Hmmm, should we create a new user?
# echo "create www user (robert)"
# useradd -m -c "Robert Webalizer" robert

# echo "Update robert's password"
# echo -e "password\npassword\n" | passwd

# echo "Unlock robert"
# usermod -U robert

echo "updating packages"
apt-get update

echo "update some required modules"
apt-get install -y build-essential openssl libssl-dev pkg-config

echo "install git"
apt-get install git

echo "install node"
apt-get install node

echo "install npm"
apt-get install npm

echo "install nginx"
apt-get install nginx

echo "install mongo"
apt-get install mongodb

echo "Do some clean up"
apt-get autoremove

echo "Clean up memory"
free && sync && echo 3 > /proc/sys/vm/drop_caches && free

echo "adding node/bin to PATH"
echo "export PATH=\$PATH:/opt/node/bin" >> ~/.bash_profile
echo "echo \"Welcome to Strawberry server\"" >> ~/.bash_profile

echo "Reloading Bash Profile"
source ~/.bash_profile

echo "install pm2"
npm install -g pm2

# Switched to NPM
# echo "install bower"
# npm install -g bower

echo "install Redis"
apt-get install redis-server

echo "creating root app dir"
mkdir /var/www

# echo "restart server to make sure all apps are loaded and bash profile is clear"
# shutdown -r now