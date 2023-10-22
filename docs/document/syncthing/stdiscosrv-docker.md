---
title: Stdiscosrv docker
---
# Stdiscosrv docker

## [Stdiscosrv](https://docs.syncthing.net/users/stdiscosrv.html)

Github: [Releases · syncthing/discosrv · GitHub](https://github.com/syncthing/discosrv/releases)

关于证书，有三种方法处理：

- 使用 CA 签名的证书和密钥

- 使用 stdiscosrv 自己生成的证书密钥，这个证书和密钥是通过 device ID 生成的

- 启动 stdicosrv 时添加 -http 参数，然后把 stdiscosrv 放在其他 https 反向代理后面

对于第一种，发现服务器可以直接填写

```
https://{域名}:{端口}/
```

对于第二种，需要添加 device ID 作为参数

```
https://{域名 / IP}:{端口}/?id={stdiscosrv 生成的 device ID}
```

## 1. Dockerfile

```dockerfile
From alpine

WORKDIR /root

ARG STDISCOSRV=v1.23.4

VOLUME ["/stdiscosrv"]

RUN wget https://github.com/syncthing/discosrv/releases/download/$STDISCOSRV/stdiscosrv-linux-amd64-$STDISCOSRV.tar.gz && \
    tar xzvf stdiscosrv-linux-amd64-$STDISCOSRV.tar.gz && \
    mv stdiscosrv-linux-amd64-$STDISCOSRV/stdiscosrv /usr/bin && \
    rm -rf stdiscosrv-linux-amd64-$STDISCOSRV.tar.gz stdiscosrv-linux-amd64-$STDISCOSRV

ENTRYPOINT [""]
```

## 2. Build

```shell
docker build . -t stdiscosrv --network host
```

## 3. Running

### 有域名证书

请酌情替换下面参数

```shell
docker run \
-it \
--restart unless-stopped \
-v /path/to/your/cert:/cert \
-v /etc/stdiscosrv:/stdiscosrv \
--network host \
--name stdiscosrv \
ireina/stdiscosrv \
stdiscosrv -cert=/cert/fullchain.cer -key=/cert/{私钥文件名} -db-dir=/stdiscosrv
```

更好的做法

"/path/to/your/cert" 一般指 acme.sh 存放证书和私钥的地址，我使用 "/root/.acme.sh/{域名}_ecc"，但这种方法 acme.sh 官方并不推荐，原因是这个 path 可能在某个版本更新后会变，建议使用 acme.sh install 命令安装证书，详见：[acme.sh - 安装证书](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E#3-copy%E5%AE%89%E8%A3%85-%E8%AF%81%E4%B9%A6)

```shell
acme.sh --install-cert -d {域名} \
--key-file       /path/to/https-key.pem  \
--fullchain-file /path/to/https-cert.pem \
--reloadcmd     "docker restart stdiscosrv"
```

### 无域名证书

```shell
docker run \
-it \
--restart unless-stopped \
-v /etc/stdiscosrv:/stdiscosrv \
--network host \
--name stdiscosrv \
stdiscosrv \
stdiscosrv -cert=/cert/cert.pem -key=/cert/key.pem -db-dir=/stdiscosrv
```

运行后记录生成的 device ID，发现服务器
```
https://<IP or domain>:8443/?id=<device ID>
```
使用快捷键 Ctrl + p, q 退出容器（一直按住 Ctrl，先按一下 p，松开 p，再按一下 q）
