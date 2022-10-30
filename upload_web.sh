git init
git add *
git commit -m "Upload"
git rm -r --cached "node_modules"

git commit -m 'Remove the now ignored directory node_modules'
git branch -M main
git remote add origin https://github.com/jasonglenevans/FridayNightGvbvdxxinPrototype.git
git push -f origin main