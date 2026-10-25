/* Add only Fetch API categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Basic Requests",
      id: "basic-requests",
      intro: [
        "GET → POST → PUT, PATCH, DELETE and the reusable client, following all seven images. Every example runs independently in the browser console on the local demo page below; requests stay on your machine.",
        "Copy server.mjs and index.html into one temporary folder, run node server.mjs (Node.js 22+), open http://127.0.0.1:3000, then paste one example into its browser console. The server is a small in-memory teaching fixture; the cheat sheet itself does not run requests.",
      ],
      setup: [
        {
          label: "server.mjs — local API fixture",
          language: "javascript",
          code: "import { createServer } from 'node:http';\nimport { readFile } from 'node:fs/promises';\nimport { pathToFileURL } from 'node:url';\n\n// Local teaching API: no persistent data, real authentication, or external calls.\nexport function createDemoServer(servePage = () => readFile(new URL('./index.html', import.meta.url))) {\n  const states = new Map();\n  return createServer(async (req, res) => {\n    try {\n      const url = new URL(req.url, 'http://localhost');\n      const marker = url.pathname.indexOf('/api/');\n      if (marker < 0) {\n        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});\n        res.end(await servePage(url.pathname)); return;\n      }\n      const scope = url.pathname.slice(0, marker);\n      if (!states.has(scope)) states.set(scope, {users:new Map(), nextId:1, retry:new Map(), attempts:0});\n      const state = states.get(scope), route = url.pathname.slice(marker + 5);\n      const json = (status, data, headers = {}) => { res.writeHead(status, {'Content-Type':'application/json', ...headers}); res.end(JSON.stringify(data)); };\n      const buffers = []; for await (const chunk of req) buffers.push(chunk);\n      const raw = Buffer.concat(buffers);\n      const body = () => JSON.parse(raw.toString() || '{}');\n      if (route === 'echo') return json(200, {method:req.method, query:Object.fromEntries(url.searchParams), headers:req.headers, body:raw.toString()});\n      if (route === 'data') return json(200, {message:'hello'});\n      if (route === 'text') { res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'}); res.end('hello text'); return; }\n      if (route === 'binary') { res.writeHead(200, {'Content-Type':'application/octet-stream'}); res.end(Buffer.from([1,2,3])); return; }\n      if (route === 'bad-json') { res.writeHead(200, {'Content-Type':'application/json'}); res.end('{broken'); return; }\n      if (route === 'empty-json') { res.writeHead(200, {'Content-Type':'application/json'}); res.end(); return; }\n      if (/^status\\/\\d+$/.test(route)) { const status = Number(route.split('/')[1]); if (status === 204 || status === 205) { res.writeHead(status); res.end(); return; } return json(status, {message:status === 400 ? 'Name is required' : 'Demo error'}); }\n      if (route === 'refresh') return json(200, {token:'fresh-demo-token'});\n      if (route === 'protected') return req.headers.authorization === 'Bearer fresh-demo-token' ? json(200,{authorized:true}) : json(401,{message:'Expired token'});\n      if (route === 'retry') {\n        const key = req.headers['idempotency-key']; if (!key) return json(400,{message:'Missing idempotency key'});\n        const attempts = (state.retry.get(key) || 0) + 1; state.retry.set(key,attempts);\n        return attempts === 1 ? json(503,{message:'Temporary failure'}) : json(201,{created:true,attempts});\n      }\n      if (route === 'upload') {\n        const form = await new Request('http://localhost/upload',{method:'POST',headers:{'content-type':req.headers['content-type']},body:raw}).formData();\n        const file = form.get('file') || form.get('avatar');\n        return json(201,{name:form.get('name'),filename:file?.name,size:file?.size,uploaded:true});\n      }\n      if (route === 'users' && req.method === 'POST') { const user = { ...body(), id:state.nextId++ }; state.users.set(user.id,user); return json(201,user); }\n      const match = route.match(/^users\\/(\\d+)$/);\n      if (match) {\n        const id = Number(match[1]), user = state.users.get(id);\n        if (!user) return json(404,{message:'User not found'});\n        if (req.method === 'GET') return json(200,user);\n        if (req.method === 'PUT') { const next = {...body(),id}; state.users.set(id,next); return json(200,next); }\n        if (req.method === 'PATCH') { const next = {...user,...body(),id}; state.users.set(id,next); return json(200,next); }\n        if (req.method === 'DELETE') { state.users.delete(id); res.writeHead(204); res.end(); return; }\n      }\n      return json(404,{message:'Unknown route'});\n    } catch (error) { res.writeHead(400,{'Content-Type':'application/json'}); res.end(JSON.stringify({message:error.message})); }\n  });\n}\nif (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {\n  createDemoServer().listen(3000, '127.0.0.1', () => console.log('Open http://127.0.0.1:3000 and use the browser console'));\n}\n",
        },
        {
          label: "index.html — local console page",
          language: "html",
          code: '<!doctype html>\n<html lang="en"><meta charset="utf-8"><title>Fetch examples</title><h1>Fetch examples</h1><p>Open the browser console and paste one Basic Requests example.</p></html>',
        },
      ],
      methods: [
        {
          name: "GET — fetch JSON",
          explanation:
            "Fetch a resource, check the HTTP status, then await body parsing. Use GET for retrieving data; it is fetch’s default method.",
          note: "A fulfilled fetch promise can contain an HTTP error response. Body readers are asynchronous and normally consume the body once.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Read a JSON response",
              language: "javascript",
              code: '(async () => {\nconst response = await fetch("api/data");\nif (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst data = await response.json(); console.log(data.message, response.status);\n})().catch(error => { throw error; });',
            },
            {
              label: "Compare default and explicit GET",
              language: "javascript",
              code: '(async () => {\nconst implicit = await fetch("api/echo"); const explicit = await fetch("api/echo", {method:"GET"});\nconsole.log((await implicit.json()).method, (await explicit.json()).method);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "GET query parameters with URLSearchParams",
          explanation:
            "Serialize query values with URLSearchParams and add them to the URL. Use it to encode pagination, filters, and search text.",
          note: "GET requests cannot have a fetch request body. Query values are strings; append repeated keys explicitly when the API accepts them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Send pagination and sort parameters",
              language: "javascript",
              code: '(async () => {\nconst params = new URLSearchParams({page:1,limit:10,sort:"date"});\nconst response = await fetch(`api/echo?${params}`); if (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst data = await response.json(); console.log(data.query.page, data.query.limit, data.query.sort);\n})().catch(error => { throw error; });',
            },
            {
              label: "Encode special characters and repeated keys",
              language: "javascript",
              code: '(async () => {\nconst params = new URLSearchParams({q:"JavaScript & DOM"}); params.append("tag","web"); params.append("tag","api");\nconsole.log(params.getAll("tag").join("|"));\nconst response = await fetch(`api/echo?${params}`); console.log((await response.json()).query.q);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "GET headers — Accept and Authorization",
          explanation:
            "Send Accept to express preferred response formats and Authorization when the API expects a bearer token. Use Headers to build or override header values.",
          note: "Accept does not force the server to return JSON. Demo tokens here are local fixture values; cross-origin Authorization requests require appropriate server CORS support.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Send a format preference and a demo token",
              language: "javascript",
              code: '(async () => {\nconst response = await fetch("api/echo", {headers:{Accept:"application/json",Authorization:"Bearer demo-token"}});\nif (!response.ok) throw new Error(`HTTP ${response.status}`); const data = await response.json();\nconsole.log(data.headers.accept, data.headers.authorization);\n})().catch(error => { throw error; });',
            },
            {
              label: "Build headers with the Headers API",
              language: "javascript",
              code: '(async () => {\nconst headers = new Headers({Accept:"text/plain"}); headers.set("Accept","application/json");\nconst response = await fetch("api/echo", {headers}); const data = await response.json(); console.log(data.headers.accept);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "GET cache revalidation and bypass",
          explanation:
            "Use fetch’s cache option to choose how the browser consults its HTTP cache. no-cache revalidates a cached response; no-store avoids using or updating that cache.",
          note: "These are browser HTTP-cache controls, not a guarantee about every intermediary or application cache. The demo checks configuration and request success without claiming to simulate a browser cache.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Request revalidation",
              language: "javascript",
              code: '(async () => {\nconst request = new Request(new URL("api/data",location.href), {cache:"no-cache"});\nconst response = await fetch(request); if (!response.ok) throw new Error(`HTTP ${response.status}`);\nconsole.log(request.cache, (await response.json()).message);\n})().catch(error => { throw error; });',
            },
            {
              label: "Bypass the browser HTTP cache",
              language: "javascript",
              code: '(async () => {\nconst request = new Request(new URL("api/data",location.href), {cache:"no-store"});\nconst response = await fetch(request); if (!response.ok) throw new Error(`HTTP ${response.status}`);\nconsole.log(request.cache, response.ok);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "getData() — parse by response content type",
          explanation:
            "Check status and choose a body reader from the response media type. Use a helper when an endpoint can return JSON, text, or binary content.",
          note: "Recognizes JSON suffix media types and text/ prefixes; 204 and 205 return null. An advertised JSON body that is empty or invalid still causes parsing to reject.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Read JSON and text with one helper",
              language: "javascript",
              code: '(async () => {\nasync function getData(url) {\n  const response = await fetch(url, {headers:{Accept:"application/json, text/plain, */*"},cache:"no-cache"});\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  if (response.status === 204 || response.status === 205) return null;\n  const type = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();\n  if (type === "application/json" || type.endsWith("+json")) return await response.json();\n  if (type.startsWith("text/")) return await response.text();\n  return await response.blob();\n}\nconsole.log((await getData("api/data")).message, await getData("api/text"));\n})().catch(error => { throw error; });',
            },
            {
              label: "Read binary data and handle no content",
              language: "javascript",
              code: '(async () => {\nasync function getData(url) {\n  const response = await fetch(url, {headers:{Accept:"application/json, text/plain, */*"},cache:"no-cache"});\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  if (response.status === 204 || response.status === 205) return null;\n  const type = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();\n  if (type === "application/json" || type.endsWith("+json")) return await response.json();\n  if (type.startsWith("text/")) return await response.text();\n  return await response.blob();\n}\nconst blob = await getData("api/binary"); console.log(blob.size, blob.type);\nconsole.log(await getData("api/status/204"));\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Handle HTTP and body parsing errors",
          explanation:
            "Check response.ok explicitly and let malformed body parsing reject. Catch errors at the application boundary to report a useful failure.",
          note: "Throwing an HTTP error does not imply that fetch itself rejected; HTTP status failures and JSON parse failures are distinct.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Catch an HTTP status failure",
              language: "javascript",
              code: '(async () => {\nasync function getData(url) {\n  const response = await fetch(url, {headers:{Accept:"application/json, text/plain, */*"},cache:"no-cache"});\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  if (response.status === 204 || response.status === 205) return null;\n  const type = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();\n  if (type === "application/json" || type.endsWith("+json")) return await response.json();\n  if (type.startsWith("text/")) return await response.text();\n  return await response.blob();\n}\ntry { await getData("api/status/404"); } catch (error) { console.log(error.message); }\n})().catch(error => { throw error; });',
            },
            {
              label: "Catch invalid JSON without hiding it",
              language: "javascript",
              code: '(async () => {\nasync function getData(url) {\n  const response = await fetch(url, {headers:{Accept:"application/json, text/plain, */*"},cache:"no-cache"});\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  if (response.status === 204 || response.status === 205) return null;\n  const type = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();\n  if (type === "application/json" || type.endsWith("+json")) return await response.json();\n  if (type.startsWith("text/")) return await response.text();\n  return await response.blob();\n}\ntry { await getData("api/bad-json"); } catch (error) { console.log(error instanceof SyntaxError); }\ntry { await getData("api/empty-json"); } catch (error) { console.log(error instanceof SyntaxError); }\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "buildUrl() — preserve and encode query parameters",
          explanation:
            "Use URL to retain the base path and existing query while adding parameters. Define whether new scalar values replace an existing key and how repeated values are represented.",
          note: "This helper skips nullish values, retains zero and false, replaces scalar keys, and appends array entries. URL handles query placement before a fragment.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams",
          examples: [
            {
              label: "Build a search URL",
              language: "javascript",
              code: '(async () => {\nfunction buildUrl(base, params) {\n  const url = new URL(base, location.href);\n  for (const [key,value] of Object.entries(params)) {\n    if (value == null) continue;\n    if (Array.isArray(value)) { for (const item of value) url.searchParams.append(key,String(item)); }\n    else url.searchParams.set(key,String(value));\n  }\n  return url.toString();\n}\nconst url = buildUrl("api/echo", {q:"javascript",limit:20,offset:0});\nconst response = await fetch(url); const data = await response.json(); console.log(data.query.q, data.query.limit, data.query.offset);\n})().catch(error => { throw error; });',
            },
            {
              label: "Preserve other keys and append repeated values",
              language: "javascript",
              code: '(async () => {\nfunction buildUrl(base, params) {\n  const url = new URL(base, location.href);\n  for (const [key,value] of Object.entries(params)) {\n    if (value == null) continue;\n    if (Array.isArray(value)) { for (const item of value) url.searchParams.append(key,String(item)); }\n    else url.searchParams.set(key,String(value));\n  }\n  return url.toString();\n}\nconst url = new URL(buildUrl("api/echo?keep=yes&q=old#results", {q:"A&B",tag:["web","api"],skip:null,enabled:false}));\nconsole.log(url.searchParams.get("keep"), url.searchParams.get("q"), url.searchParams.getAll("tag").join("|"), url.searchParams.has("skip"), url.searchParams.get("enabled"), url.hash);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "POST — send JSON",
          explanation:
            "Set POST, serialize the data, and identify the JSON request body with Content-Type. Use it when the API creates a resource from a JSON representation.",
          note: "Check response.ok before reading the result; a successful creation may return 201, while some APIs return an empty response.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Create a user",
              language: "javascript",
              code: '(async () => {\nconst response = await fetch("api/users", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"John Doe",email:"john@example.com"})});\nif (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst user = await response.json(); console.log(response.status, user.name, user.email, Number.isInteger(user.id));\n})().catch(error => { throw error; });',
            },
            {
              label: "Inspect the actual method and JSON body",
              language: "javascript",
              code: '(async () => {\nconst payload = {name:"Jane",active:false};\nconst response = await fetch("api/echo", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});\nconst data = await response.json(); console.log(data.method, data.headers["content-type"], JSON.parse(data.body).active);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "POST FormData — fields and files",
          explanation:
            "Append text and file values to FormData and pass it directly as the body. Use it for multipart uploads.",
          note: "Omit a manual Content-Type so the browser supplies the matching multipart boundary. These examples create a File directly so no file input is left undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Upload a defined avatar file",
              language: "javascript",
              code: '(async () => {\nconst form = new FormData(); form.append("name","John Doe"); form.append("avatar",new File(["avatar"],"avatar.txt",{type:"text/plain"}));\nconst response = await fetch("api/upload", {method:"POST",body:form}); if (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst data = await response.json(); console.log(data.name,data.filename,data.size,response.status);\n})().catch(error => { throw error; });',
            },
            {
              label: "Verify the generated multipart boundary",
              language: "javascript",
              code: '(async () => {\nconst form = new FormData(); form.append("name","Jane");\nconst request = new Request(new URL("api/echo",location.href), {method:"POST",body:form});\nconst response = await fetch(request); const data = await response.json();\nconsole.log(data.headers["content-type"].startsWith("multipart/form-data; boundary="), data.body.includes("Jane"));\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "POST URL-encoded form fields",
          explanation:
            "Use URLSearchParams as a request body to send application/x-www-form-urlencoded data. Use this for endpoints expecting traditional form fields.",
          note: "Fetch supplies the form media type for a URLSearchParams body unless overridden; values are encoded as text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Send form fields",
              language: "javascript",
              code: '(async () => {\nconst params = new URLSearchParams({username:"john",password:"demo-only"});\nconst response = await fetch("api/echo", {method:"POST",body:params}); const data = await response.json();\nconst fields = new URLSearchParams(data.body); console.log(fields.get("username"), data.headers["content-type"].startsWith("application/x-www-form-urlencoded"));\n})().catch(error => { throw error; });',
            },
            {
              label: "Preserve special characters and repeated fields",
              language: "javascript",
              code: '(async () => {\nconst params = new URLSearchParams(); params.append("q","A+B & C"); params.append("tag","one"); params.append("tag","two");\nconst response = await fetch("api/echo", {method:"POST",body:params}); const data = await response.json();\nconst fields = new URLSearchParams(data.body); console.log(fields.get("q"), fields.getAll("tag").join("|"));\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Trace a request with X-Request-ID",
          explanation:
            "Generate a request identifier and send it in a header for server-side correlation. Reuse or distinguish identifiers according to the API’s tracing contract.",
          note: "A tracing identifier does not make a POST idempotent. Cross-origin custom headers generally require a CORS preflight.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Send and inspect a request ID",
              language: "javascript",
              code: '(async () => {\nconst id = crypto.randomUUID();\nconst response = await fetch("api/echo", {method:"POST",headers:{"Content-Type":"application/json","X-Request-ID":id},body:"{}"});\nconst data = await response.json(); console.log(data.headers["x-request-id"] === id, id.length);\n})().catch(error => { throw error; });',
            },
            {
              label: "Keep tracing and idempotency identifiers separate",
              language: "javascript",
              code: '(async () => {\nconst trace = crypto.randomUUID(), operation = crypto.randomUUID();\nconst response = await fetch("api/echo", {method:"POST",headers:{"X-Request-ID":trace,"Idempotency-Key":operation},body:"demo"});\nconst data = await response.json(); console.log(data.headers["x-request-id"] === trace, data.headers["idempotency-key"] === operation);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "postData() — bounded retries with backoff",
          explanation:
            "Retry selected temporary HTTP failures with a bounded attempt count and exponential delay. Reuse one operation key when the server explicitly supports idempotency for that POST endpoint.",
          note: "Never assume POST is safe to replay. This teaching helper retries only 502/503/504, propagates network and parse failures, and does not retry validation failures; production policies may also require Retry-After and jitter.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Retry one temporary server failure",
              language: "javascript",
              code: '(async () => {\nasync function postData(url, data, {attempts = 3, key = crypto.randomUUID()} = {}) {\n  if (!Number.isInteger(attempts) || attempts < 1) throw new RangeError("Use a positive attempt count");\n  const body = JSON.stringify(data);\n  for (let attempt = 0; attempt < attempts; attempt++) {\n    const response = await fetch(url, {method:"POST",headers:{"Content-Type":"application/json","Idempotency-Key":key,"X-Request-ID":crypto.randomUUID()},body});\n    if (response.ok) return response.status === 204 || response.status === 205 ? null : await response.json();\n    const text = await response.text();\n    if (![502,503,504].includes(response.status) || attempt === attempts - 1) throw new Error(\'HTTP \' + response.status + \': \' + text);\n    await new Promise(resolve => setTimeout(resolve, 20 * 2 ** attempt));\n  }\n}\nconst result = await postData("api/retry", {name:"John"}); console.log(result.created,result.attempts);\n})().catch(error => { throw error; });',
            },
            {
              label: "Stop on validation failure or exhausted attempts",
              language: "javascript",
              code: '(async () => {\nasync function postData(url, data, {attempts = 3, key = crypto.randomUUID()} = {}) {\n  if (!Number.isInteger(attempts) || attempts < 1) throw new RangeError("Use a positive attempt count");\n  const body = JSON.stringify(data);\n  for (let attempt = 0; attempt < attempts; attempt++) {\n    const response = await fetch(url, {method:"POST",headers:{"Content-Type":"application/json","Idempotency-Key":key,"X-Request-ID":crypto.randomUUID()},body});\n    if (response.ok) return response.status === 204 || response.status === 205 ? null : await response.json();\n    const text = await response.text();\n    if (![502,503,504].includes(response.status) || attempt === attempts - 1) throw new Error(\'HTTP \' + response.status + \': \' + text);\n    await new Promise(resolve => setTimeout(resolve, 20 * 2 ** attempt));\n  }\n}\ntry { await postData("api/status/400", {}); } catch (error) { console.log(error.message.startsWith("HTTP 400:")); }\ntry { await postData("api/retry", {}, {attempts:1}); } catch (error) { console.log(error.message.startsWith("HTTP 503:")); }\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Refresh authorization once after a 401",
          explanation:
            "Refresh a token through a supplied function, then send one new request with the updated token. Bound the refresh attempt so repeated unauthorized responses cannot loop forever.",
          note: "This fixture models a server that rejects unauthorized requests before applying any effect. Real refresh credentials and replay behavior depend on the API contract.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Refresh and actually send the new token",
              language: "javascript",
              code: '(async () => {\nasync function postWithRefresh(url, data, token, refreshAuthToken) {\n  const send = currentToken => fetch(url, {method:"POST",headers:{"Content-Type":"application/json",Authorization:\'Bearer \' + currentToken},body:JSON.stringify(data)});\n  let response = await send(token);\n  if (response.status === 401) {\n    await response.text();\n    token = await refreshAuthToken();\n    response = await send(token);\n  }\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  return await response.json();\n}\nconst refreshAuthToken = async () => { const response = await fetch("api/refresh",{method:"POST"}); if (!response.ok) throw new Error(`HTTP ${response.status}`); return (await response.json()).token; };\nconsole.log((await postWithRefresh("api/protected",{},"expired",refreshAuthToken)).authorized);\n})().catch(error => { throw error; });',
            },
            {
              label: "Fail after one unsuccessful refresh",
              language: "javascript",
              code: '(async () => {\nasync function postWithRefresh(url, data, token, refreshAuthToken) {\n  const send = currentToken => fetch(url, {method:"POST",headers:{"Content-Type":"application/json",Authorization:\'Bearer \' + currentToken},body:JSON.stringify(data)});\n  let response = await send(token);\n  if (response.status === 401) {\n    await response.text();\n    token = await refreshAuthToken();\n    response = await send(token);\n  }\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  return await response.json();\n}\nlet refreshes = 0;\ntry { await postWithRefresh("api/protected",{},"expired",async () => { refreshes++; return "still-invalid"; }); } catch (error) { console.log(error.message, refreshes); }\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "uploadFile() — XMLHttpRequest upload progress",
          explanation:
            "Observe xhr.upload progress events while sending a multipart file. Resolve all successful 2xx statuses and reject HTTP, network, timeout, abort, or JSON parsing failures.",
          note: "Fetch has no standard upload-progress event. A computable progress event measures transmitted bytes, not server processing completion; callback frequency is browser-dependent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload",
          examples: [
            {
              label: "Upload a file and validate progress values",
              language: "javascript",
              code: '(async () => {\nfunction uploadFile(url, file, onProgress = () => {}, signal) {\n  return new Promise((resolve,reject) => {\n    const xhr = new XMLHttpRequest();\n    const cleanup = () => signal?.removeEventListener("abort", abort);\n    const fail = error => { cleanup(); reject(error); };\n    const abort = () => xhr.abort();\n    xhr.upload.addEventListener("progress", event => { if (event.lengthComputable) { try { onProgress(event.loaded / event.total * 100); } catch (error) { fail(error); xhr.abort(); } } });\n    xhr.addEventListener("load", () => { cleanup(); if (xhr.status < 200 || xhr.status >= 300) { reject(new Error(\'HTTP \' + xhr.status)); return; } try { resolve(xhr.status === 204 || xhr.status === 205 ? null : JSON.parse(xhr.responseText)); } catch (error) { reject(error); } });\n    xhr.addEventListener("error", () => fail(new TypeError("Upload network error")));\n    xhr.addEventListener("timeout", () => fail(new Error("Upload timed out")));\n    xhr.addEventListener("abort", () => fail(new DOMException("Upload aborted","AbortError")));\n    xhr.open("POST",url); xhr.timeout = 10000;\n    if (signal?.aborted) { fail(new DOMException("Upload aborted","AbortError")); return; }\n    signal?.addEventListener("abort",abort,{once:true});\n    const form = new FormData(); form.append("file",file);\n    try { xhr.send(form); } catch (error) { fail(error); }\n  });\n}\nconst progress = [];\nconst result = await uploadFile("api/upload",new File(["hello"],"hello.txt"),value => progress.push(value));\nconsole.log(result.filename,result.size,result.uploaded); console.log(progress.every(value => value >= 0 && value <= 100));\n})().catch(error => { throw error; });',
            },
            {
              label: "Reject HTTP errors and an already-aborted signal",
              language: "javascript",
              code: '(async () => {\nfunction uploadFile(url, file, onProgress = () => {}, signal) {\n  return new Promise((resolve,reject) => {\n    const xhr = new XMLHttpRequest();\n    const cleanup = () => signal?.removeEventListener("abort", abort);\n    const fail = error => { cleanup(); reject(error); };\n    const abort = () => xhr.abort();\n    xhr.upload.addEventListener("progress", event => { if (event.lengthComputable) { try { onProgress(event.loaded / event.total * 100); } catch (error) { fail(error); xhr.abort(); } } });\n    xhr.addEventListener("load", () => { cleanup(); if (xhr.status < 200 || xhr.status >= 300) { reject(new Error(\'HTTP \' + xhr.status)); return; } try { resolve(xhr.status === 204 || xhr.status === 205 ? null : JSON.parse(xhr.responseText)); } catch (error) { reject(error); } });\n    xhr.addEventListener("error", () => fail(new TypeError("Upload network error")));\n    xhr.addEventListener("timeout", () => fail(new Error("Upload timed out")));\n    xhr.addEventListener("abort", () => fail(new DOMException("Upload aborted","AbortError")));\n    xhr.open("POST",url); xhr.timeout = 10000;\n    if (signal?.aborted) { fail(new DOMException("Upload aborted","AbortError")); return; }\n    signal?.addEventListener("abort",abort,{once:true});\n    const form = new FormData(); form.append("file",file);\n    try { xhr.send(form); } catch (error) { fail(error); }\n  });\n}\ntry { await uploadFile("api/status/400",new File(["x"],"x.txt")); } catch (error) { console.log(error.message); }\nconst controller = new AbortController(); controller.abort();\ntry { await uploadFile("api/upload",new File(["x"],"x.txt"),undefined,controller.signal); } catch (error) { console.log(error.name); }\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "PUT — replace a resource representation",
          explanation:
            "Send the complete writable representation with PUT when the API uses replacement semantics. Use JSON Content-Type for a JSON body.",
          note: "Which fields are writable or retained is defined by the server. This fixture retains id and replaces other fields.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Replace a user with a complete payload",
              language: "javascript",
              code: '(async () => {\nconst created = await fetch("api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"John",email:"old@example.com",age:30})});\nif (!created.ok) throw new Error(\'HTTP \' + created.status);\nconst user = await created.json();\nconst response = await fetch(`api/users/${user.id}`, {method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"Jane Doe",email:"jane@example.com",age:31})});\nif (!response.ok) throw new Error(`HTTP ${response.status}`); const next = await response.json(); console.log(next.name,next.email,next.age);\n})().catch(error => { throw error; });',
            },
            {
              label: "Observe an omitted field under replacement semantics",
              language: "javascript",
              code: '(async () => {\nconst created = await fetch("api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"John",email:"old@example.com",age:30})});\nif (!created.ok) throw new Error(\'HTTP \' + created.status);\nconst user = await created.json();\nconst response = await fetch(`api/users/${user.id}`, {method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"Jane"})});\nif (!response.ok) throw new Error(`HTTP ${response.status}`); const next = await response.json(); console.log(next.name,Object.hasOwn(next,"email"),next.id === user.id);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "PATCH — apply a partial update",
          explanation:
            "Send the fields or patch document defined by the server’s PATCH contract. Use it for a partial change rather than a complete replacement.",
          note: "PATCH is not inherently idempotent, and application/json has no universal patch semantics. This demo explicitly merges top-level JSON fields; other APIs may use JSON Patch or Merge Patch.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Update email while preserving other fields",
              language: "javascript",
              code: '(async () => {\nconst created = await fetch("api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"John",email:"old@example.com",age:30})});\nif (!created.ok) throw new Error(\'HTTP \' + created.status);\nconst user = await created.json();\nconst response = await fetch(`api/users/${user.id}`, {method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:"new@example.com"})});\nif (!response.ok) throw new Error(`HTTP ${response.status}`); const next = await response.json(); console.log(next.name,next.email,next.age);\n})().catch(error => { throw error; });',
            },
            {
              label: "Inspect an unsupported resource failure",
              language: "javascript",
              code: '(async () => {\nconst response = await fetch("api/users/99999",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"Jane"})});\nconsole.log(response.ok,response.status,(await response.json()).message);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "DELETE — remove a resource",
          explanation:
            "Send DELETE to the resource URL and check response.ok. Use the API’s status and body contract to decide whether a response body exists.",
          note: "A successful DELETE may return 200, 202, or 204; 202 can mean processing is still pending. Do not parse JSON from a 204.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Delete with a demo Authorization header",
              language: "javascript",
              code: '(async () => {\nconst created = await fetch("api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"John",email:"old@example.com",age:30})});\nif (!created.ok) throw new Error(\'HTTP \' + created.status);\nconst user = await created.json();\nconst response = await fetch(`api/users/${user.id}`,{method:"DELETE",headers:{Authorization:"Bearer demo-token"}});\nif (!response.ok) throw new Error(`HTTP ${response.status}`); console.log(response.status,await response.text());\n})().catch(error => { throw error; });',
            },
            {
              label: "Handle a repeated deletion explicitly",
              language: "javascript",
              code: '(async () => {\nconst created = await fetch("api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"John",email:"old@example.com",age:30})});\nif (!created.ok) throw new Error(\'HTTP \' + created.status);\nconst user = await created.json();\nawait fetch(`api/users/${user.id}`,{method:"DELETE"});\nconst again = await fetch(`api/users/${user.id}`,{method:"DELETE"}); console.log(again.status,again.ok);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Handle 204, 205, and other empty responses",
          explanation:
            "Return a defined empty result before attempting JSON parsing when there is no body. Use a text-first reader when the API permits other successful empty responses.",
          note: "An empty 200 response and malformed nonempty JSON are distinct. This reader accepts empty bodies as null; choose stricter behavior if the API requires JSON.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Accept both no-content status codes",
              language: "javascript",
              code: '(async () => {\nasync function readJSON(response) {\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  if (response.status === 204 || response.status === 205) return null;\n  const text = await response.text();\n  return text.trim() === "" ? null : JSON.parse(text);\n}\nconsole.log(await readJSON(await fetch("api/status/204")),await readJSON(await fetch("api/status/205")));\n})().catch(error => { throw error; });',
            },
            {
              label: "Accept empty 200 and still reject malformed JSON",
              language: "javascript",
              code: '(async () => {\nasync function readJSON(response) {\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  if (response.status === 204 || response.status === 205) return null;\n  const text = await response.text();\n  return text.trim() === "" ? null : JSON.parse(text);\n}\nconsole.log(await readJSON(await fetch("api/empty-json")));\ntry { await readJSON(await fetch("api/bad-json")); } catch (error) { console.log(error instanceof SyntaxError); }\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "APIClient — reusable CRUD requests",
          explanation:
            "Centralize base URLs, authentication, status checks, and JSON decoding in a small client. Expose GET, POST, PUT, PATCH, and DELETE methods for consistent call sites.",
          note: "This JSON client accepts any HeadersInit form and sets Content-Type only when sending JSON. Keep the base URL ending in /; endpoint origin/path checks avoid sending its token outside that API base.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Create, read, replace, patch, and delete",
              language: "javascript",
              code: '(async () => {\nasync function readJSON(response) {\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  if (response.status === 204 || response.status === 205) return null;\n  const text = await response.text();\n  return text.trim() === "" ? null : JSON.parse(text);\n}\nclass APIClient {\n  constructor(baseURL) { this.baseURL = new URL(baseURL,location.href); this.headers = new Headers({Accept:"application/json"}); }\n  setAuthToken(token) { if (token == null) this.headers.delete("Authorization"); else this.headers.set("Authorization",\'Bearer \' + token); }\n  async request(endpoint, options = {}) {\n    const url = new URL(endpoint.replace(/^\\/+/,""),this.baseURL);\n    if (url.origin !== this.baseURL.origin || !url.pathname.startsWith(this.baseURL.pathname)) throw new Error("Endpoint outside API base");\n    const headers = new Headers(this.headers);\n    new Headers(options.headers).forEach((value,key) => headers.set(key,value));\n    return readJSON(await fetch(url,{...options,headers}));\n  }\n  get(endpoint,options = {}) { return this.request(endpoint,{...options,method:"GET"}); }\n  post(endpoint,data,options = {}) { return this.json("POST",endpoint,data,options); }\n  put(endpoint,data,options = {}) { return this.json("PUT",endpoint,data,options); }\n  patch(endpoint,data,options = {}) { return this.json("PATCH",endpoint,data,options); }\n  delete(endpoint,options = {}) { return this.request(endpoint,{...options,method:"DELETE"}); }\n  json(method,endpoint,data,options) { const headers = new Headers(options.headers); if (!headers.has("Content-Type")) headers.set("Content-Type","application/json"); return this.request(endpoint,{...options,method,headers,body:JSON.stringify(data)}); }\n}\nconst api = new APIClient("api/"); api.setAuthToken("demo-token");\nconst created = await api.post("users",{name:"John"});\nconsole.log((await api.get(`users/${created.id}`)).name);\nawait api.put(`users/${created.id}`,{name:"John Doe",email:"john@example.com"});\nconst patched = await api.patch(`users/${created.id}`,{email:"new@example.com"}); console.log(patched.name,patched.email);\nconsole.log(await api.delete(`users/${created.id}`));\n})().catch(error => { throw error; });',
            },
            {
              label: "Override headers and clear authentication",
              language: "javascript",
              code: '(async () => {\nasync function readJSON(response) {\n  if (!response.ok) throw new Error(\'HTTP \' + response.status);\n  if (response.status === 204 || response.status === 205) return null;\n  const text = await response.text();\n  return text.trim() === "" ? null : JSON.parse(text);\n}\nclass APIClient {\n  constructor(baseURL) { this.baseURL = new URL(baseURL,location.href); this.headers = new Headers({Accept:"application/json"}); }\n  setAuthToken(token) { if (token == null) this.headers.delete("Authorization"); else this.headers.set("Authorization",\'Bearer \' + token); }\n  async request(endpoint, options = {}) {\n    const url = new URL(endpoint.replace(/^\\/+/,""),this.baseURL);\n    if (url.origin !== this.baseURL.origin || !url.pathname.startsWith(this.baseURL.pathname)) throw new Error("Endpoint outside API base");\n    const headers = new Headers(this.headers);\n    new Headers(options.headers).forEach((value,key) => headers.set(key,value));\n    return readJSON(await fetch(url,{...options,headers}));\n  }\n  get(endpoint,options = {}) { return this.request(endpoint,{...options,method:"GET"}); }\n  post(endpoint,data,options = {}) { return this.json("POST",endpoint,data,options); }\n  put(endpoint,data,options = {}) { return this.json("PUT",endpoint,data,options); }\n  patch(endpoint,data,options = {}) { return this.json("PATCH",endpoint,data,options); }\n  delete(endpoint,options = {}) { return this.request(endpoint,{...options,method:"DELETE"}); }\n  json(method,endpoint,data,options) { const headers = new Headers(options.headers); if (!headers.has("Content-Type")) headers.set("Content-Type","application/json"); return this.request(endpoint,{...options,method,headers,body:JSON.stringify(data)}); }\n}\nconst api = new APIClient("api/"); api.setAuthToken("demo-token");\nconst first = await api.get("echo",{headers:new Headers({Accept:"text/plain","X-Demo":"yes"})}); console.log(first.headers.accept,first.headers["x-demo"],first.headers.authorization);\napi.setAuthToken(null); const next = await api.get("echo"); console.log(Object.hasOwn(next.headers,"authorization"));\ntry { await api.get("status/404"); } catch (error) { console.log(error.message); }\n})().catch(error => { throw error; });',
            },
          ],
        },
      ],
    },
    {
      name: "Request Configuration",
      id: "request-configuration",
      intro: [
        "Headers and authentication → CORS and modes → cache control, following all nine images. Each snippet runs independently in the browser console on the dedicated local page below.",
        "In a new temporary folder copy config-server.mjs, index.html, sw.js, and offline.html below. Run node config-server.mjs (Node.js 22+), open http://127.0.0.1:3100/, and run one example. The fixture starts a second origin on port 3101 for actual CORS tests; demoAPI is defined by config.js. Close the earlier Basic Requests fixture if you no longer need it. All tokens, cookies, and data are local demo values.",
      ],
      setup: [
        {
          label: "config-server.mjs — two-origin API and page server",
          language: "javascript",
          code: "import {createServer} from 'node:http';\nimport {readFile} from 'node:fs/promises';\nimport {pathToFileURL} from 'node:url';\n\n// Two loopback ports are distinct origins. This fixture has no real accounts.\nexport async function startDemo({pagePort=3100,apiPort=3101,servePage}={}) {\n  const states = new Map(); let pageOrigin, apiOrigin;\n  const load = name => readFile(new URL(name,import.meta.url));\n  const handler = remote => async (req,res) => {\n    try {\n      const url = new URL(req.url,'http://localhost');\n      const match = url.pathname.match(/^(\\/case\\/\\d+)?\\/(.*)$/);\n      const scope = match?.[1] || '', route = match?.[2] || '';\n      if (!states.has(scope)) states.set(scope,{refreshes:0,requests:0,preflights:0,fail:false,etag:true});\n      const state = states.get(scope);\n      const json = (status,data,headers={}) => { res.writeHead(status,{'Content-Type':'application/json',...headers}); res.end(JSON.stringify(data)); };\n      if (route === 'config.js') { res.writeHead(200,{'Content-Type':'text/javascript'});res.end('window.demoAPI='+JSON.stringify(apiOrigin+scope+'/')+';');return; }\n      if (route === 'sw.js') { res.writeHead(200,{'Content-Type':'text/javascript','Cache-Control':'no-store'});res.end(await load('sw.js'));return; }\n      if (route === 'offline.html') { res.writeHead(200,{'Content-Type':'text/html'});res.end(await load('offline.html'));return; }\n      if (route === 'offline-page' || route === 'drop') { req.socket.destroy(); return; }\n      if (route === '' || route.endsWith('index.html')) {res.writeHead(200,{'Content-Type':'text/html'});res.end(servePage ? await servePage(url.pathname) : await load('index.html'));return;}\n      if (remote && route !== 'blocked') {\n        res.setHeader('Access-Control-Allow-Origin',pageOrigin);\n        res.setHeader('Vary','Origin');\n        res.setHeader('Access-Control-Allow-Credentials','true');\n        res.setHeader('Access-Control-Expose-Headers','ETag, X-Visible, X-Preflights');\n        if (req.method === 'OPTIONS') {\n          state.preflights++;\n          res.writeHead(204,{'Access-Control-Allow-Methods':'GET, POST, PATCH','Access-Control-Allow-Headers':'Content-Type, Authorization, X-Demo','Access-Control-Max-Age':'0'});res.end();return;\n        }\n      }\n      const buffers=[]; for await (const chunk of req) buffers.push(chunk);\n      const raw=Buffer.concat(buffers).toString();\n      if (!remote && route === 'proxy/echo' && req.method === 'GET') {\n        const upstream=await fetch(apiOrigin+scope+'/echo',{credentials:'omit'});\n        res.writeHead(upstream.status,{'Content-Type':'application/json'});res.end(await upstream.text());return;\n      }\n      if (route === 'echo' || route === 'blocked') return json(200,{method:req.method,headers:req.headers,body:raw,preflights:state.preflights});\n      if (route === 'headers') return json(200,{ok:true},{ETag:'\"demo-v1\"','Last-Modified':'Wed, 01 Jan 2025 00:00:00 GMT','X-Visible':'visible','X-Hidden':'hidden'});\n      if (route === 'cookie') {res.setHeader('Set-Cookie','demoSession=yes; HttpOnly; SameSite=Lax; Path='+ (scope || '') +'/');return json(200,{set:true});}\n      if (route === 'refresh') { state.refreshes++; const data=JSON.parse(raw||'{}'); if (data.refreshToken !== 'refresh-demo' && data.refreshToken !== 'refresh-rotated') return json(401,{message:'Invalid refresh'});return json(200,{accessToken:'access-fresh',refreshToken:'refresh-rotated'}); }\n      if (route === 'private') return req.headers.authorization === 'Bearer access-fresh' ? json(200,{authorized:true,method:req.method,body:raw}) : json(401,{message:'Expired'});\n      if (route === 'stats') return json(200,{...state});\n      if (route === 'toggle') {state.fail=url.searchParams.get('fail') === 'true';state.etag=url.searchParams.get('etag') !== 'false';return json(200,{ok:true});}\n      if (route === 'cache' || route === 'fresh' || route === 'public/asset') {\n        state.requests++;\n        if (state.fail) return json(503,{message:'Temporary failure'},{'Cache-Control':'no-store'});\n        const headers={'Cache-Control':route === 'fresh'?'public, max-age=3600':'public, max-age=0','Last-Modified':'Wed, 01 Jan 2025 00:00:00 GMT'};\n        if (state.etag) headers.ETag='\"demo-v1\"';\n        if (state.etag && req.headers['if-none-match'] === '\"demo-v1\"' || !req.headers['if-none-match'] && req.headers['if-modified-since'] === headers['Last-Modified']) {res.writeHead(304,headers);res.end();return;}\n        return json(200,url.searchParams.get('zero') === 'true' ? 0 : {value:'cached',request:state.requests},headers);\n      }\n      if (route === 'denied') return json(401,{message:'Unauthorized'},{'Cache-Control':'no-store'});\n      return json(404,{message:'Missing route'});\n    } catch(error) {if (!res.headersSent) res.writeHead(400,{'Content-Type':'application/json'});res.end(JSON.stringify({message:error.message}));}\n  };\n  const page=createServer(handler(false)),api=createServer(handler(true));\n  await new Promise(resolve=>page.listen(pagePort,'127.0.0.1',resolve));\n  await new Promise(resolve=>api.listen(apiPort,'127.0.0.1',resolve));\n  pageOrigin='http://127.0.0.1:'+page.address().port;apiOrigin='http://127.0.0.1:'+api.address().port;\n  return {page,api,pageOrigin,apiOrigin};\n}\nif(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {\n  const demo=await startDemo();console.log('Open '+demo.pageOrigin+' and use its browser console');\n}\n",
        },
        {
          label: "index.html — dedicated demo page",
          language: "html",
          code: '<!doctype html><html lang="en"><meta charset="utf-8"><title>Request configuration</title><h1>Request configuration</h1><p>Open the console and run one example.</p><script src="config.js"></script></html>',
        },
        {
          label: "sw.js — scoped public cache and offline navigation",
          language: "javascript",
          code: "const CACHE = 'fetch-config-v1:' + self.registration.scope;\nconst offline = new URL('offline.html',self.registration.scope).href;\nself.addEventListener('install',event => event.waitUntil((async()=>{\n  const cache=await caches.open(CACHE);await cache.add(offline);await self.skipWaiting();\n})()));\nself.addEventListener('activate',event => event.waitUntil(self.clients.claim()));\nself.addEventListener('fetch',event => {\n  const request=event.request,url=new URL(request.url);\n  if(request.method !== 'GET' || url.origin !== self.location.origin) return;\n  const publicPath=new URL('public/',self.registration.scope).pathname;\n  if(!url.pathname.startsWith(publicPath) && request.mode !== 'navigate') return;\n  event.respondWith((async()=>{\n    const cache=await caches.open(CACHE);\n    if(url.pathname.startsWith(publicPath)) {\n      const cached=await cache.match(request);if(cached)return cached;\n      const response=await fetch(request);\n      if(response.ok && !/no-store|private/i.test(response.headers.get('Cache-Control')||'')) await cache.put(request,response.clone());\n      return response;\n    }\n    try { return await fetch(request); }\n    catch(error) {const fallback=await cache.match(offline);if(fallback)return fallback;throw error;}\n  })());\n});\n",
        },
        {
          label: "offline.html — precached fallback",
          language: "html",
          code: '<!doctype html><html lang="en"><meta charset="utf-8"><title>Offline</title><h1>Offline demo</h1></html>\n',
        },
      ],
      methods: [
        {
          name: "Headers — construct and manage fields",
          explanation:
            "Use Headers to create, read, replace, append, and delete HTTP fields. Header names are case-insensitive and normalized when enumerated.",
          note: "append adds to an existing value; use set for a single Authorization or Content-Type value.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
          examples: [
            {
              label: "Append, set, get, has, and delete",
              language: "javascript",
              code: '(async () => {\nconst headers = new Headers(); headers.append("Content-Type","application/json"); headers.set("Authorization","Bearer demo"); headers.set("X-Custom","temporary");\nconsole.log(headers.get("content-type"),headers.has("AUTHORIZATION"));\nheaders.delete("X-Custom"); console.log(headers.has("x-custom"));\n})().catch(error => { throw error; });',
            },
            {
              label: "Distinguish append from replacement",
              language: "javascript",
              code: '(async () => {\nconst headers = new Headers([["X-Demo","one"]]); headers.append("x-demo","two"); console.log(headers.get("X-Demo"));\nheaders.set("X-Demo","three"); console.log(headers.get("x-demo"));\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Send request headers",
          explanation:
            "Pass a Headers object, plain object, or pair list in fetch options. Use headers to declare formats, language preferences, and the authentication fields required by the API.",
          note: "Browser code cannot hide a privileged API secret; these tokens and keys are dummy fixture values. Cross-origin custom headers may trigger preflight.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
          examples: [
            {
              label: "Send format, auth, API key, and language fields",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch("echo",{headers:{Accept:"application/json",Authorization:"Bearer demo","X-API-Key":"demo-key","Accept-Language":"en-US"}});\nconst data=await response.json(); console.log(data.headers.accept,data.headers.authorization,data.headers["x-api-key"],data.headers["accept-language"]);\n})().catch(error => { throw error; });',
            },
            {
              label: "Use a pair list for a JSON POST",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch("echo",{method:"POST",headers:[["Content-Type","application/json"]],body:JSON.stringify({ok:true})});\nconst data=await response.json(); console.log(data.method,data.headers["content-type"],JSON.parse(data.body).ok);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Read and iterate response headers",
          explanation:
            "Use response.headers.get for specific fields and entries for enumeration. Missing or inaccessible fields return null.",
          note: "Cross-origin exposure rules filter this view; Set-Cookie is never readable through browser response headers.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
          examples: [
            {
              label: "Read response metadata",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch("headers"); console.log(response.headers.get("content-type"),response.headers.get("last-modified"),response.headers.get("x-visible")); await response.text();\n})().catch(error => { throw error; });',
            },
            {
              label: "Iterate selected fields",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch("headers");\nfor(const [key,value] of response.headers.entries()) if(key === "etag" || key === "x-visible") console.log(key,value);\nconsole.log(response.headers.get("missing")); await response.text();\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Browser-controlled and restricted headers",
          explanation:
            "Browsers retain control over fields such as Cookie and Host. Use credentials and browser cookie handling rather than attempting to write Cookie directly.",
          note: "User-Agent behavior varies: Chromium may drop a supplied value, so do not use it as a portable application header; use X-App-Version instead.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers",
          examples: [
            {
              label: "A request guard drops a manual Cookie header",
              language: "javascript",
              code: '(async () => {\nconst request=new Request(new URL("echo",location.href),{headers:{Cookie:"manual=1","X-App-Version":"1.0"}});\nconsole.log(request.headers.has("cookie"),request.headers.get("x-app-version"));\nconst response=await fetch(request); console.log((await response.json()).headers["x-app-version"]);\n})().catch(error => { throw error; });',
            },
            {
              label: "Set-Cookie cannot be read by browser JavaScript",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch("cookie",{credentials:"same-origin"}); console.log(response.headers.get("set-cookie")); await response.text();\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "AuthManager — authenticate and refresh once",
          explanation:
            "Attach the current token, refresh after a 401, and retry once with the new token. Use one shared refresh promise to avoid racing concurrent token rotations.",
          note: "This in-memory teaching client avoids persisting bearer tokens in localStorage. It accepts replayable bodies only, limits token use to the same origin, and injects a login callback; production session storage and CSRF policies depend on the app.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Refresh and retry with the rotated tokens",
              language: "javascript",
              code: '(async () => {\nclass AuthManager {\n  constructor({token=null,refreshToken=null,onLogin=()=>{}}={}) {this.token=token;this.refreshToken=refreshToken;this.onLogin=onLogin;this.refreshing=null;this.version=0;}\n  async makeAuthenticatedRequest(url,options={}) {\n    const target=new URL(url,location.href);if(target.origin!==location.origin)throw new Error("Use a trusted same-origin API");\n    const initial=this.token;\n    const send=()=>{const headers=new Headers(options.headers);if(this.token)headers.set("Authorization",\'Bearer \'+this.token);else headers.delete("Authorization");return fetch(target,{...options,headers});};\n    let response=await send();\n    if(response.status===401) {\n      await response.text();\n      if(this.token===initial && !await this.refreshAccessToken()) {this.logout();this.onLogin();throw new Error("Login required");}\n      response=await send();\n      if(response.status===401){await response.text();this.logout();this.onLogin();throw new Error("Login required");}\n    }\n    return response;\n  }\n  refreshAccessToken() {\n    if(this.refreshing)return this.refreshing;\n    const version=this.version;\n    this.refreshing=(async()=>{\n      if(!this.refreshToken)return false;\n      try {\n        const response=await fetch("refresh",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:this.refreshToken}),credentials:"omit"});\n        if(!response.ok){await response.text();return false;}\n        const data=await response.json();\n        if(version!==this.version || typeof data.accessToken!=="string" || typeof data.refreshToken!=="string")return false;\n        this.token=data.accessToken;this.refreshToken=data.refreshToken;return true;\n      }catch{return false;}\n    })().finally(()=>{this.refreshing=null;});\n    return this.refreshing;\n  }\n  logout(){this.version++;this.token=null;this.refreshToken=null;}\n}\nconst manager=new AuthManager({token:"expired",refreshToken:"refresh-demo"});\nconst response=await manager.makeAuthenticatedRequest("private"); console.log((await response.json()).authorized,manager.token,manager.refreshToken);\n})().catch(error => { throw error; });',
            },
            {
              label: "Share refresh across concurrent requests",
              language: "javascript",
              code: '(async () => {\nclass AuthManager {\n  constructor({token=null,refreshToken=null,onLogin=()=>{}}={}) {this.token=token;this.refreshToken=refreshToken;this.onLogin=onLogin;this.refreshing=null;this.version=0;}\n  async makeAuthenticatedRequest(url,options={}) {\n    const target=new URL(url,location.href);if(target.origin!==location.origin)throw new Error("Use a trusted same-origin API");\n    const initial=this.token;\n    const send=()=>{const headers=new Headers(options.headers);if(this.token)headers.set("Authorization",\'Bearer \'+this.token);else headers.delete("Authorization");return fetch(target,{...options,headers});};\n    let response=await send();\n    if(response.status===401) {\n      await response.text();\n      if(this.token===initial && !await this.refreshAccessToken()) {this.logout();this.onLogin();throw new Error("Login required");}\n      response=await send();\n      if(response.status===401){await response.text();this.logout();this.onLogin();throw new Error("Login required");}\n    }\n    return response;\n  }\n  refreshAccessToken() {\n    if(this.refreshing)return this.refreshing;\n    const version=this.version;\n    this.refreshing=(async()=>{\n      if(!this.refreshToken)return false;\n      try {\n        const response=await fetch("refresh",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:this.refreshToken}),credentials:"omit"});\n        if(!response.ok){await response.text();return false;}\n        const data=await response.json();\n        if(version!==this.version || typeof data.accessToken!=="string" || typeof data.refreshToken!=="string")return false;\n        this.token=data.accessToken;this.refreshToken=data.refreshToken;return true;\n      }catch{return false;}\n    })().finally(()=>{this.refreshing=null;});\n    return this.refreshing;\n  }\n  logout(){this.version++;this.token=null;this.refreshToken=null;}\n}\nconst manager=new AuthManager({token:"expired",refreshToken:"refresh-demo"});\nconst responses=await Promise.all([manager.makeAuthenticatedRequest("private"),manager.makeAuthenticatedRequest("private")]);\nconsole.log((await Promise.all(responses.map(response=>response.json()))).every(data=>data.authorized));\nconsole.log((await (await fetch("stats")).json()).refreshes);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "AuthManager refresh failure and logout",
          explanation:
            "Clear authentication state and invoke a supplied login action when refresh fails. Explicit logout clears both in-memory tokens and invalidates a pending refresh result.",
          note: "The local callback logs instead of navigating away; an app can inject its router or login redirect. Browser storage is not used by this example.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Handle an invalid refresh token",
              language: "javascript",
              code: '(async () => {\nclass AuthManager {\n  constructor({token=null,refreshToken=null,onLogin=()=>{}}={}) {this.token=token;this.refreshToken=refreshToken;this.onLogin=onLogin;this.refreshing=null;this.version=0;}\n  async makeAuthenticatedRequest(url,options={}) {\n    const target=new URL(url,location.href);if(target.origin!==location.origin)throw new Error("Use a trusted same-origin API");\n    const initial=this.token;\n    const send=()=>{const headers=new Headers(options.headers);if(this.token)headers.set("Authorization",\'Bearer \'+this.token);else headers.delete("Authorization");return fetch(target,{...options,headers});};\n    let response=await send();\n    if(response.status===401) {\n      await response.text();\n      if(this.token===initial && !await this.refreshAccessToken()) {this.logout();this.onLogin();throw new Error("Login required");}\n      response=await send();\n      if(response.status===401){await response.text();this.logout();this.onLogin();throw new Error("Login required");}\n    }\n    return response;\n  }\n  refreshAccessToken() {\n    if(this.refreshing)return this.refreshing;\n    const version=this.version;\n    this.refreshing=(async()=>{\n      if(!this.refreshToken)return false;\n      try {\n        const response=await fetch("refresh",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:this.refreshToken}),credentials:"omit"});\n        if(!response.ok){await response.text();return false;}\n        const data=await response.json();\n        if(version!==this.version || typeof data.accessToken!=="string" || typeof data.refreshToken!=="string")return false;\n        this.token=data.accessToken;this.refreshToken=data.refreshToken;return true;\n      }catch{return false;}\n    })().finally(()=>{this.refreshing=null;});\n    return this.refreshing;\n  }\n  logout(){this.version++;this.token=null;this.refreshToken=null;}\n}\nlet logins=0;const manager=new AuthManager({token:"expired",refreshToken:"bad",onLogin:()=>logins++});\ntry{await manager.makeAuthenticatedRequest("private");}catch(error){console.log(error.message,logins,manager.token,manager.refreshToken);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Logout and reject an untrusted destination",
              language: "javascript",
              code: '(async () => {\nclass AuthManager {\n  constructor({token=null,refreshToken=null,onLogin=()=>{}}={}) {this.token=token;this.refreshToken=refreshToken;this.onLogin=onLogin;this.refreshing=null;this.version=0;}\n  async makeAuthenticatedRequest(url,options={}) {\n    const target=new URL(url,location.href);if(target.origin!==location.origin)throw new Error("Use a trusted same-origin API");\n    const initial=this.token;\n    const send=()=>{const headers=new Headers(options.headers);if(this.token)headers.set("Authorization",\'Bearer \'+this.token);else headers.delete("Authorization");return fetch(target,{...options,headers});};\n    let response=await send();\n    if(response.status===401) {\n      await response.text();\n      if(this.token===initial && !await this.refreshAccessToken()) {this.logout();this.onLogin();throw new Error("Login required");}\n      response=await send();\n      if(response.status===401){await response.text();this.logout();this.onLogin();throw new Error("Login required");}\n    }\n    return response;\n  }\n  refreshAccessToken() {\n    if(this.refreshing)return this.refreshing;\n    const version=this.version;\n    this.refreshing=(async()=>{\n      if(!this.refreshToken)return false;\n      try {\n        const response=await fetch("refresh",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:this.refreshToken}),credentials:"omit"});\n        if(!response.ok){await response.text();return false;}\n        const data=await response.json();\n        if(version!==this.version || typeof data.accessToken!=="string" || typeof data.refreshToken!=="string")return false;\n        this.token=data.accessToken;this.refreshToken=data.refreshToken;return true;\n      }catch{return false;}\n    })().finally(()=>{this.refreshing=null;});\n    return this.refreshing;\n  }\n  logout(){this.version++;this.token=null;this.refreshToken=null;}\n}\nconst manager=new AuthManager({token:"access-fresh",refreshToken:"refresh-demo"});manager.logout();console.log(manager.token,manager.refreshToken);\ntry{await manager.makeAuthenticatedRequest(demoAPI+"private");}catch(error){console.log(error.message);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "withHeaders() — merge request defaults",
          explanation:
            "Create a fetch wrapper with reusable headers and per-call overrides. Normalize all HeadersInit forms with Headers rather than object spread.",
          note: "Header overrides are case-insensitive and defaults are copied for each request. This general wrapper should not contain authentication secrets for arbitrary URLs.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
          examples: [
            {
              label: "Reuse an API version and format preference",
              language: "javascript",
              code: '(async () => {\nfunction withHeaders(defaults) {\n  const initial=new Headers(defaults);\n  return (url,options={})=>{const headers=new Headers(initial);new Headers(options.headers).forEach((value,key)=>headers.set(key,value));return fetch(url,{...options,headers});};\n}\nconst api=withHeaders({"X-API-Version":"2.0",Accept:"application/json"}); const data=await (await api("echo")).json();console.log(data.headers["x-api-version"],data.headers.accept);\n})().catch(error => { throw error; });',
            },
            {
              label: "Override with Headers and pair arrays",
              language: "javascript",
              code: '(async () => {\nfunction withHeaders(defaults) {\n  const initial=new Headers(defaults);\n  return (url,options={})=>{const headers=new Headers(initial);new Headers(options.headers).forEach((value,key)=>headers.set(key,value));return fetch(url,{...options,headers});};\n}\nconst api=withHeaders({Accept:"application/json"});\nconsole.log((await (await api("echo",{headers:new Headers({accept:"text/plain"})})).json()).headers.accept);\nconsole.log((await (await api("echo",{headers:[["ACCEPT","application/custom"]]})).json()).headers.accept);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "mode: cors — readable cross-origin responses",
          explanation:
            "Use cors mode to let the browser enforce server-provided cross-origin permission. The server must opt in for JavaScript to read the response.",
          note: "cors is the fetch default; setting it on the client does not grant permission. The second local port is a genuinely different origin.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Read a permitted cross-origin response",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch(demoAPI+"echo",{mode:"cors",credentials:"omit"});console.log(response.type,response.ok,(await response.json()).method);\n})().catch(error => { throw error; });',
            },
            {
              label: "Read only exposed response fields",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch(demoAPI+"headers");console.log(response.headers.get("etag"),response.headers.get("x-visible"),response.headers.get("x-hidden"));await response.text();\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "mode: no-cors — opaque responses",
          explanation:
            "Cross-origin no-cors requests expose an opaque response to JavaScript. Use it only when the permitted request is useful without reading status, headers, or body.",
          note: "It does not bypass CORS for API data; allowed methods and writable request headers are restricted. Fulfillment does not confirm application-level success.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Observe an opaque response",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch(demoAPI+"blocked",{mode:"no-cors",credentials:"omit"});console.log(response.type,response.status,response.ok,await response.text());\n})().catch(error => { throw error; });',
            },
            {
              label: "Send a limited analytics-style POST",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch(demoAPI+"blocked",{mode:"no-cors",method:"POST",credentials:"omit",body:JSON.stringify({event:"demo_view"})});console.log(response.type,response.status);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "mode: same-origin — reject other origins",
          explanation:
            "Allow requests only when the destination shares the page’s origin. Use it to keep a request within the current site’s origin.",
          note: "Origin includes scheme, host, and port; the API on a second loopback port is cross-origin.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Fetch from the page origin",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch("echo",{mode:"same-origin"});console.log(response.type,(await response.json()).method);\n})().catch(error => { throw error; });',
            },
            {
              label: "Reject a different port",
              language: "javascript",
              code: '(async () => {\ntry{await fetch(demoAPI+"echo",{mode:"same-origin"});}catch(error){console.log(error instanceof TypeError);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "credentials — include, same-origin, or omit",
          explanation:
            "Choose whether browser-managed credentials such as cookies participate in a request. Use include for eligible cross-origin cookies and omit when the request should exclude them.",
          note: "include still obeys cookie policies and SameSite rules. Explicit Authorization headers are not automatically removed by credentials: omit; credentialed CORS requires a specific allowed origin plus Allow-Credentials.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Compare cookie inclusion across origins",
              language: "javascript",
              code: '(async () => {\nawait (await fetch("cookie")).text();\nconst included=await (await fetch(demoAPI+"echo",{credentials:"include"})).json();\nconst same=await (await fetch(demoAPI+"echo",{credentials:"same-origin"})).json();\nconsole.log(included.headers.cookie.includes("demoSession=yes"),Object.hasOwn(same.headers,"cookie"));\n})().catch(error => { throw error; });',
            },
            {
              label: "Omit cookies while retaining an explicit bearer header",
              language: "javascript",
              code: '(async () => {\nawait (await fetch("cookie")).text();\nconst data=await (await fetch("echo",{credentials:"omit",headers:{Authorization:"Bearer demo"}})).json();console.log(Object.hasOwn(data.headers,"cookie"),data.headers.authorization);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "CORS failure versus HTTP failure",
          explanation:
            "Catch rejected requests at the application boundary and check response.ok on readable responses. Browser JavaScript cannot reliably distinguish CORS rejection from other network failures by inspecting TypeError or its message.",
          note: "Use the browser network panel and server logs for the actual CORS diagnosis. A rejected request may still have reached the server.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Handle a server that omits CORS permission",
              language: "javascript",
              code: '(async () => {\ntry{await fetch(demoAPI+"blocked",{mode:"cors"});}catch(error){console.log(error instanceof TypeError);}\n})().catch(error => { throw error; });',
            },
            {
              label: "A readable HTTP error is a response",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch(demoAPI+"denied",{mode:"cors"});console.log(response.status,response.ok,(await response.json()).message);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Public, internal, and authenticated configurations",
          explanation:
            "Build request options for each API’s origin and authentication contract. Use an actual CSRF token source for cookie-authenticated writes instead of an undefined helper.",
          note: "This fixture’s CSRF value is illustrative and echoed rather than validated; a real server must validate it. Avoid unnecessary JSON Content-Type on bodyless public GETs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Public GET and internal JSON write",
              language: "javascript",
              code: '(async () => {\nconst publicConfig={mode:"cors",credentials:"omit",headers:{Accept:"application/json"}};\nconsole.log((await (await fetch(demoAPI+"echo",publicConfig)).json()).method);\nconst getCsrfToken=()=>"demo-csrf";\nconst internal={mode:"same-origin",credentials:"same-origin",method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":getCsrfToken()},body:"{}"};\nconsole.log((await (await fetch("echo",internal)).json()).headers["x-csrf-token"]);\n})().catch(error => { throw error; });',
            },
            {
              label: "Authenticated cross-origin request",
              language: "javascript",
              code: '(async () => {\nconst getToken=()=>"demo-access";\nconst config={mode:"cors",credentials:"include",headers:{Accept:"application/json",Authorization:"Bearer "+getToken()}};\nconst data=await (await fetch(demoAPI+"echo",config)).json();console.log(data.headers.authorization,data.preflights>0);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Preflight — the browser sends OPTIONS",
          explanation:
            "Custom headers, JSON Content-Type, or non-safelisted methods can trigger an automatic CORS preflight. Configure permission on the server and let the browser send OPTIONS.",
          note: "A header-name-only detector is insufficient: header values, method, and other rules matter. This demo records real preflights; it does not manually manufacture them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Trigger preflight with a custom header",
              language: "javascript",
              code: '(async () => {\nconst data=await (await fetch(demoAPI+"echo",{headers:{"X-Demo":"yes"}})).json();console.log(data.headers["x-demo"],data.preflights>0);\n})().catch(error => { throw error; });',
            },
            {
              label: "JSON Content-Type and PATCH also require permission",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch(demoAPI+"echo",{method:"PATCH",headers:{"Content-Type":"application/json"},body:"{}"});const data=await response.json();console.log(data.method,data.preflights>0);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "createProxy() — choose a development proxy route",
          explanation:
            "Use a JavaScript Proxy to build endpoint calls for a configured base URL. Development requests need a real server-side forwarding route; a client wrapper alone does not change CORS.",
          note: "This browser helper takes an explicit development option rather than reading process.env. The provided server forwards only to its fixed local demo API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Call the remote API directly",
              language: "javascript",
              code: '(async () => {\nfunction createProxy(baseURL,{development=false,proxyBase="proxy/"}={}) {\n  return new Proxy(Object.create(null),{get(_,endpoint){if(typeof endpoint!=="string" || endpoint==="then")return undefined;if(!/^[a-z][a-z0-9-]*$/i.test(endpoint))throw new TypeError("Use a simple endpoint name");return options=>fetch(new URL(endpoint,development?new URL(proxyBase,location.href):new URL(baseURL)),options);}});\n}\nconst api=createProxy(demoAPI);const response=await api.echo({method:"GET",credentials:"omit"});console.log((await response.json()).method);\n})().catch(error => { throw error; });',
            },
            {
              label: "Use the actual same-origin forwarding route",
              language: "javascript",
              code: '(async () => {\nfunction createProxy(baseURL,{development=false,proxyBase="proxy/"}={}) {\n  return new Proxy(Object.create(null),{get(_,endpoint){if(typeof endpoint!=="string" || endpoint==="then")return undefined;if(!/^[a-z][a-z0-9-]*$/i.test(endpoint))throw new TypeError("Use a simple endpoint name");return options=>fetch(new URL(endpoint,development?new URL(proxyBase,location.href):new URL(baseURL)),options);}});\n}\nconst api=createProxy(demoAPI,{development:true});const response=await api.echo({method:"GET"});console.log(response.type,(await response.json()).method);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "cache: default and no-cache",
          explanation:
            "default follows normal browser HTTP cache freshness rules; no-cache revalidates a stored response before reuse. Use no-cache when validation matters more than avoiding a network round trip.",
          note: "A browser-handled 304 can be combined with the stored body and exposed as a successful response; JavaScript need not see the raw 304.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Reuse a fresh HTTP cache entry",
              language: "javascript",
              code: '(async () => {\nconst first=await (await fetch("fresh?case=default",{cache:"reload"})).json();\nconst second=await (await fetch("fresh?case=default",{cache:"default"})).json();console.log(first.request===second.request,second.value);\n})().catch(error => { throw error; });',
            },
            {
              label: "Revalidate an existing representation",
              language: "javascript",
              code: '(async () => {\nconst first=await (await fetch("cache?case=revalidate",{cache:"reload"})).json();\nconst response=await fetch("cache?case=revalidate",{cache:"no-cache"});const second=await response.json();\nconsole.log(response.status,second.value,first.value===second.value);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "cache: reload and no-store",
          explanation:
            "reload bypasses lookup but can update the browser HTTP cache. no-store bypasses lookup and avoids storing the fetched response in that cache.",
          note: "They are different policies; reload does not mean that the response can never be cached afterward.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Reload gets a fresh response and updates cache",
              language: "javascript",
              code: '(async () => {\nconst a=await (await fetch("fresh?case=reload",{cache:"reload"})).json();\nconst b=await (await fetch("fresh?case=reload",{cache:"reload"})).json();\nconst c=await (await fetch("fresh?case=reload",{cache:"default"})).json();console.log(b.request>a.request,c.request===b.request);\n})().catch(error => { throw error; });',
            },
            {
              label: "No-store requests both reach the server",
              language: "javascript",
              code: '(async () => {\nconst a=await (await fetch("fresh?case=no-store",{cache:"no-store"})).json();\nconst b=await (await fetch("fresh?case=no-store",{cache:"no-store"})).json();console.log(b.request>a.request);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "cache: force-cache and only-if-cached",
          explanation:
            "force-cache can reuse a cached response even when stale, falling back to a network request on a miss. only-if-cached requests cache-only lookup and requires mode: same-origin.",
          note: "A browser cache-only miss may yield a 504 response or a network error. Treat both as a miss and provide an explicit fallback.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Reuse a stale stored response",
              language: "javascript",
              code: '(async () => {\nconst a=await (await fetch("cache?case=force",{cache:"reload"})).json();\nconst b=await (await fetch("cache?case=force",{cache:"force-cache"})).json();console.log(a.request===b.request);\n})().catch(error => { throw error; });',
            },
            {
              label: "Cache-only lookup and a defined miss fallback",
              language: "javascript",
              code: '(async () => {\nawait (await fetch("fresh?case=only",{cache:"reload"})).json();\nconst hit=await fetch("fresh?case=only",{cache:"only-if-cached",mode:"same-origin"});console.log(hit.ok,(await hit.json()).value);\nlet missed=false;try{const response=await fetch("fresh?missing="+crypto.randomUUID(),{cache:"only-if-cached",mode:"same-origin"});missed=response.status===504;}catch(error){if(!(error instanceof TypeError))throw error;missed=true;}console.log(missed);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Request cache headers and conditional requests",
          explanation:
            "Use Cache-Control request directives when required by the API, and validators for explicit conditional GETs. If-None-Match takes precedence over If-Modified-Since.",
          note: "Pragma: no-cache is a legacy directive. Use cache: no-store in the manual-validator demo to separate its stored data from the browser HTTP cache; handle raw 304 before response.ok.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Send explicit request cache directives",
              language: "javascript",
              code: '(async () => {\nconst response=await fetch("echo",{cache:"no-cache",headers:{"Cache-Control":"no-cache",Pragma:"no-cache"}});const data=await response.json();console.log(data.headers["cache-control"],data.headers.pragma);\n})().catch(error => { throw error; });',
            },
            {
              label: "Validate a saved ETag and timestamp",
              language: "javascript",
              code: '(async () => {\nconst first=await fetch("cache?case=conditional",{cache:"no-store"});const saved=await first.json();\nconst response=await fetch("cache?case=conditional",{cache:"no-store",headers:{"If-None-Match":first.headers.get("etag"),"If-Modified-Since":first.headers.get("last-modified")}});\nif(response.status!==304)throw new Error("Expected unchanged representation");console.log(response.status,saved.value);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "CachedFetcher — application-level TTL cache",
          explanation:
            "Store parsed public GET results with a timestamp and reuse them while fresh. Normalize URL and headers for keys and clone cached data before returning it.",
          note: "This deliberately narrow cache is separate from HTTP caching: it omits credentials, rejects Authorization, avoids Vary/private/no-store responses, and retains falsy JSON values. Clear it when application data changes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Hit a cache entry and protect it from mutation",
              language: "javascript",
              code: '(async () => {\nclass CachedFetcher {\n  constructor({now=Date.now}={}){this.cache=new Map();this.now=now;}\n  key(url,options){const headers=new Headers(options.headers);if((options.method||"GET").toUpperCase()!=="GET" || options.body!=null || headers.has("Authorization") || [...headers.keys()].some(key=>key!=="accept"))throw new TypeError("Cache public GETs with only Accept");return JSON.stringify([new URL(url,location.href).href,[...headers.entries()]]);}\n  async fetch(url,options={},ttl=60000){\n    if(!Number.isFinite(ttl)||ttl<0)throw new RangeError("Invalid TTL");\n    const key=this.key(url,options),entry=this.cache.get(key);\n    if(entry && this.now()-entry.time<ttl)return structuredClone(entry.data);\n    try {\n      const response=await fetch(url,{...options,credentials:"omit",cache:"no-store"});\n      if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;await response.text();throw error;}\n      const data=await response.json();\n      if(/no-store|private/i.test(response.headers.get("Cache-Control")||"") || response.headers.has("Vary")){this.cache.delete(key);return data;}\n      this.cache.set(key,{url:new URL(url,location.href).href,data:structuredClone(data),time:this.now()});return data;\n    }catch(error){if(options.signal?.aborted)throw error;if(entry && (error instanceof TypeError || error.status>=500))return structuredClone(entry.data);throw error;}\n  }\n  invalidate(url){const absolute=new URL(url,location.href).href;for(const [key,entry]of this.cache)if(entry.url===absolute)this.cache.delete(key);}\n  clear(){this.cache.clear();}\n}\nlet time=0;const client=new CachedFetcher({now:()=>time});const a=await client.fetch("cache?case=ttl");a.value="changed";const b=await client.fetch("cache?case=ttl");console.log(b.value,b.request===a.request);\ntime=60001;const c=await client.fetch("cache?case=ttl");console.log(c.request>b.request);\n})().catch(error => { throw error; });',
            },
            {
              label: "Cache falsy data and normalize header forms",
              language: "javascript",
              code: '(async () => {\nclass CachedFetcher {\n  constructor({now=Date.now}={}){this.cache=new Map();this.now=now;}\n  key(url,options){const headers=new Headers(options.headers);if((options.method||"GET").toUpperCase()!=="GET" || options.body!=null || headers.has("Authorization") || [...headers.keys()].some(key=>key!=="accept"))throw new TypeError("Cache public GETs with only Accept");return JSON.stringify([new URL(url,location.href).href,[...headers.entries()]]);}\n  async fetch(url,options={},ttl=60000){\n    if(!Number.isFinite(ttl)||ttl<0)throw new RangeError("Invalid TTL");\n    const key=this.key(url,options),entry=this.cache.get(key);\n    if(entry && this.now()-entry.time<ttl)return structuredClone(entry.data);\n    try {\n      const response=await fetch(url,{...options,credentials:"omit",cache:"no-store"});\n      if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;await response.text();throw error;}\n      const data=await response.json();\n      if(/no-store|private/i.test(response.headers.get("Cache-Control")||"") || response.headers.has("Vary")){this.cache.delete(key);return data;}\n      this.cache.set(key,{url:new URL(url,location.href).href,data:structuredClone(data),time:this.now()});return data;\n    }catch(error){if(options.signal?.aborted)throw error;if(entry && (error instanceof TypeError || error.status>=500))return structuredClone(entry.data);throw error;}\n  }\n  invalidate(url){const absolute=new URL(url,location.href).href;for(const [key,entry]of this.cache)if(entry.url===absolute)this.cache.delete(key);}\n  clear(){this.cache.clear();}\n}\nconst client=new CachedFetcher();console.log(await client.fetch("cache?zero=true",{headers:{Accept:"application/json"}}));\nconsole.log(await client.fetch("cache?zero=true",{headers:new Headers({accept:"application/json"})}));\nconsole.log(client.cache.size);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "CachedFetcher stale fallback and invalidation",
          explanation:
            "Return stale public data only for selected server or network failures, and remove entries with exact URL matching. Use clear to discard the whole application cache.",
          note: "Do not use stale data to hide authentication failures, invalid JSON, or cancellation. The helper returns clones so callers cannot mutate stored data.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Use stale data after a server failure",
              language: "javascript",
              code: '(async () => {\nclass CachedFetcher {\n  constructor({now=Date.now}={}){this.cache=new Map();this.now=now;}\n  key(url,options){const headers=new Headers(options.headers);if((options.method||"GET").toUpperCase()!=="GET" || options.body!=null || headers.has("Authorization") || [...headers.keys()].some(key=>key!=="accept"))throw new TypeError("Cache public GETs with only Accept");return JSON.stringify([new URL(url,location.href).href,[...headers.entries()]]);}\n  async fetch(url,options={},ttl=60000){\n    if(!Number.isFinite(ttl)||ttl<0)throw new RangeError("Invalid TTL");\n    const key=this.key(url,options),entry=this.cache.get(key);\n    if(entry && this.now()-entry.time<ttl)return structuredClone(entry.data);\n    try {\n      const response=await fetch(url,{...options,credentials:"omit",cache:"no-store"});\n      if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;await response.text();throw error;}\n      const data=await response.json();\n      if(/no-store|private/i.test(response.headers.get("Cache-Control")||"") || response.headers.has("Vary")){this.cache.delete(key);return data;}\n      this.cache.set(key,{url:new URL(url,location.href).href,data:structuredClone(data),time:this.now()});return data;\n    }catch(error){if(options.signal?.aborted)throw error;if(entry && (error instanceof TypeError || error.status>=500))return structuredClone(entry.data);throw error;}\n  }\n  invalidate(url){const absolute=new URL(url,location.href).href;for(const [key,entry]of this.cache)if(entry.url===absolute)this.cache.delete(key);}\n  clear(){this.cache.clear();}\n}\nconst client=new CachedFetcher();const a=await client.fetch("cache?case=stale");await (await fetch("toggle?fail=true")).json();const b=await client.fetch("cache?case=stale",{},0);console.log(b.value,b.request===a.request);\ntry{await client.fetch("denied");}catch(error){console.log(error.message);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Invalidate one URL and clear everything",
              language: "javascript",
              code: '(async () => {\nclass CachedFetcher {\n  constructor({now=Date.now}={}){this.cache=new Map();this.now=now;}\n  key(url,options){const headers=new Headers(options.headers);if((options.method||"GET").toUpperCase()!=="GET" || options.body!=null || headers.has("Authorization") || [...headers.keys()].some(key=>key!=="accept"))throw new TypeError("Cache public GETs with only Accept");return JSON.stringify([new URL(url,location.href).href,[...headers.entries()]]);}\n  async fetch(url,options={},ttl=60000){\n    if(!Number.isFinite(ttl)||ttl<0)throw new RangeError("Invalid TTL");\n    const key=this.key(url,options),entry=this.cache.get(key);\n    if(entry && this.now()-entry.time<ttl)return structuredClone(entry.data);\n    try {\n      const response=await fetch(url,{...options,credentials:"omit",cache:"no-store"});\n      if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;await response.text();throw error;}\n      const data=await response.json();\n      if(/no-store|private/i.test(response.headers.get("Cache-Control")||"") || response.headers.has("Vary")){this.cache.delete(key);return data;}\n      this.cache.set(key,{url:new URL(url,location.href).href,data:structuredClone(data),time:this.now()});return data;\n    }catch(error){if(options.signal?.aborted)throw error;if(entry && (error instanceof TypeError || error.status>=500))return structuredClone(entry.data);throw error;}\n  }\n  invalidate(url){const absolute=new URL(url,location.href).href;for(const [key,entry]of this.cache)if(entry.url===absolute)this.cache.delete(key);}\n  clear(){this.cache.clear();}\n}\nconst client=new CachedFetcher();await client.fetch("cache?one");await client.fetch("cache?two");client.invalidate("cache?one");console.log(client.cache.size);client.clear();console.log(client.cache.size);\ntry{await client.fetch("cache",{headers:{Authorization:"Bearer demo"}});}catch(error){console.log(error instanceof TypeError);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "ETagCache — reuse a validated representation",
          explanation:
            "Save a public JSON representation with its ETag and send If-None-Match on later requests. Return the saved representation when a raw 304 indicates no change.",
          note: "This manual cache uses no-store to avoid interference from browser HTTP-cache merging. A later response without an ETag replaces the entry and removes the obsolete validator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Reuse data after a genuine 304",
              language: "javascript",
              code: '(async () => {\nclass ETagCache {\n  constructor(){this.entries=new Map();}\n  async fetch(url){const key=new URL(url,location.href).href,entry=this.entries.get(key);const headers=new Headers({Accept:"application/json"});if(entry?.etag)headers.set("If-None-Match",entry.etag);\n    const response=await fetch(key,{headers,credentials:"omit",cache:"no-store"});\n    if(response.status===304){if(!entry)throw new Error("304 without saved representation");return structuredClone(entry.data);}\n    if(!response.ok)throw new Error(\'HTTP \'+response.status);\n    const data=await response.json(),tag=response.headers.get("etag");\n    if(/no-store|private/i.test(response.headers.get("Cache-Control")||"")||response.headers.has("Vary")){this.entries.delete(key);return data;}\n    this.entries.set(key,{etag:tag,data:structuredClone(data)});return data;\n  }\n}\nconst client=new ETagCache();const a=await client.fetch("cache?case=etag");const b=await client.fetch("cache?case=etag");console.log(a.value,b.value,a.request===b.request);\n})().catch(error => { throw error; });',
            },
            {
              label: "Drop a validator when the server stops sending it",
              language: "javascript",
              code: '(async () => {\nclass ETagCache {\n  constructor(){this.entries=new Map();}\n  async fetch(url){const key=new URL(url,location.href).href,entry=this.entries.get(key);const headers=new Headers({Accept:"application/json"});if(entry?.etag)headers.set("If-None-Match",entry.etag);\n    const response=await fetch(key,{headers,credentials:"omit",cache:"no-store"});\n    if(response.status===304){if(!entry)throw new Error("304 without saved representation");return structuredClone(entry.data);}\n    if(!response.ok)throw new Error(\'HTTP \'+response.status);\n    const data=await response.json(),tag=response.headers.get("etag");\n    if(/no-store|private/i.test(response.headers.get("Cache-Control")||"")||response.headers.has("Vary")){this.entries.delete(key);return data;}\n    this.entries.set(key,{etag:tag,data:structuredClone(data)});return data;\n  }\n}\nconst client=new ETagCache();await client.fetch("cache?case=drop-tag");await (await fetch("toggle?etag=false")).json();await client.fetch("cache?case=drop-tag");console.log(client.entries.get(new URL("cache?case=drop-tag",location.href).href).etag);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Service-worker registration and cache-first reads",
          explanation:
            "Register the provided sw.js, wait for control, and let it cache successful public GET responses. Use a dedicated scope and cache name so examples do not affect the cheat sheet.",
          note: "Requires HTTPS or loopback localhost. Cache Storage is separate from the HTTP cache; this worker caches only its public/ fixture path and precaches a real offline page.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers",
          examples: [
            {
              label: "Register and reuse a public asset",
              language: "javascript",
              code: '(async () => {\nconst registration=await navigator.serviceWorker.register("sw.js",{scope:"./"});\nawait navigator.serviceWorker.ready;\nif(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener("controllerchange",resolve,{once:true}));\nconst a=await (await fetch("public/asset")).json();const b=await (await fetch("public/asset")).json();console.log(Boolean(registration.active),a.request===b.request,b.value);\n})().catch(error => { throw error; });',
            },
            {
              label: "Read the explicitly precached fallback",
              language: "javascript",
              code: '(async () => {\nconst registration=await navigator.serviceWorker.register("sw.js",{scope:"./"});\nawait navigator.serviceWorker.ready;\nif(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener("controllerchange",resolve,{once:true}));\nconst cache=await caches.open("fetch-config-v1:"+registration.scope);const response=await cache.match(new URL("offline.html",registration.scope).href);console.log(response.ok,(await response.text()).includes("Offline demo"));\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Service-worker offline navigation and cleanup",
          explanation:
            "Return the precached offline document when a navigation fails at the network layer. Unregister and delete the named cache when finished with the demo.",
          note: "HTTP error responses are still network responses; this fallback is for rejected navigations. Unregistering does not immediately remove a controller from an already open document; reload or close it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers",
          examples: [
            {
              label: "Navigate a frame to a deliberately unavailable route",
              language: "javascript",
              code: '(async () => {\nconst registration=await navigator.serviceWorker.register("sw.js",{scope:"./"});\nawait navigator.serviceWorker.ready;\nif(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener("controllerchange",resolve,{once:true}));\nconst frame=document.createElement("iframe");frame.src="offline-page";const loaded=new Promise(resolve=>frame.addEventListener("load",resolve,{once:true}));document.body.append(frame);await loaded;console.log(frame.contentDocument.querySelector("h1").textContent);frame.remove();\n})().catch(error => { throw error; });',
            },
            {
              label: "Unregister and delete only this demo cache",
              language: "javascript",
              code: '(async () => {\nconst registration=await navigator.serviceWorker.register("sw.js",{scope:"./"});\nawait navigator.serviceWorker.ready;\nif(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener("controllerchange",resolve,{once:true}));\nconsole.log(await registration.unregister());console.log(await caches.delete("fetch-config-v1:"+registration.scope));\n})().catch(error => { throw error; });',
            },
          ],
        },
      ],
    },
    {
      name: "Response Handling",
      id: "response-handling",
      intro: [
        "Response body readers → dynamic parsing and streaming → errors, deadlines, and retries, following all six images. Run each snippet independently in the browser console of the dedicated local fixture below.",
        "Copy response-server.mjs and index.html into a new temporary folder, run node response-server.mjs (Node.js 22+), and open http://127.0.0.1:3200/. The fixture supplies real body formats, split UTF-8/NDJSON chunks, delayed headers and bodies, and deliberate failures. Download examples create links without automatically saving files.",
      ],
      setup: [
        {
          label: "response-server.mjs — response and failure fixture",
          language: "javascript",
          code: "import {createServer} from 'node:http';\nimport {readFile} from 'node:fs/promises';\nimport {pathToFileURL} from 'node:url';\nexport function createResponseServer(servePage=()=>readFile(new URL('index.html',import.meta.url))) {\n  const counts=new Map();\n  return createServer(async(req,res)=>{\n    try{\n      const url=new URL(req.url,'http://localhost');const match=url.pathname.match(/^(\\/case\\/\\d+)?\\/(.*)$/);const scope=match?.[1]||'',route=match?.[2]||'';\n      res.setHeader('Cache-Control','no-store');\n      const send=(status,type,body)=>{res.writeHead(status,{'Content-Type':type});res.end(body);};\n      const json=(status,data)=>send(status,'application/json',JSON.stringify(data));\n      if(!route || route.endsWith('index.html'))return send(200,'text/html',await servePage(url.pathname));\n      if(route==='stats')return json(200,Object.fromEntries([...counts].filter(([key])=>key.startsWith(scope+'|')).map(([key,value])=>[key.slice(scope.length+1),value])));\n      counts.set(scope+'|'+route,(counts.get(scope+'|'+route)||0)+1);\n      if(route==='drop'){req.socket.destroy();return;}\n      if(route==='data')return json(200,{message:'hello',value:42});\n      if(route==='text')return send(200,'text/plain; charset=utf-8','Hello 😀');\n      if(route==='html')return send(200,'text/html; charset=utf-8','<h1>Demo</h1>');\n      if(route==='image')return send(200,'image/png',Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6l8AAAAASUVORK5CYII=','base64'));\n      if(route==='binary')return send(200,'application/octet-stream',Buffer.from([1,2,3,255]));\n      if(route==='unknown')return send(200,'application/x-demo','demo');\n      if(route==='pdf')return send(200,'application/pdf','%PDF-1.4\\n% demonstration bytes, not a rendered document\\n%%EOF');\n      if(route==='form'){const form=new FormData();form.append('name','John');form.append('tag','one');form.append('tag','two');const encoded=new Response(form);res.writeHead(200,{'Content-Type':encoded.headers.get('content-type')});res.end(Buffer.from(await encoded.arrayBuffer()));return;}\n      if(route==='url-form')return send(200,'application/x-www-form-urlencoded','name=Jane&tag=one&tag=two');\n      if(route==='bad-json')return send(200,'application/json','{broken');\n      if(route==='suffix-json')return send(200,'application/problem+json; charset=utf-8',JSON.stringify({message:'details'}));\n      if(route==='empty') {res.writeHead(204);res.end();return;}\n      if(route==='slow'){const timer=setTimeout(()=>json(200,{done:true}),150);res.on('close',()=>clearTimeout(timer));return;}\n      if(route==='slow-body'){res.writeHead(200,{'Content-Type':'application/json'});res.flushHeaders();const timer=setTimeout(()=>res.end('{\"done\":true}'),150);res.on('close',()=>clearTimeout(timer));return;}\n      if(route==='retry'){const count=counts.get(scope+'|'+route);return count===1?json(503,{message:'try again'}):json(200,{done:true});}\n      if(route==='retry-after'){res.setHeader('Retry-After','0');return json(429,{message:'rate limited'});}\n      if(route==='status/422')return json(422,{errors:{email:'Invalid email'}});\n      if(/^status\\/\\d+$/.test(route)){const status=Number(route.split('/')[1]);return json(status,{message:'Demo failure'});}\n      if(route==='download' || route==='download-unknown'){\n        const bytes=Buffer.from('download demo');res.writeHead(200,{'Content-Type':'application/octet-stream',...(route==='download'?{'Content-Length':String(bytes.length)}:{})});res.write(bytes.subarray(0,4));const timer=setTimeout(()=>res.end(bytes.subarray(4)),15);res.on('close',()=>clearTimeout(timer));return;\n      }\n      if(route==='ndjson' || route==='bad-ndjson'){\n        const text=route==='ndjson'?'{\"id\":1,\"text\":\"😀\"}\\r\\n{\"id\":2,\"text\":\"last\"}':'{\"id\":1}\\n{broken}\\n';\n        const bytes=Buffer.from(text);const emoji=bytes.indexOf(Buffer.from('😀'));const split=emoji>=0?emoji+1:5;\n        res.writeHead(200,{'Content-Type':'application/x-ndjson'});res.write(bytes.subarray(0,split));const timer=setTimeout(()=>res.end(bytes.subarray(split)),15);res.on('close',()=>clearTimeout(timer));return;\n      }\n      return json(404,{message:'Missing route'});\n    }catch(error){if(!res.headersSent)res.writeHead(500,{'Content-Type':'text/plain'});res.end(error.message);}\n  });\n}\nif(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href)createResponseServer().listen(3200,'127.0.0.1',()=>console.log('Open http://127.0.0.1:3200/ and use the console'));\n",
        },
        {
          label: "index.html — dedicated console page",
          language: "html",
          code: '<!doctype html><html lang="en"><meta charset="utf-8"><title>Response handling</title><h1>Response handling</h1><p>Open the console and run one example.</p></html>',
        },
      ],
      methods: [
        {
          name: "response.json() — parse JSON",
          explanation:
            "Consumes the body and resolves to the parsed JavaScript value. Use it when the API contract specifies JSON.",
          note: "HTTP success and valid JSON are separate checks; json does not validate application data shape or require a JSON Content-Type.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/json",
          examples: [
            {
              label: "Read a successful JSON object",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\nconst response=await checked(\"data\");const data=await response.json();console.log(data.message,data.value);\n})().catch(error => { throw error; });",
            },
            {
              label: "Handle malformed JSON",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\ntry{await (await checked(\"bad-json\")).json();}catch(error){console.log(error instanceof SyntaxError);}\n})().catch(error => { throw error; });",
            },
          ],
        },
        {
          name: "response.text() — decode text",
          explanation:
            "Consumes the body and resolves to decoded text. Use it for plain text or markup that you intend to inspect as a string.",
          note: "Reading HTML as text does not execute it; choose safe DOM insertion methods if displaying untrusted content.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/text",
          examples: [
            {
              label: "Read UTF-8 text",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\nconsole.log(await (await checked(\"text\")).text());\n})().catch(error => { throw error; });",
            },
            {
              label: "Read markup without executing it",
              language: "javascript",
              code: '(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error(\'HTTP \'+response.status);return response;}\nconst markup=await (await checked("html")).text();const pre=document.createElement("pre");pre.textContent=markup;console.log(pre.textContent,pre.querySelector("h1")===null);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "response.blob() and object URLs",
          explanation:
            "Read binary data as a Blob and create an object URL when a browser element needs a URL. Revoke it after the consumer is finished.",
          note: "Revoking too early can interrupt use; a retained display or download link must keep its URL until it is removed or replaced.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/blob",
          examples: [
            {
              label: "Load an image and release its URL",
              language: "javascript",
              code: '(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error(\'HTTP \'+response.status);return response;}\nconst blob=await (await checked("image")).blob();const url=URL.createObjectURL(blob);const image=new Image();\ntry{image.src=url;await image.decode();console.log(blob.type,image.naturalWidth,image.naturalHeight);}finally{image.src="";URL.revokeObjectURL(url);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Read binary bytes through a Blob",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\nconst blob=await (await checked(\"binary\")).blob();console.log(blob.type,blob.size,...new Uint8Array(await blob.arrayBuffer()));\n})().catch(error => { throw error; });",
            },
          ],
        },
        {
          name: "response.formData() — parse encoded fields",
          explanation:
            "Parses multipart/form-data or URL-encoded response bodies into FormData. Use getAll for repeated field names.",
          note: "The response media type must be supported, and multipart content must include its matching boundary.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/formData",
          examples: [
            {
              label: "Read a real multipart response",
              language: "javascript",
              code: '(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error(\'HTTP \'+response.status);return response;}\nconst form=await (await checked("form")).formData();console.log(form.get("name"),...form.getAll("tag"));\n})().catch(error => { throw error; });',
            },
            {
              label: "Read URL-encoded fields",
              language: "javascript",
              code: '(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error(\'HTTP \'+response.status);return response;}\nconst form=await (await checked("url-form")).formData();console.log(form.get("name"),form.getAll("tag").length);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "response.arrayBuffer() — raw bytes",
          explanation:
            "Consumes the body as an ArrayBuffer. Use typed arrays or DataView to interpret the downloaded bytes.",
          note: "This buffers the whole body; byte order and binary schema remain the application’s responsibility.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer",
          examples: [
            {
              label: "Inspect downloaded bytes",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\nconst buffer=await (await checked(\"binary\")).arrayBuffer();console.log(buffer.byteLength,...new Uint8Array(buffer));\n})().catch(error => { throw error; });",
            },
            {
              label: "Read explicit big-endian values",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\nconst buffer=await (await checked(\"binary\")).arrayBuffer();const view=new DataView(buffer);console.log(view.getUint16(0,false),view.getUint16(2,false));\n})().catch(error => { throw error; });",
            },
          ],
        },
        {
          name: "response.clone() and bodyUsed",
          explanation:
            "Clone a response before consuming its body when two independent readers are required. Use bodyUsed to observe whether consumption has begun.",
          note: "Clone tees the stream and may buffer unread data for a slower branch. Avoid cloning large responses casually; consumed or locked bodies cannot be cloned.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/clone",
          examples: [
            {
              label: "Read JSON and original text separately",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\nconst response=await checked(\"data\");const clone=response.clone();console.log(response.bodyUsed);const data=await response.json();const text=await clone.text();console.log(data.value,JSON.parse(text).value,response.bodyUsed);\n})().catch(error => { throw error; });",
            },
            {
              label: "Reject repeated reads and late cloning",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\nconst response=await checked(\"data\");await response.json();try{await response.text();}catch(error){console.log(error instanceof TypeError);}\ntry{response.clone();}catch(error){console.log(error instanceof TypeError);}\n})().catch(error => { throw error; });",
            },
          ],
        },
        {
          name: "parseResponse() — choose a body reader",
          explanation:
            "Normalize the media type and select JSON, text, FormData, or binary parsing. Return a PDF File when a named file object is useful.",
          note: "Returns image Blobs rather than unmanaged object URLs; callers own any URLs they create. The PDF fixture contains demonstration bytes rather than a rendered PDF document.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Response",
          examples: [
            {
              label: "Parse JSON suffix types, HTML, and form fields",
              language: "javascript",
              code: '(async () => {\nasync function parseResponse(response){\n  if(!response.ok)throw new Error(\'HTTP \'+response.status);\n  if(response.status===204 || response.status===205)return null;\n  const type=(response.headers.get("Content-Type")||"").split(";")[0].trim().toLowerCase();\n  if(type==="application/json" || type.endsWith("+json"))return response.json();\n  if(type.startsWith("text/"))return response.text();\n  if(type==="multipart/form-data" || type==="application/x-www-form-urlencoded")return response.formData();\n  const blob=await response.blob();\n  return type==="application/pdf"?new File([blob],"document.pdf",{type}):blob;\n}\nconsole.log((await parseResponse(await fetch("suffix-json"))).message);console.log(await parseResponse(await fetch("html")));console.log((await parseResponse(await fetch("form"))).get("name"));\n})().catch(error => { throw error; });',
            },
            {
              label: "Parse images, PDF bytes, and unknown media",
              language: "javascript",
              code: '(async () => {\nasync function parseResponse(response){\n  if(!response.ok)throw new Error(\'HTTP \'+response.status);\n  if(response.status===204 || response.status===205)return null;\n  const type=(response.headers.get("Content-Type")||"").split(";")[0].trim().toLowerCase();\n  if(type==="application/json" || type.endsWith("+json"))return response.json();\n  if(type.startsWith("text/"))return response.text();\n  if(type==="multipart/form-data" || type==="application/x-www-form-urlencoded")return response.formData();\n  const blob=await response.blob();\n  return type==="application/pdf"?new File([blob],"document.pdf",{type}):blob;\n}\nconst image=await parseResponse(await fetch("image"));const pdf=await parseResponse(await fetch("pdf"));const unknown=await parseResponse(await fetch("unknown"));\nconsole.log(image instanceof Blob,image.type,pdf instanceof File,pdf.name,unknown.type);console.log(await parseResponse(await fetch("empty")));\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "downloadFile() — streamed download progress",
          explanation:
            "Read response chunks while reporting received byte counts, then expose a downloadable Blob link. Dispose the link and its object URL after the user is finished.",
          note: "This helper buffers chunks for the final Blob, so it is not a memory-saving disk stream. Content-Length can be missing or refer to encoded bytes; the helper omits percentage when the total is unsuitable and does not auto-click the link.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader",
          examples: [
            {
              label: "Track a known-length download",
              language: "javascript",
              code: '(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error(\'HTTP \'+response.status);return response;}\nasync function downloadFile(url,filename,{onProgress=()=>{},signal}={}){\n  const response=await checked(url,{signal});if(!response.body)throw new Error("Missing response stream");\n  const length=response.headers.get("Content-Length");const encoded=response.headers.get("Content-Encoding");\n  const total=length!==null && !encoded && Number.isSafeInteger(Number(length)) && Number(length)>0?Number(length):null;\n  const reader=response.body.getReader();const chunks=[];let received=0,complete=false;\n  try{while(true){const {done,value}=await reader.read();if(done){complete=true;break;}chunks.push(value);received+=value.byteLength;onProgress({received,total,percent:total===null?null:received/total*100});}}\n  finally{if(!complete)await reader.cancel().catch(()=>{});reader.releaseLock();}\n  const blob=new Blob(chunks,{type:response.headers.get("Content-Type")||"application/octet-stream"});\n  const objectURL=URL.createObjectURL(blob),link=document.createElement("a");link.href=objectURL;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);\n  return {blob,received,link,dispose(){link.remove();URL.revokeObjectURL(objectURL);}};\n}\nconst progress=[];const file=await downloadFile("download","demo.bin",{onProgress:state=>progress.push(state)});try{console.log(file.received,file.blob.size,file.link.download,progress.at(-1).percent);}finally{file.dispose();}\n})().catch(error => { throw error; });',
            },
            {
              label: "Handle an unknown total and release the link",
              language: "javascript",
              code: '(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error(\'HTTP \'+response.status);return response;}\nasync function downloadFile(url,filename,{onProgress=()=>{},signal}={}){\n  const response=await checked(url,{signal});if(!response.body)throw new Error("Missing response stream");\n  const length=response.headers.get("Content-Length");const encoded=response.headers.get("Content-Encoding");\n  const total=length!==null && !encoded && Number.isSafeInteger(Number(length)) && Number(length)>0?Number(length):null;\n  const reader=response.body.getReader();const chunks=[];let received=0,complete=false;\n  try{while(true){const {done,value}=await reader.read();if(done){complete=true;break;}chunks.push(value);received+=value.byteLength;onProgress({received,total,percent:total===null?null:received/total*100});}}\n  finally{if(!complete)await reader.cancel().catch(()=>{});reader.releaseLock();}\n  const blob=new Blob(chunks,{type:response.headers.get("Content-Type")||"application/octet-stream"});\n  const objectURL=URL.createObjectURL(blob),link=document.createElement("a");link.href=objectURL;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);\n  return {blob,received,link,dispose(){link.remove();URL.revokeObjectURL(objectURL);}};\n}\nconst progress=[];const file=await downloadFile("download-unknown","demo.bin",{onProgress:state=>progress.push(state)});const url=file.link.href;file.dispose();console.log(progress.at(-1).total,progress.at(-1).percent,file.link.isConnected,url.startsWith("blob:"));\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "processStream() — incremental JSON lines",
          explanation:
            "Retain incomplete text between chunks and parse only complete NDJSON lines, including the final unterminated line. Use streaming TextDecoder state to preserve UTF-8 characters split across byte chunks.",
          note: "Malformed complete lines reject instead of being silently discarded. Records are delivered incrementally without accumulating the full response; callbacks can be async and partial results may already have been delivered when an error occurs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams",
          examples: [
            {
              label: "Parse split UTF-8 and a final line without newline",
              language: "javascript",
              code: '(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error(\'HTTP \'+response.status);return response;}\nasync function processStream(url,onRecord,{signal,maxLineLength=100000}={}){\n  const response=await checked(url,{signal});if(!response.body)throw new Error("Missing response stream");\n  const reader=response.body.getReader(),decoder=new TextDecoder("utf-8",{fatal:true});let pending="",complete=false,count=0;\n  const emit=async line=>{if(line.endsWith("\\r"))line=line.slice(0,-1);if(line.trim()){await onRecord(JSON.parse(line));count++;}};\n  try{\n    while(true){const {done,value}=await reader.read();if(done){pending+=decoder.decode();complete=true;break;}\n      pending+=decoder.decode(value,{stream:true});let newline;\n      while((newline=pending.indexOf("\\n"))!==-1){if(newline>maxLineLength)throw new Error("Line too long");const line=pending.slice(0,newline);pending=pending.slice(newline+1);await emit(line);}\n      if(pending.length>maxLineLength)throw new Error("Line too long");\n    }\n    if(pending.length>maxLineLength)throw new Error("Line too long");await emit(pending);return count;\n  }finally{if(!complete)await reader.cancel().catch(()=>{});reader.releaseLock();}\n}\nconst records=[];const count=await processStream("ndjson",record=>records.push(record));console.log(count,records[0].text,records[1].text);\n})().catch(error => { throw error; });',
            },
            {
              label: "Reject malformed lines while retaining prior deliveries",
              language: "javascript",
              code: '(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error(\'HTTP \'+response.status);return response;}\nasync function processStream(url,onRecord,{signal,maxLineLength=100000}={}){\n  const response=await checked(url,{signal});if(!response.body)throw new Error("Missing response stream");\n  const reader=response.body.getReader(),decoder=new TextDecoder("utf-8",{fatal:true});let pending="",complete=false,count=0;\n  const emit=async line=>{if(line.endsWith("\\r"))line=line.slice(0,-1);if(line.trim()){await onRecord(JSON.parse(line));count++;}};\n  try{\n    while(true){const {done,value}=await reader.read();if(done){pending+=decoder.decode();complete=true;break;}\n      pending+=decoder.decode(value,{stream:true});let newline;\n      while((newline=pending.indexOf("\\n"))!==-1){if(newline>maxLineLength)throw new Error("Line too long");const line=pending.slice(0,newline);pending=pending.slice(newline+1);await emit(line);}\n      if(pending.length>maxLineLength)throw new Error("Line too long");\n    }\n    if(pending.length>maxLineLength)throw new Error("Line too long");await emit(pending);return count;\n  }finally{if(!complete)await reader.cancel().catch(()=>{});reader.releaseLock();}\n}\nconst records=[];try{await processStream("bad-ndjson",record=>records.push(record));}catch(error){console.log(error instanceof SyntaxError,records.length,records[0].id);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Basic failures — HTTP, parsing, and network errors",
          explanation:
            "Check HTTP success explicitly, then handle body parsing separately from transport failure. Catch at a boundary that can report a useful outcome.",
          note: "Fetch can reject for cancellation, invalid request configuration, and browser policy failures as well as network problems. TypeError alone does not identify a network outage.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Convert a readable HTTP error into an application error",
              language: "javascript",
              code: "(async () => {\nasync function checked(url,options){const response=await fetch(url,options);if(!response.ok)throw new Error('HTTP '+response.status);return response;}\ntry{await checked(\"status/404\");}catch(error){console.log(error.message);}\n})().catch(error => { throw error; });",
            },
            {
              label: "Observe transport rejection and JSON parse rejection",
              language: "javascript",
              code: '(async () => {\ntry{await fetch("drop");}catch(error){console.log(error instanceof TypeError);}\ntry{const response=await fetch("bad-json");await response.json();}catch(error){console.log(error instanceof SyntaxError);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Handle specific response statuses",
          explanation:
            "Map expected HTTP statuses into application results or errors. Accept the successful status range rather than treating only 200 as success.",
          note: "204 and 205 have no body; statusText can be empty and is not a reliable application error message.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/status",
          examples: [
            {
              label: "Handle empty success and named failures",
              language: "javascript",
              code: '(async () => {\nasync function readStatus(response){\n  if(response.status===204 || response.status===205)return null;\n  if(response.ok)return response.json();\n  const labels={400:"Bad request",401:"Unauthorized",404:"Not found",500:"Server error"};\n  await response.text();throw new Error(labels[response.status]||\'Unexpected status: \'+response.status);\n}\nconsole.log(await readStatus(await fetch("empty")));for(const status of [400,401,404,500]){try{await readStatus(await fetch("status/"+status));}catch(error){console.log(error.message);}}\n})().catch(error => { throw error; });',
            },
            {
              label: "Report an unexpected failure without a missing branch",
              language: "javascript",
              code: '(async () => {\nasync function readStatus(response){\n  if(response.status===204 || response.status===205)return null;\n  if(response.ok)return response.json();\n  const labels={400:"Bad request",401:"Unauthorized",404:"Not found",500:"Server error"};\n  await response.text();throw new Error(labels[response.status]||\'Unexpected status: \'+response.status);\n}\nconsole.log((await readStatus(await fetch("data"))).value);try{await readStatus(await fetch("status/409"));}catch(error){console.log(error.message);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "AbortSignal.timeout() — bound request and body time",
          explanation:
            "Pass a timeout signal to fetch and retain it while consuming the body. Use the TimeoutError reason to distinguish this deadline from caller cancellation.",
          note: "The timeout measures active time, and body reads can fail after fetch has already resolved with headers. Choose a deadline appropriate for the operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static",
          examples: [
            {
              label: "Time out before headers arrive",
              language: "javascript",
              code: '(async () => {\nconst signal=AbortSignal.timeout(25);try{const response=await fetch("slow",{signal});await response.json();}catch(error){console.log(signal.aborted,signal.reason.name,error.name);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Keep the deadline active while reading the body",
              language: "javascript",
              code: '(async () => {\nconst signal=AbortSignal.timeout(40);try{const response=await fetch("slow-body",{signal});await response.json();}catch(error){console.log(signal.aborted,signal.reason.name);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "FetchError — preserve status and error data",
          explanation:
            "Represent a failed HTTP response with its status, metadata, and parsed error payload. Use a text fallback when an error body is not valid JSON.",
          note: "The stored response body has already been consumed; use data for the parsed error, not a second body read.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
          examples: [
            {
              label: "Keep validation fields in an HTTP error",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nconst response=await fetch("status/422");try{if(!response.ok)throw new FetchError(response,await errorData(response));}catch(error){console.log(error.name,error.status,error.data.errors.email,error.response.bodyUsed);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Parse a non-JSON error payload",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nconst response=new Response("Upstream unavailable",{status:503});const error=new FetchError(response,await errorData(response));console.log(error.status,error.data.message);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "robustFetch() — bounded retries and backoff",
          explanation:
            "Retry selected temporary failures for replay-safe operations, keeping each attempt’s deadline active through body consumption. Use exponential delay, a bounded attempt count, and an onRetry callback for observability.",
          note: "Defaults to retrying GET/HEAD only; replaySafe for another method requires a real server replay/idempotency contract. It honors Retry-After within a 30-second wait budget, does not retry parsing failures, and cannot diagnose CORS from TypeError. attempts counts total attempts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Retry a temporary HTTP failure",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nconst retries=[];const data=await robustFetch("retry",{}, {onRetry:(attempt,reason)=>retries.push([attempt,reason])});console.log(data.done,JSON.stringify(retries));\n})().catch(error => { throw error; });',
            },
            {
              label: "Do not retry a validation failure",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nlet retries=0;try{await robustFetch("status/422",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"},{replaySafe:true,onRetry:()=>retries++});}catch(error){console.log(error instanceof FetchError,error.status,retries,error.data.errors.email);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Retry exhaustion and successful empty responses",
          explanation:
            "Propagate the final failure when the configured attempts are exhausted. Treat successful empty responses as a defined null result.",
          note: "A blanket retry of every 5xx is inappropriate; the helper selects 502/503/504 and 429. An abort reason supplied by the caller remains distinct from the helper deadline.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Exhaust temporary failures",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nlet retries=0;try{await robustFetch("status/503",{}, {attempts:2,onRetry:()=>retries++});}catch(error){console.log(error.status,retries);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Return null and preserve JSON parsing failures",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nconsole.log(await robustFetch("empty"));let retries=0;try{await robustFetch("bad-json",{}, {onRetry:()=>retries++});}catch(error){console.log(error instanceof SyntaxError,retries);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Retry deadlines and transport failures",
          explanation:
            "Retry transient fetch rejections or per-attempt timeouts only when the operation is safe to replay. Report the final deadline or transport error without mislabeling every failure as a timeout.",
          note: "The helper adds an explicit retry policy to fetch; a TypeError can also represent browser policy rejection, so it is not proof of a transient outage.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Retry a per-attempt timeout",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nconst reasons=[];try{await robustFetch("slow-body",{}, {attempts:2,timeout:25,onRetry:(_,reason)=>reasons.push(reason)});}catch(error){console.log(error.name,reasons.join(","));}\n})().catch(error => { throw error; });',
            },
            {
              label: "Exhaust a real connection failure",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nlet retries=0;try{await robustFetch("drop",{}, {attempts:2,onRetry:()=>retries++});}catch(error){console.log(error instanceof TypeError,retries);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Preserve caller cancellation and avoid unsafe replay",
          explanation:
            "Stop immediately when the caller aborts, including during a retry delay. Leave POST retries disabled unless the caller explicitly declares the server operation replay-safe.",
          note: "AbortSignal.any combines caller cancellation and the attempt deadline. Stream request bodies are rejected by this helper rather than silently reused.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static",
          examples: [
            {
              label: "Cancel during backoff without sending another attempt",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nconst controller=new AbortController();let retries=0;try{await robustFetch("status/503",{signal:controller.signal},{onRetry:()=>{retries++;controller.abort(new DOMException("Cancelled","AbortError"));}});}catch(error){console.log(error.name,retries);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Keep POST retries off and reject invalid attempt counts",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nlet retries=0;try{await robustFetch("status/503",{method:"POST",body:"demo"},{onRetry:()=>retries++});}catch(error){console.log(error.status,retries);}\ntry{await robustFetch("data",{}, {attempts:0});}catch(error){console.log(error.name);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Application error actions — login and validation",
          explanation:
            "Handle structured FetchError values at the UI boundary and let other failures use a generic path. Define the login and validation actions so the example has no missing dependencies.",
          note: "The demo uses local callbacks instead of navigating away; inject your application router and error UI in a real integration.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Route a 401 to the login action",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nconst actions=[];const goToLogin=()=>actions.push("login");\ntry{await robustFetch("status/401");}catch(error){if(error instanceof FetchError&&error.status===401)goToLogin();else throw error;}console.log(...actions);\n})().catch(error => { throw error; });',
            },
            {
              label: "Display structured validation errors",
              language: "javascript",
              code: '(async () => {\nclass FetchError extends Error{\n  constructor(response,data){super(\'HTTP \'+response.status);this.name="FetchError";this.response=response;this.status=response.status;this.data=data;}\n}\nasync function errorData(response){const text=await response.text();try{return JSON.parse(text);}catch{return {message:text};}}\n\nfunction retryPause(ms,signal){return new Promise((resolve,reject)=>{if(signal?.aborted){reject(signal.reason);return;}const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(signal.reason);};const timer=setTimeout(()=>{signal?.removeEventListener("abort",abort);resolve();},ms);signal?.addEventListener("abort",abort,{once:true});});}\nasync function robustFetch(url,options={},config={}){\n  const {attempts=3,retryDelay=20,timeout=1000,onRetry=()=>{},replaySafe=false}=config;\n  if(!Number.isInteger(attempts)||attempts<1||!Number.isFinite(retryDelay)||retryDelay<0||!Number.isSafeInteger(timeout)||timeout<1)throw new RangeError("Invalid retry configuration");\n  const template=new Request(new URL(url,location.href),options);\n  if(options.body instanceof ReadableStream)throw new TypeError("Use a replayable body");\n  const mayRetry=["GET","HEAD"].includes(template.method)||replaySafe;\n  for(let attempt=0;attempt<attempts;attempt++){\n    options.signal?.throwIfAborted();const controller=new AbortController();\n    const signal=AbortSignal.any([template.signal,controller.signal]);\n    const timer=setTimeout(()=>controller.abort(new DOMException("Request timed out","TimeoutError")),timeout);\n    let failure,phase="fetch";\n    try{\n      const response=await fetch(template.clone(),{signal});phase="body";\n      if(!response.ok)throw new FetchError(response,await errorData(response));\n      if(response.status===204||response.status===205||template.method==="HEAD")return null;\n      const text=await response.text();phase="parse";return text.trim()===""?null:JSON.parse(text);\n    }catch(error){\n      if(options.signal?.aborted)throw options.signal.reason;\n      failure=controller.signal.aborted?controller.signal.reason:error;\n      const retryable=failure instanceof FetchError?[429,502,503,504].includes(failure.status):failure.name==="TimeoutError"||((phase==="fetch"||phase==="body")&&failure instanceof TypeError);\n      if(!mayRetry||!retryable||attempt===attempts-1)throw failure;\n    }finally{clearTimeout(timer);}\n    let delay=retryDelay*2**attempt;\n    if(failure instanceof FetchError){const header=failure.response.headers.get("Retry-After");if(header!==null){const seconds=Number(header);const minimum=Number.isFinite(seconds)?seconds*1000:Date.parse(header)-Date.now();if(Number.isFinite(minimum))delay=Math.max(delay,minimum);}}\n    if(delay>30000)throw failure;\n    onRetry(attempt+1,failure instanceof FetchError?failure.status:failure.name);\n    await retryPause(delay,options.signal);\n  }\n}\nconst output=document.createElement("p");const showValidationErrors=errors=>{output.textContent=errors.email;};\ntry{await robustFetch("status/422");}catch(error){if(error instanceof FetchError&&error.status===422)showValidationErrors(error.data.errors);else throw error;}console.log(output.textContent);\n})().catch(error => { throw error; });',
            },
          ],
        },
      ],
    },
    {
      name: "Advanced Features",
      id: "advanced-features",
      intro: [
        "AbortController and cancellation patterns → request interceptors → file operations, following all ten images. Browser snippets run independently against the local fixture below; the two React examples are standalone Node projects with their own local servers.",
        "Copy advanced-server.mjs and index.html into a new temporary folder, run node advanced-server.mjs (Node.js 22+), and open http://127.0.0.1:3300/. The server supports real multipart files, chunk assembly, delayed bodies, and validated HTTP byte ranges. Download examples create links without auto-saving files; dispose them when finished.",
      ],
      setup: [
        {
          label: "advanced-server.mjs — cancellation and file API fixture",
          language: "javascript",
          code: "import {createServer} from 'node:http';\nimport {readFile} from 'node:fs/promises';\nimport {pathToFileURL} from 'node:url';\nexport function createAdvancedServer(servePage=()=>readFile(new URL('index.html',import.meta.url))){\n const scopes=new Map();return createServer(async(req,res)=>{try{\n  const url=new URL(req.url,'http://localhost'),match=url.pathname.match(/^(\\/case\\/\\d+)?\\/(.*)$/),scope=match?.[1]||'',route=match?.[2]||'';\n  if(!scopes.has(scope))scopes.set(scope,{requests:0,retries:0,uploads:new Map()});const state=scopes.get(scope);\n  res.setHeader('Cache-Control','no-store');\n  const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data));};\n  if(!route||route.endsWith('index.html')){res.writeHead(200,{'Content-Type':'text/html'});res.end(await servePage(url.pathname));return;}\n  state.requests++;\n  if(route==='delay'||route==='slow-body'){\n   if(route==='slow-body'){res.writeHead(200,{'Content-Type':'application/json'});res.flushHeaders();}\n   const timer=setTimeout(()=>{if(!res.headersSent)res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({value:url.searchParams.get('value')||'done'}));},Number(url.searchParams.get('ms')||150));res.on('close',()=>clearTimeout(timer));return;\n  }\n  if(route==='data')return json(200,{value:'data'});\n  if(route==='drop'){req.socket.destroy();return;}\n  if(route==='retry'){state.retries++;return json(state.retries===1?503:200,{value:'retried'});}\n  if(route==='bad-json'){res.writeHead(200,{'Content-Type':'application/json'});res.end('{broken');return;}\n  if(route.startsWith('status/'))return json(Number(route.split('/')[1]),{message:'Demo failure'});\n  if(route==='file'||route==='file-ignore'||route==='file-bad'||route==='file-unknown'){\n   const bytes=Buffer.from('Hello world'),etag='\"file-v1\"';res.setHeader('ETag',etag);res.setHeader('Accept-Ranges','bytes');\n   const range=req.headers.range?.match(/^bytes=(\\d+)-$/);const start=range?Number(range[1]):0;\n   if(range&&route!=='file-ignore'&&(!req.headers['if-range']||req.headers['if-range']===etag)){\n    if(start>=bytes.length){res.writeHead(416,{'Content-Range':'bytes */'+bytes.length});res.end();return;}\n    res.writeHead(206,{'Content-Type':'application/octet-stream','Content-Range':`bytes ${route==='file-bad'?start+1:start}-${bytes.length-1}/${bytes.length}`,'Content-Length':bytes.length-start});res.end(bytes.subarray(start));return;\n   }\n   res.writeHead(200,{'Content-Type':'application/octet-stream',...(route==='file-unknown'?{}:{'Content-Length':bytes.length})});res.write(bytes.subarray(0,3));const timer=setTimeout(()=>res.end(bytes.subarray(3)),10);res.on('close',()=>clearTimeout(timer));return;\n  }\n  const buffers=[];for await(const chunk of req)buffers.push(chunk);const raw=Buffer.concat(buffers);\n  if(route==='echo')return json(200,{method:req.method,headers:req.headers,body:raw.toString()});\n  const form=async()=>new Request('http://localhost/form',{method:'POST',headers:{'Content-Type':req.headers['content-type']},body:raw}).formData();\n  if(route==='upload'){\n   const data=await form(),files=[...data.values()].filter(value=>typeof value!=='string');return json(201,{names:files.map(file=>file.name),sizes:files.map(file=>file.size),description:data.get('description')});\n  }\n  // A bounded in-memory protocol for demonstration, not production storage.\n  if(route==='upload-chunk'){\n   const data=await form(),id=data.get('uploadId'),index=Number(data.get('chunkIndex')),total=Number(data.get('totalChunks')),chunk=data.get('chunk');\n   if(typeof id!=='string'||!Number.isInteger(total)||total<1||total>100||!Number.isInteger(index)||index<0||index>=total||!chunk||chunk.size>1048576)return json(400,{message:'Invalid chunk'});\n   if(!state.uploads.has(id))state.uploads.set(id,{total,filename:data.get('filename'),chunks:new Map()});const upload=state.uploads.get(id);\n   if(upload.total!==total||upload.filename!==data.get('filename'))return json(409,{message:'Metadata mismatch'});\n   upload.chunks.set(index,Buffer.from(await chunk.arrayBuffer()));return json(200,{accepted:index});\n  }\n  if(route==='upload-complete'){\n   const data=JSON.parse(raw.toString()),upload=state.uploads.get(data.uploadId);\n   if(data.totalChunks===0)return json(201,{size:0,text:'',filename:data.filename});\n   if(!upload||upload.total!==data.totalChunks||upload.chunks.size!==upload.total||upload.filename!==data.filename)return json(409,{message:'Incomplete upload'});\n   const bytes=Buffer.concat(Array.from({length:upload.total},(_,index)=>upload.chunks.get(index)));state.uploads.delete(data.uploadId);return json(201,{size:bytes.length,text:bytes.toString(),filename:data.filename});\n  }\n  return json(404,{message:'Missing route'});\n }catch(error){if(!res.headersSent)res.writeHead(400,{'Content-Type':'application/json'});res.end(JSON.stringify({message:error.message}));}});\n}\nif(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)createAdvancedServer().listen(3300,'127.0.0.1',()=>console.log('Open http://127.0.0.1:3300/ and use the console'));\n",
        },
        {
          label: "index.html — browser console page",
          language: "html",
          code: '<!doctype html><html lang="en"><meta charset="utf-8"><title>Advanced fetch</title><h1>Advanced fetch</h1><p>Open the console and run one browser example.</p></html>',
        },
      ],
      methods: [
        {
          name: "AbortController — cancel a fetch",
          explanation:
            "Pass a controller’s signal to fetch, then call abort when the operation is no longer needed. Observe rejection and distinguish cancellation from other failures.",
          note: "An aborted signal stays aborted; create a new controller for a new operation. Aborting does not undo effects that already occurred on the server.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Cancel an in-flight request",
              language: "javascript",
              code: '(async () => {\nconst controller=new AbortController();const request=fetch("delay",{signal:controller.signal});controller.abort();try{await request;}catch(error){console.log(error.name,controller.signal.aborted);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Create a fresh controller after aborting",
              language: "javascript",
              code: '(async () => {\nconst old=new AbortController();old.abort();try{await fetch("data",{signal:old.signal});}catch(error){console.log(error.name);}\nconst fresh=new AbortController();console.log((await (await fetch("data",{signal:fresh.signal})).json()).value,fresh.signal.aborted);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Cancel on user action",
          explanation:
            "Give every start action a fresh controller and connect the cancel button to the current operation. Guard rendering so an earlier request cannot overwrite the latest result.",
          note: "The examples create all DOM controls and expose cleanup; cancellation can also stop body consumption.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Start and cancel through actual buttons",
              language: "javascript",
              code: '(async () => {\nfunction createFetchControls(url){\n const panel=document.createElement("div"),start=document.createElement("button"),cancel=document.createElement("button"),output=document.createElement("p");start.textContent="Fetch";cancel.textContent="Cancel";panel.append(start,cancel,output);document.body.append(panel);\n let controller=null,pending=Promise.resolve();\n start.addEventListener("click",()=>{controller?.abort();const current=new AbortController();controller=current;pending=(async()=>{try{const response=await fetch(url,{signal:current.signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);const data=await response.json();if(controller===current)output.textContent=data.value;}catch(error){if(controller===current)output.textContent=current.signal.aborted?"cancelled":error.message;}finally{if(controller===current)controller=null;}})();});\n cancel.addEventListener("click",()=>controller?.abort());\n return {start,cancel,output,get pending(){return pending;},dispose(){controller?.abort();controller=null;panel.remove();}};\n}\nconst ui=createFetchControls("delay");ui.start.click();ui.cancel.click();await ui.pending;console.log(ui.output.textContent);ui.dispose();\n})().catch(error => { throw error; });',
            },
            {
              label: "Restart successfully after cancellation",
              language: "javascript",
              code: '(async () => {\nfunction createFetchControls(url){\n const panel=document.createElement("div"),start=document.createElement("button"),cancel=document.createElement("button"),output=document.createElement("p");start.textContent="Fetch";cancel.textContent="Cancel";panel.append(start,cancel,output);document.body.append(panel);\n let controller=null,pending=Promise.resolve();\n start.addEventListener("click",()=>{controller?.abort();const current=new AbortController();controller=current;pending=(async()=>{try{const response=await fetch(url,{signal:current.signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);const data=await response.json();if(controller===current)output.textContent=data.value;}catch(error){if(controller===current)output.textContent=current.signal.aborted?"cancelled":error.message;}finally{if(controller===current)controller=null;}})();});\n cancel.addEventListener("click",()=>controller?.abort());\n return {start,cancel,output,get pending(){return pending;},dispose(){controller?.abort();controller=null;panel.remove();}};\n}\nconst ui=createFetchControls("data");ui.start.click();ui.cancel.click();await ui.pending;ui.start.click();await ui.pending;console.log(ui.output.textContent);ui.dispose();\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "RequestManager — replace duplicate request IDs",
          explanation:
            "Keep a controller for each active operation and cancel the earlier operation with the same ID. Remove an entry only if it still belongs to the finishing operation.",
          note: "Unlike the screenshot wrapper, this helper consumes the body before releasing tracking. It returns the reader result, not an unconsumed Response, and preserves a caller-supplied signal.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "An old request cannot delete the newer controller",
              language: "javascript",
              code: '(async () => {\nclass RequestManager{\n constructor(){this.controllers=new Map();}\n async fetch(id,url,options={},read=response=>response.json()){\n  this.cancel(id);const controller=new AbortController();this.controllers.set(id,controller);\n  const signal=options.signal?AbortSignal.any([options.signal,controller.signal]):controller.signal;\n  try{const response=await fetch(url,{...options,signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);return await read(response);}\n  finally{if(this.controllers.get(id)===controller)this.controllers.delete(id);}\n }\n cancel(id){const controller=this.controllers.get(id);if(controller){controller.abort();if(this.controllers.get(id)===controller)this.controllers.delete(id);}}\n cancelAll(){for(const controller of this.controllers.values())controller.abort();this.controllers.clear();}\n}\nconst manager=new RequestManager();const first=manager.fetch("search","delay?ms=150").catch(error=>error.name);const second=manager.fetch("search","delay?ms=80&value=new");\nconsole.log(await first,manager.controllers.has("search"));console.log((await second).value,manager.controllers.size);\n})().catch(error => { throw error; });',
            },
            {
              label: "Cancel a request while its body is pending",
              language: "javascript",
              code: '(async () => {\nclass RequestManager{\n constructor(){this.controllers=new Map();}\n async fetch(id,url,options={},read=response=>response.json()){\n  this.cancel(id);const controller=new AbortController();this.controllers.set(id,controller);\n  const signal=options.signal?AbortSignal.any([options.signal,controller.signal]):controller.signal;\n  try{const response=await fetch(url,{...options,signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);return await read(response);}\n  finally{if(this.controllers.get(id)===controller)this.controllers.delete(id);}\n }\n cancel(id){const controller=this.controllers.get(id);if(controller){controller.abort();if(this.controllers.get(id)===controller)this.controllers.delete(id);}}\n cancelAll(){for(const controller of this.controllers.values())controller.abort();this.controllers.clear();}\n}\nconst manager=new RequestManager();let gotHeaders;const ready=new Promise(resolve=>gotHeaders=resolve);const pending=manager.fetch("body","slow-body",{},response=>{gotHeaders();return response.json();}).catch(error=>error.name);await ready;manager.cancel("body");console.log(await pending,manager.controllers.size);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "RequestManager cancelAll() and external signals",
          explanation:
            "Cancel all tracked operations when their owning view closes, or combine a caller’s signal with manager cancellation. Use separate IDs for operations that should run independently.",
          note: "A controller can cancel several consumers of the same signal, but these examples allocate one controller per tracked operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Cancel every tracked request",
              language: "javascript",
              code: '(async () => {\nclass RequestManager{\n constructor(){this.controllers=new Map();}\n async fetch(id,url,options={},read=response=>response.json()){\n  this.cancel(id);const controller=new AbortController();this.controllers.set(id,controller);\n  const signal=options.signal?AbortSignal.any([options.signal,controller.signal]):controller.signal;\n  try{const response=await fetch(url,{...options,signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);return await read(response);}\n  finally{if(this.controllers.get(id)===controller)this.controllers.delete(id);}\n }\n cancel(id){const controller=this.controllers.get(id);if(controller){controller.abort();if(this.controllers.get(id)===controller)this.controllers.delete(id);}}\n cancelAll(){for(const controller of this.controllers.values())controller.abort();this.controllers.clear();}\n}\nconst manager=new RequestManager();const a=manager.fetch("a","delay").catch(error=>error.name),b=manager.fetch("b","delay").catch(error=>error.name);manager.cancelAll();console.log(await a,await b,manager.controllers.size);\n})().catch(error => { throw error; });',
            },
            {
              label: "Preserve caller cancellation",
              language: "javascript",
              code: '(async () => {\nclass RequestManager{\n constructor(){this.controllers=new Map();}\n async fetch(id,url,options={},read=response=>response.json()){\n  this.cancel(id);const controller=new AbortController();this.controllers.set(id,controller);\n  const signal=options.signal?AbortSignal.any([options.signal,controller.signal]):controller.signal;\n  try{const response=await fetch(url,{...options,signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);return await read(response);}\n  finally{if(this.controllers.get(id)===controller)this.controllers.delete(id);}\n }\n cancel(id){const controller=this.controllers.get(id);if(controller){controller.abort();if(this.controllers.get(id)===controller)this.controllers.delete(id);}}\n cancelAll(){for(const controller of this.controllers.values())controller.abort();this.controllers.clear();}\n}\nconst manager=new RequestManager(),caller=new AbortController();const pending=manager.fetch("a","delay",{signal:caller.signal}).catch(error=>error.name);caller.abort();console.log(await pending,manager.controllers.size);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "createSingletonFetch() — latest request wins",
          explanation:
            "Wrap a request manager with one shared key for autocomplete or search. The next invocation cancels the earlier operation through body parsing.",
          note: "One wrapper instance represents one independent search stream; do not share it across unrelated widgets. Identity-checked cleanup prevents the earlier request from clearing the newer controller.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Replace an earlier search",
              language: "javascript",
              code: '(async () => {\nclass RequestManager{\n constructor(){this.controllers=new Map();}\n async fetch(id,url,options={},read=response=>response.json()){\n  this.cancel(id);const controller=new AbortController();this.controllers.set(id,controller);\n  const signal=options.signal?AbortSignal.any([options.signal,controller.signal]):controller.signal;\n  try{const response=await fetch(url,{...options,signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);return await read(response);}\n  finally{if(this.controllers.get(id)===controller)this.controllers.delete(id);}\n }\n cancel(id){const controller=this.controllers.get(id);if(controller){controller.abort();if(this.controllers.get(id)===controller)this.controllers.delete(id);}}\n cancelAll(){for(const controller of this.controllers.values())controller.abort();this.controllers.clear();}\n}\nfunction createSingletonFetch(){const manager=new RequestManager();return (url,options={},read)=>manager.fetch("latest",url,options,read);}\nconst search=createSingletonFetch();const first=search("delay?value=old").catch(error=>error.name);const latest=search("data");console.log(await first,(await latest).value);\n})().catch(error => { throw error; });',
            },
            {
              label: "A third request cancels the still-active second request",
              language: "javascript",
              code: '(async () => {\nclass RequestManager{\n constructor(){this.controllers=new Map();}\n async fetch(id,url,options={},read=response=>response.json()){\n  this.cancel(id);const controller=new AbortController();this.controllers.set(id,controller);\n  const signal=options.signal?AbortSignal.any([options.signal,controller.signal]):controller.signal;\n  try{const response=await fetch(url,{...options,signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);return await read(response);}\n  finally{if(this.controllers.get(id)===controller)this.controllers.delete(id);}\n }\n cancel(id){const controller=this.controllers.get(id);if(controller){controller.abort();if(this.controllers.get(id)===controller)this.controllers.delete(id);}}\n cancelAll(){for(const controller of this.controllers.values())controller.abort();this.controllers.clear();}\n}\nfunction createSingletonFetch(){const manager=new RequestManager();return (url,options={},read)=>manager.fetch("latest",url,options,read);}\nconst search=createSingletonFetch();const a=search("delay").catch(error=>error.name);const b=search("delay").catch(error=>error.name);await a;const c=search("data");console.log(await b,(await c).value);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "fetchFastest() — first successful response",
          explanation:
            "Use Promise.any to choose the first successful HTTP response and cancel only the other requests. Use this for equivalent read-only mirrors.",
          note: "Promise.race chooses the first settlement, including rejection. The winner’s controller must stay un-aborted so its body remains readable; success here means successful headers, not fully parsed content.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Keep the winning body readable",
              language: "javascript",
              code: '(async () => {\nasync function fetchFastest(urls){\n if(!Array.isArray(urls)||urls.length===0)throw new RangeError("Provide at least one URL");\n const controllers=urls.map(()=>new AbortController());let winner=-1;\n try{\n  const result=await Promise.any(urls.map(async(url,index)=>{const response=await fetch(url,{signal:controllers[index].signal});if(!response.ok){await response.body?.cancel();throw new Error(\'HTTP \'+response.status);}return {response,index};}));\n  winner=result.index;return result.response;\n }finally{controllers.forEach((controller,index)=>{if(index!==winner)controller.abort();});}\n}\nconst response=await fetchFastest(["delay?ms=150","slow-body?ms=30&value=winner"]);console.log((await response.json()).value);\n})().catch(error => { throw error; });',
            },
            {
              label: "Ignore an early HTTP failure and reject an empty list",
              language: "javascript",
              code: '(async () => {\nasync function fetchFastest(urls){\n if(!Array.isArray(urls)||urls.length===0)throw new RangeError("Provide at least one URL");\n const controllers=urls.map(()=>new AbortController());let winner=-1;\n try{\n  const result=await Promise.any(urls.map(async(url,index)=>{const response=await fetch(url,{signal:controllers[index].signal});if(!response.ok){await response.body?.cancel();throw new Error(\'HTTP \'+response.status);}return {response,index};}));\n  winner=result.index;return result.response;\n }finally{controllers.forEach((controller,index)=>{if(index!==winner)controller.abort();});}\n}\nconsole.log((await (await fetchFastest(["status/503","data"])).json()).value);try{await fetchFastest([]);}catch(error){console.log(error.name);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "fetchWithTimeout() — combine deadline and cancellation",
          explanation:
            "Use AbortSignal.timeout and combine it with an existing signal. The signal remains connected to the returned response body after headers arrive.",
          note: "The helper returns a Response; callers still check status and consume the body. Timeouts report TimeoutError and ordinary caller aborts report AbortError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static",
          examples: [
            {
              label: "Time out while waiting for a body",
              language: "javascript",
              code: '(async () => {\nfunction fetchWithTimeout(url,options={},timeout=5000){const deadline=AbortSignal.timeout(timeout);return fetch(url,{...options,signal:options.signal?AbortSignal.any([options.signal,deadline]):deadline});}\ntry{const response=await fetchWithTimeout("slow-body",{},25);await response.json();}catch(error){console.log(error.name);}\n})().catch(error => { throw error; });',
            },
            {
              label: "Keep the caller signal effective",
              language: "javascript",
              code: '(async () => {\nfunction fetchWithTimeout(url,options={},timeout=5000){const deadline=AbortSignal.timeout(timeout);return fetch(url,{...options,signal:options.signal?AbortSignal.any([options.signal,deadline]):deadline});}\nconst controller=new AbortController();const pending=fetchWithTimeout("delay",{signal:controller.signal},1000);controller.abort();try{await pending;}catch(error){console.log(error.name);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "React useEffect cleanup on unmount",
          explanation:
            "Create a controller inside each effect, abort it in cleanup, and guard state updates after cleanup. Include the request URL in the effect dependencies.",
          note: "These standalone Node.js 22+ lifecycle demonstrations use real React and jsdom with a real local HTTP server. Copy package.json and main.mjs into a temporary folder, run npm install, then npm start; no framework globals or state setters are left undefined.",
          source: "https://react.dev/reference/react/useEffect",
          examples: [
            {
              label: "Unmount cancels the effect request",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "start": "node main.mjs"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "jsdom": "^26.0.0"\n  }\n}',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: "import React,{useEffect,useState,act} from 'react';\nimport {createRoot} from 'react-dom/client';\nimport {JSDOM} from 'jsdom';\nimport {createServer} from 'node:http';\nconst dom=new JSDOM('<div id=\"root\"></div>');globalThis.window=dom.window;globalThis.document=dom.window.document;globalThis.IS_REACT_ACT_ENVIRONMENT=true;\nconst server=createServer((req,res)=>{const timer=setTimeout(()=>{res.writeHead(200,{'Content-Type':'application/json'});res.end('{\"value\":\"loaded\"}');},Number(new URL(req.url,'http://localhost').searchParams.get('ms')||0));res.on('close',()=>clearTimeout(timer));});\nawait new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const url='http://127.0.0.1:'+server.address().port;\nlet currentSignal,settled;const finished=new Promise(resolve=>settled=resolve);\nfunction Example({url}){const [data,setData]=useState(null),[error,setError]=useState(null);useEffect(()=>{const controller=new AbortController();currentSignal=controller.signal;let active=true;(async()=>{try{const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw new Error('HTTP '+response.status);const value=await response.json();if(active)setData(value);}catch(error){if(active&&!controller.signal.aborted)setError(error);}finally{settled();}})();return()=>{active=false;controller.abort();};},[url]);return React.createElement('p',null,error?error.message:data?.value||'loading');}\nconst root=createRoot(document.querySelector('#root'));\ntry {\nawait act(async()=>root.render(React.createElement(Example,{url:url+'/?ms=150'})));\nawait act(async()=>root.unmount());await finished;console.log(currentSignal.aborted,document.querySelector('#root').textContent);\n}finally{server.closeAllConnections();server.close();dom.window.close();}",
                },
              ],
            },
            {
              label: "Render data before cleanup",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "start": "node main.mjs"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "jsdom": "^26.0.0"\n  }\n}',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: "import React,{useEffect,useState,act} from 'react';\nimport {createRoot} from 'react-dom/client';\nimport {JSDOM} from 'jsdom';\nimport {createServer} from 'node:http';\nconst dom=new JSDOM('<div id=\"root\"></div>');globalThis.window=dom.window;globalThis.document=dom.window.document;globalThis.IS_REACT_ACT_ENVIRONMENT=true;\nconst server=createServer((req,res)=>{const timer=setTimeout(()=>{res.writeHead(200,{'Content-Type':'application/json'});res.end('{\"value\":\"loaded\"}');},Number(new URL(req.url,'http://localhost').searchParams.get('ms')||0));res.on('close',()=>clearTimeout(timer));});\nawait new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const url='http://127.0.0.1:'+server.address().port;\nlet currentSignal,settled;const finished=new Promise(resolve=>settled=resolve);\nfunction Example({url}){const [data,setData]=useState(null),[error,setError]=useState(null);useEffect(()=>{const controller=new AbortController();currentSignal=controller.signal;let active=true;(async()=>{try{const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw new Error('HTTP '+response.status);const value=await response.json();if(active)setData(value);}catch(error){if(active&&!controller.signal.aborted)setError(error);}finally{settled();}})();return()=>{active=false;controller.abort();};},[url]);return React.createElement('p',null,error?error.message:data?.value||'loading');}\nconst root=createRoot(document.querySelector('#root'));\ntry {\nawait act(async()=>{root.render(React.createElement(Example,{url}));});\nawait act(async()=>{await finished;});console.log(document.querySelector('p').textContent);\nawait act(async()=>root.unmount());console.log(currentSignal.aborted);\n}finally{server.closeAllConnections();server.close();dom.window.close();}",
                },
              ],
            },
          ],
        },
        {
          name: "Basic fetch interception and restoration",
          explanation:
            "Wrap fetch to observe requests and responses while returning the original Response. Restore the prior function when the demonstration finishes.",
          note: "Fetch has no built-in interceptor registry. Avoid logging credentials or body data; a local wrapper is usually easier to isolate than changing the global function.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Install and restore a temporary global wrapper",
              language: "javascript",
              code: '(async () => {\nconst original=window.fetch;window.fetch=async function(...args){console.log("request");const response=await original.apply(window,args);console.log("response",response.status);return response;};\ntry{console.log((await (await fetch("data")).json()).value);}finally{window.fetch=original;}console.log(window.fetch===original);\n})().catch(error => { throw error; });',
            },
            {
              label: "Use an isolated wrapper instead",
              language: "javascript",
              code: '(async () => {\nconst original=window.fetch.bind(window);const observed=async(...args)=>{const response=await original(...args);console.log(response.status);return response;};console.log((await (await observed("data")).json()).value);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "FetchInterceptor — ordered request and response hooks",
          explanation:
            "Run request hooks before fetch and response hooks afterward in registration order. Pass Request and Response objects so headers and bodies retain their standard behavior.",
          note: "Hooks must return the next Request or Response. Clone before inspecting a body that downstream code still needs to read.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Add a header in a request hook",
              language: "javascript",
              code: '(async () => {\nclass FetchInterceptor{\n constructor(){this.requestInterceptors=[];this.responseInterceptors=[];}\n addRequestInterceptor(fn){this.requestInterceptors.push(fn);}\n addResponseInterceptor(fn){this.responseInterceptors.push(fn);}\n async fetch(url,options={}){let request=new Request(new URL(url,location.href),options);for(const interceptor of this.requestInterceptors)request=await interceptor(request);let response=await fetch(request);for(const interceptor of this.responseInterceptors)response=await interceptor(response);return response;}\n}\nconst client=new FetchInterceptor();client.addRequestInterceptor(request=>{const headers=new Headers(request.headers);headers.set("X-Demo","yes");return new Request(request,{headers});});const data=await (await client.fetch("echo")).json();console.log(data.headers["x-demo"]);\n})().catch(error => { throw error; });',
            },
            {
              label: "Observe hook order without consuming the returned body",
              language: "javascript",
              code: '(async () => {\nclass FetchInterceptor{\n constructor(){this.requestInterceptors=[];this.responseInterceptors=[];}\n addRequestInterceptor(fn){this.requestInterceptors.push(fn);}\n addResponseInterceptor(fn){this.responseInterceptors.push(fn);}\n async fetch(url,options={}){let request=new Request(new URL(url,location.href),options);for(const interceptor of this.requestInterceptors)request=await interceptor(request);let response=await fetch(request);for(const interceptor of this.responseInterceptors)response=await interceptor(response);return response;}\n}\nconst order=[],client=new FetchInterceptor();client.addRequestInterceptor(request=>{order.push("request");return request;});client.addResponseInterceptor(async response=>{order.push((await response.clone().json()).value);return response;});const response=await client.fetch("data");console.log(order.join("|"),(await response.json()).value);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "FetchClient — request, response, and error chains",
          explanation:
            "Create an explicit promise chain for request hooks, response hooks, and final error handlers. Keep request configuration and metadata in a separate result envelope rather than attaching undocumented fields to Response.",
          note: "A rejection handler recovers by returning a valid next-stage value or propagates by throwing. Error handlers run in order until one recovers; use returns an eject function.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Recover a request-hook failure and continue to fetch",
              language: "javascript",
              code: '(async () => {\nclass FetchClient{\n constructor(baseURL="./"){this.baseURL=new URL(baseURL,location.href);this.interceptors={request:[],response:[],error:[]};}\n use(type,fulfilled,rejected){if(!this.interceptors[type])throw new TypeError("Unknown interceptor type");const hook={fulfilled,rejected};this.interceptors[type].push(hook);return()=>{const list=this.interceptors[type],index=list.indexOf(hook);if(index>=0)list.splice(index,1);};}\n async request(url,options={}){\n  let config={url:new URL(url,this.baseURL).href,options:{...options,headers:new Headers(options.headers)},meta:{}};\n  let chain=Promise.resolve(config);\n  for(const hook of this.interceptors.request)chain=chain.then(hook.fulfilled,hook.rejected);\n  chain=chain.then(async current=>{config=current;const response=await fetch(current.url,current.options);if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;error.response=response;error.config=current;throw error;}return {response,config:current};});\n  for(const hook of this.interceptors.response)chain=chain.then(hook.fulfilled,hook.rejected);\n  for(const hook of this.interceptors.error)chain=chain.catch(error=>hook.fulfilled(error,config));\n  return chain;\n }\n}\nconst api=new FetchClient();api.use("request",()=>{throw new Error("prepare");});api.use("request",undefined,()=>({url:new URL("data",location.href).href,options:{},meta:{}}));const result=await api.request("data");console.log((await result.response.json()).value);\n})().catch(error => { throw error; });',
            },
            {
              label: "Eject a hook and propagate unhandled failures",
              language: "javascript",
              code: '(async () => {\nclass FetchClient{\n constructor(baseURL="./"){this.baseURL=new URL(baseURL,location.href);this.interceptors={request:[],response:[],error:[]};}\n use(type,fulfilled,rejected){if(!this.interceptors[type])throw new TypeError("Unknown interceptor type");const hook={fulfilled,rejected};this.interceptors[type].push(hook);return()=>{const list=this.interceptors[type],index=list.indexOf(hook);if(index>=0)list.splice(index,1);};}\n async request(url,options={}){\n  let config={url:new URL(url,this.baseURL).href,options:{...options,headers:new Headers(options.headers)},meta:{}};\n  let chain=Promise.resolve(config);\n  for(const hook of this.interceptors.request)chain=chain.then(hook.fulfilled,hook.rejected);\n  chain=chain.then(async current=>{config=current;const response=await fetch(current.url,current.options);if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;error.response=response;error.config=current;throw error;}return {response,config:current};});\n  for(const hook of this.interceptors.response)chain=chain.then(hook.fulfilled,hook.rejected);\n  for(const hook of this.interceptors.error)chain=chain.catch(error=>hook.fulfilled(error,config));\n  return chain;\n }\n}\nconst api=new FetchClient();let calls=0;const eject=api.use("request",config=>{calls++;return config;});await (await api.request("data")).response.text();eject();await (await api.request("data")).response.text();console.log(calls);try{await api.request("status/404");}catch(error){console.log(error.status);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Authentication and timing interceptors",
          explanation:
            "Add authentication only for a trusted destination and store timing metadata on the request envelope. Measure elapsed time in a response hook using that metadata.",
          note: "Do not log token-bearing options. Native Response has no config property; the client envelope deliberately supplies it. Timing here measures through response headers, before optional body parsing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Attach a token without discarding existing Headers",
              language: "javascript",
              code: '(async () => {\nclass FetchClient{\n constructor(baseURL="./"){this.baseURL=new URL(baseURL,location.href);this.interceptors={request:[],response:[],error:[]};}\n use(type,fulfilled,rejected){if(!this.interceptors[type])throw new TypeError("Unknown interceptor type");const hook={fulfilled,rejected};this.interceptors[type].push(hook);return()=>{const list=this.interceptors[type],index=list.indexOf(hook);if(index>=0)list.splice(index,1);};}\n async request(url,options={}){\n  let config={url:new URL(url,this.baseURL).href,options:{...options,headers:new Headers(options.headers)},meta:{}};\n  let chain=Promise.resolve(config);\n  for(const hook of this.interceptors.request)chain=chain.then(hook.fulfilled,hook.rejected);\n  chain=chain.then(async current=>{config=current;const response=await fetch(current.url,current.options);if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;error.response=response;error.config=current;throw error;}return {response,config:current};});\n  for(const hook of this.interceptors.response)chain=chain.then(hook.fulfilled,hook.rejected);\n  for(const hook of this.interceptors.error)chain=chain.catch(error=>hook.fulfilled(error,config));\n  return chain;\n }\n}\nconst api=new FetchClient();const getAuthToken=async()=>"demo-token";api.use("request",async config=>{if(new URL(config.url).origin!==location.origin)throw new Error("Untrusted origin");config.options.headers.set("Authorization","Bearer "+await getAuthToken());return config;});const {response}=await api.request("echo",{headers:new Headers({Accept:"application/json"})});const data=await response.json();console.log(data.headers.authorization,data.headers.accept);\n})().catch(error => { throw error; });',
            },
            {
              label: "Measure with explicit per-request metadata",
              language: "javascript",
              code: '(async () => {\nclass FetchClient{\n constructor(baseURL="./"){this.baseURL=new URL(baseURL,location.href);this.interceptors={request:[],response:[],error:[]};}\n use(type,fulfilled,rejected){if(!this.interceptors[type])throw new TypeError("Unknown interceptor type");const hook={fulfilled,rejected};this.interceptors[type].push(hook);return()=>{const list=this.interceptors[type],index=list.indexOf(hook);if(index>=0)list.splice(index,1);};}\n async request(url,options={}){\n  let config={url:new URL(url,this.baseURL).href,options:{...options,headers:new Headers(options.headers)},meta:{}};\n  let chain=Promise.resolve(config);\n  for(const hook of this.interceptors.request)chain=chain.then(hook.fulfilled,hook.rejected);\n  chain=chain.then(async current=>{config=current;const response=await fetch(current.url,current.options);if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;error.response=response;error.config=current;throw error;}return {response,config:current};});\n  for(const hook of this.interceptors.response)chain=chain.then(hook.fulfilled,hook.rejected);\n  for(const hook of this.interceptors.error)chain=chain.catch(error=>hook.fulfilled(error,config));\n  return chain;\n }\n}\nconst api=new FetchClient();api.use("request",config=>{config.meta.start=performance.now();return config;});api.use("response",result=>({...result,duration:performance.now()-result.config.meta.start}));const result=await api.request("data");console.log(Number.isFinite(result.duration),result.duration>=0,(await result.response.json()).value);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Retry and transform interceptor results",
          explanation:
            "Convert HTTP failures to errors before applying an error retry hook, then pass recovered results through the client’s response chain. Parse body data once into an explicit data field.",
          note: "This example retries one 503 for GET only and marks the request to bound recursion; it does not replay arbitrary writes. Non-503 errors propagate.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Retry once through the same client pipeline",
              language: "javascript",
              code: '(async () => {\nclass FetchClient{\n constructor(baseURL="./"){this.baseURL=new URL(baseURL,location.href);this.interceptors={request:[],response:[],error:[]};}\n use(type,fulfilled,rejected){if(!this.interceptors[type])throw new TypeError("Unknown interceptor type");const hook={fulfilled,rejected};this.interceptors[type].push(hook);return()=>{const list=this.interceptors[type],index=list.indexOf(hook);if(index>=0)list.splice(index,1);};}\n async request(url,options={}){\n  let config={url:new URL(url,this.baseURL).href,options:{...options,headers:new Headers(options.headers)},meta:{}};\n  let chain=Promise.resolve(config);\n  for(const hook of this.interceptors.request)chain=chain.then(hook.fulfilled,hook.rejected);\n  chain=chain.then(async current=>{config=current;const response=await fetch(current.url,current.options);if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;error.response=response;error.config=current;throw error;}return {response,config:current};});\n  for(const hook of this.interceptors.response)chain=chain.then(hook.fulfilled,hook.rejected);\n  for(const hook of this.interceptors.error)chain=chain.catch(error=>hook.fulfilled(error,config));\n  return chain;\n }\n}\nconst api=new FetchClient();api.use("response",async result=>({...result,data:await result.response.json()}));api.use("error",async error=>{if(error.status!==503||error.config.meta.retried||(error.config.options.method||"GET").toUpperCase()!=="GET")throw error;await error.response.body?.cancel();await new Promise(resolve=>setTimeout(resolve,10));return api.request(error.config.url,{...error.config.options,headers:new Headers(error.config.options.headers),method:"GET",_retried:true});});api.use("request",config=>{config.meta.retried=Boolean(config.options._retried);delete config.options._retried;return config;});const result=await api.request("retry");console.log(result.data.value,result.response.bodyUsed);\n})().catch(error => { throw error; });',
            },
            {
              label: "Propagate HTTP errors and transform JSON",
              language: "javascript",
              code: '(async () => {\nclass FetchClient{\n constructor(baseURL="./"){this.baseURL=new URL(baseURL,location.href);this.interceptors={request:[],response:[],error:[]};}\n use(type,fulfilled,rejected){if(!this.interceptors[type])throw new TypeError("Unknown interceptor type");const hook={fulfilled,rejected};this.interceptors[type].push(hook);return()=>{const list=this.interceptors[type],index=list.indexOf(hook);if(index>=0)list.splice(index,1);};}\n async request(url,options={}){\n  let config={url:new URL(url,this.baseURL).href,options:{...options,headers:new Headers(options.headers)},meta:{}};\n  let chain=Promise.resolve(config);\n  for(const hook of this.interceptors.request)chain=chain.then(hook.fulfilled,hook.rejected);\n  chain=chain.then(async current=>{config=current;const response=await fetch(current.url,current.options);if(!response.ok){const error=new Error(\'HTTP \'+response.status);error.status=response.status;error.response=response;error.config=current;throw error;}return {response,config:current};});\n  for(const hook of this.interceptors.response)chain=chain.then(hook.fulfilled,hook.rejected);\n  for(const hook of this.interceptors.error)chain=chain.catch(error=>hook.fulfilled(error,config));\n  return chain;\n }\n}\nconst api=new FetchClient();api.use("response",async result=>({...result,data:await result.response.json()}));api.use("error",error=>{throw error;});const result=await api.request("data");console.log(result.data.value);try{await api.request("status/401");}catch(error){console.log(error.status);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Single and multiple file uploads",
          explanation:
            "Append File objects and related text fields to FormData and POST it. Use a repeated field name when the server expects multiple files.",
          note: "The browser sets the multipart Content-Type and boundary. These snippets create files explicitly; a real file input must check that a user selected files.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData",
          examples: [
            {
              label: "Upload a file with a description",
              language: "javascript",
              code: '(async () => {\nconst form=new FormData();form.append("file",new File(["photo"],"photo.txt"));form.append("description","Profile photo");const response=await fetch("upload",{method:"POST",body:form});if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json();console.log(data.names[0],data.sizes[0],data.description);\n})().catch(error => { throw error; });',
            },
            {
              label: "Upload several files under one repeated key",
              language: "javascript",
              code: '(async () => {\nconst files=[new File(["a"],"a.txt"),new File(["bb"],"b.txt")],form=new FormData();for(const file of files)form.append("files[]",file);const response=await fetch("upload",{method:"POST",body:form});if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json();console.log(data.names.join("|"),...data.sizes);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "downloadFile() and triggerDownload()",
          explanation:
            "Fetch a Blob and expose a named download link. Keep its object URL alive while the link is available, then dispose it when the consumer is finished.",
          note: "The demonstration creates a user-activated link rather than automatically saving a file. Blob downloads buffer the full file; revoking immediately after an automatic click can race browser download handling.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static",
          examples: [
            {
              label: "Create and dispose a download link",
              language: "javascript",
              code: '(async () => {\nfunction triggerDownload(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);return {link,dispose(){link.remove();URL.revokeObjectURL(url);}};}\nasync function downloadFile(url,filename){const response=await fetch(url);if(!response.ok)throw new Error(`HTTP ${response.status}`);return triggerDownload(await response.blob(),filename);}\nconst file=await downloadFile("file","hello.txt");console.log(file.link.download,file.link.href.startsWith("blob:"));file.dispose();console.log(file.link.isConnected);\n})().catch(error => { throw error; });',
            },
            {
              label: "Keep file bytes available independently of the link",
              language: "javascript",
              code: '(async () => {\nfunction triggerDownload(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);return {link,dispose(){link.remove();URL.revokeObjectURL(url);}};}\nconst blob=await (await fetch("file")).blob();const download=triggerDownload(blob,"hello.txt");download.dispose();console.log(await blob.text());\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "FileManager.uploadWithProgress() — usable cancellation",
          explanation:
            "Use XMLHttpRequest upload progress and return both a promise and an abort function immediately. Await promise for completion while keeping abort available during transmission.",
          note: "A function returned from inside a Promise executor does not become the Promise’s cancellation API. Percent measures uploaded request bytes, not server processing; parse errors and all terminal failures must reject.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload",
          examples: [
            {
              label: "Observe progress and the uploaded result",
              language: "javascript",
              code: '(async () => {\nclass FileManager{\n uploadWithProgress(url,file,onProgress=()=>{}){\n  const xhr=new XMLHttpRequest();const promise=new Promise((resolve,reject)=>{\n   xhr.upload.addEventListener("progress",event=>{if(event.lengthComputable)try{onProgress({loaded:event.loaded,total:event.total,percent:event.loaded/event.total*100});}catch(error){reject(error);xhr.abort();}});\n   xhr.addEventListener("load",()=>{if(xhr.status<200||xhr.status>=300){reject(new Error(\'HTTP \'+xhr.status));return;}try{resolve(xhr.status===204||xhr.status===205?null:JSON.parse(xhr.responseText));}catch(error){reject(error);}});\n   xhr.addEventListener("error",()=>reject(new TypeError("Upload network error")));xhr.addEventListener("timeout",()=>reject(new Error("Upload timed out")));xhr.addEventListener("abort",()=>reject(new DOMException("Upload cancelled","AbortError")));\n   xhr.open("POST",url);xhr.timeout=10000;const form=new FormData();form.append("file",file);try{xhr.send(form);}catch(error){reject(error);}\n  });return {promise,abort:()=>xhr.abort()};\n }\n}\nconst manager=new FileManager(),progress=[];const operation=manager.uploadWithProgress("upload",new File(["hello"],"hello.txt"),state=>progress.push(state));const result=await operation.promise;console.log(result.names[0],result.sizes[0],progress.length>0,progress.every(state=>state.percent>=0&&state.percent<=100));\n})().catch(error => { throw error; });',
            },
            {
              label: "Cancel immediately and handle a bad HTTP status",
              language: "javascript",
              code: '(async () => {\nclass FileManager{\n uploadWithProgress(url,file,onProgress=()=>{}){\n  const xhr=new XMLHttpRequest();const promise=new Promise((resolve,reject)=>{\n   xhr.upload.addEventListener("progress",event=>{if(event.lengthComputable)try{onProgress({loaded:event.loaded,total:event.total,percent:event.loaded/event.total*100});}catch(error){reject(error);xhr.abort();}});\n   xhr.addEventListener("load",()=>{if(xhr.status<200||xhr.status>=300){reject(new Error(\'HTTP \'+xhr.status));return;}try{resolve(xhr.status===204||xhr.status===205?null:JSON.parse(xhr.responseText));}catch(error){reject(error);}});\n   xhr.addEventListener("error",()=>reject(new TypeError("Upload network error")));xhr.addEventListener("timeout",()=>reject(new Error("Upload timed out")));xhr.addEventListener("abort",()=>reject(new DOMException("Upload cancelled","AbortError")));\n   xhr.open("POST",url);xhr.timeout=10000;const form=new FormData();form.append("file",file);try{xhr.send(form);}catch(error){reject(error);}\n  });return {promise,abort:()=>xhr.abort()};\n }\n}\nconst manager=new FileManager();const operation=manager.uploadWithProgress("upload",new File(["x"],"x.txt"));operation.abort();try{await operation.promise;}catch(error){console.log(error.name);}\ntry{await manager.uploadWithProgress("status/400",new File(["x"],"x.txt")).promise;}catch(error){console.log(error.message);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "uploadChunked() — slice, send, and finalize",
          explanation:
            "Upload sequential Blob slices with an upload ID and chunk metadata, then verify the final assembly response. Use a matching server protocol rather than assuming a generic upload endpoint assembles chunks.",
          note: "The included server implements a bounded in-memory teaching protocol. Production uploads need authorization, quotas, integrity checks, cleanup, and persistent storage; chunking the client alone does not provide resumability.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice",
          examples: [
            {
              label: "Assemble several chunks on the real server",
              language: "javascript",
              code: '(async () => {\nasync function uploadChunked(file,chunkSize=1024*1024,{signal,onProgress=()=>{}}={}){\n if(!Number.isSafeInteger(chunkSize)||chunkSize<1||chunkSize>1048576)throw new RangeError("Use a chunk size from 1 to 1048576");\n const totalChunks=Math.ceil(file.size/chunkSize),uploadId=crypto.randomUUID();\n for(let index=0;index<totalChunks;index++){\n  signal?.throwIfAborted();const form=new FormData();form.append("chunk",file.slice(index*chunkSize,Math.min((index+1)*chunkSize,file.size)));form.append("uploadId",uploadId);form.append("chunkIndex",String(index));form.append("totalChunks",String(totalChunks));form.append("filename",file.name);\n  const response=await fetch("upload-chunk",{method:"POST",body:form,signal});if(!response.ok)throw new Error(\'Chunk HTTP \'+response.status);await response.json();onProgress(index+1,totalChunks);\n }\n const response=await fetch("upload-complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uploadId,filename:file.name,totalChunks}),signal});if(!response.ok)throw new Error(\'Finalize HTTP \'+response.status);return response.json();\n}\nconst progress=[];const result=await uploadChunked(new File(["Hello world"],"hello.txt"),4,{onProgress:(done,total)=>progress.push(`${done}/${total}`)});console.log(result.text,result.size,result.filename,progress.join("|"));\n})().catch(error => { throw error; });',
            },
            {
              label: "Handle empty files and reject a zero chunk size",
              language: "javascript",
              code: '(async () => {\nasync function uploadChunked(file,chunkSize=1024*1024,{signal,onProgress=()=>{}}={}){\n if(!Number.isSafeInteger(chunkSize)||chunkSize<1||chunkSize>1048576)throw new RangeError("Use a chunk size from 1 to 1048576");\n const totalChunks=Math.ceil(file.size/chunkSize),uploadId=crypto.randomUUID();\n for(let index=0;index<totalChunks;index++){\n  signal?.throwIfAborted();const form=new FormData();form.append("chunk",file.slice(index*chunkSize,Math.min((index+1)*chunkSize,file.size)));form.append("uploadId",uploadId);form.append("chunkIndex",String(index));form.append("totalChunks",String(totalChunks));form.append("filename",file.name);\n  const response=await fetch("upload-chunk",{method:"POST",body:form,signal});if(!response.ok)throw new Error(\'Chunk HTTP \'+response.status);await response.json();onProgress(index+1,totalChunks);\n }\n const response=await fetch("upload-complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uploadId,filename:file.name,totalChunks}),signal});if(!response.ok)throw new Error(\'Finalize HTTP \'+response.status);return response.json();\n}\nconst result=await uploadChunked(new File([],"empty.txt"),4);console.log(result.size,result.text);try{await uploadChunked(new File(["x"],"x.txt"),0);}catch(error){console.log(error.name);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "downloadWithProgress() — byte counts and cleanup",
          explanation:
            "Read streamed chunks and report loaded bytes with a percentage only when a usable total exists. Return the Blob and a disposable link.",
          note: "This buffers the result for a Blob, and Content-Length may be unavailable or unsuitable for decoded bytes. Callback errors cancel the reader and release its lock.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader",
          examples: [
            {
              label: "Display known-length progress in a real element",
              language: "javascript",
              code: '(async () => {\nfunction triggerDownload(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);return {link,dispose(){link.remove();URL.revokeObjectURL(url);}};}\nasync function downloadWithProgress(url,filename,onProgress=()=>{},{signal}={}){\n const response=await fetch(url,{signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);if(!response.body)throw new Error("Missing body");\n const header=response.headers.get("Content-Length"),total=header!==null&&!response.headers.get("Content-Encoding")&&Number(header)>0?Number(header):null;\n const reader=response.body.getReader(),chunks=[];let loaded=0,complete=false;\n try{while(true){const {done,value}=await reader.read();if(done){complete=true;break;}chunks.push(value);loaded+=value.byteLength;onProgress({loaded,total,percent:total===null?null:loaded/total*100});}}finally{if(!complete)await reader.cancel().catch(()=>{});reader.releaseLock();}\n const blob=new Blob(chunks,{type:response.headers.get("Content-Type")||"application/octet-stream"});return {blob,...triggerDownload(blob,filename)};\n}\nconst bar=document.createElement("progress");bar.max=100;const file=await downloadWithProgress("file","hello.txt",state=>{if(state.percent!==null)bar.value=state.percent;});try{console.log(bar.value,file.blob.size,await file.blob.text());}finally{file.dispose();}\n})().catch(error => { throw error; });',
            },
            {
              label: "Handle an unknown total without NaN percentages",
              language: "javascript",
              code: '(async () => {\nfunction triggerDownload(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);return {link,dispose(){link.remove();URL.revokeObjectURL(url);}};}\nasync function downloadWithProgress(url,filename,onProgress=()=>{},{signal}={}){\n const response=await fetch(url,{signal});if(!response.ok)throw new Error(\'HTTP \'+response.status);if(!response.body)throw new Error("Missing body");\n const header=response.headers.get("Content-Length"),total=header!==null&&!response.headers.get("Content-Encoding")&&Number(header)>0?Number(header):null;\n const reader=response.body.getReader(),chunks=[];let loaded=0,complete=false;\n try{while(true){const {done,value}=await reader.read();if(done){complete=true;break;}chunks.push(value);loaded+=value.byteLength;onProgress({loaded,total,percent:total===null?null:loaded/total*100});}}finally{if(!complete)await reader.cancel().catch(()=>{});reader.releaseLock();}\n const blob=new Blob(chunks,{type:response.headers.get("Content-Type")||"application/octet-stream"});return {blob,...triggerDownload(blob,filename)};\n}\nconst progress=[];const file=await downloadWithProgress("file-unknown","hello.txt",state=>progress.push(state));file.dispose();console.log(progress.at(-1).loaded,progress.at(-1).total,progress.at(-1).percent);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "downloadResumable() — join validated saved bytes",
          explanation:
            "Send Range with If-Range for a saved prefix, validate Content-Range, then combine the prefix with the received tail. If the server returns 200, replace the prefix with the complete new representation.",
          note: "A byte count alone cannot reconstruct a file: this helper requires the actual saved Blob and a strong saved ETag. It accepts only complete tail ranges, handles an already-complete 416, and keeps the result in memory.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests",
          examples: [
            {
              label: "Resume from a real saved prefix",
              language: "javascript",
              code: '(async () => {\nfunction triggerDownload(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);return {link,dispose(){link.remove();URL.revokeObjectURL(url);}};}\nasync function downloadResumable(url,filename,{existing=new Blob(),etag,signal}={}){\n const headers=new Headers();if(existing.size){if(!etag||etag.startsWith("W/"))throw new Error("A strong saved ETag is required");headers.set("Range",\'bytes=\'+existing.size+\'-\');headers.set("If-Range",etag);}\n const response=await fetch(url,{headers,signal,cache:"no-store"});let blob;\n if(response.status===416){const total=response.headers.get("Content-Range")?.match(/^bytes \\*\\/(\\d+)$/);if(!total||Number(total[1])!==existing.size||response.headers.get("ETag")!==etag)throw new Error("Range does not match saved bytes");blob=existing;}\n else if(response.status===206){\n  const range=response.headers.get("Content-Range")?.match(/^bytes (\\d+)-(\\d+)\\/(\\d+)$/);\n  if(!range||Number(range[1])!==existing.size||Number(range[2])!==Number(range[3])-1||response.headers.get("ETag")!==etag)throw new Error("Invalid partial response");\n  const tail=await response.blob();if(tail.size!==Number(range[2])-Number(range[1])+1)throw new Error("Incomplete range body");blob=new Blob([existing,tail],{type:tail.type});\n }else if(response.status===200){blob=await response.blob();}\n else throw new Error(\'HTTP \'+response.status);\n return {blob,etag:response.headers.get("ETag"),...triggerDownload(blob,filename)};\n}\nconst file=await downloadResumable("file","hello.txt",{existing:new Blob(["Hello "]),etag:\'"file-v1"\'});try{console.log(await file.blob.text(),file.blob.size);}finally{file.dispose();}\n})().catch(error => { throw error; });',
            },
            {
              label: "Restart when Range is ignored and reject bad metadata",
              language: "javascript",
              code: '(async () => {\nfunction triggerDownload(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);return {link,dispose(){link.remove();URL.revokeObjectURL(url);}};}\nasync function downloadResumable(url,filename,{existing=new Blob(),etag,signal}={}){\n const headers=new Headers();if(existing.size){if(!etag||etag.startsWith("W/"))throw new Error("A strong saved ETag is required");headers.set("Range",\'bytes=\'+existing.size+\'-\');headers.set("If-Range",etag);}\n const response=await fetch(url,{headers,signal,cache:"no-store"});let blob;\n if(response.status===416){const total=response.headers.get("Content-Range")?.match(/^bytes \\*\\/(\\d+)$/);if(!total||Number(total[1])!==existing.size||response.headers.get("ETag")!==etag)throw new Error("Range does not match saved bytes");blob=existing;}\n else if(response.status===206){\n  const range=response.headers.get("Content-Range")?.match(/^bytes (\\d+)-(\\d+)\\/(\\d+)$/);\n  if(!range||Number(range[1])!==existing.size||Number(range[2])!==Number(range[3])-1||response.headers.get("ETag")!==etag)throw new Error("Invalid partial response");\n  const tail=await response.blob();if(tail.size!==Number(range[2])-Number(range[1])+1)throw new Error("Incomplete range body");blob=new Blob([existing,tail],{type:tail.type});\n }else if(response.status===200){blob=await response.blob();}\n else throw new Error(\'HTTP \'+response.status);\n return {blob,etag:response.headers.get("ETag"),...triggerDownload(blob,filename)};\n}\nconst file=await downloadResumable("file-ignore","hello.txt",{existing:new Blob(["Hello "]),etag:\'"file-v1"\'});console.log(await file.blob.text());file.dispose();try{await downloadResumable("file-bad","hello.txt",{existing:new Blob(["Hello "]),etag:\'"file-v1"\'});}catch(error){console.log(error.message);}\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Resumable download completion and changed validators",
          explanation:
            "Treat a matching 416 as an already complete saved file, and restart when If-Range detects a changed representation. Keep cleanup identical to a fresh download.",
          note: "The validator must identify the saved bytes, not merely be fetched immediately before resuming an unrelated prefix. Cross-origin access also requires exposing range metadata.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests",
          examples: [
            {
              label: "Keep a fully saved file after matching 416",
              language: "javascript",
              code: '(async () => {\nfunction triggerDownload(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);return {link,dispose(){link.remove();URL.revokeObjectURL(url);}};}\nasync function downloadResumable(url,filename,{existing=new Blob(),etag,signal}={}){\n const headers=new Headers();if(existing.size){if(!etag||etag.startsWith("W/"))throw new Error("A strong saved ETag is required");headers.set("Range",\'bytes=\'+existing.size+\'-\');headers.set("If-Range",etag);}\n const response=await fetch(url,{headers,signal,cache:"no-store"});let blob;\n if(response.status===416){const total=response.headers.get("Content-Range")?.match(/^bytes \\*\\/(\\d+)$/);if(!total||Number(total[1])!==existing.size||response.headers.get("ETag")!==etag)throw new Error("Range does not match saved bytes");blob=existing;}\n else if(response.status===206){\n  const range=response.headers.get("Content-Range")?.match(/^bytes (\\d+)-(\\d+)\\/(\\d+)$/);\n  if(!range||Number(range[1])!==existing.size||Number(range[2])!==Number(range[3])-1||response.headers.get("ETag")!==etag)throw new Error("Invalid partial response");\n  const tail=await response.blob();if(tail.size!==Number(range[2])-Number(range[1])+1)throw new Error("Incomplete range body");blob=new Blob([existing,tail],{type:tail.type});\n }else if(response.status===200){blob=await response.blob();}\n else throw new Error(\'HTTP \'+response.status);\n return {blob,etag:response.headers.get("ETag"),...triggerDownload(blob,filename)};\n}\nconst file=await downloadResumable("file","hello.txt",{existing:new Blob(["Hello world"]),etag:\'"file-v1"\'});console.log(await file.blob.text());file.dispose();\n})().catch(error => { throw error; });',
            },
            {
              label: "Restart for an old validator instead of appending",
              language: "javascript",
              code: '(async () => {\nfunction triggerDownload(blob,filename){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=filename;link.textContent=\'Save \'+filename;document.body.append(link);return {link,dispose(){link.remove();URL.revokeObjectURL(url);}};}\nasync function downloadResumable(url,filename,{existing=new Blob(),etag,signal}={}){\n const headers=new Headers();if(existing.size){if(!etag||etag.startsWith("W/"))throw new Error("A strong saved ETag is required");headers.set("Range",\'bytes=\'+existing.size+\'-\');headers.set("If-Range",etag);}\n const response=await fetch(url,{headers,signal,cache:"no-store"});let blob;\n if(response.status===416){const total=response.headers.get("Content-Range")?.match(/^bytes \\*\\/(\\d+)$/);if(!total||Number(total[1])!==existing.size||response.headers.get("ETag")!==etag)throw new Error("Range does not match saved bytes");blob=existing;}\n else if(response.status===206){\n  const range=response.headers.get("Content-Range")?.match(/^bytes (\\d+)-(\\d+)\\/(\\d+)$/);\n  if(!range||Number(range[1])!==existing.size||Number(range[2])!==Number(range[3])-1||response.headers.get("ETag")!==etag)throw new Error("Invalid partial response");\n  const tail=await response.blob();if(tail.size!==Number(range[2])-Number(range[1])+1)throw new Error("Incomplete range body");blob=new Blob([existing,tail],{type:tail.type});\n }else if(response.status===200){blob=await response.blob();}\n else throw new Error(\'HTTP \'+response.status);\n return {blob,etag:response.headers.get("ETag"),...triggerDownload(blob,filename)};\n}\nconst file=await downloadResumable("file","hello.txt",{existing:new Blob(["old"]),etag:\'"old-version"\'});console.log(await file.blob.text());file.dispose();\n})().catch(error => { throw error; });',
            },
          ],
        },
      ],
    },
  ],
};

(() => {
  const content = document.querySelector("#content");
  const nav = document.querySelector("#nav");
  const search = document.querySelector("#search");
  const reset = document.querySelector("#reset");
  const count = document.querySelector("#count");
  const total = handbook.categories.reduce(
    (sum, category) => sum + category.methods.length,
    0,
  );
  const examples = handbook.categories.reduce(
    (sum, category) =>
      sum +
      category.methods.reduce((sum, method) => sum + method.examples.length, 0),
    0,
  );
  document.querySelector("#sheet-summary").textContent =
    `${handbook.categories.length} ${handbook.categories.length === 1 ? "category" : "categories"} · ${total} ${total === 1 ? "entry" : "entries"} · ${examples} examples`;
  search.disabled = total === 0;
  reset.disabled = total === 0;

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function codeBlock(parent, example) {
    const head = node("div", undefined, "example-head");
    const copy = node("button", "Copy");
    copy.type = "button";
    copy.setAttribute("aria-label", "Copy " + example.label);
    head.append(node("span", example.label), copy);
    const pre = node("pre");
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", example.label);
    const code = node(
      "code",
      example.code,
      "language-" + (example.language || "javascript"),
    );
    pre.append(code);
    parent.append(head, pre);
    window.HandbookHighlight?.highlight(code);
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(example.code);
        copy.textContent = "Copied!";
      } catch {
        copy.textContent = "Select code to copy";
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      window.setTimeout(() => {
        copy.textContent = "Copy";
      }, 1800);
    });
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const fragment = document.createDocumentFragment();
    const menu = document.createDocumentFragment();
    let shown = 0;
    for (const category of handbook.categories) {
      const categoryMatch = category.name.toLowerCase().includes(query);
      const methods = category.methods.filter(
        (method) =>
          !query ||
          categoryMatch ||
          category.methodCategories?.[category.methods.indexOf(method)]?.name
            .toLowerCase()
            .includes(query) ||
          JSON.stringify(method).toLowerCase().includes(query),
      );
      if (!methods.length) continue;
      const section = node("section");
      section.id = category.id;
      section.append(node("h2", category.name));
      const link = node("a", category.name);
      link.href = "#" + category.id;
      menu.append(link);
      for (const intro of [category.intro].flat().filter(Boolean))
        section.append(node("p", intro));
      for (const example of category.setup || []) codeBlock(section, example);
      const renderedContexts = new Set();
      for (const method of methods) {
        const originalCategory =
          category.methodCategories?.[category.methods.indexOf(method)];
        const context = category.contexts?.[originalCategory?.id];
        if (context && !renderedContexts.has(originalCategory.id)) {
          for (const intro of [context.intro].flat().filter(Boolean))
            section.append(node("p", intro));
          for (const example of context.setup || [])
            codeBlock(section, example);
          renderedContexts.add(originalCategory.id);
        }
        const entry = node("article", undefined, "entry");
        entry.dataset.progressId =
          "fetch-api-cheatsheet:" +
          (category.methodCategories?.[category.methods.indexOf(method)]?.id ||
            category.id) +
          ":" +
          method.name;
        const heading = node("h3");
        heading.append(node("code", method.name));
        entry.append(heading, node("p", method.explanation));
        if (method.note) entry.append(node("p", method.note, "method-note"));
        for (const example of method.examples) {
          entry.append(node("h4", example.label));
          if (example.note)
            entry.append(node("p", example.note, "method-note"));
          if (example.files) {
            for (const file of example.files) {
              codeBlock(entry, {
                label: file.path,
                code: file.code,
                language: file.language || "javascript",
              });
            }
          } else {
            codeBlock(entry, example);
          }
        }
        if (method.source) {
          const source = node("a", "Official reference ↗", "source");
          source.href = method.source;
          source.target = "_blank";
          source.rel = "noopener noreferrer";
          entry.append(source);
        }
        window.HandbookHighlight?.highlight(heading);
        section.append(entry);
      }
      fragment.append(section);
      shown += methods.length;
    }
    if (!shown)
      fragment.append(
        node(
          "p",
          total
            ? "No matches. Try another term or reset search."
            : "Ready for the first category image. Its items and examples will appear here.",
          "empty",
        ),
      );
    content.replaceChildren(fragment);
    nav.replaceChildren(menu);
    count.textContent = `${shown} of ${total} entries`;
  }
  search.addEventListener("input", render);
  reset.addEventListener("click", () => {
    search.value = "";
    render();
    search.focus();
  });
  render();
})();
