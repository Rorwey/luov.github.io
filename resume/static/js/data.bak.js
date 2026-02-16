const resumeData = {
  // === 基础配置 ===
  config: {
    githubUser: "rorwey",
    scholarId: "RImdKpAAAAAJ",
    lastUpdate: "2026.01.04",
  },

  // === 个人信息 ===
  info: {
    name: { en: "Wei Luo", cn: "罗威" },
    title: { en: "Ph.D. Student", cn: "博士研究生" },
    // 头像链接
    avatar:
      "https://cdn.jsdelivr.net/gh/Rorwey/ImgsHome@main/20220612/avatar.6ev9ip3ahuk0.webp",
    // 简介：中文设为 null 则不显示
    bio: {
      en: "I am currently a Ph.D. Student at Central South University (CSU), advised by Assoc. Prof. Deyu Zhang. My research interests lie in Computer Vision and Edge Computing.",
      cn: "我是中南大学的博士研究生，师从张德宇副教授。我的研究方向集中在计算机视觉和边缘计算领域。",
    },
    tags: [{
      cn: "中共党员",
      iconClass: "icon-party",
      print: { en: false, cn: true },
      displayIn: { en: false, cn: true },
    }],
    email: "rorwey@foxmail.com",
    homepage: "https://luov.top",
    homepageDisplay: { en: "LuoV.top", cn: "luov.top" },
    // 社交链接可见性
    links: {
      github: false,
      scholar: false,
      email: true,
      homepage: true,
    },
  },

  // === 教育经历 (示例) ===
  education: [
    {
      school: { en: "Central South University", cn: "中南大学" ,tags: [{level: "原985",print: { en: false, cn: true },displayIn: { en: false, cn: true }}] },
      degree: { en: "Ph.D. Student", cn: "博士研究生" },
      major: { en: "Computer Science and Technology", cn: "计算机科学与技术" },
      time: "2020.09 - Present",
      advisor: {
        name_en: "Assoc. Prof. Deyu Zhang",
        name_cn: "张德宇 副教授",
        link: "https://faculty.csu.edu.cn/zhangdeyu/zh_CN/index.htm",
      },
      focus: [
        { en: "Computer Vision", cn: "计算机视觉" },
        { en: "Human Action Recognition", cn: "人体动作识别" },
        { en: "Edge Video Analysis", cn: "边缘视频分析" },
      ],
    },
    {
      school: { en: "Nanchang University", cn: "南昌大学"  ,tags: [{level: "原211",print: { en: false, cn: true },displayIn: { en: false, cn: true }}]},
      degree: { en: "M.E. ", cn: "工学硕士" },
      major: { en: "Computer Science and Technology", cn: "计算机科学与技术" },
      time: "2019.09 - 2020.06",
      advisor: {
        name_en: ": Assoc. Prof. Famao Ye",
        name_cn: "叶发茂 副教授",
        link: "https://chgcxy.ecut.edu.cn/c6/29/c9247a116265/page.htm",
      },
      focus: [
        { en: "Computer Vision", cn: "计算机视觉" },
        {
          en: "Remote Sensing Image Retrieval/Registration",
          cn: "遥感图像检索/配准",
        },
      ],
      detail: {
        en: null,
      },
    },
    {
      school: { en: "Nanchang University", cn: "南昌大学" ,tags: [{level: "原211",print: { en: false, cn: true },displayIn: { en: false, cn: true }}] },
      degree: { en: "B.M.", cn: "管理学学士" },
      major: {
        en: "Information Management and Information Systems (MIS)",
        cn: "信息管理与信息系统",
      },
      detail: {
        en: "My coursework focused on subjects such as C Programming, Java Programming, Data Structures, Database Principles, Computer Networks, Management, and Microeconomics.",
        cn: "主修C语言、Java语言、数据结构、数据库原理、计算机网络、管理学、微观经济学等课程",
      },
    },
  ],

  // === 论文列表 ===
  // displayIn: "all" | "cn" | "en"
  // print: { en: true, cn: false } (可选，控制打印)
  publications: [
    {
      year: "2025.07.21",
      title: "EdgeOAR: Real-time Online Action Recognition On Edge Devices",
      venue: {
        en: "IEEE Transactions on Mobile Computing (TMC)",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/11087627/",
      github: "#",
      tags: [
        { type: "SCI", level: "Q1" },
        { type: "EI", level: "1" },
        { type: "CCF", level: "A" },
      ],
      authors: [
        { name: "Wei Luo", name_cn: "罗威", isMe: true, highlight: true },
        { name: "Deyu Zhang", name_cn: "张德宇" },
        { name: "Yin Tang", name_cn: "唐寅" },
        { name: "Fan Wu", name_cn: "吴帆" },
        { name: "Yaoxue Zhang", name_cn: "张尧学" },
      ],
      print: { en: true, cn: true },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2025.07.14",
      title:
        "UniCount: Mining Large-Scale Video Data for Universal Repetitive Action Counting",
      venue: {
        en: "Big Data Mining and Analytics (BDMA)",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/11080215/",
      github: "#",
      tags: [
        { type: "SCI", level: "Q1" },
        { type: "EI", level: "1" },
        { type: "CSCD", level: "" },
      ],
      authors: [
        { name: "Yin Tang", name_cn: "唐寅" },
        { name: "Deyu Zhang", name_cn: "张德宇" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true },
        { name: "Fan Wu", name_cn: "吴帆" },
        { name: "Feng Lyu", name_cn: "吕丰" },
        { name: "Ruixiang Hang", name_cn: "杭瑞翔" },
        { name: "Lei Zhang", name_cn: "张亮" },
        { name: "Yaoxue Zhang", name_cn: "张尧学" },
      ],
      print: { en: true, cn: true },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2025.07.09",
      title:
        "MSA–HAR: multi-scale segmented attention networks for human activity recognition using sensor signals",
      venue: {
        en: "The Journal of Supercomputing (JSC)",
      },
      link: "https://link.springer.com/article/10.1007/s11227-025-07576-1",
      github: "#",
      tags: [
        { type: "SCI", level: "Q4" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Weiming Quan", name_cn: "权伟" },
        { name: "Yin Tang", name_cn: "唐寅" },
        {
          name: "Wei Luo",
          name_cn: "罗威",
          isMe: true,
          highlight: true,
          isCorresp: true,
        },
        { name: "Lei Zhang", name_cn: "张亮" },
      ],
      print: { en: true, cn: true },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2025.03.24",
      title: "Joint Deployment of UAV and Edge Server In Edge Computing",
      venue: {
        en: "2025 IEEE Wireless Communications and Networking Conference (WCNC)",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/10978531/",
      github: "#",
      tags: [
        { type: "CCF", level: "B" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Wei Huang", name_cn: "黄伟" },
        { name: "Deyu Zhang", name_cn: "张德宇" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true },
        { name: "Yin Tang", name_cn: "唐寅" },
      ],
      print: { en: false, cn: false },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2024.11.04",
      title:
        "ASLiquid: Non-Intrusive Liquid Counterfeit Identification with Your Earphones",
      venue: {
        en: "Proceedings of the 22nd ACM Conference on Embedded Networked Sensor Systems (SenSys)",
      },
      link: "https://dl.acm.org/doi/abs/10.1145/3666025.3699321",
      github: "#",
      tags: [
        { type: "CCF", level: "B" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Zhaohui Li", name_cn: "李朝辉" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true },
        { name: "Yongmin Zhang,", name_cn: "张永敏" },
        { name: "Jianxi Chen", name_cn: "陈杰" },
        { name: "Yuanchao Shu", name_cn: "舒洋" },
        { name: "Yaoxue Zhang", name_cn: "张阳" },
      ],
      print: { en: false, cn: false },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2024.09.06",
      title:
        "MultiCounter: Multiple Action Agnostic Repetition Counting in Untrimmed Videos",
      venue: {
        en: "27th European Conference on Artificial Intelligence (ECAI)",
      },
      link: "https://arxiv.org/abs/2409.04035",
      github: "#",
      tags: [
        { type: "CCF", level: "B" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Yin Tang", name_cn: "唐寅" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true },
        { name: "Jinrui Zhang", name_cn: "章晋睿" },
        { name: "Wei Huang", name_cn: "黄伟" },
        { name: "Ruihai Jing", name_cn: "景然" },
        { name: "Deyu Zhang", name_cn: "张德宇" },
      ],
      print: { en: false, cn: false },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2024.04.21",
      title:
        "Mean-Field Game Theory Based Altitude Control Strategy for Massive UAV Relay-assisted Mobile Edge Computing",
      venue: {
        en: "2024 IEEE Wireless Communications and Networking Conference (WCNC)",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/10571083/",
      github: "#",
      tags: [
        { type: "CCF", level: "B" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Weijun Cai", name_cn: "蔡维君" },
        { name: "Deyu Zhang", name_cn: "张德宇" },
        { name: "Zhuoer Chen", name_cn: "陈卓尔" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true },
        { name: "Yin Tang", name_cn: "唐寅" },
      ],
      print: { en: false, cn: false },
      displayIn: { en: false, cn: false },
    },
    {
      year: "2024.03.19",
      title:
        "MBSeg: Real-Time Contour-Based Method Instance Segmentation for Egocentric Vision",
      venue: {
        en: "IEEE Internet of Things Journal (IoT-J)",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/10474095/",
      github: "#",
      tags: [
        { type: "SCI", level: "Q1" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Wei Luo", name_cn: "罗威", isMe: true, highlight: true },
        { name: "Deyu Zhang", name_cn: "张德宇" },
        { name: " Jinrui Zhang", name_cn: "章晋睿" },
        { name: "Bangwen He", name_cn: "何榜文" },
        { name: "Wang Sun", name_cn: "孙旺" },
        { name: "Huan Yang", name_cn: "杨欢" },
        { name: "Ju Ren", name_cn: "任炬" },
      ],
      print: { en: true, cn: true },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2020.6.23",
      title:
        "Query-adaptive remote sensing image retrieval based on image rank similarity and image-to-query class similarity",
      venue: {
        en: "IEEE Access",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/9123501/",
      github: "#",
      tags: [
        { type: "SCI", level: "Q2" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Famao Ye", name_cn: "叶发茂" },
        { name: "Xuqing Zhao", name_cn: "赵旭青" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true, highlight: true },
        { name: "Dajun Li", name_cn: "李丹" },
        { name: "Weidong Min", name_cn: "闵卫东" },
      ],
      print: { en: false, cn: false },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2020.10.26",
      title:
        "Content-based remote sensing image retrieval based on fuzzy rules and a fuzzy distance",
      venue: {
        en: "IEEE Geoscience and Remote Sensing Letters (GRSL)",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/9239305/",
      github: "#",
      tags: [
        { type: "SCI", level: "Q3" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Famao Ye", name_cn: "叶发茂" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true, highlight: true },
        { name: "Meng Dong", name_cn: "董萌" },
        { name: "Dajun Li", name_cn: "李丹" },
        { name: "Weidong Min", name_cn: "闵卫东" },
      ],
      print: { en: false, cn: true },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2019.03.05",
      title:
        "SAR image retrieval based on unsupervised domain adaptation and clustering",
      venue: {
        en: "IEEE Geoscience and Remote Sensing Letters (GRSL)",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/8660481/",
      github: "#",
      tags: [
        { type: "SCI", level: "Q3" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Famao Ye", name_cn: "叶发茂" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true, highlight: true },
        { name: "Meng Dong", name_cn: "董萌" },
        { name: "Hailin He", name_cn: "何欢" },
        { name: "Weidong Min", name_cn: "闵卫东" },
      ],
      print: { en: false, cn: true },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2019.09.27",
      title:
        "A new re-ranking method based on convolutional neural network and two image-to-class distances for remote sensing image retrieval",
      venue: {
        en: "IEEE Access",
      },
      link: "https://ieeexplore.ieee.org/abstract/document/8851193/",
      github: "#",
      tags: [
        { type: "SCI", level: "Q4" },
        { type: "EI", level: "1" },
      ],
      authors: [
        { name: "Famao Ye", name_cn: "叶发茂" },
        { name: "Meng Dong", name_cn: "董萌" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true },
        { name: "Xiaoyong Chen", name_cn: "陈曦" },
        { name: "Weidong Min", name_cn: "闵卫东" },
      ],
      print: { en: false, cn: false },
      displayIn: { en: false, cn: false },
    },
    {
      year: "2019.09.01",
      title: "基于卷积神经网络和重排序的农业遥感图像检索",
      venue: {
        en: "Transactions of the Chinese Society of Agricultural Engineering",
        cn: "农业工程学报",
      },
      link: "http://www.tcsae.org/article/doi/10.11975/j.issn.1002-6819.2019.15.018",
      github: "#",
      tags: [{ type: "EI", level: "1" }],
      authors: [
        { name: "Famao Ye", name_cn: "叶发茂" },
        { name: "Meng Dong", name_cn: "董萌" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true },
        { name: "Hu Xiao", name_cn: "肖慧" },
        { name: "Xuqing Zhao", name_cn: "赵旭青" },
        { name: "Weidong Min", name_cn: "闵卫东" },
      ],
      print: { en: false, cn: false },
      displayIn: { en: false, cn: false },
    },
    {
      year: "2019.06.15",
      title: "卷积神经网络特征在遥感图像配准中的应用",
      venue: {
        en: "Natural Resources Remote Sensing",
        cn: "自然资源遥感",
      },
      link: "https://www.gtzyyg.com/article/2019/1001-070X/1001-070X-31-2-32.shtml",
      github: "#",
      tags: [{ type: "CSCD", level: "2" }],
      authors: [
        { name: "Famao Ye", name_cn: "叶发茂" },
        { name: "Wei Luo", name_cn: "罗威", isMe: true, highlight: true },
        { name: "Yanfei Su", name_cn: "苏燕飞" },
        { name: "Xuqing Zhao", name_cn: "赵旭青" },
        { name: "Hu Xiao", name_cn: "肖慧" },
        { name: "Weidong Min", name_cn: "闵卫东" },
      ],
      print: { en: false, cn: true },
      displayIn: { en: false, cn: true },
    },
  ],

  // === 荣誉奖项 ===
  // icon: 仅提供核心名，如 "star", "trophy", "medal"
  // iconClass: "party-red" 或留空
  awards: [
     {
      year: "2020.09-2024.06",
      name: {
        en: "Second-Class Postgraduate Academic Scholarship (awarded four times).",
        cn: "研究生学业奖学金二等，4次",
      },
      icon: "graduation-cap",
      print: { en: false, cn: false },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2022.12",
      name: {
        en: "Team First Prize, 3rd Hunan Graduate AI Innovation Competition",
        cn: "第三届湖南省研究生人工智能创新大赛 团队一等奖",
      },
      icon: "trophy",
      print: { en: true, cn: true },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2020.11",
      name: { en: "", cn: "2019年南昌大学优秀学生党员" },
      icon: "star",
      iconClass: "party-red", // 触发党徽红
      print: { en: false, cn: true },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2019.11.10",
      name: {
        en: "Finisher of the 2019 National Nanchang Marathon Half Marathon.",
        cn: "2019南昌国级马拉松 半马 完赛",
      },
      icon: "trophy",
      print: { en: true, cn: false },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2018.08",
      name: {
        en: "Third Prize in the 2018 Jiangxi Province Mathematical Modeling Competition.",
        cn: "2018年江西省数学建模竞赛 三等奖",
      },
      icon: "award",
      print: { en: true, cn: true },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2019.12",
      name: {
        en: "First-Class Outstanding Postgraduate Scholarship of Nanchang University, 2019.",
        cn: "南昌大学2019年度研究生优秀一等奖学金",
      },
      icon: "award",
      print: { en: true, cn: true },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2017.09-2020.06",
      name: {
        en: "First-Class Postgraduate Academic Scholarship, awarded 3 times.",
        cn: "研究生一等学业奖学金，3次",
      },
      icon: "graduation-cap",
      print: { en: false, cn: false },
      displayIn: { en: true, cn: true },
    },
    {
      year: "2013.09-2017.06",
      name: {
        en: "First-Class Academic Scholarship (once), Second-Class Academic Scholarship (twice).",
        cn: "学业奖学金，一等1次、二等2次",
      },
      icon: "graduation-cap",
      print: { en: false, cn: false },
      displayIn: { en: true, cn: true },
    },
        {
      year: "2016.12.10",
      name: {
        en: "Outstanding Student Leader of Nanchang University, 2015-2016 Academic Year.",
        cn: "2015-2016学年南昌大学优秀学生干部",
      },
      icon: "medal",
      print: { en: false, cn: true },
      displayIn: { en: true, cn: true },
    },
     {
      year: "2013.09-2016.06",
      name: {
        cn: "南昌大学学生中国特色社会主义理论学习研究会（校一级社团）-学习部成员、部长/会长",
      },
      icon: "id-badge",
      print: { en: false, cn: true },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2014.11",
      name: {
        cn: "管理学院第一届\“党在我心中\"演讲大赛 三等奖",
      },
      icon: "star",
      iconClass: "party-red",
      print: { en: false, cn: true },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2015.05",
      name: {
        cn: "管理学院第一届时政知识竞赛团队二等奖",
      },
      icon: "star",
      iconClass: "party-red",
      print: { en: false, cn: true },
      displayIn: { en: false, cn: true },
    },
    {
      year: "2015.04",
      name: {
        en: "Third Prize in the 14th ``Challenge Cup‘’ at Nanchang University​.",
        cn: "南昌大学第十四届\“挑战杯\"三等奖",
      },
      icon: "star",
      iconClass: "trophy",
      print: { en: true, cn: true },
      displayIn: { en: true, cn: true },
    },
  ],

  // === 服务 (学术 & 社会) ===
  services: [
    {
      type: "reviewer", // "academic" 或 "social"
      [
        {
          year: "2025.12", // 用于 News 排序
          content: {
            en: "IEEE Transactions on Biometrics, Behavior, and Identity Science (T-BIOM).",
          },
          print: { en: true, cn: true },
        },
        {
        }
      ],
    },
    {
      type: "tcp",
      [
        {         
        },
      ],
    }
  ],
};
