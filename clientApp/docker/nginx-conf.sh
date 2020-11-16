#!/bin/bash

# $1 = Site Path
# OUTPUT is server configuration for NGINX

echo "server { 
 listen 80;
 location / {
   root $1;
   try_files \$uri /index.html;
 }
}"