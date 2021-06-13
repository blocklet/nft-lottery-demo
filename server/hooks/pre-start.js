require('dotenv-flow').config();

const Client = require('@ocap/client');
const { fromJSON } = require('@ocap/wallet');

const env = require('../libs/env');
const auth = require('../libs/auth');
const logger = require('../libs/logger');
const { factoryList } = require('../libs/factory');

const client = new Client(env.chainHost);
const wallet = fromJSON(auth.wallet);

// Check for application account, skip this if we are running as a child component
const ensureAccountDeclared = async () => {
  const { BLOCKLET_DID = '', BLOCKLET_REAL_DID = '' } = process.env;
  if (BLOCKLET_DID && BLOCKLET_REAL_DID && BLOCKLET_REAL_DID !== BLOCKLET_DID) {
    return;
  }

  const { state } = await client.getAccountState({ address: wallet.toAddress() }, { ignoreFields: ['context'] });
  if (!state) {
    const hash = await client.declare({ moniker: 'nft-lottery-demo', wallet });
    logger.log(`app account declared on chain ${env.chainHost}`, hash);
  } else {
    logger.log(`app account already declared on chain ${env.chainHost}`);
  }
};
const ensureFactoryCreated = async itx => {
  const { state } = await client.getFactoryState(
    { address: itx.address },
    { ignoreFields: [/\.withdrawItems/, /\.items/] },
  );
  if (!state) {
    const hash = await client.sendCreateFactoryTx({ tx: { itx }, wallet });
    console.log(`factory created on chain ${itx.address}`, hash);
  } else {
    console.log(`factory exist on chain ${itx.address}`);
  }

  return state;
};

(async () => {
  try {
    await ensureAccountDeclared();
    for (const factory of factoryList) {
      await ensureFactoryCreated(factory);
    }
    process.exit(0);
  } catch (err) {
    logger.error('nft-lottery-demo pre-start error', err.message);
    process.exit(1);
  }
})();
