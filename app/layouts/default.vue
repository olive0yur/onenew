<template>
  <div>
    <Header />
    <div class="">
      <slot />
    </div>
  </div>
</template>

<style>
/* CSS Reset */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 14px;
  background: #fffffe;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

body {
  width: 100%;
  overflow: auto;
  line-height: 1.6;
}

/* 移除默认边距和填充 */
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
dl,
dd,
ol,
ul,
figure,
hr,
fieldset,
legend {
  margin: 0;
  padding: 0;
}

/* 列表样式重置 */
ol,
ul {
  list-style: none;
}

li {
  list-style: none;
}

/* 链接样式重置 */
a {
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  background-color: transparent;
}

a:hover,
a:focus {
  outline: none;
}

/* 按钮样式重置 */
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* 表单元素重置 */
input,
textarea,
select {
  outline: none;
  border: none;
  background: transparent;
}

input[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/* 图片和媒体元素 */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* 表格重置 */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

/* 标题重置 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/* 其他元素重置 */
blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

hr {
  border: none;
  height: 0;
  overflow: visible;
}

/* 代码元素 */
code,
kbd,
samp {
  font-size: 1em;
}

/* 表单标签 */
label {
  cursor: pointer;
}

/* 滚动条优化 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(55, 93, 241, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(143, 46, 240, 0.3);
}
</style>
