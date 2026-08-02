



// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-über-mich",
    title: "Über mich",
    section: "Navigationsmenü",
    handler: () => {
      window.location.href = "/de_DE/";
    },
  },{id: "nav-veröffentlichungen",
          title: "Veröffentlichungen",
          description: "Veröffentlichungen nach Kategorien in umgekehrt chronologischer Reihenfolge.",
          section: "Navigationsmenü",
          handler: () => {
            window.location.href = "/de_DE/publications/";
          },
        },{id: "nav-projekte",
          title: "Projekte",
          description: "Eine wachsende Sammlung meiner coolen Projekte.",
          section: "Navigationsmenü",
          handler: () => {
            window.location.href = "/de_DE/projects/";
          },
        },{id: "nav-werkzeug",
          title: "Werkzeug",
          description: "Eine Sammlung nützlicher Apps, Skripte und Tools – teils von mir entwickelt, teils Open Source.",
          section: "Navigationsmenü",
          handler: () => {
            window.location.href = "/de_DE/toolbox/";
          },
        },{id: "books-the-godfather",
            title: 'The Godfather',
            description: "",
            section: "Bücher",handler: () => {
                window.location.href = "/de_DE/books/the_godfather/";
              },},{id: "news-präsidentenstipendium-2022",
            title: 'Präsidentenstipendium, 2022',
            description: "",
            section: "News",},{id: "news-nationales-stipendium-für-bachelorstudierende-2022",
            title: 'Nationales Stipendium für Bachelorstudierende, 2022',
            description: "",
            section: "News",},{id: "news-ausgezeichnete-bachelorarbeit-der-provinz-jiangsu-erster-preis-2023",
            title: 'Ausgezeichnete Bachelorarbeit der Provinz Jiangsu, Erster Preis 2023',
            description: "",
            section: "News",},{id: "projects-hostimagebackup",
            title: 'HostImageBackup',
            description: "Ein modulares Python-CLI-Tool zum einfachen Sichern von Bildern von verschiedenen Bild-Hosting-Diensten auf Ihren lokalen Rechner.",
            section: "Projects",handler: () => {
                window.location.href = "/de_DE/projects/HostImageBackup/";
              },},{id: "projects-microsofthostspicker",
            title: 'MicrosoftHostsPicker',
            description: "一个现代化的异步 Python 工具，可自动查找并选择 Microsoft 服务的最快 IP 地址。",
            section: "Projects",handler: () => {
                window.location.href = "/de_DE/projects/MicrosoftHostsPicker/";
              },},{id: "projects-typst-ucas-thesis",
            title: 'Typst-ucas-thesis',
            description: "UCAS Thesis-Vorlage basierend auf Typst",
            section: "Projects",handler: () => {
                window.location.href = "/de_DE/projects/Typst-for-UCAS-thesis/";
              },},{id: "teachings-data-science-fundamentals",
            title: 'Data Science Fundamentals',
            description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
            section: "Teachings",handler: () => {
                window.location.href = "/de_DE/teachings/data-science-fundamentals/";
              },},{id: "teachings-introduction-to-machine-learning",
            title: 'Introduction to Machine Learning',
            description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
            section: "Teachings",handler: () => {
                window.location.href = "/de_DE/teachings/introduction-to-machine-learning/";
              },},{
        id: 'social-cv',
        title: 'CV',
        section: "Soziale Netzwerke",
        handler: () => {
          window.open("/de_DE/assets/rendercv/rendercv_output/en_US_CV.pdf", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: "Soziale Netzwerke",
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: "Soziale Netzwerke",
        handler: () => {
          window.open("mailto:%77%65%6E%6A%69%65.%78%75.%63%6E@%6F%75%74%6C%6F%6F%6B.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: "Soziale Netzwerke",
        handler: () => {
          window.open("https://github.com/Vncntvx", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: "Soziale Netzwerke",
        handler: () => {
          window.open("https://orcid.org/0000-0002-7778-0450", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: "Soziale Netzwerke",
        handler: () => {
          window.open("https://www.researchgate.net/profile/https://www.researchgate.net/profile/Wenjie-Xu-19/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: "Soziale Netzwerke",
        handler: () => {
          window.open("https://scholar.google.com/citations?user=eWTidmsAAAAJ", "_blank");
        },
      },{
        id: 'social-wechat_qr',
        title: 'Wechat_qr',
        section: "Soziale Netzwerke",
        handler: () => {
          window.open("/assets/img/wechatQR.png", "_blank");
        },
      },{
      id: 'light-theme',
      title: "",
      description: "",
      section: "Design",
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: "",
      description: "",
      section: "Design",
      handler: () => {
        setThemeSetting("dark");
      },
    },];
