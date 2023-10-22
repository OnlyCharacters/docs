---
title: Docker
---

## 1. Install Docker

先升级，安装一些依赖，然后安装

https://docs.docker.com/engine/install/debian/

## 2. 使用 alpine 作为 image

```
docker pull alpine
```

## 3. 测试

```
docker run -it alpine /bin/alpine
# 出现新的 shell，说明正常，可以退出
exit
```

## 4. 一般命令

```shell
# 查看、搜索、拉取镜像
docker images
docker search [image]
docker pull [tag]/[image]

# 删除镜像
docker rmi [image]
docker rmi -f [id]

# 查看容器
docker ps -a

# 启动一个停止的容器
docker start [id]/[name]

# 后台运行
docker run -itd --name debian-test debian /bin/bash
-i 交互
-t 终端
-d daemon

# 停止
docker stop [id]/[name]

# 进入容器
docker attach [id]/[name]

# 退出不停止运行
docker exec -it [id] /bin/bash

# 删除容器
docker rm [id]/[name]
```

## 5. Dockerfile

```dockerfile
# 使用 alpine 作为 image
FROM alpine

# 设置工作目录
WORKDIR /aria2

# build 执行的操作
RUN apk update && apk add --no-cache \
    aria2

# build 时使用的用户
USER root

# 虚拟卷
VOLUME ["/aria2", "/Download"]

ENTRYPOINT ["/bin/sh"]
CMD ["/usr/bin/aria2c", "--conf-path=/aria2/aria2.conf"]
```

```shell
docker build . -t [name] --network host
```

```shell
docker tag aria2 ireina/aria2:latest
docker push ireina/aria2:latest
```

## 6. Running

```shell
docker run \
    -itd \
    --restart unless-stopped \
    --name aria2 \
    --network host \
    --user 1000:1000 \
    -v /mnt/data/jiu/Download/:/Download \
    -v /mnt/data/jiu/aria2:/aria2 \
    aria2-alpine
```
