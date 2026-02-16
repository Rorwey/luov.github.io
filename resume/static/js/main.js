document.addEventListener('DOMContentLoaded', () => {
    // 1. 确定当前语言
    const isCn = document.body.classList.contains('lang-cn');
    const lang = isCn ? 'cn' : 'en';

    // 2. 渲染基础信息 (Info)
    renderInfo(lang);

    // 3. 渲染各个板块
    renderNews(lang);
    renderEducation(lang);
    renderPublications(lang);
    renderAwards(lang);
    renderServices(lang);

    // 更新页脚年份
    document.getElementById("year").innerText = new Date().getFullYear();
});

// === 渲染基础信息 ===
function renderInfo(lang) {
    const info = resumeData.info;
    document.title = `${info.name[lang]} | ${info.title[lang]}`;
    
    // 文本填充
    setText('my-name', info.name[lang]);
    setText('my-title', info.title[lang]);
    setText('my-bio', info.bio[lang]); // 如果为空会自动隐藏容器（前提是容器为空）
    
    // 头像
    const avatar = document.getElementById('my-avatar');
    if (avatar && info.avatar) avatar.src = info.avatar;

    // 链接处理
    setLink('link-email', `mailto:${info.email}`, info.email, info.links.email);
    setLink('link-github', info.homepage, info.config.githubUser, info.links.github);
    setLink('link-scholar', info.scholar, "Google Scholar", info.links.scholar);
    
    // 个人主页特殊处理 (显示文本不同)
    const homeEl = document.getElementById('link-homepage');
    if (homeEl) {
        if (!info.links.homepage) homeEl.style.display = 'none';
        else {
            homeEl.href = info.homepage;
            homeEl.innerHTML = `<i class="fas fa-link"></i> ${info.homepageDisplay[lang]}`;
        }
    }
}

// === 自动生成 News ===
function renderNews(lang) {
    const container = document.getElementById('news-list');
    const section = document.getElementById('section-news');
    if (!container || !section) return;

    const currentYear = new Date().getFullYear();
    const thresholdYear = currentYear - 1; // 今年和去年
    
    let newsItems = [];

    // 1. 收集论文
    resumeData.publications.forEach(pub => {
        if (pub.year >= thresholdYear && shouldDisplay(pub, lang)) {
            const venue = pub.venue[lang] || pub.venue['en'];
            const text = isLangCn(lang) 
                ? `论文 "<strong>${pub.title}</strong>" 被 ${venue} 录用。`
                : `Paper "<strong>${pub.title}</strong>" was accepted by ${venue}.`;
            newsItems.push({ year: pub.year, html: text, sortWeight: 10 });
        }
    });

    // 2. 收集奖项
    resumeData.awards.forEach(award => {
        // 处理年份范围，取最后一年 "2013-2016" -> 2016
        const yStr = String(award.year);
        const yNum = parseInt(yStr.match(/\d{4}$/)?.[0] || yStr);
        
        if (yNum >= thresholdYear && shouldDisplay(award, lang)) {
            const name = award.name[lang] || award.name['cn']; // 奖项回退到中文
            if (name) {
                const text = isLangCn(lang)
                    ? `获得 ${name}。`
                    : `Received ${name}.`;
                newsItems.push({ year: yNum, html: text, sortWeight: 5 });
            }
        }
    });

    // 3. 收集服务
    resumeData.services.forEach(svc => {
         const yStr = String(svc.year);
         const yNum = parseInt(yStr.match(/\d{4}$/)?.[0] || yStr);
         if (yNum >= thresholdYear && shouldDisplay(svc, lang)) {
             newsItems.push({ year: yNum, html: svc.content[lang], sortWeight: 1 });
         }
    });

    // 排序：年份倒序 -> 权重倒序
    newsItems.sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        return b.sortWeight - a.sortWeight;
    });

    if (newsItems.length === 0) {
        section.style.display = 'none'; // 没有新闻隐藏整个版块
        return;
    }

    container.innerHTML = newsItems.map(item => 
        `<li><span class="badge" style="margin-left:0; margin-right:8px">${item.year}</span>${item.html}</li>`
    ).join('');
}

