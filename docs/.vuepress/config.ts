import * as document_sidebar from "./config/document-sidebar";

module.exports = {
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '文档', link: '/document/' },
        ],
        lastUpdated: 'Last Updated',
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