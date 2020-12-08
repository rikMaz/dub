cd frontend

# build frontend
npm install
npm run build

# upload to s3
aws s3 cp build/ s3://dub-whosspeaking --recursive --include "*" --acl public-read
