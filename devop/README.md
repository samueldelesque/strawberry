#Deployment Notes

***Pull Install scripts***

Run this,

```
sudo mkdir /var/deployment && mkdir /var/deployment/strawberry && wget -O /var/deployment/strawberry/server.sh "https://raw.githubusercontent.com/samueldelesque/strawberry/master/devop/server.sh" && wget -O /var/deployment/strawberry/robert.sh "https://raw.githubusercontent.com/samueldelesque/strawberry/master/devop/robert.sh" && chmod -R 700 /var/deployment/strawberry && /var/deployment/strawberry/server.sh
```

Say "yes,yes,yes" when prompted

After install, system will reboot.

```
ssh robert@|YOU_IP|
```

```
/var/deployment/strawberry/robert.sh
```


Yey, all done!