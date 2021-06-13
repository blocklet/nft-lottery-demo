const { fromJSON } = require('@ocap/wallet');
const { createCredentialList } = require('@arcblock/vc');
const router = require('express').Router();

const ensureVc = require('../middlewares/ensureVc');
const ensureFactory = require('../middlewares/ensureFactory');
const { wallet } = require('../libs/auth');
const env = require('../libs/env');
const { factoryDisplay, factoryList } = require('../libs/factory');
const { fromBNStr } = require('../libs/utils');

const translations = {
  view: {
    zh: '查看站点',
    en: 'View Website',
  },
};

router.get('/factory', async (req, res) => {
  const list = factoryList.map(item => {
    const { display } = item.output.data.value.credentialSubject;
    return {
      address: item.address,
      name: item.name,
      description: item.description,
      display,
      price: fromBNStr(item.input.value),
      _raw: item,
    };
  });
  res.json(list);
});
router.get('/config', async (req, res) => {
  const factories = factoryList.map(item => item.address);

  res.json({ purchaseFactoryAddresses: factories });
});
router.get('/display', ensureFactory, async (req, res) => {
  const { factory } = req;
  res.type('svg');
  if (factory) {
    const display = factoryDisplay[factory];
    res.send(display);
  } else {
    res.send(null);
  }
});

router.get('/status', ensureVc, async (req, res) => {
  const { vc } = req;
  const issuer = { wallet: fromJSON(wallet), name: 'nft-lottery-demo' };
  const locale = req.query.locale || 'en';
  const data = {
    id: vc.id,
    description: 'Status and Actions of NFT Lottery Demo',
    statusList: [],
    actionList: createCredentialList({
      issuer,
      claims: [
        {
          id: `${env.serverUrl}`,
          type: 'navigate',
          name: 'view-blocklet',
          scope: 'public',
          label: translations.view[locale],
        },
        // TODO: Add "post on marketplace" button for badge
      ],
    }),
  };
  res.json(data);
});

module.exports = router;
