// Has to be in the head tag, otherwise a flicker effect will occur.

// Toggle between light and dark theme (ignore system icon in header).
let toggleThemeSetting = () => {
  // 添加切换动画类
  const toggleBtn = document.getElementById("light-toggle");
  if (toggleBtn) {
    toggleBtn.classList.add("switching");
    // 动画完成后移除类
    setTimeout(() => {
      toggleBtn.classList.remove("switching");
    }, 400);
  }

  // 两态翻转：依据当前 computed 翻转到反面，锁定为显式 light/dark。
  let current = determineComputedTheme();
  setThemeSetting(current === "dark" ? "light" : "dark");
};

// Change the theme setting and apply the theme.
let setThemeSetting = (themeSetting) => {
  localStorage.setItem("theme", themeSetting);

  document.documentElement.setAttribute("data-theme-setting", themeSetting);

  applyTheme();
};

// Apply the computed dark or light theme to the website.
let applyTheme = () => {
  let theme = determineComputedTheme();

  // 立即应用视觉变化
  transTheme();
  document.documentElement.setAttribute("data-theme", theme);

  // 图标可见性现由 CSS 根据 data-theme-setting 属性选择器驱动（_navbar.scss），
  // setThemeSetting 已设置该属性，无需 JS 操作 display，避免刷新闪烁。

  // 使用 requestAnimationFrame 延迟非关键操作，避免阻塞主线程
  requestAnimationFrame(() => {
    // 第一帧：应用高亮主题和基础样式
    setHighlight(theme);
    setCookieConsentTheme(theme);
    setSearchTheme(theme);
    updateCalendarUrl();

    // 更新表格样式
    let tables = document.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
      if (theme == "dark") {
        tables[i].classList.add("table-dark");
      } else {
        tables[i].classList.remove("table-dark");
      }
    }
  });

  // 使用 requestIdleCallback 延迟执行更耗时的操作（如果可用）
  const scheduleHeavyWork = (callback) => {
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(callback, { timeout: 100 });
    } else {
      setTimeout(callback, 50);
    }
  };

  // 延迟执行第三方组件主题更新
  scheduleHeavyWork(() => {
    setGiscusTheme(theme);

    // if mermaid is not defined, do nothing
    if (typeof mermaid !== "undefined") {
      setMermaidTheme(theme);
    }

    // if diff2html is not defined, do nothing
    if (typeof Diff2HtmlUI !== "undefined") {
      setDiff2htmlTheme(theme);
    }

    // if echarts is not defined, do nothing
    if (typeof echarts !== "undefined") {
      setEchartsTheme(theme);
    }

    // if Plotly is not defined, do nothing
    if (typeof Plotly !== "undefined") {
      setPlotlyTheme(theme);
    }

    // if vegaEmbed is not defined, do nothing
    if (typeof vegaEmbed !== "undefined") {
      setVegaLiteTheme(theme);
    }
  });

  // 延迟更新 Jupyter notebooks 和 medium-zoom
  scheduleHeavyWork(() => {
    // Set jupyter notebooks themes.
    let jupyterNotebooks = document.getElementsByClassName("jupyter-notebook-iframe-container");
    for (let i = 0; i < jupyterNotebooks.length; i++) {
      let iframe = jupyterNotebooks[i].getElementsByTagName("iframe")[0];
      if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
        let bodyElement = iframe.contentWindow.document.body;
        if (bodyElement) {
          if (theme == "dark") {
            bodyElement.setAttribute("data-jp-theme-light", "false");
            bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Dark");
          } else {
            bodyElement.setAttribute("data-jp-theme-light", "true");
            bodyElement.setAttribute("data-jp-theme-name", "JupyterLab Light");
          }
        }
      }
    }

    // Updates the background of medium-zoom overlay.
    if (typeof medium_zoom !== "undefined") {
      medium_zoom.update({
        background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee",
      });
    }
  });
};

let setHighlight = (theme) => {
  if (theme == "dark") {
    document.getElementById("highlight_theme_light").media = "none";
    document.getElementById("highlight_theme_dark").media = "";
  } else {
    document.getElementById("highlight_theme_dark").media = "none";
    document.getElementById("highlight_theme_light").media = "";
  }
};

let setGiscusTheme = (theme) => {
  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }

  sendMessage({
    setConfig: {
      theme: theme,
    },
  });
};

