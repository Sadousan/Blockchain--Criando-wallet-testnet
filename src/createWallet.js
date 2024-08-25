//importando depencências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//criando a rede bitcoin
//rede principal (mainnet)
//rede de teste (testnet)

const network = bitcoin.networks.testnet

//carteira hierárquica determinística (derivação de carteiras HD)
const path = `m/49'/1'/0'/0`

//gerando mnemônicos para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)

//criando um node (conta) da carteira HD
let node = account.derive(0).derive(0)

//criando endereços Bitcoin
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//mostrando endereço Bitcoin
console.log('Carteira gerada')
console.log('Endereço Bitcoin: ', btcAddress)
console.log('Chave privada: ', node.toWIF())
console.log('Seed: ', mnemonic)