const path = require('path');
const Mcrypto = require('@ocap/mcrypto');
const WalletAuthenticator = require('@blocklet/sdk/lib/wallet-authenticator');
const AuthService = require('@blocklet/sdk/service/auth');
const AuthNedbStorage = require('@arcblock/did-auth-storage-nedb');
const { fromSecretKey, WalletType } = require('@ocap/wallet');
const { WalletHandlers } = require('@arcblock/did-auth');

const env = require('./env');
const logger = require('./logger');

const type = WalletType({ role: Mcrypto.types.RoleType.ROLE_APPLICATION });
const wallet = fromSecretKey(process.env.APP_SK || process.env.BLOCKLET_APP_SK, type).toJSON();

const walletAuth = new WalletAuthenticator();

const dbOnload = (err, dbName) => {
  if (err) {
    logger.error(`Failed to load database from ${path.join(process.env.BLOCKLET_DATA_DIR || './', dbName)}`, err);
  }
};

const tokenStorage = new AuthNedbStorage({
  dbPath: path.join(process.env.BLOCKLET_DATA_DIR || './', 'auth.db'),
  onload: err => {
    dbOnload(err, 'auth.db');
  },
});

const walletHandlers = new WalletHandlers({
  authenticator: walletAuth,
  tokenStorage,
});

module.exports = {
  wallet,
  walletHandlers,
  authClient: new AuthService(),
};