let addMermaidZoom = (records, observer) => {
  var svgs = d3.selectAll(".mermaid svg");
  svgs.each(function () {
    var svg = d3.select(this);
    svg.html("<g>" + svg.html() + "</g>");
    var inner = svg.select("g");
    var zoom = d3.zoom().on("zoom", function (event) {
      inner.attr("transform", event.transform);
    });
    svg.call(zoom);
  });
  observer.disconnect();
};

let setMermaidTheme = (theme) => {
  if (theme == "light") {
    // light theme name in mermaid is 'default'
    // https://mermaid.js.org/config/theming.html#available-themes
    theme = "default";
  }

  /* Re-render the SVG, based on https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_includes/mermaid.html */
  document.querySelectorAll(".mermaid").forEach((elem) => {
    // Get the code block content from previous element, since it is the mermaid code itself as defined in Markdown, but it is hidden
    let svgCode = elem.previousSibling.childNodes[0].innerHTML;
    elem.removeAttribute("data-processed");
    elem.innerHTML = svgCode;
  });

  mermaid.initialize({ theme: theme });
  window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));

  const observable = document.querySelector(".mermaid svg");
  if (observable !== null) {
    var observer = new MutationObserver(addMermaidZoom);
    const observerOptions = { childList: true };
    observer.observe(observable, observerOptions);
  }
};

let setDiff2htmlTheme = (theme) => {
  document.querySelectorAll(".diff2html").forEach((elem) => {
    // Get the code block content from previous element, since it is the diff code itself as defined in Markdown, but it is hidden
    let textData = elem.previousSibling.childNodes[0].innerHTML;
    elem.innerHTML = "";
    const configuration = { colorScheme: theme, drawFileList: true, highlight: true, matching: "lines" };
    const diff2htmlUi = new Diff2HtmlUI(elem, textData, configuration);
    diff2htmlUi.draw();
  });
};

let setEchartsTheme = (theme) => {
  document.querySelectorAll(".echarts").forEach((elem) => {
    // Get the code block content from previous element, since it is the echarts code itself as defined in Markdown, but it is hidden
    let jsonData = elem.previousSibling.childNodes[0].innerHTML;
    echarts.dispose(elem);

    if (theme === "dark") {
      var chart = echarts.init(elem, "dark-fresh-cut");
    } else {
      var chart = echarts.init(elem);
    }

    chart.setOption(JSON.parse(jsonData));
  });
};

