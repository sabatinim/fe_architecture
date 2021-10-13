"use strict";
const table = (h) => {
    let header = h.cols.map(c => `<th>${c}</th>`);
    return `<table>
                <tr>${header}</tr>
            </table>`;
};
describe('First Test Suite', function () {
    it('Hello World!', () => {
        const html = table({ cols: ["aaa", "bbb", "ccc"] });
        expect(html).toEqual(`<table>
                <tr><th>aaa</th><th>bbb</th><th>ccc</th></tr>
            </table>`);
    });
});
//# sourceMappingURL=TableViewTest.js.map