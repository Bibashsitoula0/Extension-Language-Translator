chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: translateContent
    });
});

async function translateContent() {
    debugger;
    let pageText = document.body.innerText;
    const targetLanguage = "French"; // or dynamically select based on user input

    // Call your ASP.NET Core API to translate the text
    const response = await fetch('https://localhost:21205/api/translation/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: pageText, targetLanguage: targetLanguage })
    });

    const translatedText = await response.json();

    // Replace the original text with translated text
    document.body.innerText = translatedText;
}


