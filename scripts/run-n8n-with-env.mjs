import { config } from 'dotenv';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

config({ path: join(root, '.env') });

const owmKey = process.env.OPENWEATHERMAP_API_KEY?.trim();
if (owmKey) {
	process.env.CREDENTIALS_OVERWRITE_DATA = JSON.stringify({
		openWeatherMapApi: { accessToken: owmKey },
	});
}

const n8nBin = join(root, 'node_modules', 'n8n', 'bin', 'n8n');
const n8nArgs = process.argv.slice(2).length ? process.argv.slice(2) : ['start'];

const child = spawn(process.execPath, [n8nBin, ...n8nArgs], {
	stdio: 'inherit',
	cwd: root,
	env: process.env,
	windowsHide: true,
});

child.on('exit', (code, signal) => {
	if (signal) process.kill(process.pid, signal);
	process.exit(code ?? 1);
});
