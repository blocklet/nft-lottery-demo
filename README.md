# NFT Lottery Demo

Blocklet that demos how to develop a simple lottery game that mint nft for winners.

## Launch on Blocklet Server

[![Launch on Blocklet Server](https://assets.arcblock.io/icons/launch_on_blocklet_server.svg)](https://install.arcblock.io/?action=blocklet-install&meta_url=https%3A%2F%2Fgithub.com%2Fblocklet%2Fnft-lottery-demo%2Freleases%2Fdownload%2Fv1.0.7%2Fblocklet.json)

## Run and debug in local

### Setup

```shell
yarn global add @blocklet/cli
git clone git@github.com:blocklet/nft-lottery-demo.git
cd nft-lottery-demo
yarn
```

### Start your local node

```shell
blocklet server init -f --mode debug
blocklet server start
```

### Configure the blocklet

Create `.env.development` file under your local repo root, and add `SERVER_URL="http://{YOUR_LOCAL_IP}"`

```shell
# Change the following IP to your local IP
SERVER_URL="http://192.168.123.236"
```

Create `.env.local` file under your local repo root

```shell
PAYMENT_TOKEN_ID=“z35n6UoHSi9MED4uaQy6ozFgKPaZj2UKrurBG”
REACT_APP_APP_NAME=“NFT Lottery Demo”
CHAIN_HOST=“https://beta.abtnetwork.io/api”
SERVER_URL=“http://ddns.paddings.cn”
PAYMENT_TOKEN_ID=“z35n6UoHSi9MED4uaQy6ozFgKPaZj2UKrurBG”
CONFIG_API=“https://50ba8217-znkidjks9e8tdu3czp4kcreoaqkbkfmsa9va.did.abtnet.io/api/nft/config”
```

### Start the blocklet

```shell
blocklet dev
```

## License

The code is licensed under the Apache 2.0 license found in the
[LICENSE](LICENSE) file.
