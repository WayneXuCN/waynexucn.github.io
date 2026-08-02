



// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation menu",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "publications by categories in reversed chronological order.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of my cool projects.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-toolbox",
          title: "Toolbox",
          description: "A collection of handy apps, scripts, and tools—some created by me, some open source.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/toolbox/";
          },
        },{id: "books-the-godfather",
            title: 'The Godfather',
            description: "",
            section: "Books",handler: () => {
                window.location.href = "/books/the_godfather/";
              },},{id: "news-school-president-scholarship-2022",
            title: 'School President Scholarship, 2022',
            description: "",
            section: "News",},{id: "news-undergraduate-national-scholarship-2022",
            title: 'Undergraduate National Scholarship, 2022',
            description: "",
            section: "News",},{id: "news-excellent-undergraduate-thesis-of-jiangsu-province-first-prize-2023",
            title: 'Excellent Undergraduate Thesis of Jiangsu Province, First Prize 2023',
            description: "",
            section: "News",},{id: "projects-hostimagebackup",
            title: 'HostImageBackup',
            description: "A modular Python CLI tool for backing up images from various image hosting services to your local machine with ease.",
            section: "Projects",handler: () => {
                window.location.href = "/projects/HostImageBackup/";
              },},{id: "projects-microsofthostspicker",
            title: 'MicrosoftHostsPicker',
            description: "A modern, asynchronous Python tool to automatically find and select the fastest IP addresses for Microsoft services.",
            section: "Projects",handler: () => {
                window.location.href = "/projects/MicrosoftHostsPicker/";
              },},{id: "projects-typst-ucas-thesis",
            title: 'Typst-ucas-thesis',
            description: "UCAS thesis Template Based on Typst",
            section: "Projects",handler: () => {
                window.location.href = "/projects/Typst-for-UCAS-thesis/";
              },},{id: "teachings-data-science-fundamentals",
            title: 'Data Science Fundamentals',
            description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
            section: "Teachings",handler: () => {
                window.location.href = "/teachings/data-science-fundamentals/";
              },},{id: "teachings-introduction-to-machine-learning",
            title: 'Introduction to Machine Learning',
            description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
            section: "Teachings",handler: () => {
                window.location.href = "/teachings/introduction-to-machine-learning/";
              },},{
        id: 'social-cv',
        title: 'CV',
        section: "Socials",
        handler: () => {
          window.open("/assets/rendercv/rendercv_output/en_US_CV.pdf", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: "Socials",
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: "Socials",
        handler: () => {
          window.open("mailto:%77%65%6E%6A%69%65.%78%75.%63%6E@%6F%75%74%6C%6F%6F%6B.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: "Socials",
        handler: () => {
          window.open("https://github.com/Vncntvx", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: "Socials",
        handler: () => {
          window.open("https://orcid.org/0000-0002-7778-0450", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: "Socials",
        handler: () => {
          window.open("https://www.researchgate.net/profile/https://www.researchgate.net/profile/Wenjie-Xu-19/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: "Socials",
        handler: () => {
          window.open("https://scholar.google.com/citations?user=eWTidmsAAAAJ", "_blank");
        },
      },{
        id: 'social-wechat_qr',
        title: 'Wechat_qr',
        section: "Socials",
        handler: () => {
          window.open("/assets/img/wechatQR.png", "_blank");
        },
      },{
      id: 'light-theme',
      title: "",
      description: "",
      section: "Theme",
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: "",
      description: "",
      section: "Theme",
      handler: () => {
        setThemeSetting("dark");
      },
    },];
