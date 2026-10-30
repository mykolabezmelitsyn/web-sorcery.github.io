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
          code: 'import { createServer } from "node:http";\nimport { readFile } from "node:fs/promises";\nimport { pathToFileURL } from "node:url";\n\n// Local teaching API: no persistent data, real authentication, or external calls.\nexport function createDemoServer(\n  servePage = () => readFile(new URL("./index.html", import.meta.url)),\n) {\n  const states = new Map();\n  return createServer(async (req, res) => {\n    try {\n      const url = new URL(req.url, "http://localhost");\n      const marker = url.pathname.indexOf("/api/");\n      if (marker < 0) {\n        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });\n        res.end(await servePage(url.pathname));\n        return;\n      }\n      const scope = url.pathname.slice(0, marker);\n      if (!states.has(scope))\n        states.set(scope, {\n          users: new Map(),\n          nextId: 1,\n          retry: new Map(),\n          attempts: 0,\n        });\n      const state = states.get(scope),\n        route = url.pathname.slice(marker + 5);\n      const json = (status, data, headers = {}) => {\n        res.writeHead(status, {\n          "Content-Type": "application/json",\n          ...headers,\n        });\n        res.end(JSON.stringify(data));\n      };\n      const buffers = [];\n      for await (const chunk of req) buffers.push(chunk);\n      const raw = Buffer.concat(buffers);\n      const body = () => JSON.parse(raw.toString() || "{}");\n      if (route === "echo")\n        return json(200, {\n          method: req.method,\n          query: Object.fromEntries(url.searchParams),\n          headers: req.headers,\n          body: raw.toString(),\n        });\n      if (route === "data") return json(200, { message: "hello" });\n      if (route === "text") {\n        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });\n        res.end("hello text");\n        return;\n      }\n      if (route === "binary") {\n        res.writeHead(200, { "Content-Type": "application/octet-stream" });\n        res.end(Buffer.from([1, 2, 3]));\n        return;\n      }\n      if (route === "bad-json") {\n        res.writeHead(200, { "Content-Type": "application/json" });\n        res.end("{broken");\n        return;\n      }\n      if (route === "empty-json") {\n        res.writeHead(200, { "Content-Type": "application/json" });\n        res.end();\n        return;\n      }\n      if (/^status\\/\\d+$/.test(route)) {\n        const status = Number(route.split("/")[1]);\n        if (status === 204 || status === 205) {\n          res.writeHead(status);\n          res.end();\n          return;\n        }\n        return json(status, {\n          message: status === 400 ? "Name is required" : "Demo error",\n        });\n      }\n      if (route === "refresh") return json(200, { token: "fresh-demo-token" });\n      if (route === "protected")\n        return req.headers.authorization === "Bearer fresh-demo-token"\n          ? json(200, { authorized: true })\n          : json(401, { message: "Expired token" });\n      if (route === "retry") {\n        const key = req.headers["idempotency-key"];\n        if (!key) return json(400, { message: "Missing idempotency key" });\n        const attempts = (state.retry.get(key) || 0) + 1;\n        state.retry.set(key, attempts);\n        return attempts === 1\n          ? json(503, { message: "Temporary failure" })\n          : json(201, { created: true, attempts });\n      }\n      if (route === "upload") {\n        const form = await new Request("http://localhost/upload", {\n          method: "POST",\n          headers: { "content-type": req.headers["content-type"] },\n          body: raw,\n        }).formData();\n        const file = form.get("file") || form.get("avatar");\n        return json(201, {\n          name: form.get("name"),\n          filename: file?.name,\n          size: file?.size,\n          uploaded: true,\n        });\n      }\n      if (route === "users" && req.method === "POST") {\n        const user = { ...body(), id: state.nextId++ };\n        state.users.set(user.id, user);\n        return json(201, user);\n      }\n      const match = route.match(/^users\\/(\\d+)$/);\n      if (match) {\n        const id = Number(match[1]),\n          user = state.users.get(id);\n        if (!user) return json(404, { message: "User not found" });\n        if (req.method === "GET") return json(200, user);\n        if (req.method === "PUT") {\n          const next = { ...body(), id };\n          state.users.set(id, next);\n          return json(200, next);\n        }\n        if (req.method === "PATCH") {\n          const next = { ...user, ...body(), id };\n          state.users.set(id, next);\n          return json(200, next);\n        }\n        if (req.method === "DELETE") {\n          state.users.delete(id);\n          res.writeHead(204);\n          res.end();\n          return;\n        }\n      }\n      return json(404, { message: "Unknown route" });\n    } catch (error) {\n      res.writeHead(400, { "Content-Type": "application/json" });\n      res.end(JSON.stringify({ message: error.message }));\n    }\n  });\n}\nif (\n  process.argv[1] &&\n  import.meta.url === pathToFileURL(process.argv[1]).href\n) {\n  createDemoServer().listen(3000, "127.0.0.1", () =>\n    console.log("Open http://127.0.0.1:3000 and use the browser console"),\n  );\n}',
        },
        {
          label: "index.html — local console page",
          language: "html",
          code: '<!doctype html>\n<html lang="en"\n  ><meta charset="utf-8" /><title>Fetch examples</title\n  ><h1>Fetch examples</h1\n  ><p>Open the browser console and paste one Basic Requests example.</p></html\n>',
        },
      ],
      methods: [
        {
          name: "GET — fetch JSON",
          explanation:
            "Fetch a resource, check the HTTP status, then await body parsing.",
          note: "A fulfilled fetch promise can contain an HTTP error response. Body readers are asynchronous and normally consume the body once.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Read a JSON response",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("api/data");\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  console.log(data.message, response.status);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Compare default and explicit GET",
              language: "javascript",
              code: '(async () => {\n  const implicit = await fetch("api/echo");\n  const explicit = await fetch("api/echo", { method: "GET" });\n  console.log((await implicit.json()).method, (await explicit.json()).method);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "GET query parameters with URLSearchParams",
          explanation: "Adds correctly encoded query values to a URL.",
          note: "GET requests cannot have a fetch request body. Query values are strings; append repeated keys explicitly when the API accepts them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Send pagination and sort parameters",
              language: "javascript",
              code: '(async () => {\n  const params = new URLSearchParams({ page: 1, limit: 10, sort: "date" });\n  const response = await fetch(`api/echo?${params}`);\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  console.log(data.query.page, data.query.limit, data.query.sort);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Encode special characters and repeated keys",
              language: "javascript",
              code: '(async () => {\n  const params = new URLSearchParams({ q: "JavaScript & DOM" });\n  params.append("tag", "web");\n  params.append("tag", "api");\n  console.log(params.getAll("tag").join("|"));\n  const response = await fetch(`api/echo?${params}`);\n  console.log((await response.json()).query.q);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "GET headers — Accept and Authorization",
          explanation:
            "Sets the preferred response format and, when needed, an access token.",
          note: "Accept does not force the server to return JSON. Demo tokens here are local fixture values; cross-origin Authorization requests require appropriate server CORS support.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Send a format preference and a demo token",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("api/echo", {\n    headers: { Accept: "application/json", Authorization: "Bearer demo-token" },\n  });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  console.log(data.headers.accept, data.headers.authorization);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Build headers with the Headers API",
              language: "javascript",
              code: '(async () => {\n  const headers = new Headers({ Accept: "text/plain" });\n  headers.set("Accept", "application/json");\n  const response = await fetch("api/echo", { headers });\n  const data = await response.json();\n  console.log(data.headers.accept);\n})().catch((error) => {\n  throw error;\n});',
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
              code: '(async () => {\n  const request = new Request(new URL("api/data", location.href), {\n    cache: "no-cache",\n  });\n  const response = await fetch(request);\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  console.log(request.cache, (await response.json()).message);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Bypass the browser HTTP cache",
              language: "javascript",
              code: '(async () => {\n  const request = new Request(new URL("api/data", location.href), {\n    cache: "no-store",\n  });\n  const response = await fetch(request);\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  console.log(request.cache, response.ok);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "getData() — parse by response content type",
          explanation:
            "Checks the response status and reads the body using its content type.",
          note: "Recognizes JSON suffix media types and text/ prefixes; 204 and 205 return null. An advertised JSON body that is empty or invalid still causes parsing to reject.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Read JSON and text with one helper",
              language: "javascript",
              code: '(async () => {\n  async function getData(url) {\n    const response = await fetch(url, {\n      headers: { Accept: "application/json, text/plain, */*" },\n      cache: "no-cache",\n    });\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const type = (response.headers.get("content-type") || "")\n      .split(";")[0]\n      .trim()\n      .toLowerCase();\n    if (type === "application/json" || type.endsWith("+json"))\n      return await response.json();\n    if (type.startsWith("text/")) return await response.text();\n    return await response.blob();\n  }\n  console.log((await getData("api/data")).message, await getData("api/text"));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Read binary data and handle no content",
              language: "javascript",
              code: '(async () => {\n  async function getData(url) {\n    const response = await fetch(url, {\n      headers: { Accept: "application/json, text/plain, */*" },\n      cache: "no-cache",\n    });\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const type = (response.headers.get("content-type") || "")\n      .split(";")[0]\n      .trim()\n      .toLowerCase();\n    if (type === "application/json" || type.endsWith("+json"))\n      return await response.json();\n    if (type.startsWith("text/")) return await response.text();\n    return await response.blob();\n  }\n  const blob = await getData("api/binary");\n  console.log(blob.size, blob.type);\n  console.log(await getData("api/status/204"));\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Handle HTTP and body parsing errors",
          explanation:
            "Check response.ok explicitly and let malformed body parsing reject.",
          note: "Throwing an HTTP error does not imply that fetch itself rejected; HTTP status failures and JSON parse failures are distinct.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Catch an HTTP status failure",
              language: "javascript",
              code: '(async () => {\n  async function getData(url) {\n    const response = await fetch(url, {\n      headers: { Accept: "application/json, text/plain, */*" },\n      cache: "no-cache",\n    });\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const type = (response.headers.get("content-type") || "")\n      .split(";")[0]\n      .trim()\n      .toLowerCase();\n    if (type === "application/json" || type.endsWith("+json"))\n      return await response.json();\n    if (type.startsWith("text/")) return await response.text();\n    return await response.blob();\n  }\n  try {\n    await getData("api/status/404");\n  } catch (error) {\n    console.log(error.message);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Catch invalid JSON without hiding it",
              language: "javascript",
              code: '(async () => {\n  async function getData(url) {\n    const response = await fetch(url, {\n      headers: { Accept: "application/json, text/plain, */*" },\n      cache: "no-cache",\n    });\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const type = (response.headers.get("content-type") || "")\n      .split(";")[0]\n      .trim()\n      .toLowerCase();\n    if (type === "application/json" || type.endsWith("+json"))\n      return await response.json();\n    if (type.startsWith("text/")) return await response.text();\n    return await response.blob();\n  }\n  try {\n    await getData("api/bad-json");\n  } catch (error) {\n    console.log(error instanceof SyntaxError);\n  }\n  try {\n    await getData("api/empty-json");\n  } catch (error) {\n    console.log(error instanceof SyntaxError);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "buildUrl() — preserve and encode query parameters",
          explanation:
            "Use URL to keep the base path and existing query while adding parameters.",
          note: "This helper skips nullish values, retains zero and false, replaces scalar keys, and appends array entries. URL handles query placement before a fragment.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams",
          examples: [
            {
              label: "Build a search URL",
              language: "javascript",
              code: '(async () => {\n  function buildUrl(base, params) {\n    const url = new URL(base, location.href);\n    for (const [key, value] of Object.entries(params)) {\n      if (value == null) continue;\n      if (Array.isArray(value)) {\n        for (const item of value) url.searchParams.append(key, String(item));\n      } else url.searchParams.set(key, String(value));\n    }\n    return url.toString();\n  }\n  const url = buildUrl("api/echo", { q: "javascript", limit: 20, offset: 0 });\n  const response = await fetch(url);\n  const data = await response.json();\n  console.log(data.query.q, data.query.limit, data.query.offset);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Preserve other keys and append repeated values",
              language: "javascript",
              code: '(async () => {\n  function buildUrl(base, params) {\n    const url = new URL(base, location.href);\n    for (const [key, value] of Object.entries(params)) {\n      if (value == null) continue;\n      if (Array.isArray(value)) {\n        for (const item of value) url.searchParams.append(key, String(item));\n      } else url.searchParams.set(key, String(value));\n    }\n    return url.toString();\n  }\n  const url = new URL(\n    buildUrl("api/echo?keep=yes&q=old#results", {\n      q: "A&B",\n      tag: ["web", "api"],\n      skip: null,\n      enabled: false,\n    }),\n  );\n  console.log(\n    url.searchParams.get("keep"),\n    url.searchParams.get("q"),\n    url.searchParams.getAll("tag").join("|"),\n    url.searchParams.has("skip"),\n    url.searchParams.get("enabled"),\n    url.hash,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "POST — send JSON",
          explanation:
            "Set POST, serialize the data, and identify the JSON request body with Content-Type.",
          note: "Check response.ok before reading the result; a successful creation may return 201, while some APIs return an empty response.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Create a user",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: "John Doe", email: "john@example.com" }),\n  });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const user = await response.json();\n  console.log(\n    response.status,\n    user.name,\n    user.email,\n    Number.isInteger(user.id),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Inspect the actual method and JSON body",
              language: "javascript",
              code: '(async () => {\n  const payload = { name: "Jane", active: false };\n  const response = await fetch("api/echo", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(payload),\n  });\n  const data = await response.json();\n  console.log(\n    data.method,\n    data.headers["content-type"],\n    JSON.parse(data.body).active,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "POST FormData — fields and files",
          explanation:
            "Add text and file values to FormData and pass it directly as the body.",
          note: "Omit a manual Content-Type so the browser supplies the matching multipart boundary. These examples create a File directly so no file input is left undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Upload a defined avatar file",
              language: "javascript",
              code: '(async () => {\n  const form = new FormData();\n  form.append("name", "John Doe");\n  form.append(\n    "avatar",\n    new File(["avatar"], "avatar.txt", { type: "text/plain" }),\n  );\n  const response = await fetch("api/upload", { method: "POST", body: form });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  console.log(data.name, data.filename, data.size, response.status);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Verify the generated multipart boundary",
              language: "javascript",
              code: '(async () => {\n  const form = new FormData();\n  form.append("name", "Jane");\n  const request = new Request(new URL("api/echo", location.href), {\n    method: "POST",\n    body: form,\n  });\n  const response = await fetch(request);\n  const data = await response.json();\n  console.log(\n    data.headers["content-type"].startsWith("multipart/form-data; boundary="),\n    data.body.includes("Jane"),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "POST URL-encoded form fields",
          explanation:
            "Use URLSearchParams as a request body to send application/x-www-form-urlencoded data.",
          note: "Fetch supplies the form media type for a URLSearchParams body unless overridden; values are encoded as text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Send form fields",
              language: "javascript",
              code: '(async () => {\n  const params = new URLSearchParams({\n    username: "john",\n    password: "demo-only",\n  });\n  const response = await fetch("api/echo", { method: "POST", body: params });\n  const data = await response.json();\n  const fields = new URLSearchParams(data.body);\n  console.log(\n    fields.get("username"),\n    data.headers["content-type"].startsWith(\n      "application/x-www-form-urlencoded",\n    ),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Preserve special characters and repeated fields",
              language: "javascript",
              code: '(async () => {\n  const params = new URLSearchParams();\n  params.append("q", "A+B & C");\n  params.append("tag", "one");\n  params.append("tag", "two");\n  const response = await fetch("api/echo", { method: "POST", body: params });\n  const data = await response.json();\n  const fields = new URLSearchParams(data.body);\n  console.log(fields.get("q"), fields.getAll("tag").join("|"));\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Trace a request with X-Request-ID",
          explanation: "Adds an ID so the server can track the request.",
          note: "A tracing identifier does not make a POST idempotent. Cross-origin custom headers generally require a CORS preflight.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Send and inspect a request ID",
              language: "javascript",
              code: '(async () => {\n  const id = crypto.randomUUID();\n  const response = await fetch("api/echo", {\n    method: "POST",\n    headers: { "Content-Type": "application/json", "X-Request-ID": id },\n    body: "{}",\n  });\n  const data = await response.json();\n  console.log(data.headers["x-request-id"] === id, id.length);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Keep tracing and idempotency identifiers separate",
              language: "javascript",
              code: '(async () => {\n  const trace = crypto.randomUUID(),\n    operation = crypto.randomUUID();\n  const response = await fetch("api/echo", {\n    method: "POST",\n    headers: { "X-Request-ID": trace, "Idempotency-Key": operation },\n    body: "demo",\n  });\n  const data = await response.json();\n  console.log(\n    data.headers["x-request-id"] === trace,\n    data.headers["idempotency-key"] === operation,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "postData() — bounded retries with backoff",
          explanation:
            "Retries selected temporary failures, waiting longer between attempts.",
          note: "Never assume POST is safe to replay. This teaching helper retries only 502/503/504, propagates network and parse failures, and does not retry validation failures; production policies may also require Retry-After and jitter.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Retry one temporary server failure",
              language: "javascript",
              code: '(async () => {\n  async function postData(\n    url,\n    data,\n    { attempts = 3, key = crypto.randomUUID() } = {},\n  ) {\n    if (!Number.isInteger(attempts) || attempts < 1)\n      throw new RangeError("Use a positive attempt count");\n    const body = JSON.stringify(data);\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      const response = await fetch(url, {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          "Idempotency-Key": key,\n          "X-Request-ID": crypto.randomUUID(),\n        },\n        body,\n      });\n      if (response.ok)\n        return response.status === 204 || response.status === 205\n          ? null\n          : await response.json();\n      const text = await response.text();\n      if (\n        ![502, 503, 504].includes(response.status) ||\n        attempt === attempts - 1\n      )\n        throw new Error("HTTP " + response.status + ": " + text);\n      await new Promise((resolve) => setTimeout(resolve, 20 * 2 ** attempt));\n    }\n  }\n  const result = await postData("api/retry", { name: "John" });\n  console.log(result.created, result.attempts);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Stop on validation failure or exhausted attempts",
              language: "javascript",
              code: '(async () => {\n  async function postData(\n    url,\n    data,\n    { attempts = 3, key = crypto.randomUUID() } = {},\n  ) {\n    if (!Number.isInteger(attempts) || attempts < 1)\n      throw new RangeError("Use a positive attempt count");\n    const body = JSON.stringify(data);\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      const response = await fetch(url, {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          "Idempotency-Key": key,\n          "X-Request-ID": crypto.randomUUID(),\n        },\n        body,\n      });\n      if (response.ok)\n        return response.status === 204 || response.status === 205\n          ? null\n          : await response.json();\n      const text = await response.text();\n      if (\n        ![502, 503, 504].includes(response.status) ||\n        attempt === attempts - 1\n      )\n        throw new Error("HTTP " + response.status + ": " + text);\n      await new Promise((resolve) => setTimeout(resolve, 20 * 2 ** attempt));\n    }\n  }\n  try {\n    await postData("api/status/400", {});\n  } catch (error) {\n    console.log(error.message.startsWith("HTTP 400:"));\n  }\n  try {\n    await postData("api/retry", {}, { attempts: 1 });\n  } catch (error) {\n    console.log(error.message.startsWith("HTTP 503:"));\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Refresh authorization once after a 401",
          explanation:
            "Refresh a token through a supplied function, then send one new request with the updated token.",
          note: "This fixture models a server that rejects unauthorized requests before applying any effect. Real refresh credentials and replay behavior depend on the API contract.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Refresh and actually send the new token",
              language: "javascript",
              code: '(async () => {\n  async function postWithRefresh(url, data, token, refreshAuthToken) {\n    const send = (currentToken) =>\n      fetch(url, {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          Authorization: "Bearer " + currentToken,\n        },\n        body: JSON.stringify(data),\n      });\n    let response = await send(token);\n    if (response.status === 401) {\n      await response.text();\n      token = await refreshAuthToken();\n      response = await send(token);\n    }\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return await response.json();\n  }\n  const refreshAuthToken = async () => {\n    const response = await fetch("api/refresh", { method: "POST" });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return (await response.json()).token;\n  };\n  console.log(\n    (await postWithRefresh("api/protected", {}, "expired", refreshAuthToken))\n      .authorized,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Fail after one unsuccessful refresh",
              language: "javascript",
              code: '(async () => {\n  async function postWithRefresh(url, data, token, refreshAuthToken) {\n    const send = (currentToken) =>\n      fetch(url, {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          Authorization: "Bearer " + currentToken,\n        },\n        body: JSON.stringify(data),\n      });\n    let response = await send(token);\n    if (response.status === 401) {\n      await response.text();\n      token = await refreshAuthToken();\n      response = await send(token);\n    }\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return await response.json();\n  }\n  let refreshes = 0;\n  try {\n    await postWithRefresh("api/protected", {}, "expired", async () => {\n      refreshes++;\n      return "still-invalid";\n    });\n  } catch (error) {\n    console.log(error.message, refreshes);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "uploadFile() — XMLHttpRequest upload progress",
          explanation:
            "Observe xhr.upload progress events while sending a multipart file.",
          note: "Fetch has no standard upload-progress event. A computable progress event measures transmitted bytes, not server processing completion; callback frequency is browser-dependent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload",
          examples: [
            {
              label: "Upload a file and validate progress values",
              language: "javascript",
              code: '(async () => {\n  function uploadFile(url, file, onProgress = () => {}, signal) {\n    return new Promise((resolve, reject) => {\n      const xhr = new XMLHttpRequest();\n      const cleanup = () => signal?.removeEventListener("abort", abort);\n      const fail = (error) => {\n        cleanup();\n        reject(error);\n      };\n      const abort = () => xhr.abort();\n      xhr.upload.addEventListener("progress", (event) => {\n        if (event.lengthComputable) {\n          try {\n            onProgress((event.loaded / event.total) * 100);\n          } catch (error) {\n            fail(error);\n            xhr.abort();\n          }\n        }\n      });\n      xhr.addEventListener("load", () => {\n        cleanup();\n        if (xhr.status < 200 || xhr.status >= 300) {\n          reject(new Error("HTTP " + xhr.status));\n          return;\n        }\n        try {\n          resolve(\n            xhr.status === 204 || xhr.status === 205\n              ? null\n              : JSON.parse(xhr.responseText),\n          );\n        } catch (error) {\n          reject(error);\n        }\n      });\n      xhr.addEventListener("error", () =>\n        fail(new TypeError("Upload network error")),\n      );\n      xhr.addEventListener("timeout", () =>\n        fail(new Error("Upload timed out")),\n      );\n      xhr.addEventListener("abort", () =>\n        fail(new DOMException("Upload aborted", "AbortError")),\n      );\n      xhr.open("POST", url);\n      xhr.timeout = 10000;\n      if (signal?.aborted) {\n        fail(new DOMException("Upload aborted", "AbortError"));\n        return;\n      }\n      signal?.addEventListener("abort", abort, { once: true });\n      const form = new FormData();\n      form.append("file", file);\n      try {\n        xhr.send(form);\n      } catch (error) {\n        fail(error);\n      }\n    });\n  }\n  const progress = [];\n  const result = await uploadFile(\n    "api/upload",\n    new File(["hello"], "hello.txt"),\n    (value) => progress.push(value),\n  );\n  console.log(result.filename, result.size, result.uploaded);\n  console.log(progress.every((value) => value >= 0 && value <= 100));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Reject HTTP errors and an already-aborted signal",
              language: "javascript",
              code: '(async () => {\n  function uploadFile(url, file, onProgress = () => {}, signal) {\n    return new Promise((resolve, reject) => {\n      const xhr = new XMLHttpRequest();\n      const cleanup = () => signal?.removeEventListener("abort", abort);\n      const fail = (error) => {\n        cleanup();\n        reject(error);\n      };\n      const abort = () => xhr.abort();\n      xhr.upload.addEventListener("progress", (event) => {\n        if (event.lengthComputable) {\n          try {\n            onProgress((event.loaded / event.total) * 100);\n          } catch (error) {\n            fail(error);\n            xhr.abort();\n          }\n        }\n      });\n      xhr.addEventListener("load", () => {\n        cleanup();\n        if (xhr.status < 200 || xhr.status >= 300) {\n          reject(new Error("HTTP " + xhr.status));\n          return;\n        }\n        try {\n          resolve(\n            xhr.status === 204 || xhr.status === 205\n              ? null\n              : JSON.parse(xhr.responseText),\n          );\n        } catch (error) {\n          reject(error);\n        }\n      });\n      xhr.addEventListener("error", () =>\n        fail(new TypeError("Upload network error")),\n      );\n      xhr.addEventListener("timeout", () =>\n        fail(new Error("Upload timed out")),\n      );\n      xhr.addEventListener("abort", () =>\n        fail(new DOMException("Upload aborted", "AbortError")),\n      );\n      xhr.open("POST", url);\n      xhr.timeout = 10000;\n      if (signal?.aborted) {\n        fail(new DOMException("Upload aborted", "AbortError"));\n        return;\n      }\n      signal?.addEventListener("abort", abort, { once: true });\n      const form = new FormData();\n      form.append("file", file);\n      try {\n        xhr.send(form);\n      } catch (error) {\n        fail(error);\n      }\n    });\n  }\n  try {\n    await uploadFile("api/status/400", new File(["x"], "x.txt"));\n  } catch (error) {\n    console.log(error.message);\n  }\n  const controller = new AbortController();\n  controller.abort();\n  try {\n    await uploadFile(\n      "api/upload",\n      new File(["x"], "x.txt"),\n      undefined,\n      controller.signal,\n    );\n  } catch (error) {\n    console.log(error.name);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "PUT — replace a resource representation",
          explanation: "Sends replacement data for a resource using PUT.",
          note: "Which fields are writable or retained is defined by the server. This fixture retains id and replaces other fields.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Replace a user with a complete payload",
              language: "javascript",
              code: '(async () => {\n  const created = await fetch("api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: "John", email: "old@example.com", age: 30 }),\n  });\n  if (!created.ok) throw new Error("HTTP " + created.status);\n  const user = await created.json();\n  const response = await fetch(`api/users/${user.id}`, {\n    method: "PUT",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({\n      name: "Jane Doe",\n      email: "jane@example.com",\n      age: 31,\n    }),\n  });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const next = await response.json();\n  console.log(next.name, next.email, next.age);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Observe an omitted field under replacement semantics",
              language: "javascript",
              code: '(async () => {\n  const created = await fetch("api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: "John", email: "old@example.com", age: 30 }),\n  });\n  if (!created.ok) throw new Error("HTTP " + created.status);\n  const user = await created.json();\n  const response = await fetch(`api/users/${user.id}`, {\n    method: "PUT",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: "Jane" }),\n  });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const next = await response.json();\n  console.log(next.name, Object.hasOwn(next, "email"), next.id === user.id);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "PATCH — apply a partial update",
          explanation:
            "Sends the changes the server expects, without replacing the whole resource.",
          note: "PATCH is not inherently idempotent, and application/json has no universal patch semantics. This demo explicitly merges top-level JSON fields; other APIs may use JSON Patch or Merge Patch.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Update email while preserving other fields",
              language: "javascript",
              code: '(async () => {\n  const created = await fetch("api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: "John", email: "old@example.com", age: 30 }),\n  });\n  if (!created.ok) throw new Error("HTTP " + created.status);\n  const user = await created.json();\n  const response = await fetch(`api/users/${user.id}`, {\n    method: "PATCH",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ email: "new@example.com" }),\n  });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const next = await response.json();\n  console.log(next.name, next.email, next.age);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Inspect an unsupported resource failure",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("api/users/99999", {\n    method: "PATCH",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: "Jane" }),\n  });\n  console.log(response.ok, response.status, (await response.json()).message);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "DELETE — remove a resource",
          explanation: "Send DELETE to the resource URL and check response.ok.",
          note: "A successful DELETE may return 200, 202, or 204; 202 can mean processing is still pending. Do not parse JSON from a 204.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Delete with a demo Authorization header",
              language: "javascript",
              code: '(async () => {\n  const created = await fetch("api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: "John", email: "old@example.com", age: 30 }),\n  });\n  if (!created.ok) throw new Error("HTTP " + created.status);\n  const user = await created.json();\n  const response = await fetch(`api/users/${user.id}`, {\n    method: "DELETE",\n    headers: { Authorization: "Bearer demo-token" },\n  });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  console.log(response.status, await response.text());\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Handle a repeated deletion explicitly",
              language: "javascript",
              code: '(async () => {\n  const created = await fetch("api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ name: "John", email: "old@example.com", age: 30 }),\n  });\n  if (!created.ok) throw new Error("HTTP " + created.status);\n  const user = await created.json();\n  await fetch(`api/users/${user.id}`, { method: "DELETE" });\n  const again = await fetch(`api/users/${user.id}`, { method: "DELETE" });\n  console.log(again.status, again.ok);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Handle 204, 205, and other empty responses",
          explanation:
            "Return a defined empty result before attempting JSON parsing when there is no body.",
          note: "An empty 200 response and malformed nonempty JSON are distinct. This reader accepts empty bodies as null; choose stricter behavior if the API requires JSON.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Accept both no-content status codes",
              language: "javascript",
              code: '(async () => {\n  async function readJSON(response) {\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const text = await response.text();\n    return text.trim() === "" ? null : JSON.parse(text);\n  }\n  console.log(\n    await readJSON(await fetch("api/status/204")),\n    await readJSON(await fetch("api/status/205")),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Accept empty 200 and still reject malformed JSON",
              language: "javascript",
              code: '(async () => {\n  async function readJSON(response) {\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const text = await response.text();\n    return text.trim() === "" ? null : JSON.parse(text);\n  }\n  console.log(await readJSON(await fetch("api/empty-json")));\n  try {\n    await readJSON(await fetch("api/bad-json"));\n  } catch (error) {\n    console.log(error instanceof SyntaxError);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "APIClient — reusable CRUD requests",
          explanation:
            "Shares request settings and response handling across create, read, update, and delete calls.",
          note: "This JSON client accepts any HeadersInit form and sets Content-Type only when sending JSON. Keep the base URL ending in /; endpoint origin/path checks avoid sending its token outside that API base.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Create, read, replace, patch, and delete",
              language: "javascript",
              code: '(async () => {\n  async function readJSON(response) {\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const text = await response.text();\n    return text.trim() === "" ? null : JSON.parse(text);\n  }\n  class APIClient {\n    constructor(baseURL) {\n      this.baseURL = new URL(baseURL, location.href);\n      this.headers = new Headers({ Accept: "application/json" });\n    }\n    setAuthToken(token) {\n      if (token == null) this.headers.delete("Authorization");\n      else this.headers.set("Authorization", "Bearer " + token);\n    }\n    async request(endpoint, options = {}) {\n      const url = new URL(endpoint.replace(/^\\/+/, ""), this.baseURL);\n      if (\n        url.origin !== this.baseURL.origin ||\n        !url.pathname.startsWith(this.baseURL.pathname)\n      )\n        throw new Error("Endpoint outside API base");\n      const headers = new Headers(this.headers);\n      new Headers(options.headers).forEach((value, key) =>\n        headers.set(key, value),\n      );\n      return readJSON(await fetch(url, { ...options, headers }));\n    }\n    get(endpoint, options = {}) {\n      return this.request(endpoint, { ...options, method: "GET" });\n    }\n    post(endpoint, data, options = {}) {\n      return this.json("POST", endpoint, data, options);\n    }\n    put(endpoint, data, options = {}) {\n      return this.json("PUT", endpoint, data, options);\n    }\n    patch(endpoint, data, options = {}) {\n      return this.json("PATCH", endpoint, data, options);\n    }\n    delete(endpoint, options = {}) {\n      return this.request(endpoint, { ...options, method: "DELETE" });\n    }\n    json(method, endpoint, data, options) {\n      const headers = new Headers(options.headers);\n      if (!headers.has("Content-Type"))\n        headers.set("Content-Type", "application/json");\n      return this.request(endpoint, {\n        ...options,\n        method,\n        headers,\n        body: JSON.stringify(data),\n      });\n    }\n  }\n  const api = new APIClient("api/");\n  api.setAuthToken("demo-token");\n  const created = await api.post("users", { name: "John" });\n  console.log((await api.get(`users/${created.id}`)).name);\n  await api.put(`users/${created.id}`, {\n    name: "John Doe",\n    email: "john@example.com",\n  });\n  const patched = await api.patch(`users/${created.id}`, {\n    email: "new@example.com",\n  });\n  console.log(patched.name, patched.email);\n  console.log(await api.delete(`users/${created.id}`));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Override headers and clear authentication",
              language: "javascript",
              code: '(async () => {\n  async function readJSON(response) {\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const text = await response.text();\n    return text.trim() === "" ? null : JSON.parse(text);\n  }\n  class APIClient {\n    constructor(baseURL) {\n      this.baseURL = new URL(baseURL, location.href);\n      this.headers = new Headers({ Accept: "application/json" });\n    }\n    setAuthToken(token) {\n      if (token == null) this.headers.delete("Authorization");\n      else this.headers.set("Authorization", "Bearer " + token);\n    }\n    async request(endpoint, options = {}) {\n      const url = new URL(endpoint.replace(/^\\/+/, ""), this.baseURL);\n      if (\n        url.origin !== this.baseURL.origin ||\n        !url.pathname.startsWith(this.baseURL.pathname)\n      )\n        throw new Error("Endpoint outside API base");\n      const headers = new Headers(this.headers);\n      new Headers(options.headers).forEach((value, key) =>\n        headers.set(key, value),\n      );\n      return readJSON(await fetch(url, { ...options, headers }));\n    }\n    get(endpoint, options = {}) {\n      return this.request(endpoint, { ...options, method: "GET" });\n    }\n    post(endpoint, data, options = {}) {\n      return this.json("POST", endpoint, data, options);\n    }\n    put(endpoint, data, options = {}) {\n      return this.json("PUT", endpoint, data, options);\n    }\n    patch(endpoint, data, options = {}) {\n      return this.json("PATCH", endpoint, data, options);\n    }\n    delete(endpoint, options = {}) {\n      return this.request(endpoint, { ...options, method: "DELETE" });\n    }\n    json(method, endpoint, data, options) {\n      const headers = new Headers(options.headers);\n      if (!headers.has("Content-Type"))\n        headers.set("Content-Type", "application/json");\n      return this.request(endpoint, {\n        ...options,\n        method,\n        headers,\n        body: JSON.stringify(data),\n      });\n    }\n  }\n  const api = new APIClient("api/");\n  api.setAuthToken("demo-token");\n  const first = await api.get("echo", {\n    headers: new Headers({ Accept: "text/plain", "X-Demo": "yes" }),\n  });\n  console.log(\n    first.headers.accept,\n    first.headers["x-demo"],\n    first.headers.authorization,\n  );\n  api.setAuthToken(null);\n  const next = await api.get("echo");\n  console.log(Object.hasOwn(next.headers, "authorization"));\n  try {\n    await api.get("status/404");\n  } catch (error) {\n    console.log(error.message);\n  }\n})().catch((error) => {\n  throw error;\n});',
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
          code: 'import { createServer } from "node:http";\nimport { readFile } from "node:fs/promises";\nimport { pathToFileURL } from "node:url";\n\n// Two loopback ports are distinct origins. This fixture has no real accounts.\nexport async function startDemo({\n  pagePort = 3100,\n  apiPort = 3101,\n  servePage,\n} = {}) {\n  const states = new Map();\n  let pageOrigin, apiOrigin;\n  const load = (name) => readFile(new URL(name, import.meta.url));\n  const handler = (remote) => async (req, res) => {\n    try {\n      const url = new URL(req.url, "http://localhost");\n      const match = url.pathname.match(/^(\\/case\\/\\d+)?\\/(.*)$/);\n      const scope = match?.[1] || "",\n        route = match?.[2] || "";\n      if (!states.has(scope))\n        states.set(scope, {\n          refreshes: 0,\n          requests: 0,\n          preflights: 0,\n          fail: false,\n          etag: true,\n        });\n      const state = states.get(scope);\n      const json = (status, data, headers = {}) => {\n        res.writeHead(status, {\n          "Content-Type": "application/json",\n          ...headers,\n        });\n        res.end(JSON.stringify(data));\n      };\n      if (route === "config.js") {\n        res.writeHead(200, { "Content-Type": "text/javascript" });\n        res.end(\n          "window.demoAPI=" + JSON.stringify(apiOrigin + scope + "/") + ";",\n        );\n        return;\n      }\n      if (route === "sw.js") {\n        res.writeHead(200, {\n          "Content-Type": "text/javascript",\n          "Cache-Control": "no-store",\n        });\n        res.end(await load("sw.js"));\n        return;\n      }\n      if (route === "offline.html") {\n        res.writeHead(200, { "Content-Type": "text/html" });\n        res.end(await load("offline.html"));\n        return;\n      }\n      if (route === "offline-page" || route === "drop") {\n        req.socket.destroy();\n        return;\n      }\n      if (route === "" || route.endsWith("index.html")) {\n        res.writeHead(200, { "Content-Type": "text/html" });\n        res.end(\n          servePage ? await servePage(url.pathname) : await load("index.html"),\n        );\n        return;\n      }\n      if (remote && route !== "blocked") {\n        res.setHeader("Access-Control-Allow-Origin", pageOrigin);\n        res.setHeader("Vary", "Origin");\n        res.setHeader("Access-Control-Allow-Credentials", "true");\n        res.setHeader(\n          "Access-Control-Expose-Headers",\n          "ETag, X-Visible, X-Preflights",\n        );\n        if (req.method === "OPTIONS") {\n          state.preflights++;\n          res.writeHead(204, {\n            "Access-Control-Allow-Methods": "GET, POST, PATCH",\n            "Access-Control-Allow-Headers":\n              "Content-Type, Authorization, X-Demo",\n            "Access-Control-Max-Age": "0",\n          });\n          res.end();\n          return;\n        }\n      }\n      const buffers = [];\n      for await (const chunk of req) buffers.push(chunk);\n      const raw = Buffer.concat(buffers).toString();\n      if (!remote && route === "proxy/echo" && req.method === "GET") {\n        const upstream = await fetch(apiOrigin + scope + "/echo", {\n          credentials: "omit",\n        });\n        res.writeHead(upstream.status, { "Content-Type": "application/json" });\n        res.end(await upstream.text());\n        return;\n      }\n      if (route === "echo" || route === "blocked")\n        return json(200, {\n          method: req.method,\n          headers: req.headers,\n          body: raw,\n          preflights: state.preflights,\n        });\n      if (route === "headers")\n        return json(\n          200,\n          { ok: true },\n          {\n            ETag: \'"demo-v1"\',\n            "Last-Modified": "Wed, 01 Jan 2025 00:00:00 GMT",\n            "X-Visible": "visible",\n            "X-Hidden": "hidden",\n          },\n        );\n      if (route === "cookie") {\n        res.setHeader(\n          "Set-Cookie",\n          "demoSession=yes; HttpOnly; SameSite=Lax; Path=" +\n            (scope || "") +\n            "/",\n        );\n        return json(200, { set: true });\n      }\n      if (route === "refresh") {\n        state.refreshes++;\n        const data = JSON.parse(raw || "{}");\n        if (\n          data.refreshToken !== "refresh-demo" &&\n          data.refreshToken !== "refresh-rotated"\n        )\n          return json(401, { message: "Invalid refresh" });\n        return json(200, {\n          accessToken: "access-fresh",\n          refreshToken: "refresh-rotated",\n        });\n      }\n      if (route === "private")\n        return req.headers.authorization === "Bearer access-fresh"\n          ? json(200, { authorized: true, method: req.method, body: raw })\n          : json(401, { message: "Expired" });\n      if (route === "stats") return json(200, { ...state });\n      if (route === "toggle") {\n        state.fail = url.searchParams.get("fail") === "true";\n        state.etag = url.searchParams.get("etag") !== "false";\n        return json(200, { ok: true });\n      }\n      if (route === "cache" || route === "fresh" || route === "public/asset") {\n        state.requests++;\n        if (state.fail)\n          return json(\n            503,\n            { message: "Temporary failure" },\n            { "Cache-Control": "no-store" },\n          );\n        const headers = {\n          "Cache-Control":\n            route === "fresh" ? "public, max-age=3600" : "public, max-age=0",\n          "Last-Modified": "Wed, 01 Jan 2025 00:00:00 GMT",\n        };\n        if (state.etag) headers.ETag = \'"demo-v1"\';\n        if (\n          (state.etag && req.headers["if-none-match"] === \'"demo-v1"\') ||\n          (!req.headers["if-none-match"] &&\n            req.headers["if-modified-since"] === headers["Last-Modified"])\n        ) {\n          res.writeHead(304, headers);\n          res.end();\n          return;\n        }\n        return json(\n          200,\n          url.searchParams.get("zero") === "true"\n            ? 0\n            : { value: "cached", request: state.requests },\n          headers,\n        );\n      }\n      if (route === "denied")\n        return json(\n          401,\n          { message: "Unauthorized" },\n          { "Cache-Control": "no-store" },\n        );\n      return json(404, { message: "Missing route" });\n    } catch (error) {\n      if (!res.headersSent)\n        res.writeHead(400, { "Content-Type": "application/json" });\n      res.end(JSON.stringify({ message: error.message }));\n    }\n  };\n  const page = createServer(handler(false)),\n    api = createServer(handler(true));\n  await new Promise((resolve) => page.listen(pagePort, "127.0.0.1", resolve));\n  await new Promise((resolve) => api.listen(apiPort, "127.0.0.1", resolve));\n  pageOrigin = "http://127.0.0.1:" + page.address().port;\n  apiOrigin = "http://127.0.0.1:" + api.address().port;\n  return { page, api, pageOrigin, apiOrigin };\n}\nif (\n  process.argv[1] &&\n  import.meta.url === pathToFileURL(process.argv[1]).href\n) {\n  const demo = await startDemo();\n  console.log("Open " + demo.pageOrigin + " and use its browser console");\n}',
        },
        {
          label: "index.html — dedicated demo page",
          language: "html",
          code: '<!doctype html>\n<html lang="en"\n  ><meta charset="utf-8" /><title>Request configuration</title\n  ><h1>Request configuration</h1\n  ><p>Open the console and run one example.</p\n  ><script src="config.js"></script\n></html>',
        },
        {
          label: "sw.js — scoped public cache and offline navigation",
          language: "javascript",
          code: 'const CACHE = "fetch-config-v1:" + self.registration.scope;\nconst offline = new URL("offline.html", self.registration.scope).href;\nself.addEventListener("install", (event) =>\n  event.waitUntil(\n    (async () => {\n      const cache = await caches.open(CACHE);\n      await cache.add(offline);\n      await self.skipWaiting();\n    })(),\n  ),\n);\nself.addEventListener("activate", (event) =>\n  event.waitUntil(self.clients.claim()),\n);\nself.addEventListener("fetch", (event) => {\n  const request = event.request,\n    url = new URL(request.url);\n  if (request.method !== "GET" || url.origin !== self.location.origin) return;\n  const publicPath = new URL("public/", self.registration.scope).pathname;\n  if (!url.pathname.startsWith(publicPath) && request.mode !== "navigate")\n    return;\n  event.respondWith(\n    (async () => {\n      const cache = await caches.open(CACHE);\n      if (url.pathname.startsWith(publicPath)) {\n        const cached = await cache.match(request);\n        if (cached) return cached;\n        const response = await fetch(request);\n        if (\n          response.ok &&\n          !/no-store|private/i.test(response.headers.get("Cache-Control") || "")\n        )\n          await cache.put(request, response.clone());\n        return response;\n      }\n      try {\n        return await fetch(request);\n      } catch (error) {\n        const fallback = await cache.match(offline);\n        if (fallback) return fallback;\n        throw error;\n      }\n    })(),\n  );\n});',
        },
        {
          label: "offline.html — precached fallback",
          language: "html",
          code: '<!doctype html>\n<html lang="en"\n  ><meta charset="utf-8" /><title>Offline</title\n  ><h1>Offline demo</h1></html\n>',
        },
      ],
      methods: [
        {
          name: "Headers — construct and manage fields",
          explanation:
            "Use Headers to create, read, replace, append, and delete HTTP fields.",
          note: "append adds to an existing value; use set for a single Authorization or Content-Type value.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
          examples: [
            {
              label: "Append, set, get, has, and delete",
              language: "javascript",
              code: '(async () => {\n  const headers = new Headers();\n  headers.append("Content-Type", "application/json");\n  headers.set("Authorization", "Bearer demo");\n  headers.set("X-Custom", "temporary");\n  console.log(headers.get("content-type"), headers.has("AUTHORIZATION"));\n  headers.delete("X-Custom");\n  console.log(headers.has("x-custom"));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Distinguish append from replacement",
              language: "javascript",
              code: '(async () => {\n  const headers = new Headers([["X-Demo", "one"]]);\n  headers.append("x-demo", "two");\n  console.log(headers.get("X-Demo"));\n  headers.set("X-Demo", "three");\n  console.log(headers.get("x-demo"));\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Send request headers",
          explanation:
            "Pass a Headers object, plain object, or pair list in fetch options.",
          note: "Browser code cannot hide a privileged API secret; these tokens and keys are dummy fixture values. Cross-origin custom headers may trigger preflight.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
          examples: [
            {
              label: "Send format, auth, API key, and language fields",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("echo", {\n    headers: {\n      Accept: "application/json",\n      Authorization: "Bearer demo",\n      "X-API-Key": "demo-key",\n      "Accept-Language": "en-US",\n    },\n  });\n  const data = await response.json();\n  console.log(\n    data.headers.accept,\n    data.headers.authorization,\n    data.headers["x-api-key"],\n    data.headers["accept-language"],\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Use a pair list for a JSON POST",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("echo", {\n    method: "POST",\n    headers: [["Content-Type", "application/json"]],\n    body: JSON.stringify({ ok: true }),\n  });\n  const data = await response.json();\n  console.log(\n    data.method,\n    data.headers["content-type"],\n    JSON.parse(data.body).ok,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Read and iterate response headers",
          explanation:
            "Use response.headers.get for specific fields and entries for enumeration.",
          note: "Cross-origin exposure rules filter this view; Set-Cookie is never readable through browser response headers.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
          examples: [
            {
              label: "Read response metadata",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("headers");\n  console.log(\n    response.headers.get("content-type"),\n    response.headers.get("last-modified"),\n    response.headers.get("x-visible"),\n  );\n  await response.text();\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Iterate selected fields",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("headers");\n  for (const [key, value] of response.headers.entries())\n    if (key === "etag" || key === "x-visible") console.log(key, value);\n  console.log(response.headers.get("missing"));\n  await response.text();\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Browser-controlled and restricted headers",
          explanation:
            "Browsers keep control over fields such as Cookie and Host.",
          note: "User-Agent behavior varies: Chromium may drop a supplied value, so do not use it as a portable application header; use X-App-Version instead.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers",
          examples: [
            {
              label: "A request guard drops a manual Cookie header",
              language: "javascript",
              code: '(async () => {\n  const request = new Request(new URL("echo", location.href), {\n    headers: { Cookie: "manual=1", "X-App-Version": "1.0" },\n  });\n  console.log(\n    request.headers.has("cookie"),\n    request.headers.get("x-app-version"),\n  );\n  const response = await fetch(request);\n  console.log((await response.json()).headers["x-app-version"]);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Set-Cookie cannot be read by browser JavaScript",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("cookie", { credentials: "same-origin" });\n  console.log(response.headers.get("set-cookie"));\n  await response.text();\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "AuthManager — authenticate and refresh once",
          explanation:
            "Attach the current token, refresh after a 401, and retry once with the new token.",
          note: "This in-memory teaching client avoids persisting bearer tokens in localStorage. It accepts replayable bodies only, limits token use to the same origin, and injects a login callback; production session storage and CSRF policies depend on the app.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Refresh and retry with the rotated tokens",
              language: "javascript",
              code: '(async () => {\n  class AuthManager {\n    constructor({\n      token = null,\n      refreshToken = null,\n      onLogin = () => {},\n    } = {}) {\n      this.token = token;\n      this.refreshToken = refreshToken;\n      this.onLogin = onLogin;\n      this.refreshing = null;\n      this.version = 0;\n    }\n    async makeAuthenticatedRequest(url, options = {}) {\n      const target = new URL(url, location.href);\n      if (target.origin !== location.origin)\n        throw new Error("Use a trusted same-origin API");\n      const initial = this.token;\n      const send = () => {\n        const headers = new Headers(options.headers);\n        if (this.token) headers.set("Authorization", "Bearer " + this.token);\n        else headers.delete("Authorization");\n        return fetch(target, { ...options, headers });\n      };\n      let response = await send();\n      if (response.status === 401) {\n        await response.text();\n        if (this.token === initial && !(await this.refreshAccessToken())) {\n          this.logout();\n          this.onLogin();\n          throw new Error("Login required");\n        }\n        response = await send();\n        if (response.status === 401) {\n          await response.text();\n          this.logout();\n          this.onLogin();\n          throw new Error("Login required");\n        }\n      }\n      return response;\n    }\n    refreshAccessToken() {\n      if (this.refreshing) return this.refreshing;\n      const version = this.version;\n      this.refreshing = (async () => {\n        if (!this.refreshToken) return false;\n        try {\n          const response = await fetch("refresh", {\n            method: "POST",\n            headers: { "Content-Type": "application/json" },\n            body: JSON.stringify({ refreshToken: this.refreshToken }),\n            credentials: "omit",\n          });\n          if (!response.ok) {\n            await response.text();\n            return false;\n          }\n          const data = await response.json();\n          if (\n            version !== this.version ||\n            typeof data.accessToken !== "string" ||\n            typeof data.refreshToken !== "string"\n          )\n            return false;\n          this.token = data.accessToken;\n          this.refreshToken = data.refreshToken;\n          return true;\n        } catch {\n          return false;\n        }\n      })().finally(() => {\n        this.refreshing = null;\n      });\n      return this.refreshing;\n    }\n    logout() {\n      this.version++;\n      this.token = null;\n      this.refreshToken = null;\n    }\n  }\n  const manager = new AuthManager({\n    token: "expired",\n    refreshToken: "refresh-demo",\n  });\n  const response = await manager.makeAuthenticatedRequest("private");\n  console.log(\n    (await response.json()).authorized,\n    manager.token,\n    manager.refreshToken,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Share refresh across concurrent requests",
              language: "javascript",
              code: '(async () => {\n  class AuthManager {\n    constructor({\n      token = null,\n      refreshToken = null,\n      onLogin = () => {},\n    } = {}) {\n      this.token = token;\n      this.refreshToken = refreshToken;\n      this.onLogin = onLogin;\n      this.refreshing = null;\n      this.version = 0;\n    }\n    async makeAuthenticatedRequest(url, options = {}) {\n      const target = new URL(url, location.href);\n      if (target.origin !== location.origin)\n        throw new Error("Use a trusted same-origin API");\n      const initial = this.token;\n      const send = () => {\n        const headers = new Headers(options.headers);\n        if (this.token) headers.set("Authorization", "Bearer " + this.token);\n        else headers.delete("Authorization");\n        return fetch(target, { ...options, headers });\n      };\n      let response = await send();\n      if (response.status === 401) {\n        await response.text();\n        if (this.token === initial && !(await this.refreshAccessToken())) {\n          this.logout();\n          this.onLogin();\n          throw new Error("Login required");\n        }\n        response = await send();\n        if (response.status === 401) {\n          await response.text();\n          this.logout();\n          this.onLogin();\n          throw new Error("Login required");\n        }\n      }\n      return response;\n    }\n    refreshAccessToken() {\n      if (this.refreshing) return this.refreshing;\n      const version = this.version;\n      this.refreshing = (async () => {\n        if (!this.refreshToken) return false;\n        try {\n          const response = await fetch("refresh", {\n            method: "POST",\n            headers: { "Content-Type": "application/json" },\n            body: JSON.stringify({ refreshToken: this.refreshToken }),\n            credentials: "omit",\n          });\n          if (!response.ok) {\n            await response.text();\n            return false;\n          }\n          const data = await response.json();\n          if (\n            version !== this.version ||\n            typeof data.accessToken !== "string" ||\n            typeof data.refreshToken !== "string"\n          )\n            return false;\n          this.token = data.accessToken;\n          this.refreshToken = data.refreshToken;\n          return true;\n        } catch {\n          return false;\n        }\n      })().finally(() => {\n        this.refreshing = null;\n      });\n      return this.refreshing;\n    }\n    logout() {\n      this.version++;\n      this.token = null;\n      this.refreshToken = null;\n    }\n  }\n  const manager = new AuthManager({\n    token: "expired",\n    refreshToken: "refresh-demo",\n  });\n  const responses = await Promise.all([\n    manager.makeAuthenticatedRequest("private"),\n    manager.makeAuthenticatedRequest("private"),\n  ]);\n  console.log(\n    (await Promise.all(responses.map((response) => response.json()))).every(\n      (data) => data.authorized,\n    ),\n  );\n  console.log((await (await fetch("stats")).json()).refreshes);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "AuthManager refresh failure and logout",
          explanation:
            "Clear authentication state and invoke a supplied login action when refresh fails.",
          note: "The local callback logs instead of navigating away; an app can inject its router or login redirect. Browser storage is not used by this example.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Handle an invalid refresh token",
              language: "javascript",
              code: '(async () => {\n  class AuthManager {\n    constructor({\n      token = null,\n      refreshToken = null,\n      onLogin = () => {},\n    } = {}) {\n      this.token = token;\n      this.refreshToken = refreshToken;\n      this.onLogin = onLogin;\n      this.refreshing = null;\n      this.version = 0;\n    }\n    async makeAuthenticatedRequest(url, options = {}) {\n      const target = new URL(url, location.href);\n      if (target.origin !== location.origin)\n        throw new Error("Use a trusted same-origin API");\n      const initial = this.token;\n      const send = () => {\n        const headers = new Headers(options.headers);\n        if (this.token) headers.set("Authorization", "Bearer " + this.token);\n        else headers.delete("Authorization");\n        return fetch(target, { ...options, headers });\n      };\n      let response = await send();\n      if (response.status === 401) {\n        await response.text();\n        if (this.token === initial && !(await this.refreshAccessToken())) {\n          this.logout();\n          this.onLogin();\n          throw new Error("Login required");\n        }\n        response = await send();\n        if (response.status === 401) {\n          await response.text();\n          this.logout();\n          this.onLogin();\n          throw new Error("Login required");\n        }\n      }\n      return response;\n    }\n    refreshAccessToken() {\n      if (this.refreshing) return this.refreshing;\n      const version = this.version;\n      this.refreshing = (async () => {\n        if (!this.refreshToken) return false;\n        try {\n          const response = await fetch("refresh", {\n            method: "POST",\n            headers: { "Content-Type": "application/json" },\n            body: JSON.stringify({ refreshToken: this.refreshToken }),\n            credentials: "omit",\n          });\n          if (!response.ok) {\n            await response.text();\n            return false;\n          }\n          const data = await response.json();\n          if (\n            version !== this.version ||\n            typeof data.accessToken !== "string" ||\n            typeof data.refreshToken !== "string"\n          )\n            return false;\n          this.token = data.accessToken;\n          this.refreshToken = data.refreshToken;\n          return true;\n        } catch {\n          return false;\n        }\n      })().finally(() => {\n        this.refreshing = null;\n      });\n      return this.refreshing;\n    }\n    logout() {\n      this.version++;\n      this.token = null;\n      this.refreshToken = null;\n    }\n  }\n  let logins = 0;\n  const manager = new AuthManager({\n    token: "expired",\n    refreshToken: "bad",\n    onLogin: () => logins++,\n  });\n  try {\n    await manager.makeAuthenticatedRequest("private");\n  } catch (error) {\n    console.log(error.message, logins, manager.token, manager.refreshToken);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Logout and reject an untrusted destination",
              language: "javascript",
              code: '(async () => {\n  class AuthManager {\n    constructor({\n      token = null,\n      refreshToken = null,\n      onLogin = () => {},\n    } = {}) {\n      this.token = token;\n      this.refreshToken = refreshToken;\n      this.onLogin = onLogin;\n      this.refreshing = null;\n      this.version = 0;\n    }\n    async makeAuthenticatedRequest(url, options = {}) {\n      const target = new URL(url, location.href);\n      if (target.origin !== location.origin)\n        throw new Error("Use a trusted same-origin API");\n      const initial = this.token;\n      const send = () => {\n        const headers = new Headers(options.headers);\n        if (this.token) headers.set("Authorization", "Bearer " + this.token);\n        else headers.delete("Authorization");\n        return fetch(target, { ...options, headers });\n      };\n      let response = await send();\n      if (response.status === 401) {\n        await response.text();\n        if (this.token === initial && !(await this.refreshAccessToken())) {\n          this.logout();\n          this.onLogin();\n          throw new Error("Login required");\n        }\n        response = await send();\n        if (response.status === 401) {\n          await response.text();\n          this.logout();\n          this.onLogin();\n          throw new Error("Login required");\n        }\n      }\n      return response;\n    }\n    refreshAccessToken() {\n      if (this.refreshing) return this.refreshing;\n      const version = this.version;\n      this.refreshing = (async () => {\n        if (!this.refreshToken) return false;\n        try {\n          const response = await fetch("refresh", {\n            method: "POST",\n            headers: { "Content-Type": "application/json" },\n            body: JSON.stringify({ refreshToken: this.refreshToken }),\n            credentials: "omit",\n          });\n          if (!response.ok) {\n            await response.text();\n            return false;\n          }\n          const data = await response.json();\n          if (\n            version !== this.version ||\n            typeof data.accessToken !== "string" ||\n            typeof data.refreshToken !== "string"\n          )\n            return false;\n          this.token = data.accessToken;\n          this.refreshToken = data.refreshToken;\n          return true;\n        } catch {\n          return false;\n        }\n      })().finally(() => {\n        this.refreshing = null;\n      });\n      return this.refreshing;\n    }\n    logout() {\n      this.version++;\n      this.token = null;\n      this.refreshToken = null;\n    }\n  }\n  const manager = new AuthManager({\n    token: "access-fresh",\n    refreshToken: "refresh-demo",\n  });\n  manager.logout();\n  console.log(manager.token, manager.refreshToken);\n  try {\n    await manager.makeAuthenticatedRequest(demoAPI + "private");\n  } catch (error) {\n    console.log(error.message);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "withHeaders() — merge request defaults",
          explanation:
            "Create a fetch wrapper with reusable headers and per-call overrides.",
          note: "Header overrides are case-insensitive and defaults are copied for each request. This general wrapper should not contain authentication secrets for arbitrary URLs.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
          examples: [
            {
              label: "Reuse an API version and format preference",
              language: "javascript",
              code: '(async () => {\n  function withHeaders(defaults) {\n    const initial = new Headers(defaults);\n    return (url, options = {}) => {\n      const headers = new Headers(initial);\n      new Headers(options.headers).forEach((value, key) =>\n        headers.set(key, value),\n      );\n      return fetch(url, { ...options, headers });\n    };\n  }\n  const api = withHeaders({\n    "X-API-Version": "2.0",\n    Accept: "application/json",\n  });\n  const data = await (await api("echo")).json();\n  console.log(data.headers["x-api-version"], data.headers.accept);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Override with Headers and pair arrays",
              language: "javascript",
              code: '(async () => {\n  function withHeaders(defaults) {\n    const initial = new Headers(defaults);\n    return (url, options = {}) => {\n      const headers = new Headers(initial);\n      new Headers(options.headers).forEach((value, key) =>\n        headers.set(key, value),\n      );\n      return fetch(url, { ...options, headers });\n    };\n  }\n  const api = withHeaders({ Accept: "application/json" });\n  console.log(\n    (\n      await (\n        await api("echo", { headers: new Headers({ accept: "text/plain" }) })\n      ).json()\n    ).headers.accept,\n  );\n  console.log(\n    (\n      await (\n        await api("echo", { headers: [["ACCEPT", "application/custom"]] })\n      ).json()\n    ).headers.accept,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "mode: cors — readable cross-origin responses",
          explanation:
            "Use cors mode to let the browser enforce server-provided cross-origin permission.",
          note: "cors is the fetch default; setting it on the client does not grant permission. The second local port is a genuinely different origin.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Read a permitted cross-origin response",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch(demoAPI + "echo", {\n    mode: "cors",\n    credentials: "omit",\n  });\n  console.log(response.type, response.ok, (await response.json()).method);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Read only exposed response fields",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch(demoAPI + "headers");\n  console.log(\n    response.headers.get("etag"),\n    response.headers.get("x-visible"),\n    response.headers.get("x-hidden"),\n  );\n  await response.text();\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "mode: no-cors — opaque responses",
          explanation:
            "Sends a limited cross-origin request whose response headers and body cannot be read.",
          note: "It does not bypass CORS for API data; allowed methods and writable request headers are restricted. Fulfillment does not confirm application-level success.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Observe an opaque response",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch(demoAPI + "blocked", {\n    mode: "no-cors",\n    credentials: "omit",\n  });\n  console.log(\n    response.type,\n    response.status,\n    response.ok,\n    await response.text(),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Send a limited analytics-style POST",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch(demoAPI + "blocked", {\n    mode: "no-cors",\n    method: "POST",\n    credentials: "omit",\n    body: JSON.stringify({ event: "demo_view" }),\n  });\n  console.log(response.type, response.status);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "mode: same-origin — reject other origins",
          explanation:
            "Allow requests only when the destination shares the page’s origin.",
          note: "Origin includes scheme, host, and port; the API on a second loopback port is cross-origin.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Fetch from the page origin",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("echo", { mode: "same-origin" });\n  console.log(response.type, (await response.json()).method);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Reject a different port",
              language: "javascript",
              code: '(async () => {\n  try {\n    await fetch(demoAPI + "echo", { mode: "same-origin" });\n  } catch (error) {\n    console.log(error instanceof TypeError);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "credentials — include, same-origin, or omit",
          explanation:
            "Choose whether browser-managed credentials such as cookies participate in a request.",
          note: "include still obeys cookie policies and SameSite rules. Explicit Authorization headers are not automatically removed by credentials: omit; credentialed CORS requires a specific allowed origin plus Allow-Credentials.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Compare cookie inclusion across origins",
              language: "javascript",
              code: '(async () => {\n  await (await fetch("cookie")).text();\n  const included = await (\n    await fetch(demoAPI + "echo", { credentials: "include" })\n  ).json();\n  const same = await (\n    await fetch(demoAPI + "echo", { credentials: "same-origin" })\n  ).json();\n  console.log(\n    included.headers.cookie.includes("demoSession=yes"),\n    Object.hasOwn(same.headers, "cookie"),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Omit cookies while retaining an explicit bearer header",
              language: "javascript",
              code: '(async () => {\n  await (await fetch("cookie")).text();\n  const data = await (\n    await fetch("echo", {\n      credentials: "omit",\n      headers: { Authorization: "Bearer demo" },\n    })\n  ).json();\n  console.log(\n    Object.hasOwn(data.headers, "cookie"),\n    data.headers.authorization,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "CORS failure versus HTTP failure",
          explanation:
            "Catch rejected requests at the application boundary and check response.ok on readable responses.",
          note: "Use the browser network panel and server logs for the actual CORS diagnosis. A rejected request may still have reached the server.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Handle a server that omits CORS permission",
              language: "javascript",
              code: '(async () => {\n  try {\n    await fetch(demoAPI + "blocked", { mode: "cors" });\n  } catch (error) {\n    console.log(error instanceof TypeError);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "A readable HTTP error is a response",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch(demoAPI + "denied", { mode: "cors" });\n  console.log(response.status, response.ok, (await response.json()).message);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Public, internal, and authenticated configurations",
          explanation:
            "Build request options for each API’s origin and authentication contract.",
          note: "This fixture’s CSRF value is illustrative and echoed rather than validated; a real server must validate it. Avoid unnecessary JSON Content-Type on bodyless public GETs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Public GET and internal JSON write",
              language: "javascript",
              code: '(async () => {\n  const publicConfig = {\n    mode: "cors",\n    credentials: "omit",\n    headers: { Accept: "application/json" },\n  };\n  console.log(\n    (await (await fetch(demoAPI + "echo", publicConfig)).json()).method,\n  );\n  const getCsrfToken = () => "demo-csrf";\n  const internal = {\n    mode: "same-origin",\n    credentials: "same-origin",\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "X-CSRF-Token": getCsrfToken(),\n    },\n    body: "{}",\n  };\n  console.log(\n    (await (await fetch("echo", internal)).json()).headers["x-csrf-token"],\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Authenticated cross-origin request",
              language: "javascript",
              code: '(async () => {\n  const getToken = () => "demo-access";\n  const config = {\n    mode: "cors",\n    credentials: "include",\n    headers: {\n      Accept: "application/json",\n      Authorization: "Bearer " + getToken(),\n    },\n  };\n  const data = await (await fetch(demoAPI + "echo", config)).json();\n  console.log(data.headers.authorization, data.preflights > 0);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Preflight — the browser sends OPTIONS",
          explanation:
            "Lets the browser check server permission before certain cross-origin requests.",
          note: "A header-name-only detector is insufficient: header values, method, and other rules matter. This demo records real preflights; it does not manually manufacture them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Trigger preflight with a custom header",
              language: "javascript",
              code: '(async () => {\n  const data = await (\n    await fetch(demoAPI + "echo", { headers: { "X-Demo": "yes" } })\n  ).json();\n  console.log(data.headers["x-demo"], data.preflights > 0);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "JSON Content-Type and PATCH also require permission",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch(demoAPI + "echo", {\n    method: "PATCH",\n    headers: { "Content-Type": "application/json" },\n    body: "{}",\n  });\n  const data = await response.json();\n  console.log(data.method, data.preflights > 0);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "createProxy() — choose a development proxy route",
          explanation:
            "Use a JavaScript Proxy to build endpoint calls for a configured base URL.",
          note: "This browser helper takes an explicit development option rather than reading process.env. The provided server forwards only to its fixed local demo API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
          examples: [
            {
              label: "Call the remote API directly",
              language: "javascript",
              code: '(async () => {\n  function createProxy(\n    baseURL,\n    { development = false, proxyBase = "proxy/" } = {},\n  ) {\n    return new Proxy(Object.create(null), {\n      get(_, endpoint) {\n        if (typeof endpoint !== "string" || endpoint === "then")\n          return undefined;\n        if (!/^[a-z][a-z0-9-]*$/i.test(endpoint))\n          throw new TypeError("Use a simple endpoint name");\n        return (options) =>\n          fetch(\n            new URL(\n              endpoint,\n              development\n                ? new URL(proxyBase, location.href)\n                : new URL(baseURL),\n            ),\n            options,\n          );\n      },\n    });\n  }\n  const api = createProxy(demoAPI);\n  const response = await api.echo({ method: "GET", credentials: "omit" });\n  console.log((await response.json()).method);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Use the actual same-origin forwarding route",
              language: "javascript",
              code: '(async () => {\n  function createProxy(\n    baseURL,\n    { development = false, proxyBase = "proxy/" } = {},\n  ) {\n    return new Proxy(Object.create(null), {\n      get(_, endpoint) {\n        if (typeof endpoint !== "string" || endpoint === "then")\n          return undefined;\n        if (!/^[a-z][a-z0-9-]*$/i.test(endpoint))\n          throw new TypeError("Use a simple endpoint name");\n        return (options) =>\n          fetch(\n            new URL(\n              endpoint,\n              development\n                ? new URL(proxyBase, location.href)\n                : new URL(baseURL),\n            ),\n            options,\n          );\n      },\n    });\n  }\n  const api = createProxy(demoAPI, { development: true });\n  const response = await api.echo({ method: "GET" });\n  console.log(response.type, (await response.json()).method);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "cache: default and no-cache",
          explanation:
            "default uses normal cache rules. no-cache checks with the server before reusing a stored response.",
          note: "A browser-handled 304 can be combined with the stored body and exposed as a successful response; JavaScript need not see the raw 304.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Reuse a fresh HTTP cache entry",
              language: "javascript",
              code: '(async () => {\n  const first = await (\n    await fetch("fresh?case=default", { cache: "reload" })\n  ).json();\n  const second = await (\n    await fetch("fresh?case=default", { cache: "default" })\n  ).json();\n  console.log(first.request === second.request, second.value);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Revalidate an existing representation",
              language: "javascript",
              code: '(async () => {\n  const first = await (\n    await fetch("cache?case=revalidate", { cache: "reload" })\n  ).json();\n  const response = await fetch("cache?case=revalidate", { cache: "no-cache" });\n  const second = await response.json();\n  console.log(response.status, second.value, first.value === second.value);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "cache: reload and no-store",
          explanation:
            "reload fetches fresh data and may store it. no-store skips both reading and writing the HTTP cache.",
          note: "They are different policies; reload does not mean that the response can never be cached afterward.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Reload gets a fresh response and updates cache",
              language: "javascript",
              code: '(async () => {\n  const a = await (\n    await fetch("fresh?case=reload", { cache: "reload" })\n  ).json();\n  const b = await (\n    await fetch("fresh?case=reload", { cache: "reload" })\n  ).json();\n  const c = await (\n    await fetch("fresh?case=reload", { cache: "default" })\n  ).json();\n  console.log(b.request > a.request, c.request === b.request);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "No-store requests both reach the server",
              language: "javascript",
              code: '(async () => {\n  const a = await (\n    await fetch("fresh?case=no-store", { cache: "no-store" })\n  ).json();\n  const b = await (\n    await fetch("fresh?case=no-store", { cache: "no-store" })\n  ).json();\n  console.log(b.request > a.request);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "cache: force-cache and only-if-cached",
          explanation:
            "force-cache prefers stored data, even if old. only-if-cached requires stored data and same-origin mode.",
          note: "A browser cache-only miss may yield a 504 response or a network error. Treat both as a miss and provide an explicit fallback.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Reuse a stale stored response",
              language: "javascript",
              code: '(async () => {\n  const a = await (await fetch("cache?case=force", { cache: "reload" })).json();\n  const b = await (\n    await fetch("cache?case=force", { cache: "force-cache" })\n  ).json();\n  console.log(a.request === b.request);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Cache-only lookup and a defined miss fallback",
              language: "javascript",
              code: '(async () => {\n  await (await fetch("fresh?case=only", { cache: "reload" })).json();\n  const hit = await fetch("fresh?case=only", {\n    cache: "only-if-cached",\n    mode: "same-origin",\n  });\n  console.log(hit.ok, (await hit.json()).value);\n  let missed = false;\n  try {\n    const response = await fetch("fresh?missing=" + crypto.randomUUID(), {\n      cache: "only-if-cached",\n      mode: "same-origin",\n    });\n    missed = response.status === 504;\n  } catch (error) {\n    if (!(error instanceof TypeError)) throw error;\n    missed = true;\n  }\n  console.log(missed);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Request cache headers and conditional requests",
          explanation:
            "Use Cache-Control request directives when required by the API, and validators for explicit conditional GETs.",
          note: "Pragma: no-cache is a legacy directive. Use cache: no-store in the manual-validator demo to separate its stored data from the browser HTTP cache; handle raw 304 before response.ok.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Send explicit request cache directives",
              language: "javascript",
              code: '(async () => {\n  const response = await fetch("echo", {\n    cache: "no-cache",\n    headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },\n  });\n  const data = await response.json();\n  console.log(data.headers["cache-control"], data.headers.pragma);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Validate a saved ETag and timestamp",
              language: "javascript",
              code: '(async () => {\n  const first = await fetch("cache?case=conditional", { cache: "no-store" });\n  const saved = await first.json();\n  const response = await fetch("cache?case=conditional", {\n    cache: "no-store",\n    headers: {\n      "If-None-Match": first.headers.get("etag"),\n      "If-Modified-Since": first.headers.get("last-modified"),\n    },\n  });\n  if (response.status !== 304)\n    throw new Error("Expected unchanged representation");\n  console.log(response.status, saved.value);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "CachedFetcher — application-level TTL cache",
          explanation:
            "Store parsed public GET results with a timestamp and reuse them while fresh.",
          note: "This deliberately narrow cache is separate from HTTP caching: it omits credentials, rejects Authorization, avoids Vary/private/no-store responses, and retains falsy JSON values. Clear it when application data changes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Hit a cache entry and protect it from mutation",
              language: "javascript",
              code: '(async () => {\n  class CachedFetcher {\n    constructor({ now = Date.now } = {}) {\n      this.cache = new Map();\n      this.now = now;\n    }\n    key(url, options) {\n      const headers = new Headers(options.headers);\n      if (\n        (options.method || "GET").toUpperCase() !== "GET" ||\n        options.body != null ||\n        headers.has("Authorization") ||\n        [...headers.keys()].some((key) => key !== "accept")\n      )\n        throw new TypeError("Cache public GETs with only Accept");\n      return JSON.stringify([\n        new URL(url, location.href).href,\n        [...headers.entries()],\n      ]);\n    }\n    async fetch(url, options = {}, ttl = 60000) {\n      if (!Number.isFinite(ttl) || ttl < 0) throw new RangeError("Invalid TTL");\n      const key = this.key(url, options),\n        entry = this.cache.get(key);\n      if (entry && this.now() - entry.time < ttl)\n        return structuredClone(entry.data);\n      try {\n        const response = await fetch(url, {\n          ...options,\n          credentials: "omit",\n          cache: "no-store",\n        });\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          await response.text();\n          throw error;\n        }\n        const data = await response.json();\n        if (\n          /no-store|private/i.test(\n            response.headers.get("Cache-Control") || "",\n          ) ||\n          response.headers.has("Vary")\n        ) {\n          this.cache.delete(key);\n          return data;\n        }\n        this.cache.set(key, {\n          url: new URL(url, location.href).href,\n          data: structuredClone(data),\n          time: this.now(),\n        });\n        return data;\n      } catch (error) {\n        if (options.signal?.aborted) throw error;\n        if (entry && (error instanceof TypeError || error.status >= 500))\n          return structuredClone(entry.data);\n        throw error;\n      }\n    }\n    invalidate(url) {\n      const absolute = new URL(url, location.href).href;\n      for (const [key, entry] of this.cache)\n        if (entry.url === absolute) this.cache.delete(key);\n    }\n    clear() {\n      this.cache.clear();\n    }\n  }\n  let time = 0;\n  const client = new CachedFetcher({ now: () => time });\n  const a = await client.fetch("cache?case=ttl");\n  a.value = "changed";\n  const b = await client.fetch("cache?case=ttl");\n  console.log(b.value, b.request === a.request);\n  time = 60001;\n  const c = await client.fetch("cache?case=ttl");\n  console.log(c.request > b.request);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Cache falsy data and normalize header forms",
              language: "javascript",
              code: '(async () => {\n  class CachedFetcher {\n    constructor({ now = Date.now } = {}) {\n      this.cache = new Map();\n      this.now = now;\n    }\n    key(url, options) {\n      const headers = new Headers(options.headers);\n      if (\n        (options.method || "GET").toUpperCase() !== "GET" ||\n        options.body != null ||\n        headers.has("Authorization") ||\n        [...headers.keys()].some((key) => key !== "accept")\n      )\n        throw new TypeError("Cache public GETs with only Accept");\n      return JSON.stringify([\n        new URL(url, location.href).href,\n        [...headers.entries()],\n      ]);\n    }\n    async fetch(url, options = {}, ttl = 60000) {\n      if (!Number.isFinite(ttl) || ttl < 0) throw new RangeError("Invalid TTL");\n      const key = this.key(url, options),\n        entry = this.cache.get(key);\n      if (entry && this.now() - entry.time < ttl)\n        return structuredClone(entry.data);\n      try {\n        const response = await fetch(url, {\n          ...options,\n          credentials: "omit",\n          cache: "no-store",\n        });\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          await response.text();\n          throw error;\n        }\n        const data = await response.json();\n        if (\n          /no-store|private/i.test(\n            response.headers.get("Cache-Control") || "",\n          ) ||\n          response.headers.has("Vary")\n        ) {\n          this.cache.delete(key);\n          return data;\n        }\n        this.cache.set(key, {\n          url: new URL(url, location.href).href,\n          data: structuredClone(data),\n          time: this.now(),\n        });\n        return data;\n      } catch (error) {\n        if (options.signal?.aborted) throw error;\n        if (entry && (error instanceof TypeError || error.status >= 500))\n          return structuredClone(entry.data);\n        throw error;\n      }\n    }\n    invalidate(url) {\n      const absolute = new URL(url, location.href).href;\n      for (const [key, entry] of this.cache)\n        if (entry.url === absolute) this.cache.delete(key);\n    }\n    clear() {\n      this.cache.clear();\n    }\n  }\n  const client = new CachedFetcher();\n  console.log(\n    await client.fetch("cache?zero=true", {\n      headers: { Accept: "application/json" },\n    }),\n  );\n  console.log(\n    await client.fetch("cache?zero=true", {\n      headers: new Headers({ accept: "application/json" }),\n    }),\n  );\n  console.log(client.cache.size);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "CachedFetcher stale fallback and invalidation",
          explanation:
            "Return stale public data only for selected server or network failures, and remove entries with exact URL matching.",
          note: "Do not use stale data to hide authentication failures, invalid JSON, or cancellation. The helper returns clones so callers cannot mutate stored data.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Use stale data after a server failure",
              language: "javascript",
              code: '(async () => {\n  class CachedFetcher {\n    constructor({ now = Date.now } = {}) {\n      this.cache = new Map();\n      this.now = now;\n    }\n    key(url, options) {\n      const headers = new Headers(options.headers);\n      if (\n        (options.method || "GET").toUpperCase() !== "GET" ||\n        options.body != null ||\n        headers.has("Authorization") ||\n        [...headers.keys()].some((key) => key !== "accept")\n      )\n        throw new TypeError("Cache public GETs with only Accept");\n      return JSON.stringify([\n        new URL(url, location.href).href,\n        [...headers.entries()],\n      ]);\n    }\n    async fetch(url, options = {}, ttl = 60000) {\n      if (!Number.isFinite(ttl) || ttl < 0) throw new RangeError("Invalid TTL");\n      const key = this.key(url, options),\n        entry = this.cache.get(key);\n      if (entry && this.now() - entry.time < ttl)\n        return structuredClone(entry.data);\n      try {\n        const response = await fetch(url, {\n          ...options,\n          credentials: "omit",\n          cache: "no-store",\n        });\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          await response.text();\n          throw error;\n        }\n        const data = await response.json();\n        if (\n          /no-store|private/i.test(\n            response.headers.get("Cache-Control") || "",\n          ) ||\n          response.headers.has("Vary")\n        ) {\n          this.cache.delete(key);\n          return data;\n        }\n        this.cache.set(key, {\n          url: new URL(url, location.href).href,\n          data: structuredClone(data),\n          time: this.now(),\n        });\n        return data;\n      } catch (error) {\n        if (options.signal?.aborted) throw error;\n        if (entry && (error instanceof TypeError || error.status >= 500))\n          return structuredClone(entry.data);\n        throw error;\n      }\n    }\n    invalidate(url) {\n      const absolute = new URL(url, location.href).href;\n      for (const [key, entry] of this.cache)\n        if (entry.url === absolute) this.cache.delete(key);\n    }\n    clear() {\n      this.cache.clear();\n    }\n  }\n  const client = new CachedFetcher();\n  const a = await client.fetch("cache?case=stale");\n  await (await fetch("toggle?fail=true")).json();\n  const b = await client.fetch("cache?case=stale", {}, 0);\n  console.log(b.value, b.request === a.request);\n  try {\n    await client.fetch("denied");\n  } catch (error) {\n    console.log(error.message);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Invalidate one URL and clear everything",
              language: "javascript",
              code: '(async () => {\n  class CachedFetcher {\n    constructor({ now = Date.now } = {}) {\n      this.cache = new Map();\n      this.now = now;\n    }\n    key(url, options) {\n      const headers = new Headers(options.headers);\n      if (\n        (options.method || "GET").toUpperCase() !== "GET" ||\n        options.body != null ||\n        headers.has("Authorization") ||\n        [...headers.keys()].some((key) => key !== "accept")\n      )\n        throw new TypeError("Cache public GETs with only Accept");\n      return JSON.stringify([\n        new URL(url, location.href).href,\n        [...headers.entries()],\n      ]);\n    }\n    async fetch(url, options = {}, ttl = 60000) {\n      if (!Number.isFinite(ttl) || ttl < 0) throw new RangeError("Invalid TTL");\n      const key = this.key(url, options),\n        entry = this.cache.get(key);\n      if (entry && this.now() - entry.time < ttl)\n        return structuredClone(entry.data);\n      try {\n        const response = await fetch(url, {\n          ...options,\n          credentials: "omit",\n          cache: "no-store",\n        });\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          await response.text();\n          throw error;\n        }\n        const data = await response.json();\n        if (\n          /no-store|private/i.test(\n            response.headers.get("Cache-Control") || "",\n          ) ||\n          response.headers.has("Vary")\n        ) {\n          this.cache.delete(key);\n          return data;\n        }\n        this.cache.set(key, {\n          url: new URL(url, location.href).href,\n          data: structuredClone(data),\n          time: this.now(),\n        });\n        return data;\n      } catch (error) {\n        if (options.signal?.aborted) throw error;\n        if (entry && (error instanceof TypeError || error.status >= 500))\n          return structuredClone(entry.data);\n        throw error;\n      }\n    }\n    invalidate(url) {\n      const absolute = new URL(url, location.href).href;\n      for (const [key, entry] of this.cache)\n        if (entry.url === absolute) this.cache.delete(key);\n    }\n    clear() {\n      this.cache.clear();\n    }\n  }\n  const client = new CachedFetcher();\n  await client.fetch("cache?one");\n  await client.fetch("cache?two");\n  client.invalidate("cache?one");\n  console.log(client.cache.size);\n  client.clear();\n  console.log(client.cache.size);\n  try {\n    await client.fetch("cache", { headers: { Authorization: "Bearer demo" } });\n  } catch (error) {\n    console.log(error instanceof TypeError);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "ETagCache — reuse a validated representation",
          explanation:
            "Save a public JSON representation with its ETag and send If-None-Match on later requests.",
          note: "This manual cache uses no-store to avoid interference from browser HTTP-cache merging. A later response without an ETag replaces the entry and removes the obsolete validator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Request/cache",
          examples: [
            {
              label: "Reuse data after a genuine 304",
              language: "javascript",
              code: '(async () => {\n  class ETagCache {\n    constructor() {\n      this.entries = new Map();\n    }\n    async fetch(url) {\n      const key = new URL(url, location.href).href,\n        entry = this.entries.get(key);\n      const headers = new Headers({ Accept: "application/json" });\n      if (entry?.etag) headers.set("If-None-Match", entry.etag);\n      const response = await fetch(key, {\n        headers,\n        credentials: "omit",\n        cache: "no-store",\n      });\n      if (response.status === 304) {\n        if (!entry) throw new Error("304 without saved representation");\n        return structuredClone(entry.data);\n      }\n      if (!response.ok) throw new Error("HTTP " + response.status);\n      const data = await response.json(),\n        tag = response.headers.get("etag");\n      if (\n        /no-store|private/i.test(response.headers.get("Cache-Control") || "") ||\n        response.headers.has("Vary")\n      ) {\n        this.entries.delete(key);\n        return data;\n      }\n      this.entries.set(key, { etag: tag, data: structuredClone(data) });\n      return data;\n    }\n  }\n  const client = new ETagCache();\n  const a = await client.fetch("cache?case=etag");\n  const b = await client.fetch("cache?case=etag");\n  console.log(a.value, b.value, a.request === b.request);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Drop a validator when the server stops sending it",
              language: "javascript",
              code: '(async () => {\n  class ETagCache {\n    constructor() {\n      this.entries = new Map();\n    }\n    async fetch(url) {\n      const key = new URL(url, location.href).href,\n        entry = this.entries.get(key);\n      const headers = new Headers({ Accept: "application/json" });\n      if (entry?.etag) headers.set("If-None-Match", entry.etag);\n      const response = await fetch(key, {\n        headers,\n        credentials: "omit",\n        cache: "no-store",\n      });\n      if (response.status === 304) {\n        if (!entry) throw new Error("304 without saved representation");\n        return structuredClone(entry.data);\n      }\n      if (!response.ok) throw new Error("HTTP " + response.status);\n      const data = await response.json(),\n        tag = response.headers.get("etag");\n      if (\n        /no-store|private/i.test(response.headers.get("Cache-Control") || "") ||\n        response.headers.has("Vary")\n      ) {\n        this.entries.delete(key);\n        return data;\n      }\n      this.entries.set(key, { etag: tag, data: structuredClone(data) });\n      return data;\n    }\n  }\n  const client = new ETagCache();\n  await client.fetch("cache?case=drop-tag");\n  await (await fetch("toggle?etag=false")).json();\n  await client.fetch("cache?case=drop-tag");\n  console.log(\n    client.entries.get(new URL("cache?case=drop-tag", location.href).href).etag,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Service-worker registration and cache-first reads",
          explanation:
            "Register the provided sw.js, wait for control, and let it cache successful public GET responses.",
          note: "Requires HTTPS or loopback localhost. Cache Storage is separate from the HTTP cache; this worker caches only its public/ fixture path and precaches a real offline page.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers",
          examples: [
            {
              label: "Register and reuse a public asset",
              language: "javascript",
              code: '(async () => {\n  const registration = await navigator.serviceWorker.register("sw.js", {\n    scope: "./",\n  });\n  await navigator.serviceWorker.ready;\n  if (!navigator.serviceWorker.controller)\n    await new Promise((resolve) =>\n      navigator.serviceWorker.addEventListener("controllerchange", resolve, {\n        once: true,\n      }),\n    );\n  const a = await (await fetch("public/asset")).json();\n  const b = await (await fetch("public/asset")).json();\n  console.log(Boolean(registration.active), a.request === b.request, b.value);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Read the explicitly precached fallback",
              language: "javascript",
              code: '(async () => {\n  const registration = await navigator.serviceWorker.register("sw.js", {\n    scope: "./",\n  });\n  await navigator.serviceWorker.ready;\n  if (!navigator.serviceWorker.controller)\n    await new Promise((resolve) =>\n      navigator.serviceWorker.addEventListener("controllerchange", resolve, {\n        once: true,\n      }),\n    );\n  const cache = await caches.open("fetch-config-v1:" + registration.scope);\n  const response = await cache.match(\n    new URL("offline.html", registration.scope).href,\n  );\n  console.log(response.ok, (await response.text()).includes("Offline demo"));\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Service-worker offline navigation and cleanup",
          explanation:
            "Return the precached offline document when a navigation fails at the network layer.",
          note: "HTTP error responses are still network responses; this fallback is for rejected navigations. Unregistering does not immediately remove a controller from an already open document; reload or close it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers",
          examples: [
            {
              label: "Navigate a frame to a deliberately unavailable route",
              language: "javascript",
              code: '(async () => {\n  const registration = await navigator.serviceWorker.register("sw.js", {\n    scope: "./",\n  });\n  await navigator.serviceWorker.ready;\n  if (!navigator.serviceWorker.controller)\n    await new Promise((resolve) =>\n      navigator.serviceWorker.addEventListener("controllerchange", resolve, {\n        once: true,\n      }),\n    );\n  const frame = document.createElement("iframe");\n  frame.src = "offline-page";\n  const loaded = new Promise((resolve) =>\n    frame.addEventListener("load", resolve, { once: true }),\n  );\n  document.body.append(frame);\n  await loaded;\n  console.log(frame.contentDocument.querySelector("h1").textContent);\n  frame.remove();\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Unregister and delete only this demo cache",
              language: "javascript",
              code: '(async () => {\n  const registration = await navigator.serviceWorker.register("sw.js", {\n    scope: "./",\n  });\n  await navigator.serviceWorker.ready;\n  if (!navigator.serviceWorker.controller)\n    await new Promise((resolve) =>\n      navigator.serviceWorker.addEventListener("controllerchange", resolve, {\n        once: true,\n      }),\n    );\n  console.log(await registration.unregister());\n  console.log(await caches.delete("fetch-config-v1:" + registration.scope));\n})().catch((error) => {\n  throw error;\n});',
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
          code: 'import { createServer } from "node:http";\nimport { readFile } from "node:fs/promises";\nimport { pathToFileURL } from "node:url";\nexport function createResponseServer(\n  servePage = () => readFile(new URL("index.html", import.meta.url)),\n) {\n  const counts = new Map();\n  return createServer(async (req, res) => {\n    try {\n      const url = new URL(req.url, "http://localhost");\n      const match = url.pathname.match(/^(\\/case\\/\\d+)?\\/(.*)$/);\n      const scope = match?.[1] || "",\n        route = match?.[2] || "";\n      res.setHeader("Cache-Control", "no-store");\n      const send = (status, type, body) => {\n        res.writeHead(status, { "Content-Type": type });\n        res.end(body);\n      };\n      const json = (status, data) =>\n        send(status, "application/json", JSON.stringify(data));\n      if (!route || route.endsWith("index.html"))\n        return send(200, "text/html", await servePage(url.pathname));\n      if (route === "stats")\n        return json(\n          200,\n          Object.fromEntries(\n            [...counts]\n              .filter(([key]) => key.startsWith(scope + "|"))\n              .map(([key, value]) => [key.slice(scope.length + 1), value]),\n          ),\n        );\n      counts.set(\n        scope + "|" + route,\n        (counts.get(scope + "|" + route) || 0) + 1,\n      );\n      if (route === "drop") {\n        req.socket.destroy();\n        return;\n      }\n      if (route === "data") return json(200, { message: "hello", value: 42 });\n      if (route === "text")\n        return send(200, "text/plain; charset=utf-8", "Hello 😀");\n      if (route === "html")\n        return send(200, "text/html; charset=utf-8", "<h1>Demo</h1>");\n      if (route === "image")\n        return send(\n          200,\n          "image/png",\n          Buffer.from(\n            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6l8AAAAASUVORK5CYII=",\n            "base64",\n          ),\n        );\n      if (route === "binary")\n        return send(\n          200,\n          "application/octet-stream",\n          Buffer.from([1, 2, 3, 255]),\n        );\n      if (route === "unknown") return send(200, "application/x-demo", "demo");\n      if (route === "pdf")\n        return send(\n          200,\n          "application/pdf",\n          "%PDF-1.4\\n% demonstration bytes, not a rendered document\\n%%EOF",\n        );\n      if (route === "form") {\n        const form = new FormData();\n        form.append("name", "John");\n        form.append("tag", "one");\n        form.append("tag", "two");\n        const encoded = new Response(form);\n        res.writeHead(200, {\n          "Content-Type": encoded.headers.get("content-type"),\n        });\n        res.end(Buffer.from(await encoded.arrayBuffer()));\n        return;\n      }\n      if (route === "url-form")\n        return send(\n          200,\n          "application/x-www-form-urlencoded",\n          "name=Jane&tag=one&tag=two",\n        );\n      if (route === "bad-json") return send(200, "application/json", "{broken");\n      if (route === "suffix-json")\n        return send(\n          200,\n          "application/problem+json; charset=utf-8",\n          JSON.stringify({ message: "details" }),\n        );\n      if (route === "empty") {\n        res.writeHead(204);\n        res.end();\n        return;\n      }\n      if (route === "slow") {\n        const timer = setTimeout(() => json(200, { done: true }), 150);\n        res.on("close", () => clearTimeout(timer));\n        return;\n      }\n      if (route === "slow-body") {\n        res.writeHead(200, { "Content-Type": "application/json" });\n        res.flushHeaders();\n        const timer = setTimeout(() => res.end(\'{"done":true}\'), 150);\n        res.on("close", () => clearTimeout(timer));\n        return;\n      }\n      if (route === "retry") {\n        const count = counts.get(scope + "|" + route);\n        return count === 1\n          ? json(503, { message: "try again" })\n          : json(200, { done: true });\n      }\n      if (route === "retry-after") {\n        res.setHeader("Retry-After", "0");\n        return json(429, { message: "rate limited" });\n      }\n      if (route === "status/422")\n        return json(422, { errors: { email: "Invalid email" } });\n      if (/^status\\/\\d+$/.test(route)) {\n        const status = Number(route.split("/")[1]);\n        return json(status, { message: "Demo failure" });\n      }\n      if (route === "download" || route === "download-unknown") {\n        const bytes = Buffer.from("download demo");\n        res.writeHead(200, {\n          "Content-Type": "application/octet-stream",\n          ...(route === "download"\n            ? { "Content-Length": String(bytes.length) }\n            : {}),\n        });\n        res.write(bytes.subarray(0, 4));\n        const timer = setTimeout(() => res.end(bytes.subarray(4)), 15);\n        res.on("close", () => clearTimeout(timer));\n        return;\n      }\n      if (route === "ndjson" || route === "bad-ndjson") {\n        const text =\n          route === "ndjson"\n            ? \'{"id":1,"text":"😀"}\\r\\n{"id":2,"text":"last"}\'\n            : \'{"id":1}\\n{broken}\\n\';\n        const bytes = Buffer.from(text);\n        const emoji = bytes.indexOf(Buffer.from("😀"));\n        const split = emoji >= 0 ? emoji + 1 : 5;\n        res.writeHead(200, { "Content-Type": "application/x-ndjson" });\n        res.write(bytes.subarray(0, split));\n        const timer = setTimeout(() => res.end(bytes.subarray(split)), 15);\n        res.on("close", () => clearTimeout(timer));\n        return;\n      }\n      return json(404, { message: "Missing route" });\n    } catch (error) {\n      if (!res.headersSent)\n        res.writeHead(500, { "Content-Type": "text/plain" });\n      res.end(error.message);\n    }\n  });\n}\nif (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)\n  createResponseServer().listen(3200, "127.0.0.1", () =>\n    console.log("Open http://127.0.0.1:3200/ and use the console"),\n  );',
        },
        {
          label: "index.html — dedicated console page",
          language: "html",
          code: '<!doctype html>\n<html lang="en"\n  ><meta charset="utf-8" /><title>Response handling</title\n  ><h1>Response handling</h1\n  ><p>Open the console and run one example.</p></html\n>',
        },
      ],
      methods: [
        {
          name: "response.json() — parse JSON",
          explanation:
            "Consumes the body and resolves to the parsed JavaScript value.",
          note: "HTTP success and valid JSON are separate checks; json does not validate application data shape or require a JSON Content-Type.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/json",
          examples: [
            {
              label: "Read a successful JSON object",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const response = await checked("data");\n  const data = await response.json();\n  console.log(data.message, data.value);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Handle malformed JSON",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  try {\n    await (await checked("bad-json")).json();\n  } catch (error) {\n    console.log(error instanceof SyntaxError);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "response.text() — decode text",
          explanation: "Consumes the body and resolves to decoded text.",
          note: "Reading HTML as text does not execute it; choose safe DOM insertion methods if displaying untrusted content.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/text",
          examples: [
            {
              label: "Read UTF-8 text",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  console.log(await (await checked("text")).text());\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Read markup without executing it",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const markup = await (await checked("html")).text();\n  const pre = document.createElement("pre");\n  pre.textContent = markup;\n  console.log(pre.textContent, pre.querySelector("h1") === null);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "response.blob() and object URLs",
          explanation:
            "Read binary data as a Blob and create an object URL when a browser element needs a URL.",
          note: "Revoking too early can interrupt use; a retained display or download link must keep its URL until it is removed or replaced.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/blob",
          examples: [
            {
              label: "Load an image and release its URL",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const blob = await (await checked("image")).blob();\n  const url = URL.createObjectURL(blob);\n  const image = new Image();\n  try {\n    image.src = url;\n    await image.decode();\n    console.log(blob.type, image.naturalWidth, image.naturalHeight);\n  } finally {\n    image.src = "";\n    URL.revokeObjectURL(url);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Read binary bytes through a Blob",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const blob = await (await checked("binary")).blob();\n  console.log(\n    blob.type,\n    blob.size,\n    ...new Uint8Array(await blob.arrayBuffer()),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "response.formData() — parse encoded fields",
          explanation:
            "Parses multipart/form-data or URL-encoded response bodies into FormData.",
          note: "The response media type must be supported, and multipart content must include its matching boundary.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/formData",
          examples: [
            {
              label: "Read a real multipart response",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const form = await (await checked("form")).formData();\n  console.log(form.get("name"), ...form.getAll("tag"));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Read URL-encoded fields",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const form = await (await checked("url-form")).formData();\n  console.log(form.get("name"), form.getAll("tag").length);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "response.arrayBuffer() — raw bytes",
          explanation: "Consumes the body as an ArrayBuffer.",
          note: "This buffers the whole body; byte order and binary schema remain the application’s responsibility.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer",
          examples: [
            {
              label: "Inspect downloaded bytes",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const buffer = await (await checked("binary")).arrayBuffer();\n  console.log(buffer.byteLength, ...new Uint8Array(buffer));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Read explicit big-endian values",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const buffer = await (await checked("binary")).arrayBuffer();\n  const view = new DataView(buffer);\n  console.log(view.getUint16(0, false), view.getUint16(2, false));\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "response.clone() and bodyUsed",
          explanation:
            "Clone a response before consuming its body when two independent readers are required.",
          note: "Clone tees the stream and may buffer unread data for a slower branch. Avoid cloning large responses casually; consumed or locked bodies cannot be cloned.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/clone",
          examples: [
            {
              label: "Read JSON and original text separately",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const response = await checked("data");\n  const clone = response.clone();\n  console.log(response.bodyUsed);\n  const data = await response.json();\n  const text = await clone.text();\n  console.log(data.value, JSON.parse(text).value, response.bodyUsed);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Reject repeated reads and late cloning",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  const response = await checked("data");\n  await response.json();\n  try {\n    await response.text();\n  } catch (error) {\n    console.log(error instanceof TypeError);\n  }\n  try {\n    response.clone();\n  } catch (error) {\n    console.log(error instanceof TypeError);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "parseResponse() — choose a body reader",
          explanation:
            "Normalize the media type and select JSON, text, FormData, or binary parsing.",
          note: "Returns image Blobs rather than unmanaged object URLs; callers own any URLs they create. The PDF fixture contains demonstration bytes rather than a rendered PDF document.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Response",
          examples: [
            {
              label: "Parse JSON suffix types, HTML, and form fields",
              language: "javascript",
              code: '(async () => {\n  async function parseResponse(response) {\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const type = (response.headers.get("Content-Type") || "")\n      .split(";")[0]\n      .trim()\n      .toLowerCase();\n    if (type === "application/json" || type.endsWith("+json"))\n      return response.json();\n    if (type.startsWith("text/")) return response.text();\n    if (\n      type === "multipart/form-data" ||\n      type === "application/x-www-form-urlencoded"\n    )\n      return response.formData();\n    const blob = await response.blob();\n    return type === "application/pdf"\n      ? new File([blob], "document.pdf", { type })\n      : blob;\n  }\n  console.log((await parseResponse(await fetch("suffix-json"))).message);\n  console.log(await parseResponse(await fetch("html")));\n  console.log((await parseResponse(await fetch("form"))).get("name"));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Parse images, PDF bytes, and unknown media",
              language: "javascript",
              code: '(async () => {\n  async function parseResponse(response) {\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (response.status === 204 || response.status === 205) return null;\n    const type = (response.headers.get("Content-Type") || "")\n      .split(";")[0]\n      .trim()\n      .toLowerCase();\n    if (type === "application/json" || type.endsWith("+json"))\n      return response.json();\n    if (type.startsWith("text/")) return response.text();\n    if (\n      type === "multipart/form-data" ||\n      type === "application/x-www-form-urlencoded"\n    )\n      return response.formData();\n    const blob = await response.blob();\n    return type === "application/pdf"\n      ? new File([blob], "document.pdf", { type })\n      : blob;\n  }\n  const image = await parseResponse(await fetch("image"));\n  const pdf = await parseResponse(await fetch("pdf"));\n  const unknown = await parseResponse(await fetch("unknown"));\n  console.log(\n    image instanceof Blob,\n    image.type,\n    pdf instanceof File,\n    pdf.name,\n    unknown.type,\n  );\n  console.log(await parseResponse(await fetch("empty")));\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "downloadFile() — streamed download progress",
          explanation:
            "Read response chunks while reporting received byte counts, then expose a downloadable Blob link.",
          note: "This helper buffers chunks for the final Blob, so it is not a memory-saving disk stream. Content-Length can be missing or refer to encoded bytes; the helper omits percentage when the total is unsuitable and does not auto-click the link.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader",
          examples: [
            {
              label: "Track a known-length download",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  async function downloadFile(\n    url,\n    filename,\n    { onProgress = () => {}, signal } = {},\n  ) {\n    const response = await checked(url, { signal });\n    if (!response.body) throw new Error("Missing response stream");\n    const length = response.headers.get("Content-Length");\n    const encoded = response.headers.get("Content-Encoding");\n    const total =\n      length !== null &&\n      !encoded &&\n      Number.isSafeInteger(Number(length)) &&\n      Number(length) > 0\n        ? Number(length)\n        : null;\n    const reader = response.body.getReader();\n    const chunks = [];\n    let received = 0,\n      complete = false;\n    try {\n      while (true) {\n        const { done, value } = await reader.read();\n        if (done) {\n          complete = true;\n          break;\n        }\n        chunks.push(value);\n        received += value.byteLength;\n        onProgress({\n          received,\n          total,\n          percent: total === null ? null : (received / total) * 100,\n        });\n      }\n    } finally {\n      if (!complete) await reader.cancel().catch(() => {});\n      reader.releaseLock();\n    }\n    const blob = new Blob(chunks, {\n      type: response.headers.get("Content-Type") || "application/octet-stream",\n    });\n    const objectURL = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = objectURL;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      blob,\n      received,\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(objectURL);\n      },\n    };\n  }\n  const progress = [];\n  const file = await downloadFile("download", "demo.bin", {\n    onProgress: (state) => progress.push(state),\n  });\n  try {\n    console.log(\n      file.received,\n      file.blob.size,\n      file.link.download,\n      progress.at(-1).percent,\n    );\n  } finally {\n    file.dispose();\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Handle an unknown total and release the link",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  async function downloadFile(\n    url,\n    filename,\n    { onProgress = () => {}, signal } = {},\n  ) {\n    const response = await checked(url, { signal });\n    if (!response.body) throw new Error("Missing response stream");\n    const length = response.headers.get("Content-Length");\n    const encoded = response.headers.get("Content-Encoding");\n    const total =\n      length !== null &&\n      !encoded &&\n      Number.isSafeInteger(Number(length)) &&\n      Number(length) > 0\n        ? Number(length)\n        : null;\n    const reader = response.body.getReader();\n    const chunks = [];\n    let received = 0,\n      complete = false;\n    try {\n      while (true) {\n        const { done, value } = await reader.read();\n        if (done) {\n          complete = true;\n          break;\n        }\n        chunks.push(value);\n        received += value.byteLength;\n        onProgress({\n          received,\n          total,\n          percent: total === null ? null : (received / total) * 100,\n        });\n      }\n    } finally {\n      if (!complete) await reader.cancel().catch(() => {});\n      reader.releaseLock();\n    }\n    const blob = new Blob(chunks, {\n      type: response.headers.get("Content-Type") || "application/octet-stream",\n    });\n    const objectURL = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = objectURL;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      blob,\n      received,\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(objectURL);\n      },\n    };\n  }\n  const progress = [];\n  const file = await downloadFile("download-unknown", "demo.bin", {\n    onProgress: (state) => progress.push(state),\n  });\n  const url = file.link.href;\n  file.dispose();\n  console.log(\n    progress.at(-1).total,\n    progress.at(-1).percent,\n    file.link.isConnected,\n    url.startsWith("blob:"),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "processStream() — incremental JSON lines",
          explanation:
            "Keeps partial lines between chunks and parses each complete JSON line.",
          note: "Malformed complete lines reject instead of being silently discarded. Records are delivered incrementally without accumulating the full response; callbacks can be async and partial results may already have been delivered when an error occurs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams",
          examples: [
            {
              label: "Parse split UTF-8 and a final line without newline",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  async function processStream(\n    url,\n    onRecord,\n    { signal, maxLineLength = 100000 } = {},\n  ) {\n    const response = await checked(url, { signal });\n    if (!response.body) throw new Error("Missing response stream");\n    const reader = response.body.getReader(),\n      decoder = new TextDecoder("utf-8", { fatal: true });\n    let pending = "",\n      complete = false,\n      count = 0;\n    const emit = async (line) => {\n      if (line.endsWith("\\r")) line = line.slice(0, -1);\n      if (line.trim()) {\n        await onRecord(JSON.parse(line));\n        count++;\n      }\n    };\n    try {\n      while (true) {\n        const { done, value } = await reader.read();\n        if (done) {\n          pending += decoder.decode();\n          complete = true;\n          break;\n        }\n        pending += decoder.decode(value, { stream: true });\n        let newline;\n        while ((newline = pending.indexOf("\\n")) !== -1) {\n          if (newline > maxLineLength) throw new Error("Line too long");\n          const line = pending.slice(0, newline);\n          pending = pending.slice(newline + 1);\n          await emit(line);\n        }\n        if (pending.length > maxLineLength) throw new Error("Line too long");\n      }\n      if (pending.length > maxLineLength) throw new Error("Line too long");\n      await emit(pending);\n      return count;\n    } finally {\n      if (!complete) await reader.cancel().catch(() => {});\n      reader.releaseLock();\n    }\n  }\n  const records = [];\n  const count = await processStream("ndjson", (record) => records.push(record));\n  console.log(count, records[0].text, records[1].text);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Reject malformed lines while retaining prior deliveries",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  async function processStream(\n    url,\n    onRecord,\n    { signal, maxLineLength = 100000 } = {},\n  ) {\n    const response = await checked(url, { signal });\n    if (!response.body) throw new Error("Missing response stream");\n    const reader = response.body.getReader(),\n      decoder = new TextDecoder("utf-8", { fatal: true });\n    let pending = "",\n      complete = false,\n      count = 0;\n    const emit = async (line) => {\n      if (line.endsWith("\\r")) line = line.slice(0, -1);\n      if (line.trim()) {\n        await onRecord(JSON.parse(line));\n        count++;\n      }\n    };\n    try {\n      while (true) {\n        const { done, value } = await reader.read();\n        if (done) {\n          pending += decoder.decode();\n          complete = true;\n          break;\n        }\n        pending += decoder.decode(value, { stream: true });\n        let newline;\n        while ((newline = pending.indexOf("\\n")) !== -1) {\n          if (newline > maxLineLength) throw new Error("Line too long");\n          const line = pending.slice(0, newline);\n          pending = pending.slice(newline + 1);\n          await emit(line);\n        }\n        if (pending.length > maxLineLength) throw new Error("Line too long");\n      }\n      if (pending.length > maxLineLength) throw new Error("Line too long");\n      await emit(pending);\n      return count;\n    } finally {\n      if (!complete) await reader.cancel().catch(() => {});\n      reader.releaseLock();\n    }\n  }\n  const records = [];\n  try {\n    await processStream("bad-ndjson", (record) => records.push(record));\n  } catch (error) {\n    console.log(error instanceof SyntaxError, records.length, records[0].id);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Basic failures — HTTP, parsing, and network errors",
          explanation:
            "Check HTTP success explicitly, then handle body parsing separately from transport failure.",
          note: "Fetch can reject for cancellation, invalid request configuration, and browser policy failures as well as network problems. TypeError alone does not identify a network outage.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Convert a readable HTTP error into an application error",
              language: "javascript",
              code: '(async () => {\n  async function checked(url, options) {\n    const response = await fetch(url, options);\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    return response;\n  }\n  try {\n    await checked("status/404");\n  } catch (error) {\n    console.log(error.message);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Observe transport rejection and JSON parse rejection",
              language: "javascript",
              code: '(async () => {\n  try {\n    await fetch("drop");\n  } catch (error) {\n    console.log(error instanceof TypeError);\n  }\n  try {\n    const response = await fetch("bad-json");\n    await response.json();\n  } catch (error) {\n    console.log(error instanceof SyntaxError);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Handle specific response statuses",
          explanation:
            "Map expected HTTP statuses into application results or errors.",
          note: "204 and 205 have no body; statusText can be empty and is not a reliable application error message.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/status",
          examples: [
            {
              label: "Handle empty success and named failures",
              language: "javascript",
              code: '(async () => {\n  async function readStatus(response) {\n    if (response.status === 204 || response.status === 205) return null;\n    if (response.ok) return response.json();\n    const labels = {\n      400: "Bad request",\n      401: "Unauthorized",\n      404: "Not found",\n      500: "Server error",\n    };\n    await response.text();\n    throw new Error(\n      labels[response.status] || "Unexpected status: " + response.status,\n    );\n  }\n  console.log(await readStatus(await fetch("empty")));\n  for (const status of [400, 401, 404, 500]) {\n    try {\n      await readStatus(await fetch("status/" + status));\n    } catch (error) {\n      console.log(error.message);\n    }\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Report an unexpected failure without a missing branch",
              language: "javascript",
              code: '(async () => {\n  async function readStatus(response) {\n    if (response.status === 204 || response.status === 205) return null;\n    if (response.ok) return response.json();\n    const labels = {\n      400: "Bad request",\n      401: "Unauthorized",\n      404: "Not found",\n      500: "Server error",\n    };\n    await response.text();\n    throw new Error(\n      labels[response.status] || "Unexpected status: " + response.status,\n    );\n  }\n  console.log((await readStatus(await fetch("data"))).value);\n  try {\n    await readStatus(await fetch("status/409"));\n  } catch (error) {\n    console.log(error.message);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "AbortSignal.timeout() — bound request and body time",
          explanation:
            "Pass a timeout signal to fetch and keep it while consuming the body.",
          note: "The timeout measures active time, and body reads can fail after fetch has already resolved with headers. Choose a deadline appropriate for the operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static",
          examples: [
            {
              label: "Time out before headers arrive",
              language: "javascript",
              code: '(async () => {\n  const signal = AbortSignal.timeout(25);\n  try {\n    const response = await fetch("slow", { signal });\n    await response.json();\n  } catch (error) {\n    console.log(signal.aborted, signal.reason.name, error.name);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Keep the deadline active while reading the body",
              language: "javascript",
              code: '(async () => {\n  const signal = AbortSignal.timeout(40);\n  try {\n    const response = await fetch("slow-body", { signal });\n    await response.json();\n  } catch (error) {\n    console.log(signal.aborted, signal.reason.name);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "FetchError — preserve status and error data",
          explanation:
            "Stores an HTTP error’s status and response data in an Error object.",
          note: "The stored response body has already been consumed; use data for the parsed error, not a second body read.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
          examples: [
            {
              label: "Keep validation fields in an HTTP error",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  const response = await fetch("status/422");\n  try {\n    if (!response.ok) throw new FetchError(response, await errorData(response));\n  } catch (error) {\n    console.log(\n      error.name,\n      error.status,\n      error.data.errors.email,\n      error.response.bodyUsed,\n    );\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Parse a non-JSON error payload",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  const response = new Response("Upstream unavailable", { status: 503 });\n  const error = new FetchError(response, await errorData(response));\n  console.log(error.status, error.data.message);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "robustFetch() — bounded retries and backoff",
          explanation:
            "Retries selected temporary failures only when the request can safely be sent again.",
          note: "Defaults to retrying GET/HEAD only; replaySafe for another method requires a real server replay/idempotency contract. It honors Retry-After within a 30-second wait budget, does not retry parsing failures, and cannot diagnose CORS from TypeError. attempts counts total attempts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Retry a temporary HTTP failure",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  const retries = [];\n  const data = await robustFetch(\n    "retry",\n    {},\n    { onRetry: (attempt, reason) => retries.push([attempt, reason]) },\n  );\n  console.log(data.done, JSON.stringify(retries));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Do not retry a validation failure",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  let retries = 0;\n  try {\n    await robustFetch(\n      "status/422",\n      {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: "{}",\n      },\n      { replaySafe: true, onRetry: () => retries++ },\n    );\n  } catch (error) {\n    console.log(\n      error instanceof FetchError,\n      error.status,\n      retries,\n      error.data.errors.email,\n    );\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Retry exhaustion and successful empty responses",
          explanation:
            "Reports the final failure after the last attempt. Returns an empty result for successful responses without a body.",
          note: "A blanket retry of every 5xx is inappropriate; the helper selects 502/503/504 and 429. An abort reason supplied by the caller remains distinct from the helper deadline.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Exhaust temporary failures",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  let retries = 0;\n  try {\n    await robustFetch(\n      "status/503",\n      {},\n      { attempts: 2, onRetry: () => retries++ },\n    );\n  } catch (error) {\n    console.log(error.status, retries);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Return null and preserve JSON parsing failures",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  console.log(await robustFetch("empty"));\n  let retries = 0;\n  try {\n    await robustFetch("bad-json", {}, { onRetry: () => retries++ });\n  } catch (error) {\n    console.log(error instanceof SyntaxError, retries);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Retry deadlines and transport failures",
          explanation:
            "Retries temporary connection failures or timeouts when repeating the request is safe.",
          note: "The helper adds an explicit retry policy to fetch; a TypeError can also represent browser policy rejection, so it is not proof of a transient outage.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Retry a per-attempt timeout",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  const reasons = [];\n  try {\n    await robustFetch(\n      "slow-body",\n      {},\n      {\n        attempts: 2,\n        timeout: 25,\n        onRetry: (_, reason) => reasons.push(reason),\n      },\n    );\n  } catch (error) {\n    console.log(error.name, reasons.join(","));\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Exhaust a real connection failure",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  let retries = 0;\n  try {\n    await robustFetch("drop", {}, { attempts: 2, onRetry: () => retries++ });\n  } catch (error) {\n    console.log(error instanceof TypeError, retries);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Preserve caller cancellation and avoid unsafe replay",
          explanation:
            "Stop immediately when the caller aborts, including during a retry delay.",
          note: "AbortSignal.any combines caller cancellation and the attempt deadline. Stream request bodies are rejected by this helper rather than silently reused.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static",
          examples: [
            {
              label: "Cancel during backoff without sending another attempt",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  const controller = new AbortController();\n  let retries = 0;\n  try {\n    await robustFetch(\n      "status/503",\n      { signal: controller.signal },\n      {\n        onRetry: () => {\n          retries++;\n          controller.abort(new DOMException("Cancelled", "AbortError"));\n        },\n      },\n    );\n  } catch (error) {\n    console.log(error.name, retries);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Keep POST retries off and reject invalid attempt counts",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  let retries = 0;\n  try {\n    await robustFetch(\n      "status/503",\n      { method: "POST", body: "demo" },\n      { onRetry: () => retries++ },\n    );\n  } catch (error) {\n    console.log(error.status, retries);\n  }\n  try {\n    await robustFetch("data", {}, { attempts: 0 });\n  } catch (error) {\n    console.log(error.name);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Application error actions — login and validation",
          explanation:
            "Handle structured FetchError values at the UI boundary and let other failures use a generic path.",
          note: "The demo uses local callbacks instead of navigating away; inject your application router and error UI in a real integration.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Route a 401 to the login action",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  const actions = [];\n  const goToLogin = () => actions.push("login");\n  try {\n    await robustFetch("status/401");\n  } catch (error) {\n    if (error instanceof FetchError && error.status === 401) goToLogin();\n    else throw error;\n  }\n  console.log(...actions);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Display structured validation errors",
              language: "javascript",
              code: '(async () => {\n  class FetchError extends Error {\n    constructor(response, data) {\n      super("HTTP " + response.status);\n      this.name = "FetchError";\n      this.response = response;\n      this.status = response.status;\n      this.data = data;\n    }\n  }\n  async function errorData(response) {\n    const text = await response.text();\n    try {\n      return JSON.parse(text);\n    } catch {\n      return { message: text };\n    }\n  }\n\n  function retryPause(ms, signal) {\n    return new Promise((resolve, reject) => {\n      if (signal?.aborted) {\n        reject(signal.reason);\n        return;\n      }\n      const abort = () => {\n        clearTimeout(timer);\n        signal.removeEventListener("abort", abort);\n        reject(signal.reason);\n      };\n      const timer = setTimeout(() => {\n        signal?.removeEventListener("abort", abort);\n        resolve();\n      }, ms);\n      signal?.addEventListener("abort", abort, { once: true });\n    });\n  }\n  async function robustFetch(url, options = {}, config = {}) {\n    const {\n      attempts = 3,\n      retryDelay = 20,\n      timeout = 1000,\n      onRetry = () => {},\n      replaySafe = false,\n    } = config;\n    if (\n      !Number.isInteger(attempts) ||\n      attempts < 1 ||\n      !Number.isFinite(retryDelay) ||\n      retryDelay < 0 ||\n      !Number.isSafeInteger(timeout) ||\n      timeout < 1\n    )\n      throw new RangeError("Invalid retry configuration");\n    const template = new Request(new URL(url, location.href), options);\n    if (options.body instanceof ReadableStream)\n      throw new TypeError("Use a replayable body");\n    const mayRetry = ["GET", "HEAD"].includes(template.method) || replaySafe;\n    for (let attempt = 0; attempt < attempts; attempt++) {\n      options.signal?.throwIfAborted();\n      const controller = new AbortController();\n      const signal = AbortSignal.any([template.signal, controller.signal]);\n      const timer = setTimeout(\n        () =>\n          controller.abort(\n            new DOMException("Request timed out", "TimeoutError"),\n          ),\n        timeout,\n      );\n      let failure,\n        phase = "fetch";\n      try {\n        const response = await fetch(template.clone(), { signal });\n        phase = "body";\n        if (!response.ok)\n          throw new FetchError(response, await errorData(response));\n        if (\n          response.status === 204 ||\n          response.status === 205 ||\n          template.method === "HEAD"\n        )\n          return null;\n        const text = await response.text();\n        phase = "parse";\n        return text.trim() === "" ? null : JSON.parse(text);\n      } catch (error) {\n        if (options.signal?.aborted) throw options.signal.reason;\n        failure = controller.signal.aborted ? controller.signal.reason : error;\n        const retryable =\n          failure instanceof FetchError\n            ? [429, 502, 503, 504].includes(failure.status)\n            : failure.name === "TimeoutError" ||\n              ((phase === "fetch" || phase === "body") &&\n                failure instanceof TypeError);\n        if (!mayRetry || !retryable || attempt === attempts - 1) throw failure;\n      } finally {\n        clearTimeout(timer);\n      }\n      let delay = retryDelay * 2 ** attempt;\n      if (failure instanceof FetchError) {\n        const header = failure.response.headers.get("Retry-After");\n        if (header !== null) {\n          const seconds = Number(header);\n          const minimum = Number.isFinite(seconds)\n            ? seconds * 1000\n            : Date.parse(header) - Date.now();\n          if (Number.isFinite(minimum)) delay = Math.max(delay, minimum);\n        }\n      }\n      if (delay > 30000) throw failure;\n      onRetry(\n        attempt + 1,\n        failure instanceof FetchError ? failure.status : failure.name,\n      );\n      await retryPause(delay, options.signal);\n    }\n  }\n  const output = document.createElement("p");\n  const showValidationErrors = (errors) => {\n    output.textContent = errors.email;\n  };\n  try {\n    await robustFetch("status/422");\n  } catch (error) {\n    if (error instanceof FetchError && error.status === 422)\n      showValidationErrors(error.data.errors);\n    else throw error;\n  }\n  console.log(output.textContent);\n})().catch((error) => {\n  throw error;\n});',
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
          code: 'import { createServer } from "node:http";\nimport { readFile } from "node:fs/promises";\nimport { pathToFileURL } from "node:url";\nexport function createAdvancedServer(\n  servePage = () => readFile(new URL("index.html", import.meta.url)),\n) {\n  const scopes = new Map();\n  return createServer(async (req, res) => {\n    try {\n      const url = new URL(req.url, "http://localhost"),\n        match = url.pathname.match(/^(\\/case\\/\\d+)?\\/(.*)$/),\n        scope = match?.[1] || "",\n        route = match?.[2] || "";\n      if (!scopes.has(scope))\n        scopes.set(scope, { requests: 0, retries: 0, uploads: new Map() });\n      const state = scopes.get(scope);\n      res.setHeader("Cache-Control", "no-store");\n      const json = (status, data) => {\n        res.writeHead(status, { "Content-Type": "application/json" });\n        res.end(JSON.stringify(data));\n      };\n      if (!route || route.endsWith("index.html")) {\n        res.writeHead(200, { "Content-Type": "text/html" });\n        res.end(await servePage(url.pathname));\n        return;\n      }\n      state.requests++;\n      if (route === "delay" || route === "slow-body") {\n        if (route === "slow-body") {\n          res.writeHead(200, { "Content-Type": "application/json" });\n          res.flushHeaders();\n        }\n        const timer = setTimeout(\n          () => {\n            if (!res.headersSent)\n              res.writeHead(200, { "Content-Type": "application/json" });\n            res.end(\n              JSON.stringify({\n                value: url.searchParams.get("value") || "done",\n              }),\n            );\n          },\n          Number(url.searchParams.get("ms") || 150),\n        );\n        res.on("close", () => clearTimeout(timer));\n        return;\n      }\n      if (route === "data") return json(200, { value: "data" });\n      if (route === "drop") {\n        req.socket.destroy();\n        return;\n      }\n      if (route === "retry") {\n        state.retries++;\n        return json(state.retries === 1 ? 503 : 200, { value: "retried" });\n      }\n      if (route === "bad-json") {\n        res.writeHead(200, { "Content-Type": "application/json" });\n        res.end("{broken");\n        return;\n      }\n      if (route.startsWith("status/"))\n        return json(Number(route.split("/")[1]), { message: "Demo failure" });\n      if (\n        route === "file" ||\n        route === "file-ignore" ||\n        route === "file-bad" ||\n        route === "file-unknown"\n      ) {\n        const bytes = Buffer.from("Hello world"),\n          etag = \'"file-v1"\';\n        res.setHeader("ETag", etag);\n        res.setHeader("Accept-Ranges", "bytes");\n        const range = req.headers.range?.match(/^bytes=(\\d+)-$/);\n        const start = range ? Number(range[1]) : 0;\n        if (\n          range &&\n          route !== "file-ignore" &&\n          (!req.headers["if-range"] || req.headers["if-range"] === etag)\n        ) {\n          if (start >= bytes.length) {\n            res.writeHead(416, { "Content-Range": "bytes */" + bytes.length });\n            res.end();\n            return;\n          }\n          res.writeHead(206, {\n            "Content-Type": "application/octet-stream",\n            "Content-Range": `bytes ${route === "file-bad" ? start + 1 : start}-${bytes.length - 1}/${bytes.length}`,\n            "Content-Length": bytes.length - start,\n          });\n          res.end(bytes.subarray(start));\n          return;\n        }\n        res.writeHead(200, {\n          "Content-Type": "application/octet-stream",\n          ...(route === "file-unknown"\n            ? {}\n            : { "Content-Length": bytes.length }),\n        });\n        res.write(bytes.subarray(0, 3));\n        const timer = setTimeout(() => res.end(bytes.subarray(3)), 10);\n        res.on("close", () => clearTimeout(timer));\n        return;\n      }\n      const buffers = [];\n      for await (const chunk of req) buffers.push(chunk);\n      const raw = Buffer.concat(buffers);\n      if (route === "echo")\n        return json(200, {\n          method: req.method,\n          headers: req.headers,\n          body: raw.toString(),\n        });\n      const form = async () =>\n        new Request("http://localhost/form", {\n          method: "POST",\n          headers: { "Content-Type": req.headers["content-type"] },\n          body: raw,\n        }).formData();\n      if (route === "upload") {\n        const data = await form(),\n          files = [...data.values()].filter(\n            (value) => typeof value !== "string",\n          );\n        return json(201, {\n          names: files.map((file) => file.name),\n          sizes: files.map((file) => file.size),\n          description: data.get("description"),\n        });\n      }\n      // A bounded in-memory protocol for demonstration, not production storage.\n      if (route === "upload-chunk") {\n        const data = await form(),\n          id = data.get("uploadId"),\n          index = Number(data.get("chunkIndex")),\n          total = Number(data.get("totalChunks")),\n          chunk = data.get("chunk");\n        if (\n          typeof id !== "string" ||\n          !Number.isInteger(total) ||\n          total < 1 ||\n          total > 100 ||\n          !Number.isInteger(index) ||\n          index < 0 ||\n          index >= total ||\n          !chunk ||\n          chunk.size > 1048576\n        )\n          return json(400, { message: "Invalid chunk" });\n        if (!state.uploads.has(id))\n          state.uploads.set(id, {\n            total,\n            filename: data.get("filename"),\n            chunks: new Map(),\n          });\n        const upload = state.uploads.get(id);\n        if (upload.total !== total || upload.filename !== data.get("filename"))\n          return json(409, { message: "Metadata mismatch" });\n        upload.chunks.set(index, Buffer.from(await chunk.arrayBuffer()));\n        return json(200, { accepted: index });\n      }\n      if (route === "upload-complete") {\n        const data = JSON.parse(raw.toString()),\n          upload = state.uploads.get(data.uploadId);\n        if (data.totalChunks === 0)\n          return json(201, { size: 0, text: "", filename: data.filename });\n        if (\n          !upload ||\n          upload.total !== data.totalChunks ||\n          upload.chunks.size !== upload.total ||\n          upload.filename !== data.filename\n        )\n          return json(409, { message: "Incomplete upload" });\n        const bytes = Buffer.concat(\n          Array.from({ length: upload.total }, (_, index) =>\n            upload.chunks.get(index),\n          ),\n        );\n        state.uploads.delete(data.uploadId);\n        return json(201, {\n          size: bytes.length,\n          text: bytes.toString(),\n          filename: data.filename,\n        });\n      }\n      return json(404, { message: "Missing route" });\n    } catch (error) {\n      if (!res.headersSent)\n        res.writeHead(400, { "Content-Type": "application/json" });\n      res.end(JSON.stringify({ message: error.message }));\n    }\n  });\n}\nif (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)\n  createAdvancedServer().listen(3300, "127.0.0.1", () =>\n    console.log("Open http://127.0.0.1:3300/ and use the console"),\n  );',
        },
        {
          label: "index.html — browser console page",
          language: "html",
          code: '<!doctype html>\n<html lang="en"\n  ><meta charset="utf-8" /><title>Advanced fetch</title\n  ><h1>Advanced fetch</h1\n  ><p>Open the console and run one browser example.</p></html\n>',
        },
      ],
      methods: [
        {
          name: "AbortController — cancel a fetch",
          explanation:
            "Pass a controller’s signal to fetch, then call abort when the operation is no longer needed.",
          note: "An aborted signal stays aborted; create a new controller for a new operation. Aborting does not undo effects that already occurred on the server.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Cancel an in-flight request",
              language: "javascript",
              code: '(async () => {\n  const controller = new AbortController();\n  const request = fetch("delay", { signal: controller.signal });\n  controller.abort();\n  try {\n    await request;\n  } catch (error) {\n    console.log(error.name, controller.signal.aborted);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Create a fresh controller after aborting",
              language: "javascript",
              code: '(async () => {\n  const old = new AbortController();\n  old.abort();\n  try {\n    await fetch("data", { signal: old.signal });\n  } catch (error) {\n    console.log(error.name);\n  }\n  const fresh = new AbortController();\n  console.log(\n    (await (await fetch("data", { signal: fresh.signal })).json()).value,\n    fresh.signal.aborted,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Cancel on user action",
          explanation:
            "Give every start action a fresh controller and connect the cancel button to the current operation.",
          note: "The examples create all DOM controls and expose cleanup; cancellation can also stop body consumption.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Start and cancel through actual buttons",
              language: "javascript",
              code: '(async () => {\n  function createFetchControls(url) {\n    const panel = document.createElement("div"),\n      start = document.createElement("button"),\n      cancel = document.createElement("button"),\n      output = document.createElement("p");\n    start.textContent = "Fetch";\n    cancel.textContent = "Cancel";\n    panel.append(start, cancel, output);\n    document.body.append(panel);\n    let controller = null,\n      pending = Promise.resolve();\n    start.addEventListener("click", () => {\n      controller?.abort();\n      const current = new AbortController();\n      controller = current;\n      pending = (async () => {\n        try {\n          const response = await fetch(url, { signal: current.signal });\n          if (!response.ok) throw new Error("HTTP " + response.status);\n          const data = await response.json();\n          if (controller === current) output.textContent = data.value;\n        } catch (error) {\n          if (controller === current)\n            output.textContent = current.signal.aborted\n              ? "cancelled"\n              : error.message;\n        } finally {\n          if (controller === current) controller = null;\n        }\n      })();\n    });\n    cancel.addEventListener("click", () => controller?.abort());\n    return {\n      start,\n      cancel,\n      output,\n      get pending() {\n        return pending;\n      },\n      dispose() {\n        controller?.abort();\n        controller = null;\n        panel.remove();\n      },\n    };\n  }\n  const ui = createFetchControls("delay");\n  ui.start.click();\n  ui.cancel.click();\n  await ui.pending;\n  console.log(ui.output.textContent);\n  ui.dispose();\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Restart successfully after cancellation",
              language: "javascript",
              code: '(async () => {\n  function createFetchControls(url) {\n    const panel = document.createElement("div"),\n      start = document.createElement("button"),\n      cancel = document.createElement("button"),\n      output = document.createElement("p");\n    start.textContent = "Fetch";\n    cancel.textContent = "Cancel";\n    panel.append(start, cancel, output);\n    document.body.append(panel);\n    let controller = null,\n      pending = Promise.resolve();\n    start.addEventListener("click", () => {\n      controller?.abort();\n      const current = new AbortController();\n      controller = current;\n      pending = (async () => {\n        try {\n          const response = await fetch(url, { signal: current.signal });\n          if (!response.ok) throw new Error("HTTP " + response.status);\n          const data = await response.json();\n          if (controller === current) output.textContent = data.value;\n        } catch (error) {\n          if (controller === current)\n            output.textContent = current.signal.aborted\n              ? "cancelled"\n              : error.message;\n        } finally {\n          if (controller === current) controller = null;\n        }\n      })();\n    });\n    cancel.addEventListener("click", () => controller?.abort());\n    return {\n      start,\n      cancel,\n      output,\n      get pending() {\n        return pending;\n      },\n      dispose() {\n        controller?.abort();\n        controller = null;\n        panel.remove();\n      },\n    };\n  }\n  const ui = createFetchControls("data");\n  ui.start.click();\n  ui.cancel.click();\n  await ui.pending;\n  ui.start.click();\n  await ui.pending;\n  console.log(ui.output.textContent);\n  ui.dispose();\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "RequestManager — replace duplicate request IDs",
          explanation:
            "Keep a controller for each active operation and cancel the earlier operation with the same ID.",
          note: "Unlike the screenshot wrapper, this helper consumes the body before releasing tracking. It returns the reader result, not an unconsumed Response, and preserves a caller-supplied signal.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "An old request cannot delete the newer controller",
              language: "javascript",
              code: '(async () => {\n  class RequestManager {\n    constructor() {\n      this.controllers = new Map();\n    }\n    async fetch(id, url, options = {}, read = (response) => response.json()) {\n      this.cancel(id);\n      const controller = new AbortController();\n      this.controllers.set(id, controller);\n      const signal = options.signal\n        ? AbortSignal.any([options.signal, controller.signal])\n        : controller.signal;\n      try {\n        const response = await fetch(url, { ...options, signal });\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        return await read(response);\n      } finally {\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancel(id) {\n      const controller = this.controllers.get(id);\n      if (controller) {\n        controller.abort();\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancelAll() {\n      for (const controller of this.controllers.values()) controller.abort();\n      this.controllers.clear();\n    }\n  }\n  const manager = new RequestManager();\n  const first = manager\n    .fetch("search", "delay?ms=150")\n    .catch((error) => error.name);\n  const second = manager.fetch("search", "delay?ms=80&value=new");\n  console.log(await first, manager.controllers.has("search"));\n  console.log((await second).value, manager.controllers.size);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Cancel a request while its body is pending",
              language: "javascript",
              code: '(async () => {\n  class RequestManager {\n    constructor() {\n      this.controllers = new Map();\n    }\n    async fetch(id, url, options = {}, read = (response) => response.json()) {\n      this.cancel(id);\n      const controller = new AbortController();\n      this.controllers.set(id, controller);\n      const signal = options.signal\n        ? AbortSignal.any([options.signal, controller.signal])\n        : controller.signal;\n      try {\n        const response = await fetch(url, { ...options, signal });\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        return await read(response);\n      } finally {\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancel(id) {\n      const controller = this.controllers.get(id);\n      if (controller) {\n        controller.abort();\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancelAll() {\n      for (const controller of this.controllers.values()) controller.abort();\n      this.controllers.clear();\n    }\n  }\n  const manager = new RequestManager();\n  let gotHeaders;\n  const ready = new Promise((resolve) => (gotHeaders = resolve));\n  const pending = manager\n    .fetch("body", "slow-body", {}, (response) => {\n      gotHeaders();\n      return response.json();\n    })\n    .catch((error) => error.name);\n  await ready;\n  manager.cancel("body");\n  console.log(await pending, manager.controllers.size);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "RequestManager cancelAll() and external signals",
          explanation:
            "Cancel all tracked operations when their owning view closes, or combine a caller’s signal with manager cancellation.",
          note: "A controller can cancel several consumers of the same signal, but these examples allocate one controller per tracked operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Cancel every tracked request",
              language: "javascript",
              code: '(async () => {\n  class RequestManager {\n    constructor() {\n      this.controllers = new Map();\n    }\n    async fetch(id, url, options = {}, read = (response) => response.json()) {\n      this.cancel(id);\n      const controller = new AbortController();\n      this.controllers.set(id, controller);\n      const signal = options.signal\n        ? AbortSignal.any([options.signal, controller.signal])\n        : controller.signal;\n      try {\n        const response = await fetch(url, { ...options, signal });\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        return await read(response);\n      } finally {\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancel(id) {\n      const controller = this.controllers.get(id);\n      if (controller) {\n        controller.abort();\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancelAll() {\n      for (const controller of this.controllers.values()) controller.abort();\n      this.controllers.clear();\n    }\n  }\n  const manager = new RequestManager();\n  const a = manager.fetch("a", "delay").catch((error) => error.name),\n    b = manager.fetch("b", "delay").catch((error) => error.name);\n  manager.cancelAll();\n  console.log(await a, await b, manager.controllers.size);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Preserve caller cancellation",
              language: "javascript",
              code: '(async () => {\n  class RequestManager {\n    constructor() {\n      this.controllers = new Map();\n    }\n    async fetch(id, url, options = {}, read = (response) => response.json()) {\n      this.cancel(id);\n      const controller = new AbortController();\n      this.controllers.set(id, controller);\n      const signal = options.signal\n        ? AbortSignal.any([options.signal, controller.signal])\n        : controller.signal;\n      try {\n        const response = await fetch(url, { ...options, signal });\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        return await read(response);\n      } finally {\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancel(id) {\n      const controller = this.controllers.get(id);\n      if (controller) {\n        controller.abort();\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancelAll() {\n      for (const controller of this.controllers.values()) controller.abort();\n      this.controllers.clear();\n    }\n  }\n  const manager = new RequestManager(),\n    caller = new AbortController();\n  const pending = manager\n    .fetch("a", "delay", { signal: caller.signal })\n    .catch((error) => error.name);\n  caller.abort();\n  console.log(await pending, manager.controllers.size);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "createSingletonFetch() — latest request wins",
          explanation:
            "Wrap a request manager with one shared key for autocomplete or search.",
          note: "One wrapper instance represents one independent search stream; do not share it across unrelated widgets. Identity-checked cleanup prevents the earlier request from clearing the newer controller.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Replace an earlier search",
              language: "javascript",
              code: '(async () => {\n  class RequestManager {\n    constructor() {\n      this.controllers = new Map();\n    }\n    async fetch(id, url, options = {}, read = (response) => response.json()) {\n      this.cancel(id);\n      const controller = new AbortController();\n      this.controllers.set(id, controller);\n      const signal = options.signal\n        ? AbortSignal.any([options.signal, controller.signal])\n        : controller.signal;\n      try {\n        const response = await fetch(url, { ...options, signal });\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        return await read(response);\n      } finally {\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancel(id) {\n      const controller = this.controllers.get(id);\n      if (controller) {\n        controller.abort();\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancelAll() {\n      for (const controller of this.controllers.values()) controller.abort();\n      this.controllers.clear();\n    }\n  }\n  function createSingletonFetch() {\n    const manager = new RequestManager();\n    return (url, options = {}, read) =>\n      manager.fetch("latest", url, options, read);\n  }\n  const search = createSingletonFetch();\n  const first = search("delay?value=old").catch((error) => error.name);\n  const latest = search("data");\n  console.log(await first, (await latest).value);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "A third request cancels the still-active second request",
              language: "javascript",
              code: '(async () => {\n  class RequestManager {\n    constructor() {\n      this.controllers = new Map();\n    }\n    async fetch(id, url, options = {}, read = (response) => response.json()) {\n      this.cancel(id);\n      const controller = new AbortController();\n      this.controllers.set(id, controller);\n      const signal = options.signal\n        ? AbortSignal.any([options.signal, controller.signal])\n        : controller.signal;\n      try {\n        const response = await fetch(url, { ...options, signal });\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        return await read(response);\n      } finally {\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancel(id) {\n      const controller = this.controllers.get(id);\n      if (controller) {\n        controller.abort();\n        if (this.controllers.get(id) === controller)\n          this.controllers.delete(id);\n      }\n    }\n    cancelAll() {\n      for (const controller of this.controllers.values()) controller.abort();\n      this.controllers.clear();\n    }\n  }\n  function createSingletonFetch() {\n    const manager = new RequestManager();\n    return (url, options = {}, read) =>\n      manager.fetch("latest", url, options, read);\n  }\n  const search = createSingletonFetch();\n  const a = search("delay").catch((error) => error.name);\n  const b = search("delay").catch((error) => error.name);\n  await a;\n  const c = search("data");\n  console.log(await b, (await c).value);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "fetchFastest() — first successful response",
          explanation:
            "Use Promise.any to choose the first successful HTTP response and cancel only the other requests.",
          note: "Promise.race chooses the first settlement, including rejection. The winner’s controller must stay un-aborted so its body remains readable; success here means successful headers, not fully parsed content.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Keep the winning body readable",
              language: "javascript",
              code: '(async () => {\n  async function fetchFastest(urls) {\n    if (!Array.isArray(urls) || urls.length === 0)\n      throw new RangeError("Provide at least one URL");\n    const controllers = urls.map(() => new AbortController());\n    let winner = -1;\n    try {\n      const result = await Promise.any(\n        urls.map(async (url, index) => {\n          const response = await fetch(url, {\n            signal: controllers[index].signal,\n          });\n          if (!response.ok) {\n            await response.body?.cancel();\n            throw new Error("HTTP " + response.status);\n          }\n          return { response, index };\n        }),\n      );\n      winner = result.index;\n      return result.response;\n    } finally {\n      controllers.forEach((controller, index) => {\n        if (index !== winner) controller.abort();\n      });\n    }\n  }\n  const response = await fetchFastest([\n    "delay?ms=150",\n    "slow-body?ms=30&value=winner",\n  ]);\n  console.log((await response.json()).value);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Ignore an early HTTP failure and reject an empty list",
              language: "javascript",
              code: '(async () => {\n  async function fetchFastest(urls) {\n    if (!Array.isArray(urls) || urls.length === 0)\n      throw new RangeError("Provide at least one URL");\n    const controllers = urls.map(() => new AbortController());\n    let winner = -1;\n    try {\n      const result = await Promise.any(\n        urls.map(async (url, index) => {\n          const response = await fetch(url, {\n            signal: controllers[index].signal,\n          });\n          if (!response.ok) {\n            await response.body?.cancel();\n            throw new Error("HTTP " + response.status);\n          }\n          return { response, index };\n        }),\n      );\n      winner = result.index;\n      return result.response;\n    } finally {\n      controllers.forEach((controller, index) => {\n        if (index !== winner) controller.abort();\n      });\n    }\n  }\n  console.log(\n    (await (await fetchFastest(["status/503", "data"])).json()).value,\n  );\n  try {\n    await fetchFastest([]);\n  } catch (error) {\n    console.log(error.name);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "fetchWithTimeout() — combine deadline and cancellation",
          explanation:
            "Use AbortSignal.timeout and combine it with an existing signal.",
          note: "The helper returns a Response; callers still check status and consume the body. Timeouts report TimeoutError and ordinary caller aborts report AbortError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static",
          examples: [
            {
              label: "Time out while waiting for a body",
              language: "javascript",
              code: '(async () => {\n  function fetchWithTimeout(url, options = {}, timeout = 5000) {\n    const deadline = AbortSignal.timeout(timeout);\n    return fetch(url, {\n      ...options,\n      signal: options.signal\n        ? AbortSignal.any([options.signal, deadline])\n        : deadline,\n    });\n  }\n  try {\n    const response = await fetchWithTimeout("slow-body", {}, 25);\n    await response.json();\n  } catch (error) {\n    console.log(error.name);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Keep the caller signal effective",
              language: "javascript",
              code: '(async () => {\n  function fetchWithTimeout(url, options = {}, timeout = 5000) {\n    const deadline = AbortSignal.timeout(timeout);\n    return fetch(url, {\n      ...options,\n      signal: options.signal\n        ? AbortSignal.any([options.signal, deadline])\n        : deadline,\n    });\n  }\n  const controller = new AbortController();\n  const pending = fetchWithTimeout(\n    "delay",\n    { signal: controller.signal },\n    1000,\n  );\n  controller.abort();\n  try {\n    await pending;\n  } catch (error) {\n    console.log(error.name);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "React useEffect cleanup on unmount",
          explanation:
            "Create a controller inside each effect, abort it in cleanup, and guard state updates after cleanup.",
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
                  code: 'import React, { useEffect, useState, act } from "react";\nimport { createRoot } from "react-dom/client";\nimport { JSDOM } from "jsdom";\nimport { createServer } from "node:http";\nconst dom = new JSDOM(\'<div id="root"></div>\');\nglobalThis.window = dom.window;\nglobalThis.document = dom.window.document;\nglobalThis.IS_REACT_ACT_ENVIRONMENT = true;\nconst server = createServer((req, res) => {\n  const timer = setTimeout(\n    () => {\n      res.writeHead(200, { "Content-Type": "application/json" });\n      res.end(\'{"value":"loaded"}\');\n    },\n    Number(new URL(req.url, "http://localhost").searchParams.get("ms") || 0),\n  );\n  res.on("close", () => clearTimeout(timer));\n});\nawait new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));\nconst url = "http://127.0.0.1:" + server.address().port;\nlet currentSignal, settled;\nconst finished = new Promise((resolve) => (settled = resolve));\nfunction Example({ url }) {\n  const [data, setData] = useState(null),\n    [error, setError] = useState(null);\n  useEffect(() => {\n    const controller = new AbortController();\n    currentSignal = controller.signal;\n    let active = true;\n    (async () => {\n      try {\n        const response = await fetch(url, { signal: controller.signal });\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        const value = await response.json();\n        if (active) setData(value);\n      } catch (error) {\n        if (active && !controller.signal.aborted) setError(error);\n      } finally {\n        settled();\n      }\n    })();\n    return () => {\n      active = false;\n      controller.abort();\n    };\n  }, [url]);\n  return React.createElement(\n    "p",\n    null,\n    error ? error.message : data?.value || "loading",\n  );\n}\nconst root = createRoot(document.querySelector("#root"));\ntry {\n  await act(async () =>\n    root.render(React.createElement(Example, { url: url + "/?ms=150" })),\n  );\n  await act(async () => root.unmount());\n  await finished;\n  console.log(\n    currentSignal.aborted,\n    document.querySelector("#root").textContent,\n  );\n} finally {\n  server.closeAllConnections();\n  server.close();\n  dom.window.close();\n}',
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
                  code: 'import React, { useEffect, useState, act } from "react";\nimport { createRoot } from "react-dom/client";\nimport { JSDOM } from "jsdom";\nimport { createServer } from "node:http";\nconst dom = new JSDOM(\'<div id="root"></div>\');\nglobalThis.window = dom.window;\nglobalThis.document = dom.window.document;\nglobalThis.IS_REACT_ACT_ENVIRONMENT = true;\nconst server = createServer((req, res) => {\n  const timer = setTimeout(\n    () => {\n      res.writeHead(200, { "Content-Type": "application/json" });\n      res.end(\'{"value":"loaded"}\');\n    },\n    Number(new URL(req.url, "http://localhost").searchParams.get("ms") || 0),\n  );\n  res.on("close", () => clearTimeout(timer));\n});\nawait new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));\nconst url = "http://127.0.0.1:" + server.address().port;\nlet currentSignal, settled;\nconst finished = new Promise((resolve) => (settled = resolve));\nfunction Example({ url }) {\n  const [data, setData] = useState(null),\n    [error, setError] = useState(null);\n  useEffect(() => {\n    const controller = new AbortController();\n    currentSignal = controller.signal;\n    let active = true;\n    (async () => {\n      try {\n        const response = await fetch(url, { signal: controller.signal });\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        const value = await response.json();\n        if (active) setData(value);\n      } catch (error) {\n        if (active && !controller.signal.aborted) setError(error);\n      } finally {\n        settled();\n      }\n    })();\n    return () => {\n      active = false;\n      controller.abort();\n    };\n  }, [url]);\n  return React.createElement(\n    "p",\n    null,\n    error ? error.message : data?.value || "loading",\n  );\n}\nconst root = createRoot(document.querySelector("#root"));\ntry {\n  await act(async () => {\n    root.render(React.createElement(Example, { url }));\n  });\n  await act(async () => {\n    await finished;\n  });\n  console.log(document.querySelector("p").textContent);\n  await act(async () => root.unmount());\n  console.log(currentSignal.aborted);\n} finally {\n  server.closeAllConnections();\n  server.close();\n  dom.window.close();\n}',
                },
              ],
            },
          ],
        },
        {
          name: "Basic fetch interception and restoration",
          explanation:
            "Wrap fetch to observe requests and responses while returning the original Response.",
          note: "Fetch has no built-in interceptor registry. Avoid logging credentials or body data; a local wrapper is usually easier to isolate than changing the global function.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Install and restore a temporary global wrapper",
              language: "javascript",
              code: '(async () => {\n  const original = window.fetch;\n  window.fetch = async function (...args) {\n    console.log("request");\n    const response = await original.apply(window, args);\n    console.log("response", response.status);\n    return response;\n  };\n  try {\n    console.log((await (await fetch("data")).json()).value);\n  } finally {\n    window.fetch = original;\n  }\n  console.log(window.fetch === original);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Use an isolated wrapper instead",
              language: "javascript",
              code: '(async () => {\n  const original = window.fetch.bind(window);\n  const observed = async (...args) => {\n    const response = await original(...args);\n    console.log(response.status);\n    return response;\n  };\n  console.log((await (await observed("data")).json()).value);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "FetchInterceptor — ordered request and response hooks",
          explanation:
            "Run request hooks before fetch and response hooks afterward in registration order.",
          note: "Hooks must return the next Request or Response. Clone before inspecting a body that downstream code still needs to read.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Add a header in a request hook",
              language: "javascript",
              code: '(async () => {\n  class FetchInterceptor {\n    constructor() {\n      this.requestInterceptors = [];\n      this.responseInterceptors = [];\n    }\n    addRequestInterceptor(fn) {\n      this.requestInterceptors.push(fn);\n    }\n    addResponseInterceptor(fn) {\n      this.responseInterceptors.push(fn);\n    }\n    async fetch(url, options = {}) {\n      let request = new Request(new URL(url, location.href), options);\n      for (const interceptor of this.requestInterceptors)\n        request = await interceptor(request);\n      let response = await fetch(request);\n      for (const interceptor of this.responseInterceptors)\n        response = await interceptor(response);\n      return response;\n    }\n  }\n  const client = new FetchInterceptor();\n  client.addRequestInterceptor((request) => {\n    const headers = new Headers(request.headers);\n    headers.set("X-Demo", "yes");\n    return new Request(request, { headers });\n  });\n  const data = await (await client.fetch("echo")).json();\n  console.log(data.headers["x-demo"]);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Observe hook order without consuming the returned body",
              language: "javascript",
              code: '(async () => {\n  class FetchInterceptor {\n    constructor() {\n      this.requestInterceptors = [];\n      this.responseInterceptors = [];\n    }\n    addRequestInterceptor(fn) {\n      this.requestInterceptors.push(fn);\n    }\n    addResponseInterceptor(fn) {\n      this.responseInterceptors.push(fn);\n    }\n    async fetch(url, options = {}) {\n      let request = new Request(new URL(url, location.href), options);\n      for (const interceptor of this.requestInterceptors)\n        request = await interceptor(request);\n      let response = await fetch(request);\n      for (const interceptor of this.responseInterceptors)\n        response = await interceptor(response);\n      return response;\n    }\n  }\n  const order = [],\n    client = new FetchInterceptor();\n  client.addRequestInterceptor((request) => {\n    order.push("request");\n    return request;\n  });\n  client.addResponseInterceptor(async (response) => {\n    order.push((await response.clone().json()).value);\n    return response;\n  });\n  const response = await client.fetch("data");\n  console.log(order.join("|"), (await response.json()).value);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "FetchClient — request, response, and error chains",
          explanation:
            "Create an explicit promise chain for request hooks, response hooks, and final error handlers.",
          note: "A rejection handler recovers by returning a valid next-stage value or propagates by throwing. Error handlers run in order until one recovers; use returns an eject function.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Recover a request-hook failure and continue to fetch",
              language: "javascript",
              code: '(async () => {\n  class FetchClient {\n    constructor(baseURL = "./") {\n      this.baseURL = new URL(baseURL, location.href);\n      this.interceptors = { request: [], response: [], error: [] };\n    }\n    use(type, fulfilled, rejected) {\n      if (!this.interceptors[type])\n        throw new TypeError("Unknown interceptor type");\n      const hook = { fulfilled, rejected };\n      this.interceptors[type].push(hook);\n      return () => {\n        const list = this.interceptors[type],\n          index = list.indexOf(hook);\n        if (index >= 0) list.splice(index, 1);\n      };\n    }\n    async request(url, options = {}) {\n      let config = {\n        url: new URL(url, this.baseURL).href,\n        options: { ...options, headers: new Headers(options.headers) },\n        meta: {},\n      };\n      let chain = Promise.resolve(config);\n      for (const hook of this.interceptors.request)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      chain = chain.then(async (current) => {\n        config = current;\n        const response = await fetch(current.url, current.options);\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          error.response = response;\n          error.config = current;\n          throw error;\n        }\n        return { response, config: current };\n      });\n      for (const hook of this.interceptors.response)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      for (const hook of this.interceptors.error)\n        chain = chain.catch((error) => hook.fulfilled(error, config));\n      return chain;\n    }\n  }\n  const api = new FetchClient();\n  api.use("request", () => {\n    throw new Error("prepare");\n  });\n  api.use("request", undefined, () => ({\n    url: new URL("data", location.href).href,\n    options: {},\n    meta: {},\n  }));\n  const result = await api.request("data");\n  console.log((await result.response.json()).value);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Eject a hook and propagate unhandled failures",
              language: "javascript",
              code: '(async () => {\n  class FetchClient {\n    constructor(baseURL = "./") {\n      this.baseURL = new URL(baseURL, location.href);\n      this.interceptors = { request: [], response: [], error: [] };\n    }\n    use(type, fulfilled, rejected) {\n      if (!this.interceptors[type])\n        throw new TypeError("Unknown interceptor type");\n      const hook = { fulfilled, rejected };\n      this.interceptors[type].push(hook);\n      return () => {\n        const list = this.interceptors[type],\n          index = list.indexOf(hook);\n        if (index >= 0) list.splice(index, 1);\n      };\n    }\n    async request(url, options = {}) {\n      let config = {\n        url: new URL(url, this.baseURL).href,\n        options: { ...options, headers: new Headers(options.headers) },\n        meta: {},\n      };\n      let chain = Promise.resolve(config);\n      for (const hook of this.interceptors.request)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      chain = chain.then(async (current) => {\n        config = current;\n        const response = await fetch(current.url, current.options);\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          error.response = response;\n          error.config = current;\n          throw error;\n        }\n        return { response, config: current };\n      });\n      for (const hook of this.interceptors.response)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      for (const hook of this.interceptors.error)\n        chain = chain.catch((error) => hook.fulfilled(error, config));\n      return chain;\n    }\n  }\n  const api = new FetchClient();\n  let calls = 0;\n  const eject = api.use("request", (config) => {\n    calls++;\n    return config;\n  });\n  await (await api.request("data")).response.text();\n  eject();\n  await (await api.request("data")).response.text();\n  console.log(calls);\n  try {\n    await api.request("status/404");\n  } catch (error) {\n    console.log(error.status);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Authentication and timing interceptors",
          explanation:
            "Add authentication only for a trusted destination and store timing metadata on the request envelope.",
          note: "Do not log token-bearing options. Native Response has no config property; the client envelope deliberately supplies it. Timing here measures through response headers, before optional body parsing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Attach a token without discarding existing Headers",
              language: "javascript",
              code: '(async () => {\n  class FetchClient {\n    constructor(baseURL = "./") {\n      this.baseURL = new URL(baseURL, location.href);\n      this.interceptors = { request: [], response: [], error: [] };\n    }\n    use(type, fulfilled, rejected) {\n      if (!this.interceptors[type])\n        throw new TypeError("Unknown interceptor type");\n      const hook = { fulfilled, rejected };\n      this.interceptors[type].push(hook);\n      return () => {\n        const list = this.interceptors[type],\n          index = list.indexOf(hook);\n        if (index >= 0) list.splice(index, 1);\n      };\n    }\n    async request(url, options = {}) {\n      let config = {\n        url: new URL(url, this.baseURL).href,\n        options: { ...options, headers: new Headers(options.headers) },\n        meta: {},\n      };\n      let chain = Promise.resolve(config);\n      for (const hook of this.interceptors.request)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      chain = chain.then(async (current) => {\n        config = current;\n        const response = await fetch(current.url, current.options);\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          error.response = response;\n          error.config = current;\n          throw error;\n        }\n        return { response, config: current };\n      });\n      for (const hook of this.interceptors.response)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      for (const hook of this.interceptors.error)\n        chain = chain.catch((error) => hook.fulfilled(error, config));\n      return chain;\n    }\n  }\n  const api = new FetchClient();\n  const getAuthToken = async () => "demo-token";\n  api.use("request", async (config) => {\n    if (new URL(config.url).origin !== location.origin)\n      throw new Error("Untrusted origin");\n    config.options.headers.set(\n      "Authorization",\n      "Bearer " + (await getAuthToken()),\n    );\n    return config;\n  });\n  const { response } = await api.request("echo", {\n    headers: new Headers({ Accept: "application/json" }),\n  });\n  const data = await response.json();\n  console.log(data.headers.authorization, data.headers.accept);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Measure with explicit per-request metadata",
              language: "javascript",
              code: '(async () => {\n  class FetchClient {\n    constructor(baseURL = "./") {\n      this.baseURL = new URL(baseURL, location.href);\n      this.interceptors = { request: [], response: [], error: [] };\n    }\n    use(type, fulfilled, rejected) {\n      if (!this.interceptors[type])\n        throw new TypeError("Unknown interceptor type");\n      const hook = { fulfilled, rejected };\n      this.interceptors[type].push(hook);\n      return () => {\n        const list = this.interceptors[type],\n          index = list.indexOf(hook);\n        if (index >= 0) list.splice(index, 1);\n      };\n    }\n    async request(url, options = {}) {\n      let config = {\n        url: new URL(url, this.baseURL).href,\n        options: { ...options, headers: new Headers(options.headers) },\n        meta: {},\n      };\n      let chain = Promise.resolve(config);\n      for (const hook of this.interceptors.request)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      chain = chain.then(async (current) => {\n        config = current;\n        const response = await fetch(current.url, current.options);\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          error.response = response;\n          error.config = current;\n          throw error;\n        }\n        return { response, config: current };\n      });\n      for (const hook of this.interceptors.response)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      for (const hook of this.interceptors.error)\n        chain = chain.catch((error) => hook.fulfilled(error, config));\n      return chain;\n    }\n  }\n  const api = new FetchClient();\n  api.use("request", (config) => {\n    config.meta.start = performance.now();\n    return config;\n  });\n  api.use("response", (result) => ({\n    ...result,\n    duration: performance.now() - result.config.meta.start,\n  }));\n  const result = await api.request("data");\n  console.log(\n    Number.isFinite(result.duration),\n    result.duration >= 0,\n    (await result.response.json()).value,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Retry and transform interceptor results",
          explanation:
            "Convert HTTP failures to errors before applying an error retry hook, then pass recovered results through the client’s response chain.",
          note: "This example retries one 503 for GET only and marks the request to bound recursion; it does not replay arbitrary writes. Non-503 errors propagate.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          examples: [
            {
              label: "Retry once through the same client pipeline",
              language: "javascript",
              code: '(async () => {\n  class FetchClient {\n    constructor(baseURL = "./") {\n      this.baseURL = new URL(baseURL, location.href);\n      this.interceptors = { request: [], response: [], error: [] };\n    }\n    use(type, fulfilled, rejected) {\n      if (!this.interceptors[type])\n        throw new TypeError("Unknown interceptor type");\n      const hook = { fulfilled, rejected };\n      this.interceptors[type].push(hook);\n      return () => {\n        const list = this.interceptors[type],\n          index = list.indexOf(hook);\n        if (index >= 0) list.splice(index, 1);\n      };\n    }\n    async request(url, options = {}) {\n      let config = {\n        url: new URL(url, this.baseURL).href,\n        options: { ...options, headers: new Headers(options.headers) },\n        meta: {},\n      };\n      let chain = Promise.resolve(config);\n      for (const hook of this.interceptors.request)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      chain = chain.then(async (current) => {\n        config = current;\n        const response = await fetch(current.url, current.options);\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          error.response = response;\n          error.config = current;\n          throw error;\n        }\n        return { response, config: current };\n      });\n      for (const hook of this.interceptors.response)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      for (const hook of this.interceptors.error)\n        chain = chain.catch((error) => hook.fulfilled(error, config));\n      return chain;\n    }\n  }\n  const api = new FetchClient();\n  api.use("response", async (result) => ({\n    ...result,\n    data: await result.response.json(),\n  }));\n  api.use("error", async (error) => {\n    if (\n      error.status !== 503 ||\n      error.config.meta.retried ||\n      (error.config.options.method || "GET").toUpperCase() !== "GET"\n    )\n      throw error;\n    await error.response.body?.cancel();\n    await new Promise((resolve) => setTimeout(resolve, 10));\n    return api.request(error.config.url, {\n      ...error.config.options,\n      headers: new Headers(error.config.options.headers),\n      method: "GET",\n      _retried: true,\n    });\n  });\n  api.use("request", (config) => {\n    config.meta.retried = Boolean(config.options._retried);\n    delete config.options._retried;\n    return config;\n  });\n  const result = await api.request("retry");\n  console.log(result.data.value, result.response.bodyUsed);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Propagate HTTP errors and transform JSON",
              language: "javascript",
              code: '(async () => {\n  class FetchClient {\n    constructor(baseURL = "./") {\n      this.baseURL = new URL(baseURL, location.href);\n      this.interceptors = { request: [], response: [], error: [] };\n    }\n    use(type, fulfilled, rejected) {\n      if (!this.interceptors[type])\n        throw new TypeError("Unknown interceptor type");\n      const hook = { fulfilled, rejected };\n      this.interceptors[type].push(hook);\n      return () => {\n        const list = this.interceptors[type],\n          index = list.indexOf(hook);\n        if (index >= 0) list.splice(index, 1);\n      };\n    }\n    async request(url, options = {}) {\n      let config = {\n        url: new URL(url, this.baseURL).href,\n        options: { ...options, headers: new Headers(options.headers) },\n        meta: {},\n      };\n      let chain = Promise.resolve(config);\n      for (const hook of this.interceptors.request)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      chain = chain.then(async (current) => {\n        config = current;\n        const response = await fetch(current.url, current.options);\n        if (!response.ok) {\n          const error = new Error("HTTP " + response.status);\n          error.status = response.status;\n          error.response = response;\n          error.config = current;\n          throw error;\n        }\n        return { response, config: current };\n      });\n      for (const hook of this.interceptors.response)\n        chain = chain.then(hook.fulfilled, hook.rejected);\n      for (const hook of this.interceptors.error)\n        chain = chain.catch((error) => hook.fulfilled(error, config));\n      return chain;\n    }\n  }\n  const api = new FetchClient();\n  api.use("response", async (result) => ({\n    ...result,\n    data: await result.response.json(),\n  }));\n  api.use("error", (error) => {\n    throw error;\n  });\n  const result = await api.request("data");\n  console.log(result.data.value);\n  try {\n    await api.request("status/401");\n  } catch (error) {\n    console.log(error.status);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Single and multiple file uploads",
          explanation:
            "Add File objects and related text fields to FormData and POST it.",
          note: "The browser sets the multipart Content-Type and boundary. These snippets create files explicitly; a real file input must check that a user selected files.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData",
          examples: [
            {
              label: "Upload a file with a description",
              language: "javascript",
              code: '(async () => {\n  const form = new FormData();\n  form.append("file", new File(["photo"], "photo.txt"));\n  form.append("description", "Profile photo");\n  const response = await fetch("upload", { method: "POST", body: form });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  console.log(data.names[0], data.sizes[0], data.description);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Upload several files under one repeated key",
              language: "javascript",
              code: '(async () => {\n  const files = [new File(["a"], "a.txt"), new File(["bb"], "b.txt")],\n    form = new FormData();\n  for (const file of files) form.append("files[]", file);\n  const response = await fetch("upload", { method: "POST", body: form });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  console.log(data.names.join("|"), ...data.sizes);\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "downloadFile() and triggerDownload()",
          explanation: "Fetch a Blob and expose a named download link.",
          note: "The demonstration creates a user-activated link rather than automatically saving a file. Blob downloads buffer the full file; revoking immediately after an automatic click can race browser download handling.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static",
          examples: [
            {
              label: "Create and dispose a download link",
              language: "javascript",
              code: '(async () => {\n  function triggerDownload(blob, filename) {\n    const url = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = url;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(url);\n      },\n    };\n  }\n  async function downloadFile(url, filename) {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return triggerDownload(await response.blob(), filename);\n  }\n  const file = await downloadFile("file", "hello.txt");\n  console.log(file.link.download, file.link.href.startsWith("blob:"));\n  file.dispose();\n  console.log(file.link.isConnected);\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Keep file bytes available independently of the link",
              language: "javascript",
              code: '(async () => {\n  function triggerDownload(blob, filename) {\n    const url = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = url;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(url);\n      },\n    };\n  }\n  const blob = await (await fetch("file")).blob();\n  const download = triggerDownload(blob, "hello.txt");\n  download.dispose();\n  console.log(await blob.text());\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "FileManager.uploadWithProgress() — usable cancellation",
          explanation:
            "Use XMLHttpRequest upload progress and return both a promise and an abort function immediately.",
          note: "A function returned from inside a Promise executor does not become the Promise’s cancellation API. Percent measures uploaded request bytes, not server processing; parse errors and all terminal failures must reject.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload",
          examples: [
            {
              label: "Observe progress and the uploaded result",
              language: "javascript",
              code: '(async () => {\n  class FileManager {\n    uploadWithProgress(url, file, onProgress = () => {}) {\n      const xhr = new XMLHttpRequest();\n      const promise = new Promise((resolve, reject) => {\n        xhr.upload.addEventListener("progress", (event) => {\n          if (event.lengthComputable)\n            try {\n              onProgress({\n                loaded: event.loaded,\n                total: event.total,\n                percent: (event.loaded / event.total) * 100,\n              });\n            } catch (error) {\n              reject(error);\n              xhr.abort();\n            }\n        });\n        xhr.addEventListener("load", () => {\n          if (xhr.status < 200 || xhr.status >= 300) {\n            reject(new Error("HTTP " + xhr.status));\n            return;\n          }\n          try {\n            resolve(\n              xhr.status === 204 || xhr.status === 205\n                ? null\n                : JSON.parse(xhr.responseText),\n            );\n          } catch (error) {\n            reject(error);\n          }\n        });\n        xhr.addEventListener("error", () =>\n          reject(new TypeError("Upload network error")),\n        );\n        xhr.addEventListener("timeout", () =>\n          reject(new Error("Upload timed out")),\n        );\n        xhr.addEventListener("abort", () =>\n          reject(new DOMException("Upload cancelled", "AbortError")),\n        );\n        xhr.open("POST", url);\n        xhr.timeout = 10000;\n        const form = new FormData();\n        form.append("file", file);\n        try {\n          xhr.send(form);\n        } catch (error) {\n          reject(error);\n        }\n      });\n      return { promise, abort: () => xhr.abort() };\n    }\n  }\n  const manager = new FileManager(),\n    progress = [];\n  const operation = manager.uploadWithProgress(\n    "upload",\n    new File(["hello"], "hello.txt"),\n    (state) => progress.push(state),\n  );\n  const result = await operation.promise;\n  console.log(\n    result.names[0],\n    result.sizes[0],\n    progress.length > 0,\n    progress.every((state) => state.percent >= 0 && state.percent <= 100),\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Cancel immediately and handle a bad HTTP status",
              language: "javascript",
              code: '(async () => {\n  class FileManager {\n    uploadWithProgress(url, file, onProgress = () => {}) {\n      const xhr = new XMLHttpRequest();\n      const promise = new Promise((resolve, reject) => {\n        xhr.upload.addEventListener("progress", (event) => {\n          if (event.lengthComputable)\n            try {\n              onProgress({\n                loaded: event.loaded,\n                total: event.total,\n                percent: (event.loaded / event.total) * 100,\n              });\n            } catch (error) {\n              reject(error);\n              xhr.abort();\n            }\n        });\n        xhr.addEventListener("load", () => {\n          if (xhr.status < 200 || xhr.status >= 300) {\n            reject(new Error("HTTP " + xhr.status));\n            return;\n          }\n          try {\n            resolve(\n              xhr.status === 204 || xhr.status === 205\n                ? null\n                : JSON.parse(xhr.responseText),\n            );\n          } catch (error) {\n            reject(error);\n          }\n        });\n        xhr.addEventListener("error", () =>\n          reject(new TypeError("Upload network error")),\n        );\n        xhr.addEventListener("timeout", () =>\n          reject(new Error("Upload timed out")),\n        );\n        xhr.addEventListener("abort", () =>\n          reject(new DOMException("Upload cancelled", "AbortError")),\n        );\n        xhr.open("POST", url);\n        xhr.timeout = 10000;\n        const form = new FormData();\n        form.append("file", file);\n        try {\n          xhr.send(form);\n        } catch (error) {\n          reject(error);\n        }\n      });\n      return { promise, abort: () => xhr.abort() };\n    }\n  }\n  const manager = new FileManager();\n  const operation = manager.uploadWithProgress(\n    "upload",\n    new File(["x"], "x.txt"),\n  );\n  operation.abort();\n  try {\n    await operation.promise;\n  } catch (error) {\n    console.log(error.name);\n  }\n  try {\n    await manager.uploadWithProgress("status/400", new File(["x"], "x.txt"))\n      .promise;\n  } catch (error) {\n    console.log(error.message);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "uploadChunked() — slice, send, and finalize",
          explanation:
            "Upload sequential Blob slices with an upload ID and chunk metadata, then verify the final assembly response.",
          note: "The included server implements a bounded in-memory teaching protocol. Production uploads need authorization, quotas, integrity checks, cleanup, and persistent storage; chunking the client alone does not provide resumability.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice",
          examples: [
            {
              label: "Assemble several chunks on the real server",
              language: "javascript",
              code: '(async () => {\n  async function uploadChunked(\n    file,\n    chunkSize = 1024 * 1024,\n    { signal, onProgress = () => {} } = {},\n  ) {\n    if (\n      !Number.isSafeInteger(chunkSize) ||\n      chunkSize < 1 ||\n      chunkSize > 1048576\n    )\n      throw new RangeError("Use a chunk size from 1 to 1048576");\n    const totalChunks = Math.ceil(file.size / chunkSize),\n      uploadId = crypto.randomUUID();\n    for (let index = 0; index < totalChunks; index++) {\n      signal?.throwIfAborted();\n      const form = new FormData();\n      form.append(\n        "chunk",\n        file.slice(\n          index * chunkSize,\n          Math.min((index + 1) * chunkSize, file.size),\n        ),\n      );\n      form.append("uploadId", uploadId);\n      form.append("chunkIndex", String(index));\n      form.append("totalChunks", String(totalChunks));\n      form.append("filename", file.name);\n      const response = await fetch("upload-chunk", {\n        method: "POST",\n        body: form,\n        signal,\n      });\n      if (!response.ok) throw new Error("Chunk HTTP " + response.status);\n      await response.json();\n      onProgress(index + 1, totalChunks);\n    }\n    const response = await fetch("upload-complete", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ uploadId, filename: file.name, totalChunks }),\n      signal,\n    });\n    if (!response.ok) throw new Error("Finalize HTTP " + response.status);\n    return response.json();\n  }\n  const progress = [];\n  const result = await uploadChunked(\n    new File(["Hello world"], "hello.txt"),\n    4,\n    { onProgress: (done, total) => progress.push(`${done}/${total}`) },\n  );\n  console.log(result.text, result.size, result.filename, progress.join("|"));\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Handle empty files and reject a zero chunk size",
              language: "javascript",
              code: '(async () => {\n  async function uploadChunked(\n    file,\n    chunkSize = 1024 * 1024,\n    { signal, onProgress = () => {} } = {},\n  ) {\n    if (\n      !Number.isSafeInteger(chunkSize) ||\n      chunkSize < 1 ||\n      chunkSize > 1048576\n    )\n      throw new RangeError("Use a chunk size from 1 to 1048576");\n    const totalChunks = Math.ceil(file.size / chunkSize),\n      uploadId = crypto.randomUUID();\n    for (let index = 0; index < totalChunks; index++) {\n      signal?.throwIfAborted();\n      const form = new FormData();\n      form.append(\n        "chunk",\n        file.slice(\n          index * chunkSize,\n          Math.min((index + 1) * chunkSize, file.size),\n        ),\n      );\n      form.append("uploadId", uploadId);\n      form.append("chunkIndex", String(index));\n      form.append("totalChunks", String(totalChunks));\n      form.append("filename", file.name);\n      const response = await fetch("upload-chunk", {\n        method: "POST",\n        body: form,\n        signal,\n      });\n      if (!response.ok) throw new Error("Chunk HTTP " + response.status);\n      await response.json();\n      onProgress(index + 1, totalChunks);\n    }\n    const response = await fetch("upload-complete", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ uploadId, filename: file.name, totalChunks }),\n      signal,\n    });\n    if (!response.ok) throw new Error("Finalize HTTP " + response.status);\n    return response.json();\n  }\n  const result = await uploadChunked(new File([], "empty.txt"), 4);\n  console.log(result.size, result.text);\n  try {\n    await uploadChunked(new File(["x"], "x.txt"), 0);\n  } catch (error) {\n    console.log(error.name);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "downloadWithProgress() — byte counts and cleanup",
          explanation:
            "Read streamed chunks and report loaded bytes with a percentage only when a usable total exists.",
          note: "This buffers the result for a Blob, and Content-Length may be unavailable or unsuitable for decoded bytes. Callback errors cancel the reader and release its lock.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader",
          examples: [
            {
              label: "Display known-length progress in a real element",
              language: "javascript",
              code: '(async () => {\n  function triggerDownload(blob, filename) {\n    const url = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = url;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(url);\n      },\n    };\n  }\n  async function downloadWithProgress(\n    url,\n    filename,\n    onProgress = () => {},\n    { signal } = {},\n  ) {\n    const response = await fetch(url, { signal });\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (!response.body) throw new Error("Missing body");\n    const header = response.headers.get("Content-Length"),\n      total =\n        header !== null &&\n        !response.headers.get("Content-Encoding") &&\n        Number(header) > 0\n          ? Number(header)\n          : null;\n    const reader = response.body.getReader(),\n      chunks = [];\n    let loaded = 0,\n      complete = false;\n    try {\n      while (true) {\n        const { done, value } = await reader.read();\n        if (done) {\n          complete = true;\n          break;\n        }\n        chunks.push(value);\n        loaded += value.byteLength;\n        onProgress({\n          loaded,\n          total,\n          percent: total === null ? null : (loaded / total) * 100,\n        });\n      }\n    } finally {\n      if (!complete) await reader.cancel().catch(() => {});\n      reader.releaseLock();\n    }\n    const blob = new Blob(chunks, {\n      type: response.headers.get("Content-Type") || "application/octet-stream",\n    });\n    return { blob, ...triggerDownload(blob, filename) };\n  }\n  const bar = document.createElement("progress");\n  bar.max = 100;\n  const file = await downloadWithProgress("file", "hello.txt", (state) => {\n    if (state.percent !== null) bar.value = state.percent;\n  });\n  try {\n    console.log(bar.value, file.blob.size, await file.blob.text());\n  } finally {\n    file.dispose();\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Handle an unknown total without NaN percentages",
              language: "javascript",
              code: '(async () => {\n  function triggerDownload(blob, filename) {\n    const url = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = url;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(url);\n      },\n    };\n  }\n  async function downloadWithProgress(\n    url,\n    filename,\n    onProgress = () => {},\n    { signal } = {},\n  ) {\n    const response = await fetch(url, { signal });\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    if (!response.body) throw new Error("Missing body");\n    const header = response.headers.get("Content-Length"),\n      total =\n        header !== null &&\n        !response.headers.get("Content-Encoding") &&\n        Number(header) > 0\n          ? Number(header)\n          : null;\n    const reader = response.body.getReader(),\n      chunks = [];\n    let loaded = 0,\n      complete = false;\n    try {\n      while (true) {\n        const { done, value } = await reader.read();\n        if (done) {\n          complete = true;\n          break;\n        }\n        chunks.push(value);\n        loaded += value.byteLength;\n        onProgress({\n          loaded,\n          total,\n          percent: total === null ? null : (loaded / total) * 100,\n        });\n      }\n    } finally {\n      if (!complete) await reader.cancel().catch(() => {});\n      reader.releaseLock();\n    }\n    const blob = new Blob(chunks, {\n      type: response.headers.get("Content-Type") || "application/octet-stream",\n    });\n    return { blob, ...triggerDownload(blob, filename) };\n  }\n  const progress = [];\n  const file = await downloadWithProgress(\n    "file-unknown",\n    "hello.txt",\n    (state) => progress.push(state),\n  );\n  file.dispose();\n  console.log(\n    progress.at(-1).loaded,\n    progress.at(-1).total,\n    progress.at(-1).percent,\n  );\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "downloadResumable() — join validated saved bytes",
          explanation:
            "Requests the missing part of a file and checks it matches the saved bytes before joining them.",
          note: "A byte count alone cannot reconstruct a file: this helper requires the actual saved Blob and a strong saved ETag. It accepts only complete tail ranges, handles an already-complete 416, and keeps the result in memory.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests",
          examples: [
            {
              label: "Resume from a real saved prefix",
              language: "javascript",
              code: '(async () => {\n  function triggerDownload(blob, filename) {\n    const url = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = url;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(url);\n      },\n    };\n  }\n  async function downloadResumable(\n    url,\n    filename,\n    { existing = new Blob(), etag, signal } = {},\n  ) {\n    const headers = new Headers();\n    if (existing.size) {\n      if (!etag || etag.startsWith("W/"))\n        throw new Error("A strong saved ETag is required");\n      headers.set("Range", "bytes=" + existing.size + "-");\n      headers.set("If-Range", etag);\n    }\n    const response = await fetch(url, { headers, signal, cache: "no-store" });\n    let blob;\n    if (response.status === 416) {\n      const total = response.headers\n        .get("Content-Range")\n        ?.match(/^bytes \\*\\/(\\d+)$/);\n      if (\n        !total ||\n        Number(total[1]) !== existing.size ||\n        response.headers.get("ETag") !== etag\n      )\n        throw new Error("Range does not match saved bytes");\n      blob = existing;\n    } else if (response.status === 206) {\n      const range = response.headers\n        .get("Content-Range")\n        ?.match(/^bytes (\\d+)-(\\d+)\\/(\\d+)$/);\n      if (\n        !range ||\n        Number(range[1]) !== existing.size ||\n        Number(range[2]) !== Number(range[3]) - 1 ||\n        response.headers.get("ETag") !== etag\n      )\n        throw new Error("Invalid partial response");\n      const tail = await response.blob();\n      if (tail.size !== Number(range[2]) - Number(range[1]) + 1)\n        throw new Error("Incomplete range body");\n      blob = new Blob([existing, tail], { type: tail.type });\n    } else if (response.status === 200) {\n      blob = await response.blob();\n    } else throw new Error("HTTP " + response.status);\n    return {\n      blob,\n      etag: response.headers.get("ETag"),\n      ...triggerDownload(blob, filename),\n    };\n  }\n  const file = await downloadResumable("file", "hello.txt", {\n    existing: new Blob(["Hello "]),\n    etag: \'"file-v1"\',\n  });\n  try {\n    console.log(await file.blob.text(), file.blob.size);\n  } finally {\n    file.dispose();\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Restart when Range is ignored and reject bad metadata",
              language: "javascript",
              code: '(async () => {\n  function triggerDownload(blob, filename) {\n    const url = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = url;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(url);\n      },\n    };\n  }\n  async function downloadResumable(\n    url,\n    filename,\n    { existing = new Blob(), etag, signal } = {},\n  ) {\n    const headers = new Headers();\n    if (existing.size) {\n      if (!etag || etag.startsWith("W/"))\n        throw new Error("A strong saved ETag is required");\n      headers.set("Range", "bytes=" + existing.size + "-");\n      headers.set("If-Range", etag);\n    }\n    const response = await fetch(url, { headers, signal, cache: "no-store" });\n    let blob;\n    if (response.status === 416) {\n      const total = response.headers\n        .get("Content-Range")\n        ?.match(/^bytes \\*\\/(\\d+)$/);\n      if (\n        !total ||\n        Number(total[1]) !== existing.size ||\n        response.headers.get("ETag") !== etag\n      )\n        throw new Error("Range does not match saved bytes");\n      blob = existing;\n    } else if (response.status === 206) {\n      const range = response.headers\n        .get("Content-Range")\n        ?.match(/^bytes (\\d+)-(\\d+)\\/(\\d+)$/);\n      if (\n        !range ||\n        Number(range[1]) !== existing.size ||\n        Number(range[2]) !== Number(range[3]) - 1 ||\n        response.headers.get("ETag") !== etag\n      )\n        throw new Error("Invalid partial response");\n      const tail = await response.blob();\n      if (tail.size !== Number(range[2]) - Number(range[1]) + 1)\n        throw new Error("Incomplete range body");\n      blob = new Blob([existing, tail], { type: tail.type });\n    } else if (response.status === 200) {\n      blob = await response.blob();\n    } else throw new Error("HTTP " + response.status);\n    return {\n      blob,\n      etag: response.headers.get("ETag"),\n      ...triggerDownload(blob, filename),\n    };\n  }\n  const file = await downloadResumable("file-ignore", "hello.txt", {\n    existing: new Blob(["Hello "]),\n    etag: \'"file-v1"\',\n  });\n  console.log(await file.blob.text());\n  file.dispose();\n  try {\n    await downloadResumable("file-bad", "hello.txt", {\n      existing: new Blob(["Hello "]),\n      etag: \'"file-v1"\',\n    });\n  } catch (error) {\n    console.log(error.message);\n  }\n})().catch((error) => {\n  throw error;\n});',
            },
          ],
        },
        {
          name: "Resumable download completion and changed validators",
          explanation:
            "Treat a matching 416 as an already complete saved file, and restart when If-Range detects a changed representation.",
          note: "The validator must identify the saved bytes, not merely be fetched immediately before resuming an unrelated prefix. Cross-origin access also requires exposing range metadata.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests",
          examples: [
            {
              label: "Keep a fully saved file after matching 416",
              language: "javascript",
              code: '(async () => {\n  function triggerDownload(blob, filename) {\n    const url = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = url;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(url);\n      },\n    };\n  }\n  async function downloadResumable(\n    url,\n    filename,\n    { existing = new Blob(), etag, signal } = {},\n  ) {\n    const headers = new Headers();\n    if (existing.size) {\n      if (!etag || etag.startsWith("W/"))\n        throw new Error("A strong saved ETag is required");\n      headers.set("Range", "bytes=" + existing.size + "-");\n      headers.set("If-Range", etag);\n    }\n    const response = await fetch(url, { headers, signal, cache: "no-store" });\n    let blob;\n    if (response.status === 416) {\n      const total = response.headers\n        .get("Content-Range")\n        ?.match(/^bytes \\*\\/(\\d+)$/);\n      if (\n        !total ||\n        Number(total[1]) !== existing.size ||\n        response.headers.get("ETag") !== etag\n      )\n        throw new Error("Range does not match saved bytes");\n      blob = existing;\n    } else if (response.status === 206) {\n      const range = response.headers\n        .get("Content-Range")\n        ?.match(/^bytes (\\d+)-(\\d+)\\/(\\d+)$/);\n      if (\n        !range ||\n        Number(range[1]) !== existing.size ||\n        Number(range[2]) !== Number(range[3]) - 1 ||\n        response.headers.get("ETag") !== etag\n      )\n        throw new Error("Invalid partial response");\n      const tail = await response.blob();\n      if (tail.size !== Number(range[2]) - Number(range[1]) + 1)\n        throw new Error("Incomplete range body");\n      blob = new Blob([existing, tail], { type: tail.type });\n    } else if (response.status === 200) {\n      blob = await response.blob();\n    } else throw new Error("HTTP " + response.status);\n    return {\n      blob,\n      etag: response.headers.get("ETag"),\n      ...triggerDownload(blob, filename),\n    };\n  }\n  const file = await downloadResumable("file", "hello.txt", {\n    existing: new Blob(["Hello world"]),\n    etag: \'"file-v1"\',\n  });\n  console.log(await file.blob.text());\n  file.dispose();\n})().catch((error) => {\n  throw error;\n});',
            },
            {
              label: "Restart for an old validator instead of appending",
              language: "javascript",
              code: '(async () => {\n  function triggerDownload(blob, filename) {\n    const url = URL.createObjectURL(blob),\n      link = document.createElement("a");\n    link.href = url;\n    link.download = filename;\n    link.textContent = "Save " + filename;\n    document.body.append(link);\n    return {\n      link,\n      dispose() {\n        link.remove();\n        URL.revokeObjectURL(url);\n      },\n    };\n  }\n  async function downloadResumable(\n    url,\n    filename,\n    { existing = new Blob(), etag, signal } = {},\n  ) {\n    const headers = new Headers();\n    if (existing.size) {\n      if (!etag || etag.startsWith("W/"))\n        throw new Error("A strong saved ETag is required");\n      headers.set("Range", "bytes=" + existing.size + "-");\n      headers.set("If-Range", etag);\n    }\n    const response = await fetch(url, { headers, signal, cache: "no-store" });\n    let blob;\n    if (response.status === 416) {\n      const total = response.headers\n        .get("Content-Range")\n        ?.match(/^bytes \\*\\/(\\d+)$/);\n      if (\n        !total ||\n        Number(total[1]) !== existing.size ||\n        response.headers.get("ETag") !== etag\n      )\n        throw new Error("Range does not match saved bytes");\n      blob = existing;\n    } else if (response.status === 206) {\n      const range = response.headers\n        .get("Content-Range")\n        ?.match(/^bytes (\\d+)-(\\d+)\\/(\\d+)$/);\n      if (\n        !range ||\n        Number(range[1]) !== existing.size ||\n        Number(range[2]) !== Number(range[3]) - 1 ||\n        response.headers.get("ETag") !== etag\n      )\n        throw new Error("Invalid partial response");\n      const tail = await response.blob();\n      if (tail.size !== Number(range[2]) - Number(range[1]) + 1)\n        throw new Error("Incomplete range body");\n      blob = new Blob([existing, tail], { type: tail.type });\n    } else if (response.status === 200) {\n      blob = await response.blob();\n    } else throw new Error("HTTP " + response.status);\n    return {\n      blob,\n      etag: response.headers.get("ETag"),\n      ...triggerDownload(blob, filename),\n    };\n  }\n  const file = await downloadResumable("file", "hello.txt", {\n    existing: new Blob(["old"]),\n    etag: \'"old-version"\',\n  });\n  console.log(await file.blob.text());\n  file.dispose();\n})().catch((error) => {\n  throw error;\n});',
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
    head.append(copy);
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
