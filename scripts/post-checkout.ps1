cd frontend
Remove-Item -Recurse -Force node_modules, package-lock.json
npm cache clean --force
npm install