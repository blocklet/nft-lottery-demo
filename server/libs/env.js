const blockletRealDid = process.env.BLOCKLET_REAL_DID || '';
const blockletDid = process.env.BLOCKLET_DID || '';
const isComponent = blockletRealDid !== blockletDid;

module.exports = {
  chainId: process.env.CHAIN_ID || '',
  chainHost: process.env.CHAIN_HOST || '',
  appId: process.env.BLOCKLET_APP_ID || '',
  appName: process.env.APP_NAME || process.env.BLOCKLET_APP_NAME || 'NFT Lottery Demo',
  appDescription:
    process.env.APP_DESCRIPTION ||
    process.env.BLOCKLET_APP_DESCRIPTION ||
    'ABT Node blocklet project, contained a lottery game can buy gift with NFT-store',
  apiPrefix: process.env.API_PREFIX || '',
  serverUrl: process.env.SERVER_URL || '',
  factoryOwnerDid: process.env.FACTORY_OWNER_DID || '',
  disabledFactoryAddress: (process.env.DISABLED_FACTORY_ADDRESS || '').split(','),
  configApi: process.env.CONFIG_API || '',
  isComponent,
};
