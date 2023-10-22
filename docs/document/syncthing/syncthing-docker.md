---
title: Syncthing docker
---
# Syncthing docker image

## [Syncthing](https://docs.syncthing.net/index.html)

Github: [Releases · syncthing / syncthing · GitHub](https://github.com/syncthing/syncthing/releases)

## 1. Dockerfile

```Dockerfile
FROM alpine

WORKDIR /syncthing

ARG SYNCTHING=v1.25.0

VOLUME ["/syncthing"]

RUN wget https://github.com/syncthing/syncthing/releases/download/$SYNCTHING/syncthing-linux-amd64-$SYNCTHING.tar.gz && \
    tar xzvf syncthing-linux-amd64-$SYNCTHING.tar.gz && \
    mv syncthing-linux-amd64-$SYNCTHING/syncthing /usr/bin && \
    rm -rf syncthing-linux-amd64-$SYNCTHING.tar.gz syncthing-linux-amd64-$SYNCTHING

ENTRYPOINT [""]

CMD ["syncthing", "serve", "--home=/syncthing/config", "--gui-address=[::]:8384", "--no-default-folder"]
```

该 Dockerfile 使用 alpine 镜像，在容器内下载 syncthing 可执行文件

## 2. Build

```shell
docker build . -t syncthing
```

或者可以使用 DockerHub 上的镜像
```shell
docker pull ireina/syncthing
```

## 3. Running

先准备目录，目录结构如下

你可以预先准备好自己的域名和对应的证书、私钥，这样访问管理界面时能避免出现证书错误。

证书和私钥同时也是 syncthing 用来标识对端设备的参考，如果你希望将这个对端设备移动到另一处运行，且同时希望设备标识符不改变，则需要同时移动私钥和证书。

如果没有域名的私钥和证书，syncthing 会为你自动生成。

创建完目录有，将证书和私钥放入 syncthing/config (如果有)

```shell
syncthing/
├── config
│   ├── https-cert.pem
│   └── https-key.pem
└── data
```

如果你是自行构建的镜像
```shell
docker run \
    -it \
    --restart unless-stopped \
    --name syncthing \
    --network host \
    -v /root/Tools/syncthing:/syncthing \
    syncthing
```

如果你是使用上述仓库的镜像
```shell
docker run \
    -it \
    --restart unless-stopped \
    --name syncthing \
    --network host \
    -v /root/Tools/syncthing:/syncthing \
    ireina/syncthing
```