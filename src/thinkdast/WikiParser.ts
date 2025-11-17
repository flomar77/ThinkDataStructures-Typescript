import * as cheerio from 'cheerio';
import Stack from './Stack';

export class WikiParser {
    elements: cheerio.Cheerio<Element>;

    constructor(elements: cheerio.Cheerio<Element>) {
        this.elements = elements;
    }

    getFirstValidLinkTitleFromElements(): string | undefined {
        let els: any[] = [];
        let firstLink: Element | undefined = undefined;
        let stack: Stack<boolean> = new Stack();

        Array.from(this.elements).forEach((el) => {
            for (const child of el.children) {
                els.push(child);
            }
        });

        if (els.length > 0) {
            let i = 0;
            while (firstLink == null) {
                const el = els[i];
                if (el === undefined) {
                    break;
                }
                if (this.elementIsStartParenthesis(el)) {
                    stack.push(true);
                }
                if (this.elementIsEndParenthesis(el)) {
                    stack.pop();
                }
                if (stack.size() == 0 && el.name == 'a') {
                    firstLink = el;
                    break;
                }
                i++;
            }
        }
        if (firstLink !== undefined) {
            return firstLink.attribs.title;
        } else return undefined;
    }

    elementIsStartParenthesis(element: any): boolean {
        return element.type == 'text' && element.data.includes('(');
    }
    elementIsEndParenthesis(element: any): boolean {
        return element.type == 'text' && element.data.includes(')');
    }
}
