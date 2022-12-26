@rekha/tweet-card
===============================================
Tweet Card

Before running the application add the below config to your nginx.conf file and restart the Nginx server.

```bash

server {
    listen       80;
    server_name  localhost;
        client_max_body_size 100M;
       
       # add this under server of your local nginx config and restart the nginx
        location /tweets/ {
              proxy_pass https://api.twitter.com/2/;
        }
}

```