// === 渲染论文 (核心难点) ===
function renderPublications(lang) {
    const container = document.getElementById('pub-list');
    if (!container) return;

    let html = '';
    resumeData.publications.forEach(pub => {
        if (!shouldDisplay(pub, lang)) return;

        const printClass = getPrintClass(pub.print, lang);
        const venue = pub.venue[lang] || pub.venue['en'];
        
        // 标签处理
        const tagsHtml = (pub.tags || []).map(t => 
            `<span class="badge ${t.highlight ? 'highlight' : ''}">${t.text}</span>`
        ).join('');

        // 作者处理 (核心截断逻辑)
        const authorHtml = formatAuthors(pub.authors, lang);

        html += `
        <div class="pub-item list-item ${printClass}">
            <div class="pub-title">${pub.title}</div>
            <div class="pub-meta">
                ${authorHtml}.
                <span class="pub-venue">${venue}</span>, ${pub.year}.
                ${tagsHtml}
                ${pub.link ? `<a href="${pub.link}" class="no-print" style="margin-left:5px"><i class="fas fa-external-link-alt"></i></a>` : ''}
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

// === 作者截断逻辑实现 ===
function formatAuthors(authors, lang) {
    if (!authors || authors.length === 0) return "";

    const limit = 3;
    const isCn = isLangCn(lang);
    const etAlText = isCn ? " 等" : " <em>et al.</em>";
    
    // 寻找“我”的位置
    const meIndex = authors.findIndex(a => a.isMe);
    
    let displayList = [];
    let appendEtAl = false;

    // 情况 1: 总人数少于等于限制 -> 显示全部
    if (authors.length <= limit) {
        displayList = authors;
        // 如果数据里最后一个作者不是显式的 "et al." 且实际还有更多人(虽此处不应该)，
        // 一般不做处理，除非数据源最后一条就是 "et al" 对象
    } 
    // 情况 2: 人数 > 3
    else {
        // 子情况 A: 我在前三位 -> 显示前三 + et al
        if (meIndex !== -1 && meIndex < limit) {
            displayList = authors.slice(0, limit);
            appendEtAl = true;
        } 
        // 子情况 B: 我不在前三，但是我是通讯作者 -> 显示前二 + 省略号 + 我
        else if (meIndex !== -1 && authors[meIndex].isCorresp) {
            displayList = [authors[0], authors[1]];
            displayList.push({ isEllipsis: true }); // 标记为省略号
            displayList.push(authors[meIndex]);
            
            // 如果我不是最后一位，后面还得加 et al
            if (meIndex < authors.length - 1) {
                appendEtAl = true;
            }
        } 
        // 子情况 C: 既不在前三也不是通讯 -> 默认截断 (前三 + et al)
        else {
            displayList = authors.slice(0, limit);
            appendEtAl = true;
        }
    }

    // 生成 HTML 字符串
    const namesHtml = displayList.map(a => {
        if (a.isEllipsis) return " ...";
        
        let name = isCn ? (a.name_cn || a.name) : a.name;
        
        // 样式处理
        if (a.isMe && a.highlight) {
            if (a.highlight.includes('bold')) name = `<span class="me-bold">${name}</span>`;
            if (a.highlight.includes('underline')) name = `<span class="me-underline">${name}</span>`;
        }
        
        // 通讯作者图标
        if (a.isCorresp) {
            name += `<i class="fas fa-envelope corresp-icon"></i>`;
        }
        
        return name;
    }).join(", ");

    return namesHtml + (appendEtAl ? etAlText : "");
}

// === 渲染奖项 ===
function renderAwards(lang) {
    const container = document.getElementById('award-list');
    const section = document.getElementById('section-awards');
    if (!container || !section) return;

    let hasItem = false;
    let html = '';

    resumeData.awards.forEach(item => {
        if (!shouldDisplay(item, lang)) return;
        hasItem = true;

        const name = item.name[lang] || item.name['cn'];
        // 图标处理
        const iconClass = item.iconClass || "icon-default";
        const iconHtml = `<i class="fas fa-${item.icon} ${iconClass}"></i>`;
        const printClass = getPrintClass(item.print, lang);

        html += `
        <div class="award-item ${printClass}">
            <div class="award-icon-box">${iconHtml}</div>
            <div class="award-text">
                ${name}
                <span class="award-year">${item.year}</span>
            </div>
        </div>`;
    });

    if (!hasItem) section.style.display = 'none';
    else container.innerHTML = html;
}

// === 渲染教育 & 服务 (简化版) ===
function renderEducation(lang) { /* ... 逻辑类似，略，可根据 data 结构填充 ... */ }
function renderServices(lang) { /* ... 逻辑类似，填充到 service-list ... */ }


// === 通用辅助函数 ===
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) {
        if (!text) el.style.display = 'none'; // 内容为空则隐藏
        else el.innerText = text;
    }
}
function setLink(id, href, text, isVisible) {
    const el = document.getElementById(id);
    if (el) {
        if (!isVisible || !href) el.style.display = 'none';
        else {
            el.href = href;
            // 保留图标，只替换文本节点
            const icon = el.querySelector('i');
            el.innerHTML = '';
            if (icon) el.appendChild(icon);
            el.append(" " + text);
        }
    }
}
function isLangCn(lang) { return lang === 'cn'; }
function shouldDisplay(item, currentLang) {
    const mode = item.displayIn || 'all';
    if (mode === 'all') return true;
    return mode === currentLang;
}
function getPrintClass(printConfig, lang) {
    if (!printConfig) return ""; // 默认打印显示
    const canPrint = printConfig[lang] !== false; // 默认为 true
    return canPrint ? "" : "print-hide";
}