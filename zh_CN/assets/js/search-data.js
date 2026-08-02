



// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-关于",
    title: "关于",
    section: "导航菜单",
    handler: () => {
      window.location.href = "/zh_CN/";
    },
  },{id: "nav-发表",
          title: "发表",
          description: "按类别划分的出版物列表，按时间倒序排列。",
          section: "导航菜单",
          handler: () => {
            window.location.href = "/zh_CN/publications/";
          },
        },{id: "nav-项目",
          title: "项目",
          description: "项目合集",
          section: "导航菜单",
          handler: () => {
            window.location.href = "/zh_CN/projects/";
          },
        },{id: "nav-工具",
          title: "工具",
          description: "收录了我个人开发和部分开源的小程序、脚本与工具。",
          section: "导航菜单",
          handler: () => {
            window.location.href = "/zh_CN/toolbox/";
          },
        },{id: "books-the-godfather",
            title: 'The Godfather',
            description: "",
            section: "书籍",handler: () => {
                window.location.href = "/zh_CN/books/the_godfather/";
              },},{id: "news-2022年校长奖学金",
            title: '2022年校长奖学金',
            description: "",
            section: "News",},{id: "news-2022年本科生国家奖学金",
            title: '2022年本科生国家奖学金',
            description: "",
            section: "News",},{id: "news-2023年江苏省优秀本科毕业论文一等奖",
            title: '2023年江苏省优秀本科毕业论文一等奖',
            description: "",
            section: "News",},{id: "projects-hostimagebackup",
            title: 'HostImageBackup',
            description: "一个模块化的 Python 命令行工具，轻松将各类图床服务的图片备份到本地。",
            section: "Projects",handler: () => {
                window.location.href = "/zh_CN/projects/HostImageBackup/";
              },},{id: "projects-microsofthostspicker",
            title: 'MicrosoftHostsPicker',
            description: "一个现代化的异步 Python 工具，可自动查找并选择 Microsoft 服务的最快 IP 地址。",
            section: "Projects",handler: () => {
                window.location.href = "/zh_CN/projects/MicrosoftHostsPicker/";
              },},{id: "projects-typst-ucas-thesis",
            title: 'Typst-ucas-thesis',
            description: "基于 Typst 的中国科学院大学学位论文模板",
            section: "Projects",handler: () => {
                window.location.href = "/zh_CN/projects/Typst-for-UCAS-thesis/";
              },},{id: "teachings-data-science-fundamentals",
            title: 'Data Science Fundamentals',
            description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
            section: "Teachings",handler: () => {
                window.location.href = "/zh_CN/teachings/data-science-fundamentals/";
              },},{id: "teachings-introduction-to-machine-learning",
            title: 'Introduction to Machine Learning',
            description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
            section: "Teachings",handler: () => {
                window.location.href = "/zh_CN/teachings/introduction-to-machine-learning/";
              },},{
        id: 'social-cv',
        title: 'CV',
        section: "社交",
        handler: () => {
          window.open("/zh_CN/assets/rendercv/rendercv_output/en_US_CV.pdf", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: "社交",
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: "社交",
        handler: () => {
          window.open("mailto:%77%65%6E%6A%69%65.%78%75.%63%6E@%6F%75%74%6C%6F%6F%6B.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: "社交",
        handler: () => {
          window.open("https://github.com/Vncntvx", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: "社交",
        handler: () => {
          window.open("https://orcid.org/0000-0002-7778-0450", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: "社交",
        handler: () => {
          window.open("https://www.researchgate.net/profile/https://www.researchgate.net/profile/Wenjie-Xu-19/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: "社交",
        handler: () => {
          window.open("https://scholar.google.com/citations?user=eWTidmsAAAAJ", "_blank");
        },
      },{
        id: 'social-wechat_qr',
        title: 'Wechat_qr',
        section: "社交",
        handler: () => {
          window.open("/assets/img/wechatQR.png", "_blank");
        },
      },{
      id: 'light-theme',
      title: "",
      description: "",
      section: "主题",
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: "",
      description: "",
      section: "主题",
      handler: () => {
        setThemeSetting("dark");
      },
    },];
