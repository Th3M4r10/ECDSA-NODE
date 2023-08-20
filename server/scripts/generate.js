const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { writeFileSync } = require("fs");

// Generate 5 wallet addresses
const LOOP_SIZE = 5;
let balances = {};

for (let index = 0; index < LOOP_SIZE; index++) {
  console.log(`Account User${index}`);

  const privateKey = secp256k1.utils.randomPrivateKey();
  console.log(`Private Key: ${toHex(privateKey)}`);

  const publicKey = secp256k1.getPublicKey(privateKey);
  console.log(`Public Key: ${toHex(publicKey)}`);

  const address = keccak256(publicKey.slice(1)).slice(-20);
  console.log(`Address: 0x${toHex(address)}\n`);

  balances[`0x${toHex(address)}`] = Math.floor(
    Math.random() * (100 + 1 - 1) + 1
  );
}

writeFileSync("./balances.json", JSON.stringify(balances), "utf-8");

/*
Account User0
Private Key: c17c6452786233da2e458a471206e154dffc0bccbb1447307ffe5234a6cc2016
Public Key: 037aff8eaf3b8b4ca46aa1c78b517aea752c79529c15d9dead65aa5dcff70c6ace
Address: 0x8983adcfd05f29b85ea6f56d431d0d24f0a2e5a0

Account User1
Private Key: a9eb36bce4a6c6b3789288e722a02cf6d8d22c1954d8a192a83e15ad6fee51fb
Public Key: 0368d6a77e41e31a3dfabf13236adb718dbec75f2351f8c0d38723f5b0f048d6c9
Address: 0xafc753bbab294636d1050baf0b6d788aa05fc2d2

Account User2
Private Key: daf26e96f1f7151e6cd8fae5a1cb69ce0db3c7bae1a344dea8a52678b1c4d75e
Public Key: 0235f028cb4c7f74233dc1086fd63bfebd175d2f2b4fc0859a9bda90e25828f351
Address: 0xb8091ca8721d9a07f0c1c5233ccd466f601065ac

Account User3
Private Key: 464862561c3b30c3a3ed6341029662a676edb49e6bc10a94ea15094d5f1430fb
Public Key: 03cda210355120f451e01560aa445ae299440dea23fe6a7d0ac8a7b193c2f398d6
Address: 0x9db0d1dc95ae04a64804516d833ae25cf6e36cf8

Account User4
Private Key: 22e5217c6c647134d864284022890e43c3e63580eefe34dd35254e19419ebe7d
Public Key: 033dbf63f8c5b7489633fc79991e8166e1029b82a04f53d55b1f8b316a717769fc
Address: 0x8d620d7348762cf372903dfba297a84b263f7cb1
*/