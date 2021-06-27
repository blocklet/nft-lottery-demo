# NFT Lottery Demo

Blocklet that demos how to develop a simple lottery game that mint nft for winners.

## Run and debug in local

### Setup

```shell
yarn global add @abtnode/cli
git clone git@github.com:blocklet/nft-lottery-demo.git
cd nft-lottery-demo
yarn
```

### Start your local node

```shell
abtnode init -f --mode debug
abtnode start
```

### Configure the blocklet

Create `.env.development` file under your local repo root, and add `SERVER_URL="http://{YOUR_LOCAL_IP}"`

```shell
# Change the following IP to your local IP
SERVER_URL="http://192.168.123.236"
```

### Start the blocklet

```shell
blocklet dev
```

## License

The code is licensed under the Apache 2.0 license found in the
[LICENSE](LICENSE) file.
