#!/bin/bash

# Script intended to be run from ./clientApp

echo "Updating Client App Environment..."
sed -i "s#apiBase:.*#apiBase: '$API_BASE',#" ./src/environments/environment.prod.ts
echo "Client App Environment Updated"