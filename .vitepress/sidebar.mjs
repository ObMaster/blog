import { readdir } from 'fs/promises';
import matter from 'gray-matter';

/**
 * 顶部导航（一级）
 */
export const Navs = [
  { text: '开发环境', link: '/environment/', activeMatch: '/environment' },
  { text: '前端', link: '/front/', activeMatch: '/front' },
  { text: '后端', link: '/back/', activeMatch: '/back' },
  { text: 'Linux', link: '/linux/', activeMatch: '/linux' },
  {
    text: 'spring', items: [
      { text: 'Spring', link: '/spring/', activeMatch: '/spring' },
      { text: 'Spring Boot', link: '/springboot/', activeMatch: '/springboot' },
      { text: 'Spring Security', link: '/spring-security/', activeMatch: '/spring-security' },
      { text: 'Spring Cloud', link: '/spring-cloud/', activeMatch: '/spring-cloud' }
    ]
  },
  {
    text: 'spring1', items: [
      { text: 'Spring', link: '/spring1/spring/' },
      { text: 'Spring Boot', link: '/spring1/springboot/' },
      { text: 'Spring Security', link: '/spring1/spring-security/' },
      { text: 'Spring Cloud', link: '/spring1/springcloud/' }
    ]
  },
];

// 目录文件：TODO.md
const IGNORE_TEXT = '[TODO]';
// 首页文件：index.md
const INDEX_FILE = 'index';

/**
 * 
 * @param {Object} 返回的侧边导航对象
 * @param {*} 导航栏对象 
 * @returns 
 */
const getMDFile = async (list, { text, link, items }) => {
  if (items != undefined) {
    items.forEach(data => getMDFile(list, data))
    return;
  }

  const dir = `./${link}`;
  const files = (await readdir(dir)) || [];

  list[link] = [
    {
      text,
      items: files
        .map((file) => {
          const path = `${dir}${file}`;
          const filename = file.replace(/\.md$/, '');
          const filepath = `${link}${filename}`;
          const { data = {} } = matter.read(path) || {};
          return {
            ...data,
            text: data.title || filename,
            link: filepath,
            activeMatch: `${link}`,
          };
        })
        .filter(({ text, link }) => link.indexOf(INDEX_FILE) === -1 && text.indexOf(IGNORE_TEXT) === -1),
    },
  ];
}

/**
 * ! 各分类只对应单一文件夹，暂未考虑多级目录、混合目录的情况
 * @description 根据 `COLS` 生成侧边导航（二级）
 * @returns {Object} sidebar
 */
export const getSidebar = () => {
  const list = {};
  Navs.forEach(data => getMDFile(list, data));
  return list;
};


