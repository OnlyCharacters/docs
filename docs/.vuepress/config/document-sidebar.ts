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