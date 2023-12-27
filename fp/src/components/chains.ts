import type { AddEthereumChainParameter } from '@web3-react/types';

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
};

const CELO: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Celo',
  symbol: 'CELO',
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

const getInfuraUrlFor = (network: string) =>
  process.env.infuraKey
    ? `https://${network}.infura.io/v3/${process.env.infuraKey}`
    : undefined;
const getAlchemyUrlFor = (network: string) =>
  process.env.alchemyKey
    ? `https://${network}.alchemyapi.io/v2/${process.env.alchemyKey}`
    : undefined;

type ChainConfig = {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
};

export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: [
      ...(getInfuraUrlFor('mainnet')
        ? [getInfuraUrlFor('mainnet') as string]
        : []),
      ...(getAlchemyUrlFor('eth-mainnet')
        ? [getAlchemyUrlFor('eth-mainnet') as string]
        : []),
      'https://cloudflare-eth.com',
    ],
    name: 'Mainnet',
  },
  10: {
    urls: [
      ...(getInfuraUrlFor('optimism-mainnet')
        ? [getInfuraUrlFor('optimism-mainnet') as string]
        : []),
      'https://mainnet.optimism.io',
    ].filter(Boolean) as string[],
    name: 'Optimism',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  42161: {
    urls: [
      ...(getInfuraUrlFor('arbitrum-mainnet')
        ? [getInfuraUrlFor('arbitrum-mainnet') as string]
        : []),
      'https://arb1.arbitrum.io/rpc',
    ].filter(Boolean),
    name: 'Arbitrum One',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  137: {
    urls: [
      ...(getInfuraUrlFor('polygon-mainnet')
        ? [getInfuraUrlFor('polygon-mainnet') as string]
        : []),
      'https://polygon-rpc.com',
    ].filter(Boolean) as string[],
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  42220: {
    urls: ['https://forno.celo.org'],
    name: 'Celo',
    nativeCurrency: CELO,
    blockExplorerUrls: ['https://explorer.celo.org'],
  },
};

export const TESTNET_CHAINS: ChainConfig = {
  5: {
    urls: [getInfuraUrlFor('goerli')].filter(Boolean) as string[],
    name: 'Görli',
  },
  420: {
    urls: [
      ...(getInfuraUrlFor('optimism-goerli')
        ? [getInfuraUrlFor('optimism-goerli') as string]
        : []),
      'https://goerli.optimism.io',
    ].filter(Boolean) as string[],
    name: 'Optimism Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://goerli-explorer.optimism.io'],
  },
  421613: {
    urls: [
      ...(getInfuraUrlFor('arbitrum-goerli')
        ? [getInfuraUrlFor('arbitrum-goerli') as string]
        : []),
      'https://goerli-rollup.arbitrum.io/rpc',
    ].filter(Boolean),
    name: 'Arbitrum Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://testnet.arbiscan.io'],
  },
  80001: {
    urls: [getInfuraUrlFor('polygon-mumbai')].filter(Boolean) as string[],
    name: 'Polygon Mumbai',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  44787: {
    urls: ['https://alfajores-forno.celo-testnet.org'],
    name: 'Celo Alfajores',
    nativeCurrency: CELO,
    blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org'],
  },
  1337: {
    urls: ['http://127.0.0.1:7545'],
    name: 'Localhost 7545',
    nativeCurrency: ETH,
    //正在进行交易的过程中 链上通过hash查看当前的转账情况
    //还没上链 通过上链之后又经过了几个块
    blockExplorerUrls: [''],
  },
};

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
