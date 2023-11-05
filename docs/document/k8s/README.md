> # 1 Kubernetes 概述

Kubernetes 是容器集群管理系统，是一个开源的平台，可以实现容器集群的自动化部署、自动扩缩容、维护等功能。

## 1.1 Kubernetes 特点：

- 可移植: 支持公有云，私有云，混合云，多重云（multi-cloud）

- 可扩展: 模块化, 插件化, 可挂载, 可组合

- 自动化: 自动部署，自动重启，自动复制，自动伸缩/扩展

## 1.2 Master 组件：

> # 2 部署 k8s

## 2.1 安装 docker

参考：[Install Docker Engine from binaries | Docker Docs](https://docs.docker.com/engine/install/binaries/)

1. 安装依赖
   
   ```shell
   # yum
   yum install openssl-devel git iptables xz-utils
   
   # apt
   apt install libssl-dev git iptables xz-utils
   ```

2. 下载二进制文件
   
   ```shell
   # 下载地址 https://download.docker.com/linux/static/stable/x86_64/
   # 本机下载，上传至服务器即可
   DOCKER_VERSION="24.0.7"
   DOCKER_DIR="/opt/docker_${DOCKER_VERSION}"
   mkdir -p ${DOCKER_DIR}
   mkdir -p ${DOCKER_DIR}/bin
   cd ${DOCKER_DIR}
   wget https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz
   tar xzvf docker-${DOCKER_VERSION}.tgz -C ${DOCKER_DIR}
   mv ${DOCKER_DIR}/docker ${DOCKER_DIR}/bin
   ```

3. 创建文件夹，添加 containerd 配置文件
   
   ```shell
   mkdir ${DOCKER_DIR}/containerd_config
   mkdir ${DOCKER_DIR}/containerd_root
   mkdir ${DOCKER_DIR}/containerd_sock
   mkdir ${DOCKER_DIR}/containerd_state
   mkdir ${DOCKER_DIR}/dockerd_exec
   mkdir ${DOCKER_DIR}/dockerd_pid
   mkdir ${DOCKER_DIR}/dockerd_root
   mkdir ${DOCKER_DIR}/dockerd_sock
   ```
   
    执行下面命令，将配置文件 config.yml 到 ${DOCKER_DIR}/containerd_config/config.yml
   
   ```shell
   cat <<EOF > ${DOCKER_DIR}/containerd_config/config.yml
   #   Copyright 2018-2022 Docker Inc.
   
   #   Licensed under the Apache License, Version 2.0 (the "License");
   #   you may not use this file except in compliance with the License.
   #   You may obtain a copy of the License at
   
   #       http://www.apache.org/licenses/LICENSE-2.0
   
   #   Unless required by applicable law or agreed to in writing, software
   #   distributed under the License is distributed on an "AS IS" BASIS,
   #   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   #   See the License for the specific language governing permissions and
   #   limitations under the License.
   
   disabled_plugins = ["cri"]
   
   root = "${DOCKER_DIR}/containerd_root"
   state = "${DOCKER_DIR}/containerd_state"
   #subreaper = true
   #oom_score = 0
   
   [grpc]
   address = "${DOCKER_DIR}/containerd_sock/containerd.sock"
   uid = 0
   gid = 0
   
   #[debug]
   #  address = "/run/containerd/debug.sock"
   #  uid = 0
   #  gid = 0
   #  level = "info"
   EOF
   ```
   
   执行下面命令，配置 daemon.json 到 ${DOCKER_DIR}/dockerd_config/daemon.json
   
   ```shell
   cat <<EOF > ${DOCKER_DIR}/dockerd_config/daemon.json
   {}
   EOF
   ```

4. 设置 systemd 服务
   
    参考：
   
   1. [docker.socket & docker.service](https://github.com/moby/moby/tree/master/contrib/init/systemd)
   
   2. [containerd.service](https://github.com/containerd/containerd/blob/main/containerd.service)
   
   执行下面命令，设置环境变量到 /etc/profile.d/docker.sh
   
   ```shell
   cat <<EOF > /etc/profile.d/docker.sh
   export PATH=${PATH}:${DOCKER_DIR}/bin
   export DOCKER_HOST=unix://${DOCKER_DIR}/dockerd_sock/docker.sock
   EOF
   ```
   
   - containerd.service
     
     执行下面命令，配置 containerd.service 到 /etc/systemd/system/containerd.service
     
     ```shell
     cat <<EOF > /etc/systemd/system/containerd.service
     # Copyright The containerd Authors.
     #
     # Licensed under the Apache License, Version 2.0 (the "License");
     # you may not use this file except in compliance with the License.
     # You may obtain a copy of the License at
     #
     #     http://www.apache.org/licenses/LICENSE-2.0
     #
     # Unless required by applicable law or agreed to in writing, software
     # distributed under the License is distributed on an "AS IS" BASIS,
     # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     # See the License for the specific language governing permissions and
     # limitations under the License.
     
     [Unit]
     Description=containerd container runtime
     Documentation=https://containerd.io
     After=network.target local-fs.target
     
     [Service]
     #uncomment to fallback to legacy CRI plugin implementation with podsandbox support.
     #Environment="DISABLE_CRI_SANDBOXES=1"
     ExecStartPre=-/sbin/modprobe overlay
     ExecStart=${DOCKER_DIR}/bin/containerd --config ${DOCKER_DIR}/containerd_config/config.yml
     
     Type=notify
     Delegate=yes
     KillMode=process
     Restart=always
     RestartSec=5
     
     # Having non-zero Limit*s causes performance problems due to accounting overhead
     # in the kernel. We recommend using cgroups to do container-local accounting.
     LimitNOFILE=infinity
     LimitNPROC=infinity
     LimitCORE=infinity
     
     # Comment TasksMax if your systemd version does not supports it.
     # Only systemd 226 and above support this version.
     TasksMax=infinity
     OOMScoreAdjust=-999
     
     [Install]
     WantedBy=multi-user.target
     EOF
     ```
   
   - docker.socket
     
     执行下面命令，配置 docker.socket 到 /etc/systemd/system/docker.socket
     
     ```shell
     cat <<EOF > /etc/systemd/system/docker.socket
     [Unit]
     Description=Docker Socket for the API
     
     [Socket]
     # If /var/run is not implemented as a symlink to /run, you may need to
     # specify ListenStream=/var/run/docker.sock instead.
     ListenStream=${DOCKER_DIR}/dockerd_sock/docker.sock
     SocketMode=0660
     SocketUser=root
     SocketGroup=root
     
     [Install]
     WantedBy=sockets.target
     EOF
     ```
   
   - docker.service
     
     执行下面命令，配置 docker.service 到 /etc/systemd/system/docker.service
     
     ```shell
     cat <<EOF > /etc/systemd/system/docker.service
     [Unit]
     Description=Docker Application Container Engine
     Documentation=https://docs.docker.com
     After=network-online.target docker.socket firewalld.service containerd.service time-set.service
     Wants=network-online.target containerd.service
     Requires=docker.socket
     
     [Service]
     Type=notify
     # the default is not to use systemd for cgroups because the delegate issues still
     # exists and systemd currently does not support the cgroup feature set required
     # for containers run by docker
     ExecStart=/bin/bash -c "PATH=${PATH}:/opt/docker_24.0.7/bin exec ${DOCKER_DIR}/bin/dockerd --config-file ${DOCKER_DIR}/dockerd_config/daemon.json --host unix://{DOCKER_DIR}/dockerd_sock/docker.sock --group root --containerd ${DOCKER_DIR}/containerd_sockcontainerd.sock --data-root ${DOCKER_DIR}/dockerd_root --exec-root ${DOCKER_DIR}/dockerd_exec--pidfile ${DOCKER_DIR}/dockerd_pid/docker.pid
     ExecReload=/bin/kill -s HUP $MAINPID
     TimeoutStartSec=0
     RestartSec=2
     Restart=always
     
     # Note that StartLimit* options were moved from "Service" to "Unit" in systemd 229.
     # Both the old, and new location are accepted by systemd 229 and up, so using the old location
     # to make them work for either version of systemd.
     StartLimitBurst=3
     
     # Note that StartLimitInterval was renamed to StartLimitIntervalSec in systemd 230.
     # Both the old, and new name are accepted by systemd 230 and up, so using the old name to make
     # this option work for either version of systemd.
     StartLimitInterval=60s
     
     # Having non-zero Limit*s causes performance problems due to accounting overhead
     # in the kernel. We recommend using cgroups to do container-local accounting.
     LimitNOFILE=infinity
     LimitNPROC=infinity
     LimitCORE=infinity
     
     # Comment TasksMax if your systemd version does not support it.
     # Only systemd 226 and above support this option.
     TasksMax=infinity
     
     # set delegate yes so that systemd does not reset the cgroups of docker containers
     Delegate=yes
     
     # kill only the docker process, not all processes in the cgroup
     KillMode=process
     OOMScoreAdjust=-500
     
     [Install]
     WantedBy=multi-user.target
     EOF
     ```
   
   使服务生效并开机启动
   
   ```shell
   systemctl daemon-reload
   systemctl enable containerd.service docker.socket docker.service
   ```

## kubectl

参考：[安装 kubeadm、kubelet 和 kubectl](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl)

```shell
WORK_DIR="/opt/k8s"
ARCH="amd64"
K8S_ENV_DIR="${WORK_DIR}/env"
mkdir -p "${K8S_ENV_DIR}"
cd ${WORK_DIR}

# 安装 CNI 插件
CNI_DIR="${WORK_DIR}/cni/bin"
CNI_PLUGINS_VERSION="v1.3.0"
mkdir -p "${CNI_DIR}"
curl -L "https://github.com/containernetworking/plugins/releases/download/${CNI_PLUGINS_VERSION}/cni-plugins-linux-${ARCH}-${CNI_PLUGINS_VERSION}.tgz" | tar -C "$CNI_DIR" -xz

# 安装 crictl（kubeadm/kubelet 容器运行时接口（CRI）所需）
CRI_DIR="${WORK_DIR}/cri/bin"
CRICTL_VERSION="v1.28.0"
mkdir -p "${CRI_DIR}"
curl -L "https://github.com/kubernetes-sigs/cri-tools/releases/download/${CRICTL_VERSION}/crictl-${CRICTL_VERSION}-linux-${ARCH}.tar.gz" | tar -C "${CRI_DIR}" -xz

# 安装 kubeadm, kubelet, kubectl
RELEASE="$(curl -sSL https://dl.k8s.io/release/stable.txt)"
curl -L --remote-name-all https://dl.k8s.io/release/${RELEASE}/bin/linux/${ARCH}/{kubeadm,kubelet,kubectl}
chmod +x {kubeadm,kubelet,kubectl}

# 下载 service
RELEASE_VERSION="v0.16.2"
curl -sSL --remote-name-all "https://raw.githubusercontent.com/kubernetes/release/${RELEASE_VERSION}/cmd/krel/templates/latest/kubelet/kubelet.service"
curl -sSL --remote-name-all "https://raw.githubusercontent.com/kubernetes/release/${RELEASE_VERSION}/cmd/krel/templates/latest/kubeadm/10-kubeadm.conf"
mkdir -p /etc/systemd/system/kubelet.service.d

sed -e "s:/usr/bin/kubelet:${WORK_DIR}/kubelet:g" kubelet.service | tee /etc/systemd/system/kubelet.service
sed -e "s:/usr/bin/kubelet:${WORK_DIR}/kubelet:g" -e "s:/etc/sysconfig:${WORK_DIR}/env:g" -e "s:/var/lib/kubelet:${WORK_DIR}/env:g" -e "s:/etc/kubernetes:${WORK_DIR}/env:g" 10-kubeadm.conf | tee /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
```
