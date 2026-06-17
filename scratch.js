const q = `query { user(username: "aetosdios") { followersCount tagline location posts(page: 1, pageSize: 1) { totalDocuments } } }`;
fetch("https://gql.hashnode.com/", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({query: q})})
  .then(r => r.json())
  .then(d => console.log(JSON.stringify(d)))
  .catch(console.error);
