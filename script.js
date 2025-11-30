/**
 * 网站配置数据中心 (Configuration)
 */
const websiteConfig = {
    header: {
        logoUrl: "./photos/logo.png", 
        mainTitle: "郭子禾の个人主页",
        subTitle: "H-Studio",
        userIconPath: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
        userCenterUrl: "#"
    },
    // 主页 Hero
    hero: {
        backgroundUrl: "./photos/hero.jpeg",
        title: "郭子禾の个人主页",
        subtitle: "Innovate. Create. Learn."
    },
    // 主页模块 (三个)
    modules: [
        {
            id: "tech-section",
            className: "module-tech",
            title: "探索前沿科技",
            bg: "./photos/tech.jpeg",
            link: "detail-tech.html?type=tech"
        },
        {
            id: "learning-section",
            className: "module-learning",
            title: "知识殿堂",
            bg: "./photos/learn.jpeg",
            link: "detail-learn.html?type=learn"
        },
        {
            id: "tutu-section",
            className: "module-tutu",
            title: "图图の个人主页",
            bg: "./photos/tutu.jpg",
            link: "./oldweb/tutu.html"
        }
    ],

works: Array(6).fill({
    img: "./photos/tech1.jpg",
    title: "title",
    description: "description"
}),


    footer: {
        oldLink: { text: "点击跳转老版网页 >", url: "./oldweb/oldweb.html" },
        copyright: "Copyright © 西禾北木科技有限公司版权所有",
        icp: { text: "京ICP备2022002335号-3", url: "https://beian.miit.gov.cn/#/Integrated/index" }
    }
};

/**
 * 初始化逻辑
 */
document.addEventListener('DOMContentLoaded', () => {
    renderCommonElements();
    
    // 路由判断：主页
    if (document.getElementById('modules-container')) {
        renderHomePage();
    }
    
    // 路由判断：详情页
    if (document.getElementById('works-grid')) {
        renderDetailPage();
    }

    initScrollAnimations();
});

// 1. 渲染通用元素 (导航 + 页脚)
function renderCommonElements() {
    // 渲染 Logo
    const logoEl = document.getElementById('nav-logo');
    if (logoEl) logoEl.innerHTML = `<img src="${websiteConfig.header.logoUrl}" alt="Logo">`;

    // 渲染标题 (详情页可能已经硬编码了部分文字，所以要做检查)
    const mainTitle = document.getElementById('nav-title-main');
    const subTitle = document.getElementById('nav-title-sub');
    if (mainTitle && !mainTitle.textContent) mainTitle.textContent = websiteConfig.header.mainTitle;
    if (subTitle && !subTitle.textContent) subTitle.textContent = websiteConfig.header.subTitle;
    
    // 渲染用户图标
    const userLink = document.getElementById('nav-user-icon');
    if (userLink) {
        userLink.href = websiteConfig.header.userCenterUrl;
        userLink.innerHTML = `<svg viewBox="0 0 24 24"><path d="${websiteConfig.header.userIconPath}"/></svg>`;
    }

    // 渲染页脚
    const oldLink = document.getElementById('footer-old-link');
    if(oldLink) { oldLink.textContent = websiteConfig.footer.oldLink.text; oldLink.href = websiteConfig.footer.oldLink.url; }
    
    const copyText = document.getElementById('footer-copy-text');
    if(copyText) copyText.textContent = websiteConfig.footer.copyright;

    const icpLink = document.getElementById('footer-icp-link');
    if(icpLink) { icpLink.textContent = websiteConfig.footer.icp.text; icpLink.href = websiteConfig.footer.icp.url; }
}

// 2. 渲染主页独有内容
function renderHomePage() {
    // Hero 区域
    const heroTitle = document.getElementById('hero-title');
    const heroSub = document.getElementById('hero-subtitle');
    const heroBg = document.getElementById('hero-bg');
    
    if(heroTitle) heroTitle.textContent = websiteConfig.hero.title;
    if(heroSub) heroSub.textContent = websiteConfig.hero.subtitle;
    if(heroBg) heroBg.style.backgroundImage = `url('${websiteConfig.hero.backgroundUrl}')`;

    // 模块区域
    const container = document.getElementById('modules-container');
    websiteConfig.modules.forEach(mod => {
        const section = document.createElement('section');
        // 添加 reveal-on-scroll 实现滚动淡入
        // 添加 mod.className (如 module-tech) 实现特定的悬停特效
        section.className = `module-section ${mod.className} reveal-on-scroll`;
        section.id = mod.id;

        section.innerHTML = `
            <div class="bg-layer" style="background-image: url('${mod.bg}');"></div>
            <div class="overlay"></div>
            <div class="content-layer">
                <h2 class="module-title">${mod.title}</h2>
            </div>
        `;

        section.addEventListener('click', () => {
            window.open(mod.link, '_blank');
        });

        container.appendChild(section);
    });
}

// 3. 渲染详情页独有内容
function renderDetailPage() {
    const grid = document.getElementById('works-grid');
    websiteConfig.works.forEach(work => {
        const card = document.createElement('div');
        // reveal-on-scroll 让卡片滚动时逐个浮现
        card.className = 'work-card reveal-on-scroll';
        
        card.innerHTML = `
            <div class="work-card-img" style="background-image: url('${work.img}');"></div>
            <div class="work-card-text">
                <div class="work-card-title-bar">${work.title}</div>
                <div class="work-card-desc-bar">${work.description || ''}</div>
            </div>
        `;
        
        // 点击卡片 (示例)
        card.addEventListener('click', () => {
            console.log("Details clicked");
        });

        grid.appendChild(card);
    });
}
/*
function renderDetailPage() {
    const grid = document.getElementById('works-grid');
    if (!grid) return;

    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    const works = websiteConfig.detailWorks[type] || [];

    works.forEach(work => {
        const card = document.createElement('div');
        card.className = "work-card reveal-on-scroll";

        card.innerHTML = `
            <div class="work-card-img" style="background-image: url('${work.img}')"></div>
            <div class="work-card-text">
                <h3>${work.title}</h3>
            </div>
        `;
        grid.appendChild(card);
    });
}
*/

// 4. 滚动动画控制器 (Scroll Observer)
function initScrollAnimations() {
    const navbar = document.getElementById('navbar');

    // 导航栏滚动模糊效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // 元素进入视口淡入效果
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // CSS 中 .active 触发 transform/opacity
            }
        });
    }, { threshold: 0.1 }); // 露出 10% 时触发

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}
