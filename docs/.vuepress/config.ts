import * as document_sidebar from "./config/document-sidebar";

module.exports = {
    themeConfig: {
        base: "/docs/",
        repo: "OnlyCharacters/docs",
        repoLabel: "GitHub",
        editLinks: true,
        docsDir: 'docs',
        docsBranch: 'main',
        nav: [
            { text: '首页', link: '/' },
            { text: '文档', link: '/document/' },
        ],
        lastUpdated: '最后编辑于',
        sidebarDepth: 2,
        // displayAllHeaders: true,
        sidebar: [
            document_sidebar.getDocumentSidebar(
                "文档目录",
                "/document/"
            ),
            document_sidebar.getDocumentSyncthingSidebar(
                "Syncthing",
                "/document/syncthing/"
            ),
            document_sidebar.getDocumentDockerSidebar(
                "Docker",
                "/document/docker/"
            )
        ]
    }
}