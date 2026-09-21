import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const routes = {
  "/": ["./index.html", "text/html; charset=utf-8"],
  "/dist/index.js": ["./dist/index.js", "text/javascript; charset=utf-8"],
};

createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const route = Object.hasOwn(routes, pathname) ? routes[pathname] : undefined;
  if (!route) {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    const contents = await readFile(new URL(route[0], import.meta.url));
    response.writeHead(200, { "Content-Type": route[1], "Cache-Control": "no-store" });
    response.end(contents);
  } catch (error) {
    console.error(error);
    response.writeHead(500).end("Failed to load file");
  }
}).listen(3000, "127.0.0.1", () => {
  console.log("실행 결과: http://localhost:3000");
  console.log("종료: Ctrl+C / 코드 수정 후에는 npm start를 다시 실행하세요.");
});
