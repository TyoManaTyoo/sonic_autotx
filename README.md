# sonic odyssey bot auto tx (devnet)

Donate and Support :  SOL = Ebo66e4CePXiGSeh5z21nnFtTHVMuSRwFm8WbjrCAJzM
                      ETH = 0x29769f338e7ca735db23a7dc54f5eed7e1d2ba38
                      DANA = 083815863454
## Register Account

Sonic Odyssey Testnet (Solana L2 EVM)

➖ Download Backpack Wallet : Wallet (https://chromewebstore.google.com/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof

➖ Import your Pk Solana Wallet

➖ Open Link :  https://odyssey.sonic.game/?join=PdMKiY

➖ Connect Wallet and Complete Task

## Install Node Js (Jika Belom)

```
sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update && sudo apt-get install nodejs -y
```

## Clone Repository
```
git clone https://github.com/TyoManaTyoo/sonic_autotx
cd sonic_autotx
```
```
npm install
```

## Edit Private Key json
```
nano privateKeys.json
```

Ganti Dengan Private Key Wallet Solana Kalian Save CTRL X Y Enter

## Jalankan
```
npm start
```

