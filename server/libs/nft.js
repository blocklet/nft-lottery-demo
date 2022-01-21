/* eslint-disable indent */
const joinUrl = require('url-join');
const { isValidFactory } = require('@ocap/asset');

const env = require('./env');

const getTemplate = (serviceUrl = 'https://registry.arcblock.io') => ({
  type: 'vc',
  value: {
    '@context': 'https://schema.arcblock.io/v0.1/context.jsonld',
    id: '{{input.id}}',
    tag: ['nft-lottery-demo'],
    type: ['VerifiableCredential', 'NFTBadge', 'NFTLotteryDemo'],
    issuer: {
      id: '{{ctx.issuer.id}}',
      pk: '{{ctx.issuer.pk}}',
      name: '{{ctx.issuer.name}}',
    },
    issuanceDate: '{{input.issuanceDate}}',
    credentialSubject: {
      id: '{{ctx.owner}}',
      display: {
        type: 'url',
        content: joinUrl(serviceUrl, '/api/nft/display'), // accept asset-did in query param
      },
    },
    credentialStatus: {
      id: joinUrl(serviceUrl, '/api/nft/status'),
      type: 'NFTStatusList2021',
      scope: 'public',
    },
    proof: {
      type: '{{input.proofType}}',
      created: '{{input.issuanceDate}}',
      proofPurpose: 'assertionMethod',
      jws: '{{input.signature}}',
    },
  },
});

const badgeOutput = getTemplate(env.appUrl);

const getFactoryProps = ({
  name,
  moniker,
  description,
  value,
  assets = [],
  tokens = [],
  hooks = [],
  data,
  limit = 0,
  output,
  variables,
  transferrable = false,
} = {}) => {
  const props = {
    name,
    description,
    settlement: 'instant',
    limit,
    trustedIssuers: [],
    input: {
      value,
      tokens: [...tokens],
      assets: [...assets],
      variables,
    },
    output: {
      issuer: '{{ctx.issuer.id}}',
      parent: '{{ctx.factory}}',
      moniker,
      readonly: true,
      transferrable,
      data: output,
    },
    data,
    hooks: Array.isArray(hooks) ? hooks : [],
  };

  isValidFactory(props, true);
  return props;

  // throw new Error('factory props invalid: please check input/output/hooks');
};

module.exports = {
  getFactoryProps,

  badgeOutput,
};
