#!/bin/bash

mkdir output

envsubst < init-mongo.js > output/init-mongo.js