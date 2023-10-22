---
title: acme.sh 获取证书
---
# acme.sh 获取证书

为什么需要申请证书？

- 访问 syncthing 管理页面需要用到 https，使用域名证书更优雅

- 访问 stdicosrv ，如果使用域名证书可以省去携带 deviceID

能不能不用域名证书？

- 可以，但不够优雅

开始之前你需要准备一个域名，证书将使用 acme.sh 申请。现在 acme.sh 一般提供 ZeroSSL 签名的证书，有效期 3 个月，到期前 acme.sh 可以自动续签。

## 1. Get acme.sh

```shell
git clone https://github.com/acmesh-official/acme.sh.git
```

## 2. Using dnsapi to issue

```shell
cd acme.sh
export CF_Account_ID="Cloud flare account ID"
export CF_Token="Cloud flare token"
./acme.sh --issue --dns dns_cf -d {域名} --keylength ec-384
```
