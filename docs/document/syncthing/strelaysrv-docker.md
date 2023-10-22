---
title: Strelaysrv docker
---
# Strelaysrv docker

## [Strelayrv](https://docs.syncthing.net/users/strelaysrv.html)

Github: [Releases · syncthing/relaysrv · GitHub](https://github.com/syncthing/relaysrv/releases)

全球 relay 列表: https://relays.syncthing.net/


## 1. Dockerfile

```dockerfile
From alpine

WORKDIR /root

ARG STRELAYSRV=v1.22.1

VOLUME ["/strelaysrv"]

RUN wget https://github.com/syncthing/relaysrv/releases/download/$STRELAYSRV/strelaysrv-linux-amd64-$STRELAYSRV.tar.gz && \
    tar xzvf strelaysrv-linux-amd64-$STRELAYSRV.tar.gz && \
    mv strelaysrv-linux-amd64-$STRELAYSRV/strelaysrv /usr/bin && \
    rm -rf strelaysrv-linux-amd64-$STRELAYSRV.tar.gz strelaysrv-linux-amd64-$STRELAYSRV

ENTRYPOINT [""]
```

## 2. Build

```shell
docker build . -t stdiscosrv --network host
```

## 3. Running

```shell
docker run \
-it \
--restart unless-stopped \
-v /etc/strelaysrv:/strelaysrv \
--network host \
--name strelaysrv_private \
ireina/strelaysrv \
strelaysrv -keys=/strelaysrv -pools="" -per-session-rate=5000000 -global-rate=30000000
```

添加 ***-pools=""*** 参数，为私有中转服务器；

不添加时，会加入到官方的中转服务器池中，为其他用户也中转
