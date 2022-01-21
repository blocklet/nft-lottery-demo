const blockletRealDid = process.env.BLOCKLET_REAL_DID || '';
const blockletDid = process.env.BLOCKLET_DID || '';
const isComponent = blockletRealDid !== blockletDid;

module.exports = {
  chainHost: process.env.CHAIN_HOST || '',
  appId: process.env.BLOCKLET_APP_ID || '',
  appName: process.env.BLOCKLET_APP_NAME || 'NFT Lottery Demo',
  appDescription:
    process.env.BLOCKLET_APP_DESCRIPTION ||
    'ABT Node blocklet project, contained a lottery game can buy gift with NFT-store',
  appUrl: process.env.BLOCKLET_APP_URL || '',
  isComponent,
};
