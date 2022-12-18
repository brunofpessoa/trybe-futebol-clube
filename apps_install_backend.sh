#!/bin/bash

printf "\n> Instalando o back-end\n"
backFolder="./app/backend"
cacheFolderBack="/tmp/backend-cache"
rm -rf $cacheFolderBack
npm_config_loglevel=silent npm i --prefix ${backFolder} --cache $cacheFolderBack
