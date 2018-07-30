// transpile:main

import { asyncify } from 'asyncbox';
import AndroidUiautomator2Driver from './lib/driver';
import startServer from './lib/server';


export const DEFAULT_HOST = "localhost";
export const DEFAULT_PORT = process.env.TESTOBJECT_E2E_TESTS ? 4723 : 4884;

async function main () {
  let port = DEFAULT_PORT;
  let host = DEFAULT_HOST;
  return await startServer(port, host);
}

if (require.main === module) {
  asyncify(main);
}

export { AndroidUiautomator2Driver, startServer };
export default AndroidUiautomator2Driver;

