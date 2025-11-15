import './style.css';
import { setupCounter } from './counter.ts';
import { WikiFetcher } from './thinkdast/WikiFetcher.ts';
import { Index } from './thinkdast/Index.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p class="read-the-docs">
      This is a TypeScript rewrite of the Java examples from Allen B. Downey's Think Data Structures. The original book and code can be found at https://github.com/AllenDowney/ThinkDataStructures.
    </p>
  </div>
`;

// const javaWikiPage = 'Java_(programming_language)';
// const wFetcher = new WikiFetcher();
// const elements = await wFetcher.fetchWikipedia(javaWikiPage);
// const elements2 = await wFetcher.fetchWikipedia('JavaScript');
// if (elements !== undefined && elements2 !== undefined) {
//     const index = new Index();
//     index.indexPage(javaWikiPage, elements);
//     index.indexPage('Javascript', elements2);
//     index.logIndex();
// }

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

const response = await fetch('http://localhost:3001/api/products');
if (!response.ok) {
    throw new Error(`Unable to Fetch Data`);
}
const data = await response.json();
console.log(data);
