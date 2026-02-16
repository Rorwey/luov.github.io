// static/js/render.js
(function() {
    const currentLang = document.documentElement.lang === 'zh-CN' ? 'cn' : 'en';
    const d = resumeData;

    function getText(obj, forceEn = false) {
        if (!obj) return "";
        if (typeof obj === 'string') return obj;
        if (forceEn) return obj.en || obj.cn || ""; 
        return obj[currentLang] || obj[currentLang === 'cn' ? 'en' : 'cn'] || "";
    }

    // 格式化日期为年月（用于News显示）
    function formatYearMonth(dateStr) {
        if (!dateStr) return "";
        // 兼容 "2025.02" 或 "2025.02.28" 格式
        const parts = dateStr.split('.');
        if (parts.length >= 2) {
            return `${parts[0]}.${parts[1]}`;
        }
        return dateStr;
    }

    // 格式化年份 (keepMonth=true用于教育经历)
    function formatYear(dateStr, keepMonth = false) {
        if (!dateStr) return "";
        if(dateStr.includes('-')) {
            const parts = dateStr.split('-');
            const start = keepMonth ? parts[0] : parts[0].split('.')[0];
            let endStr = parts[1].trim();
            // 处理 Present/至今
            if (endStr.toLowerCase() === 'present' || endStr === '至今') {
                endStr = currentLang === 'cn' ? '至今' : 'Present';
            } else {
                endStr = keepMonth ? endStr : endStr.split('.')[0];
            }
            return `${start} - ${endStr}`;
        }
        return keepMonth ? dateStr : dateStr.split('.')[0];
    }

    function shouldShow(item) {
        if (!item.displayIn) return true;
        return item.displayIn[currentLang];
    }

    // 渲染 Tags (通用 + 学校Tag支持)
    function renderTags(tags) {
        if (!tags || tags.length === 0) return "";
        
        // 筛选逻辑
        const topTier = tags.filter(t => ["SCI", "CCF"].includes(t.type));
        const midTier = tags.filter(t => t.type === "EI");
        // 学校Tag通常没有type，或者level包含特定关键词
        const schoolTier = tags.filter(t => t.level?.includes("985") || t.level?.includes("211") || t.en?.includes("Project") || t.level?.includes("原"));
        
        // 论文Tags逻辑：只取最高级
        let pubTags = topTier.length > 0 ? topTier : (midTier.length > 0 ? midTier : []);
        // 如果是论文Tag渲染调用，通常不包含schoolTier；如果是教育渲染调用，则全是schoolTier
        
        // 合并所有要显示的Tags
        const allTagsToRender = [...pubTags, ...schoolTier];

        return allTagsToRender.map(tag => {
            if(!shouldShow(tag)) return "";

            // 学校 Tag 特殊样式
            if(tag.level?.includes("985") || tag.level?.includes("211") || tag.en?.includes("Project") || tag.level?.includes("原")) {
                 return `<span class="badge school-tag">${getText(tag)}</span>`;
            }

            // 论文 Tag 样式
            const isHigh = ["SCI", "CCF"].includes(tag.type) && ["Q1", "Q2", "A", "B"].includes(tag.level);
            const className = isHigh ? "badge highlight" : "badge";
            const text = `${tag.type} ${tag.level}`.trim();
            return `<span class="${className}">${text}</span>`;
        }).join("");
    }

    function renderAuthors(authors, forceEnglish = false) {
        if (!authors || authors.length === 0) return "";
        const myIndex = authors.findIndex(a => a.isMe);
        const maxDisplay = 3;
        let displayList = [];
        let suffix = "";

        if (myIndex < maxDisplay) {
            displayList = authors.slice(0, maxDisplay);
            if (authors.length > maxDisplay) suffix = " <i>et al.</i>";
        } else {
            displayList = authors.slice(0, 2);
            displayList.push({ isEllipsis: true });
            displayList.push(authors[myIndex]);
            if (myIndex < authors.length - 1) suffix = " <i>et al.</i>";
        }

        return displayList.map(author => {
            if (author.isEllipsis) return "...";
            // forceEnglish 为 true 时，忽略 name_cn
            let nameObj = author.name_cn ? {cn: author.name_cn, en: author.name} : {en: author.name};
            let name = getText(nameObj, forceEnglish);
            
            let html = name;
            if (author.isMe) {
                let classes = "me-bold";
                if (author.highlight) classes += " me-underline";
                html = `<span class="${classes}">${name}</span>`;
            }
            if (author.isCorresp) html += `<i class="fas fa-envelope corresp-icon"></i>`;
            if (author.coFirst) html += `<sup style="margin-left:1px">*</sup>`;
            return html;
        }).join(", ") + suffix;
    }

    function render() {
        const info = d.info;
        
        // 1. Header
        document.getElementById('avatar-img').src = info.avatar;
        const displayName = currentLang === 'en' ? `${info.name.en} <span style="font-weight:400; font-size:0.8em;">(${info.name.cn})</span>` : info.name.cn;
        
        // 社交链接渲染逻辑：只要有链接就显示图标，class 控制打印文字
        const renderLink = (key, iconClass, text, isUrl = true) => {
            const val = info[key] || d.config[key + 'User'] || d.config[key + 'Id']; // 兼容写法
            // 实际取值：
            let url = "";
            let displayTxt = "";
            
            if (key === 'email') { url = `mailto:${info.email}`; displayTxt = info.email; }
            else if (key === 'homepage') { url = info.homepage; displayTxt = getText(info.homepageDisplay); }
            else if (key === 'github') { url = `https://github.com/${d.config.githubUser}`; displayTxt = "Github"; }
            else if (key === 'scholar') { url = `https://scholar.google.com/citations?user=${d.config.scholarId}`; displayTxt = "Google Scholar"; }
            
            // 只有当有值时才渲染
            // info.links[key] 控制的是“打印时是否显示文本”，而不是“屏幕是否显示图标”
            // 屏幕上永远显示图标
            if (!url || url.includes('undefined')) return '';
            
            const showPrintClass = info.links[key] ? 'show-print' : '';
            return `<a href="${url}" target="_blank"><i class="${iconClass}"></i> <span class="link-text ${showPrintClass}">${displayTxt}</span></a>`;
        };

        document.getElementById('header-content').innerHTML = `
            <h1>${displayName}</h1>
            <div class="bio-text">${getText(info.bio)}</div>
            <div class="header-meta-row">
                <div class="meta-left">
                    <span style="font-weight:700; color:#000;">${getText(info.title)}</span>
                    ${info.tags.map(tag => {
                        if(!shouldShow(tag)) return '';
                        return `<span class="badge" style="${tag.style||''}"><i class="${tag.iconClass}"></i>${getText(tag)}</span>`;
                    }).join('')}
                </div>
                <div class="meta-right contact-links">
                    ${renderLink('email', 'fas fa-envelope')}
                    ${renderLink('homepage', 'fas fa-globe')}
                    ${renderLink('github', 'fab fa-github')}
                    ${renderLink('scholar', 'fas fa-graduation-cap')}
                </div>
            </div>
        `;
        
        const navLogo = document.querySelector('.nav-logo');
        if(navLogo) navLogo.innerText = currentLang === 'cn' ? info.name.cn : info.name.en;

        // 2. News 
        const newsList = [];
        const now = new Date();
        const monthLimit = 13;
        function checkRecent(dateStr) {
             if(!dateStr) return false;
             let parts = dateStr.split('.');
             let y = parseInt(parts[0]), m = parseInt(parts[1]) - 1;
             let itemDate = new Date(y, m, 1);
             let diff = (now.getFullYear() - itemDate.getFullYear()) * 12 + (now.getMonth() - itemDate.getMonth());
             return diff >= 0 && diff <= monthLimit;
        }

        d.publications.forEach(p => {
            if(checkRecent(p.year) && shouldShow(p)) {
                const venueName = p.venue.en || p.venue.cn;
                // 只有中文环境且有中文venue才显示中文描述
                const isCnContext = currentLang === 'cn' && !!p.venue.cn;
                const text = isCnContext
                    ? `论文 "<strong>${p.title}</strong>" 被 ${venueName} 录用。`
                    : `Paper "<strong>${p.title}</strong>" accepted by ${venueName}.`;
                newsList.push({ date: p.year, html: text });
            }
        });
        d.awards.forEach(a => {
            if(checkRecent(a.year) && shouldShow(a)) {
                const text = currentLang === 'cn' ? `获得 ${getText(a.name)}。` : `Awarded ${getText(a.name)}.`;
                newsList.push({ date: a.year, html: text });
            }
        });
        const newsSection = document.getElementById('news-section');
        if(newsList.length > 0) {
            newsList.sort((a,b) => b.date.localeCompare(a.date));
            document.getElementById('news-container').innerHTML = newsList.map(n => `
                <div class="news-item">
                    <span class="news-date">${formatYearMonth(n.date)}</span>
                    <span>${n.html}</span>
                </div>
            `).join('');
            newsSection.classList.remove('hidden');
        } else {
            newsSection.classList.add('hidden');
        }

        // 3. Education (保留月份 + School Tags)
        document.getElementById('edu-list').innerHTML = d.education.map(edu => `
            <div class="list-item edu-item">
                <div class="edu-header">
                    <div>
                        <span class="edu-school">${getText(edu.school)}</span>
                        ${edu.tags ? renderTags(edu.tags) : ''} 
                        <span style="margin-left:8px; font-weight:normal; color:#444;">${getText(edu.degree)}</span>
                    </div>
                    <div class="edu-time">${formatYear(edu.time, true)}</div>
                </div>
                <div class="edu-details">
                    <span><i class="fas fa-laptop-code"></i> ${getText(edu.major)}</span>
                    ${edu.advisor ? `<span><i class="fas fa-chalkboard-teacher"></i> ${currentLang==='cn'?'导师':'Advisor'}: <a href="${edu.advisor.link}" target="_blank">${currentLang==='cn'?edu.advisor.name_cn:edu.advisor.name_en}</a></span>` : ''}
                    ${edu.focus ? `<span><i class="fas fa-crosshairs"></i> ${currentLang==='cn'?'方向':'Focus'}: ${getText(edu.focus)}</span>` : ''}
                </div>
                ${getText(edu.detail) ? `<div style="margin-top:5px; font-size:0.9rem; color:#666;">${getText(edu.detail)}</div>` : ''}
            </div>
        `).join('');

        // 4. Publications (强制英文逻辑)
        document.getElementById('pub-list').innerHTML = d.publications.map(pub => {
            if(!shouldShow(pub)) return '';
            
            // 如果 venue.cn 不存在，说明是纯英文期刊/会议，作者强制英文
            const forceEnglishAuthors = !pub.venue.cn; 
            const venueName = pub.venue.en || pub.venue.cn;

            return `
            <div class="pub-item">
                <div class="pub-title-row">
                    <span class="pub-title">${pub.title}</span>
                    <a href="${pub.link}" target="_blank" class="print-hide"><i class="fas fa-external-link-alt" style="font-size:0.85rem; color:#999;"></i></a>
                </div>
                <div class="pub-meta-row">
                    ${renderAuthors(pub.authors, forceEnglishAuthors)}
                    <span class="pub-venue">${venueName}</span>
                    ${renderTags(pub.tags)}
                </div>
            </div>`;
        }).join('');

        // 5. Awards
        const graduateAwards = [];
        const undergradAwards = [];
        d.awards.forEach(a => {
            if(!shouldShow(a)) return;
            const yearVal = parseInt(a.year.split('.')[0]);
            if (yearVal >= 2017) graduateAwards.push(a);
            else undergradAwards.push(a);
        });
        const renderAwardItem = (award) => {
             const iconMap = { "star": "fas fa-star", "trophy": "fas fa-trophy", "medal": "fas fa-medal", "award": "fas fa-award", "graduation-cap": "fas fa-graduation-cap" };
             const iconClass = iconMap[award.icon] || 'fas fa-award';
             const colorClass = award.iconClass === 'party-red' ? 'party-red' : 'icon-default';
             return `
                <div class="award-item">
                    <div class="award-icon-box"><i class="${iconClass} ${colorClass}"></i></div>
                    <div class="award-content">
                        <span class="award-name">${getText(award.name)}</span>
                        <span class="award-year">${formatYear(award.year, false)}</span>
                    </div>
                </div>
             `;
        };
        let awardHTML = '';
        if(graduateAwards.length > 0) {
            awardHTML += `<div class="award-section-title">${currentLang==='cn' ? '研究生阶段 (Ph.D. & Master)' : 'Graduate Stage'}</div>`;
            awardHTML += `<div class="award-list">${graduateAwards.sort((a,b)=>b.year.localeCompare(a.year)).map(renderAwardItem).join('')}</div>`;
        }
        if(undergradAwards.length > 0) {
            awardHTML += `<div class="award-section-title">${currentLang==='cn' ? '本科阶段 (Bachelor)' : 'Undergraduate Stage'}</div>`;
            awardHTML += `<div class="award-list">${undergradAwards.sort((a,b)=>b.year.localeCompare(a.year)).map(renderAwardItem).join('')}</div>`;
        }
        document.getElementById('award-container').innerHTML = awardHTML;

        // 6. Service
        document.getElementById('service-list').innerHTML = d.services.map(cat => `
            <div class="list-item">
                <div style="font-weight:700; margin-bottom:5px;">${getText(cat.title)}</div>
                <ul class="service-list">
                    ${cat.items.map(item => {
                         if(!shouldShow(item)) return '';
                         return `<li>${getText(item.content)}</li>`;
                    }).join('')}
                </ul>
            </div>
        `).join('');

        // Footer
        const year = new Date().getFullYear();
        const updateText = currentLang === 'cn' ? '最后更新' : 'Last Update';
        document.getElementById('footer-content').innerHTML = `
            &copy; ${year} LuoV | ${updateText}: ${d.config.lastUpdate}
        `;
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
    else render();
})();