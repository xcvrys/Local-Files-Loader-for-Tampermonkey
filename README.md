# Local Files Loader for Tampermonkey

A Tampermonkey userscript that enables loading and executing local JavaScript files from your machine on supported web pages. Bypasses extension security restrictions by serving files via a local HTTP server.

## Features

- 🚀 Load local JS files in Tampermonkey
- 🔗 Combine multiple scripts into single execution
- 🛡️ Bypass CORS restrictions via local server
- 🔐 Auto nonce attribute handling for CSP compliance

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) extension
2. Clone this repository:
   ```bash
   git clone https://github.com/xcvrys/Local-Files-Loader-for-Tampermonkey.git
   ```
3. Start local server from project directory:
   ```bash
   python -m http.server 8000
   ```
4. Create new Tampermonkey script and paste the provided userscript code
5. Modify `files` array in the script to point to your local files

## Usage

1. Keep local server running during use
2. Scripts will automatically:
   - Be fetched from local server
   - Combined in array order
   - Injected into page with proper CSP nonce
3. Check browser console for loading status

**Important Notes:**
- The entry file must be **LAST** in `files` array
- Maintain server port consistency between server and script
- Files are served from directory where server is started

## Example Configuration

```javascript
const files = [
    "http://localhost:8000/libs/library1.js",
    "http://localhost:8000/libs/library2.js",
    "http://localhost:8000/main.js" // Main file MUST be last
];
```

Start Python server:
```bash
# From directory containing 'libs' folder and 'main.js'
python -m http.server 8000
```

## Configuration

### Script Matching
Modify @match rule to target different pages, example:
```javascript
// @match https://www.linkedin.com/*
```

### Server Port
Change port by modifying:
1. Server startup command (`8000`)
2. File URLs in `files` array (`localhost:8000`)

## Troubleshooting

**CORS Errors:**
- Ensure local server is running
- Verify correct port in both server and script
- Check file paths match server directory structure

**Script Not Loading:**
- Confirm main file is last in array
- Check Tampermonkey dashboard for script status
- Verify nonce handling with `getExistingNonce()`

**Server Access Issues:**
- Allow firewall access if prompted
- Test server accessibility via browser:
  ```bash
  curl http://localhost:8000/main.js
  ```
## NOTE
You can use [webpack](https://webpack.js.org/) to build you project and link it

## FAQ

**Q: Why use a local server?**  
A: Tampermonkey blocks direct local file access for security. The server creates safe HTTP context.

**Q: Can I use a different port?**  
A: Yes - update both server command and file URLs.

**Q: How to use on other websites?**  
A: Modify the @match rule in userscript header.

## Disclaimer

This project is not affiliated with LinkedIn or Tampermonkey. Use at your own risk.
