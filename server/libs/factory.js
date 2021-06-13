const fs = require('fs');
const path = require('path');
const { fromTokenToUnit } = require('@ocap/util');
const { toFactoryAddress } = require('@arcblock/did-util');

const { badgeOutput, getFactoryProps } = require('./nft');
const { wallet } = require('./auth');
const { toBNStr } = require('./utils');

const priceList = [1.68, 1.86, 6.18, 8.16];

const createFactoryItx = (moniker, props) => {
  const itx = {
    name: props.name,
    description: props.description,
    settlement: 'instant',
    limit: props.limit || 0,
    trustedIssuers: props.trustedIssuers || [],
    input: props.input,
    output: props.output,
    data: props.data || null,
    hooks: props.hooks || [],
  };

  const factoryAddress = toFactoryAddress(itx);
  itx.address = factoryAddress;

  return itx;
};

const displayList = priceList.map((item, index) =>
  fs.readFileSync(path.join(__dirname, `../assets/gifts/${index + 1}.svg`)),
);
const factoryList = priceList.map((item, index) =>
  createFactoryItx(
    `Gifts for NFT Lottery Demo (${index + 1})`,
    getFactoryProps({
      name: `NFT Lottrey(${index + 1})`,
      description: `Gifts for NFT Lottery Demo (${index + 1})`,
      moniker: `LotteryNFT-${index + 1}`,
      limit: 0,
      value: toBNStr(item),
      tokens: [],
      assets: [],
      variables: [],
      output: badgeOutput,
      data: {
        type: 'json',
        value: {
          owner: wallet.address,
        },
      },
    }),
  ),
);

const factoryDisplay = priceList.reduce((obj, item, index) => {
  obj[factoryList[index].address] = displayList[index];
  return obj;
}, {});

module.exports = {
  factoryList,
  displayList,
  factoryDisplay,
};
