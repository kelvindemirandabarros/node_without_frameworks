curl --silent localhost:3000/heroes
# {"heroes":[{"id":"2bbbc600-ff6b-4e2f-ba3e-ab95392d42ce","name":"Batman","age":50,"power":"rich"},{"id":"2a3072c8-5d92-45b0-9825-aeb5a528417e","name":"Batman","age":50,"power":"rich"}]}

curl \
  --silent \
  -X POST \
  -d '{"name":"Flash","age":99,"power":"speed"}' \
  localhost:3000/heroes
# {"id":"c6ae23ab-d5f3-4da2-b4cf-26d05ba5348c","success":"Hero created with success!"}

curl \
  --silent \
  -X POST \
  -d '{"invalid json payload"}' \
  localhost:3000/heroes
# {"error":"Some error happened."}
