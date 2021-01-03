const { defineFeature, loadFeature } = require("jest-cucumber");
const puppeteer = require("puppeteer-core");
const feature = loadFeature("./features/twEshop/iphone6.7.8/searchProduct.feature");

describe("searchResult.feature", () => {
  defineFeature(feature, (test) => {
    let browser;
    let page;

    const inputElement = "#search-input";
    const aElement =
      "#newSuggestSearch > table.resultSuggestListTable > tbody > tr:nth-child(2) > td > div > a:nth-child(2) > div";
    const openSearchInputIcon = ".newBtnIcon"

    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: true,
        executablePath:
          "C:/Program Files (x86)/Google/Chrome/Application/Chrome.exe",
        args: ["--proxy-server = proxy ip url"],
      });
    });

    beforeEach(async () => {
      page = await browser.newPage();
      await page.setViewport({ width: 375, height: 667 });
    });

    afterEach(async () => {
      await page.close();
    });

    afterAll(async () => {
      await browser.close();
    });

    test("輸入指定條件並搜尋", ({ when, given, and, then }) => {
      when(/^在首頁"(.*)"$/, async (url) => {
        await page.goto(url);
      });

      given(/^輸入"(.*)"$/, async (searchText) => {
        await page.waitForSelector(inputElement);
        await page.click(openSearchInputIcon);
        await page.focus(inputElement);
        await page.keyboard.type(searchText);
      });

      and(/^按"(.*)"$/, async (keyboard) => {
        await page.keyboard.press(keyboard);
        await page.waitFor(2000);
      });

      then(/^確認網址為"(.*)"$/, (url) => {
        expect(page.url()).toEqual(url);
      });
    });

    test("點擊底下提供的條件並搜尋", ({ when, given, then }) => {
      when(/^在首頁"(.*)"$/, async (url) => {
        await page.goto(url);
      });

      given('點擊"串飾"', async () => {
        await page.waitForSelector(inputElement);
        await page.click(openSearchInputIcon);
        await page.click(inputElement);
        await page.click(aElement);
        await page.waitFor(2000);
      });

      then(/^確認網址為"(.*)"$/, (url) => {
        expect(page.url()).toEqual(url);
      });
    });

    test("關閉 熱門搜尋關鍵詞 視窗", ({ when, given, and, then }) => {
      const closeButton =
        "#newSuggestSearch > table.resultSuggestListTable > tbody > tr:nth-child(1) > td > span > img";
      const dialogBlock = "#newSuggestSearch";

      when(/^在首頁"(.*)"$/, async (url) => {
        await page.goto(url);
      });

      given("叫出視窗", async () => {
        await page.waitForSelector(inputElement);
        await page.click(openSearchInputIcon);
        await page.click(inputElement);
        await page.waitFor(2000);
      });

      and("點擊右上角的 x", async () => {
        await page.click(closeButton);
        await page.waitFor(2000);
      });

      then("確認視窗關閉", async () => {
        const display = await page.$eval(
          dialogBlock,
          (el) => window.getComputedStyle(el).display
        );

        expect(display).toEqual("none");
      });
    });

    test("在 searchResult Page 選擇排序並搜尋", ({
      when,
      given,
      and,
      then,
    }) => {
      const selectElement =
        "#for-mobile-content > div > div:nth-child(3) > div:nth-child(1) > div > div.searchResult-desktop > div:nth-child(4) > div > select";
      const productName =
        "#for-mobile-content > div > div:nth-child(3) > div:nth-child(1) > div > div.ItemBlkFatherDiv > div:nth-child(1) > div:nth-child(3) > div.comp-pdt-blk-material";

      when(/^在搜尋頁"(.*)"$/, async (url) => {
        await page.goto(url);
      });

      given(/^確認預設是否為"(.*)"$/, async (value) => {
        const selectValue = await page.$eval(selectElement, (el) => el.value);

        await page.waitForSelector(selectElement);
        await expect(selectValue).toEqual(value);
      });

      and(/^點擊下拉選單並選擇"(.*)"$/, async (option) => {
        await page.select(selectElement, option);
        await page.waitFor(3000);
      });

      then("確認搜尋結果第一筆商品是否已變更", async () => {
        const isNewProduct = await page.$eval(
          productName,
          (el) => el.textContent
        );

        expect(isNewProduct).toEqual("第一筆商品");
      });
    });

    test("在 searchResult Page 滾動往下", ({ when, given, then }) => {
      const productBlock =
        "#for-mobile-content > div > div:nth-child(3) > div:nth-child(1) > div > div.ItemBlkFatherDiv > div:nth-child(1)";
      const productClassName = ".item-blk-content";

      when(/^在搜尋頁"(.*)"$/, async (url) => {
        await page.goto(url);
      });

      given("往下滾動", async () => {
        await page.waitForSelector(productBlock);
        await page.evaluate(() => {
          window.scrollTo(0, 2800);
        });
        await page.waitFor(3000);
      });

      then("確認頁面商品數量是否變多", async () => {
        const productLength = await page.$$eval(
          productClassName,
          (els) => els.length
        );
        expect(productLength).toBe(48);
      });
    });
  });
});
