const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');

puppeteer.use(pluginStealth());

async function SA(){
    const browser = await puppeteer.launch({headless:false});
    const page1 = await browser.newPage();

    await page1.goto('https://www.tenders.sa.gov.au/tender/search?preset=open');

    await page1.screenshot({path:"home.png", fullPage:true});
    
    //collecting tender links from each page
        //collecting links in page 1
        await page1.waitForTimeout(3000);
        let links = await page1.evaluate(()=>Array.from(document.querySelectorAll('.tender-table > table > tbody > tr > td:nth-child(2) > div > div:nth-child(1) > a'), (e)=>({link:e.href , name:e.innerText})));
        //printing the num of links in page 1
            console.log("going to page",1,', num of links in page 1 : ',links.length);
        const numOfPagesCal = await page1.evaluate(()=>Array.from(document.querySelectorAll('.paging > a'),(e)=>e.innerText));
        // console.log(numOfPagesCal);//prnting the num of pages


        let index = 3;
        for(const elm of numOfPagesCal){
            await page1.click(`.paging > a:nth-child(${index})`);
            await page1.waitForTimeout(2000);
            const tempLinks = await page1.evaluate(()=>Array.from(document.querySelectorAll('.tender-table > table > tbody > tr > td:nth-child(2) > div > div:nth-child(1) > a'), (e)=>({link:e.href , name:e.innerText})));
            links = links.concat(tempLinks);
            // printing the num of links in each page
                console.log("going to page",index-1,', num of links in page',index-1,": ",tempLinks.length);
            index++
        }
        console.log('total links : ',links.length);
        console.log(links);

    //navigating  inside each link and scrape the tender data
        
        //initializing an array to push scraped data
            let scrapedData = [];
            let i = 0;
        
        //navigating inside each link for scraping
        for(const elm of links){

        
        }

    browser.close();
}

SA();