let setPlotlyTheme = (theme) => {
  document.querySelectorAll(".js-plotly-plot").forEach((elem) => {
    // Get the code block content from previous element, since it is the plotly code itself as defined in Markdown, but it is hidden
    let jsonData = JSON.parse(elem.previousSibling.childNodes[0].innerHTML);

    if (theme === "dark") {
      // dark theme extracted from https://github.com/plotly/plotly.py/blob/main/plotly/package_data/templates/plotly_dark.json?raw=true
      // prettier-ignore
      const plotlyDarkLayout = {"layout":{"autotypenumbers":"strict","colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#f2f5fa"},"hovermode":"closest","hoverlabel":{"align":"left"},"paper_bgcolor":"rgb(17,17,17)","plot_bgcolor":"rgb(17,17,17)","polar":{"bgcolor":"rgb(17,17,17)","angularaxis":{"gridcolor":"#506784","linecolor":"#506784","ticks":""},"radialaxis":{"gridcolor":"#506784","linecolor":"#506784","ticks":""}},"ternary":{"bgcolor":"rgb(17,17,17)","aaxis":{"gridcolor":"#506784","linecolor":"#506784","ticks":""},"baxis":{"gridcolor":"#506784","linecolor":"#506784","ticks":""},"caxis":{"gridcolor":"#506784","linecolor":"#506784","ticks":""}},"coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]]},"xaxis":{"gridcolor":"#283442","linecolor":"#506784","ticks":"","title":{"standoff":15},"zerolinecolor":"#283442","automargin":true,"zerolinewidth":2},"yaxis":{"gridcolor":"#283442","linecolor":"#506784","ticks":"","title":{"standoff":15},"zerolinecolor":"#283442","automargin":true,"zerolinewidth":2},"scene":{"xaxis":{"backgroundcolor":"rgb(17,17,17)","gridcolor":"#506784","linecolor":"#506784","showbackground":true,"ticks":"","zerolinecolor":"#C8D4E3","gridwidth":2},"yaxis":{"backgroundcolor":"rgb(17,17,17)","gridcolor":"#506784","linecolor":"#506784","showbackground":true,"ticks":"","zerolinecolor":"#C8D4E3","gridwidth":2},"zaxis":{"backgroundcolor":"rgb(17,17,17)","gridcolor":"#506784","linecolor":"#506784","showbackground":true,"ticks":"","zerolinecolor":"#C8D4E3","gridwidth":2}},"shapedefaults":{"line":{"color":"#f2f5fa"}},"annotationdefaults":{"arrowcolor":"#f2f5fa","arrowhead":0,"arrowwidth":1},"geo":{"bgcolor":"rgb(17,17,17)","landcolor":"rgb(17,17,17)","subunitcolor":"#506784","showland":true,"showlakes":true,"lakecolor":"rgb(17,17,17)"},"title":{"x":0.05},"updatemenudefaults":{"bgcolor":"#506784","borderwidth":0},"sliderdefaults":{"bgcolor":"#C8D4E3","borderwidth":1,"bordercolor":"rgb(17,17,17)","tickwidth":0},"mapbox":{"style":"dark"}},"data":{"histogram2dcontour":[{"type":"histogram2dcontour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"choropleth":[{"type":"choropleth","colorbar":{"outlinewidth":0,"ticks":""}}],"histogram2d":[{"type":"histogram2d","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmap":[{"type":"heatmap","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"contourcarpet":[{"type":"contourcarpet","colorbar":{"outlinewidth":0,"ticks":""}}],"contour":[{"type":"contour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"surface":[{"type":"surface","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"mesh3d":[{"type":"mesh3d","colorbar":{"outlinewidth":0,"ticks":""}}],"scatter":[{"marker":{"line":{"color":"#283442"}},"type":"scatter"}],"parcoords":[{"type":"parcoords","line":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolargl":[{"type":"scatterpolargl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"bar":[{"error_x":{"color":"#f2f5fa"},"error_y":{"color":"#f2f5fa"},"marker":{"line":{"color":"rgb(17,17,17)","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"scattergeo":[{"type":"scattergeo","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolar":[{"type":"scatterpolar","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"scattergl":[{"marker":{"line":{"color":"#283442"}},"type":"scattergl"}],"scatter3d":[{"type":"scatter3d","line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattermap":[{"type":"scattermap","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattermapbox":[{"type":"scattermapbox","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterternary":[{"type":"scatterternary","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattercarpet":[{"type":"scattercarpet","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"carpet":[{"aaxis":{"endlinecolor":"#A2B1C6","gridcolor":"#506784","linecolor":"#506784","minorgridcolor":"#506784","startlinecolor":"#A2B1C6"},"baxis":{"endlinecolor":"#A2B1C6","gridcolor":"#506784","linecolor":"#506784","minorgridcolor":"#506784","startlinecolor":"#A2B1C6"},"type":"carpet"}],"table":[{"cells":{"fill":{"color":"#506784"},"line":{"color":"rgb(17,17,17)"}},"header":{"fill":{"color":"#2a3f5f"},"line":{"color":"rgb(17,17,17)"}},"type":"table"}],"barpolar":[{"marker":{"line":{"color":"rgb(17,17,17)","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"pie":[{"automargin":true,"type":"pie"}]}};

      // if jsonData.layout exists, then update the theme
      if (jsonData.layout) {
        if (jsonData.layout.template) {
          jsonData.layout.template = { ...plotlyDarkLayout, ...jsonData.layout.template };
        } else {
          jsonData.layout.template = plotlyDarkLayout;
        }
      } else {
        jsonData.layout = { template: plotlyDarkLayout };
      }
    } else {
      // light theme extracted from https://github.com/plotly/plotly.py/blob/main/plotly/package_data/templates/plotly_white.json?raw=true
      // prettier-ignore
      const plotlyLightLayout = {"layout":{"autotypenumbers":"strict","colorway":["#636efa","#EF553B","#00cc96","#ab63fa","#FFA15A","#19d3f3","#FF6692","#B6E880","#FF97FF","#FECB52"],"font":{"color":"#2a3f5f"},"hovermode":"closest","hoverlabel":{"align":"left"},"paper_bgcolor":"white","plot_bgcolor":"white","polar":{"bgcolor":"white","angularaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""},"radialaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":""}},"ternary":{"bgcolor":"white","aaxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"baxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""},"caxis":{"gridcolor":"#DFE8F3","linecolor":"#A2B1C6","ticks":""}},"coloraxis":{"colorbar":{"outlinewidth":0,"ticks":""}},"colorscale":{"sequential":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"sequentialminus":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]],"diverging":[[0,"#8e0152"],[0.1,"#c51b7d"],[0.2,"#de77ae"],[0.3,"#f1b6da"],[0.4,"#fde0ef"],[0.5,"#f7f7f7"],[0.6,"#e6f5d0"],[0.7,"#b8e186"],[0.8,"#7fbc41"],[0.9,"#4d9221"],[1,"#276419"]]},"xaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","automargin":true,"zerolinewidth":2},"yaxis":{"gridcolor":"#EBF0F8","linecolor":"#EBF0F8","ticks":"","title":{"standoff":15},"zerolinecolor":"#EBF0F8","automargin":true,"zerolinewidth":2},"scene":{"xaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8","gridwidth":2},"yaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8","gridwidth":2},"zaxis":{"backgroundcolor":"white","gridcolor":"#DFE8F3","linecolor":"#EBF0F8","showbackground":true,"ticks":"","zerolinecolor":"#EBF0F8","gridwidth":2}},"shapedefaults":{"line":{"color":"#2a3f5f"}},"annotationdefaults":{"arrowcolor":"#2a3f5f","arrowhead":0,"arrowwidth":1},"geo":{"bgcolor":"white","landcolor":"white","subunitcolor":"#C8D4E3","showland":true,"showlakes":true,"lakecolor":"white"},"title":{"x":0.05},"mapbox":{"style":"light"}},"data":{"histogram2dcontour":[{"type":"histogram2dcontour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"choropleth":[{"type":"choropleth","colorbar":{"outlinewidth":0,"ticks":""}}],"histogram2d":[{"type":"histogram2d","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"heatmap":[{"type":"heatmap","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"contourcarpet":[{"type":"contourcarpet","colorbar":{"outlinewidth":0,"ticks":""}}],"contour":[{"type":"contour","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"surface":[{"type":"surface","colorbar":{"outlinewidth":0,"ticks":""},"colorscale":[[0.0,"#0d0887"],[0.1111111111111111,"#46039f"],[0.2222222222222222,"#7201a8"],[0.3333333333333333,"#9c179e"],[0.4444444444444444,"#bd3786"],[0.5555555555555556,"#d8576b"],[0.6666666666666666,"#ed7953"],[0.7777777777777778,"#fb9f3a"],[0.8888888888888888,"#fdca26"],[1.0,"#f0f921"]]}],"mesh3d":[{"type":"mesh3d","colorbar":{"outlinewidth":0,"ticks":""}}],"scatter":[{"fillpattern":{"fillmode":"overlay","size":10,"solidity":0.2},"type":"scatter"}],"parcoords":[{"type":"parcoords","line":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolargl":[{"type":"scatterpolargl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"bar":[{"error_x":{"color":"#2a3f5f"},"error_y":{"color":"#2a3f5f"},"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"bar"}],"scattergeo":[{"type":"scattergeo","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterpolar":[{"type":"scatterpolar","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"histogram":[{"marker":{"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"histogram"}],"scattergl":[{"type":"scattergl","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatter3d":[{"type":"scatter3d","line":{"colorbar":{"outlinewidth":0,"ticks":""}},"marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattermap":[{"type":"scattermap","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattermapbox":[{"type":"scattermapbox","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scatterternary":[{"type":"scatterternary","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"scattercarpet":[{"type":"scattercarpet","marker":{"colorbar":{"outlinewidth":0,"ticks":""}}}],"carpet":[{"aaxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"baxis":{"endlinecolor":"#2a3f5f","gridcolor":"#C8D4E3","linecolor":"#C8D4E3","minorgridcolor":"#C8D4E3","startlinecolor":"#2a3f5f"},"type":"carpet"}],"table":[{"cells":{"fill":{"color":"#EBF0F8"},"line":{"color":"white"}},"header":{"fill":{"color":"#C8D4E3"},"line":{"color":"white"}},"type":"table"}],"barpolar":[{"marker":{"line":{"color":"white","width":0.5},"pattern":{"fillmode":"overlay","size":10,"solidity":0.2}},"type":"barpolar"}],"pie":[{"automargin":true,"type":"pie"}]}};

      // if jsonData.layout exists, then update the theme
      if (jsonData.layout) {
        if (jsonData.layout.template) {
          jsonData.layout.template = { ...plotlyLightLayout, ...jsonData.layout.template };
        } else {
          jsonData.layout.template = plotlyLightLayout;
        }
      } else {
        jsonData.layout = { template: plotlyLightLayout };
      }
    }

    Plotly.relayout(elem, jsonData.layout);
  });
};

let setVegaLiteTheme = (theme) => {
  document.querySelectorAll(".vega-lite").forEach((elem) => {
    // Get the code block content from previous element, since it is the vega lite code itself as defined in Markdown, but it is hidden
    let jsonData = elem.previousSibling.childNodes[0].innerHTML;
    elem.innerHTML = "";
    if (theme === "dark") {
      vegaEmbed(elem, JSON.parse(jsonData), { theme: "dark" });
    } else {
      vegaEmbed(elem, JSON.parse(jsonData));
    }
  });
};

let setSearchTheme = (theme) => {
  const ninjaKeys = document.querySelector("ninja-keys");
  if (!ninjaKeys) return;

  if (theme === "dark") {
    ninjaKeys.classList.add("dark");
  } else {
    ninjaKeys.classList.remove("dark");
  }
};

let setCookieConsentTheme = (theme) => {
  // Sync cookie consent modal with site's theme
  // The cookie consent library supports dark mode via the cc--darkmode class
  var htmlElement = document.documentElement;

  if (theme === "dark") {
    htmlElement.classList.add("cc--darkmode");
  } else {
    htmlElement.classList.remove("cc--darkmode");
  }
};

let transTheme = () => {
  const html = document.documentElement;

  // 立即添加过渡类
  html.classList.add("transition");

  // 使用 requestAnimationFrame 替代强制重排
  requestAnimationFrame(() => {
    // 移除过渡类（与 CSS 过渡时间匹配）
    window.setTimeout(() => {
      html.classList.remove("transition");
    }, 250);
  });
};

// Determine the expected state of the theme toggle, which can be "dark", "light", or
// "system". Default is "system".
let determineThemeSetting = () => {
  let themeSetting = localStorage.getItem("theme");
  if (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") {
    themeSetting = "system";
  }
  return themeSetting;
};

// Determine the computed theme, which can be "dark" or "light". If the theme setting is
// "system", the computed theme is determined based on the user's system preference.
let determineComputedTheme = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting == "system") {
    const userPref = window.matchMedia;
    if (userPref && userPref("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  } else {
    return themeSetting;
  }
};

let initTheme = () => {
  let themeSetting = determineThemeSetting();

  setThemeSetting(themeSetting);

  // Add event listener to the theme toggle button.
  document.addEventListener("DOMContentLoaded", function () {
    const mode_toggle = document.getElementById("light-toggle");
    if (mode_toggle) {
      mode_toggle.addEventListener("click", function () {
        toggleThemeSetting();
      });
    }

    // Ensure icons are updated after DOM is ready (prevents double icons)
    // 图标可见性由 CSS 属性选择器驱动，此处无需 JS 介入。
  });

  // Add event listener to the system theme preference change.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
    applyTheme();
  });
};

// 图标可见性由 CSS 属性选择器驱动（见 _navbar.scss #light-toggle 段），
// 根据 data-theme-setting 显示 system/dark/light 对应图标，无需 JS 介入。

// Get the appropriate background color for Google Calendar based on current theme
let getCalendarBgColor = () => {
  let theme = determineComputedTheme();
  return theme === "dark" ? "333333" : "f9f9f9";
};

// Get the Google Calendar embed URL with the correct background color
let getCalendarUrl = (calendarId, timezone = "UTC") => {
  const baseUrl = "https://calendar.google.com/calendar/embed";
  const params = new URLSearchParams({
    src: calendarId,
    ctz: timezone,
    mode: "WEEK",
    showTitle: "0",
    showPrint: "0",
    showCalendars: "0",
    showTabs: "0",
    bgcolor: getCalendarBgColor(),
  });
  return `${baseUrl}?${params.toString()}`;
};

// Update the calendar iframe src to apply theme changes
let updateCalendarUrl = () => {
  const iframe = document.getElementById("calendar-iframe");
  if (iframe && iframe.dataset.calendarId) {
    iframe.src = getCalendarUrl(iframe.dataset.calendarId, iframe.dataset.timezone || "UTC");
  }
};
