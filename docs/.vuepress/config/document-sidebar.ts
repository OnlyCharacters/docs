import { SidebarConfig } from "@vuepress/theme-default";

export function getDocumentSidebar (
    document : string,
    path : string
) : SidebarConfig {
    return {
        title: document,
        path: path,
        collapsable: false,
        children: [
            path + "syncthing/",
            path + "docker/",
            path + "k8s/"
        ]
   }
}

export function getDocumentSyncthingSidebar (
    syncthing : string,
    path : string
) : SidebarConfig {
    return {
        title: syncthing,
        path: path,
        collapsable: false,
        children: [
            path + "cert.md",
            path + "syncthing-docker.md",
            path + "stdiscosrv-docker.md",
            path + "strelaysrv-docker.md",
        ]
    }
}

export function getDocumentk8sSidebar (
    docker : string,
    path : string
) : SidebarConfig {
    return {
        title: docker,
        path: path,
        collapsable: false,
        children: [
        ]
    }
}

export function getDocumentDockerSidebar (
    docker : string,
    path : string
) : SidebarConfig {
    return {
        title: docker,
        path: path,
        collapsable: false,
        children: [
        ]
    }
}

export function getDocumentOpenrestySidebar (
    docker : string,
    path : string
) : SidebarConfig {
    return {
        title: docker,
        path: path,
        collapsable: false,
        children: [
            path + "1.21.4.3.md",
            path + "1.25.3.1.md",
        ]
    }
}