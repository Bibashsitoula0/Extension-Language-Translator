
let originalContent = '';
let translatedHtml = '';


document.addEventListener('DOMContentLoaded', function () {
    // Initially hide the loader overlay
    document.querySelector('.loader-overlay').style.display = 'none';

    // Store the current content in the translatedHtml variable initially
    translatedHtml = document.body.innerHTML;

    // Get the current active tab content and set it to originalContent
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) {
            console.log('No active tab found.');
            return;
        }

        const activeTab = tabs[0];

        // Ensure the tab's URL is valid for executing scripts
        if (!activeTab.url || 
            activeTab.url.startsWith('chrome://') || 
            activeTab.url.startsWith('chrome-extension://') || 
            !/^https?:\/\//.test(activeTab.url)) {
            console.log('Cannot run the script on this page.');
            return;
        }

        // Inject script to get the page content
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: () => document.body.innerHTML  // Get the current page's HTML content
        }, (result) => {
            if (result && result[0] && result[0].result) {
                originalContent = result[0].result;
                console.log('Original Content Saved:', originalContent);
            }
        });
    });

    // Event listener for Show Original button
    document.getElementById('showorginalbtn').addEventListener('click', async () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                console.log('No active tab found.');
                return;
            }

            const activeTab = tabs[0];

            // Inject and execute the restoreOriginalContent function in the active tab
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: restoreOriginalContent,
                args: [originalContent]  // Pass the stored original content as an argument
            });
        });
    });

    // Add event listener to the translate button
    document.getElementById('translateBtn').addEventListener('click', async () => {
        // Show the loader overlay
        document.querySelector('.loader-overlay').style.display = 'none';

        console.log('Translate button clicked');

        const language = document.getElementById('language').value;
        var romanizedCheckbox = document.getElementById('romanizedCheck');  
        var romanizedCheckboxValue = romanizedCheckbox.checked ? true : false;
        console.log('Selected language:', language);

        // Get the page content from the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                console.log('No active tab found.');
                document.querySelector('.loader-overlay').style.display = 'none';
                return;
            }

            const activeTab = tabs[0];

            // Check if the URL is valid and not a chrome:// or chrome-extension:// URL
            if (!activeTab.url || 
                activeTab.url.startsWith('chrome://') || 
                activeTab.url.startsWith('chrome-extension://') || 
                !/^https?:\/\//.test(activeTab.url)) {
                console.log('Cannot run the script on this page.');
                document.querySelector('.loader-overlay').style.display = 'none';
                return;
            }

          
               

            // Inject and execute the translateContent function in the active tab
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: translateContent,
                args: [language,romanizedCheckboxValue]  // Pass the selected language as an argument
            });
        });
    });

    document.querySelector('.close-btn').addEventListener('click', function() {
        window.close();
    });

    //audio
    document.getElementById('playAudio').addEventListener('click', async () => {
        console.log("audio button clicked");
        // Show the loader overlay
        document.querySelector('.loader-overlay').style.display = 'none';

        console.log('AudioTranslate button clicked');

        const language = document.getElementById('language').value;
        console.log('Audio Selected language:', language);

        // Get the page content from the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length === 0) {
                console.log('No active tab found.');
                document.querySelector('.loader-overlay').style.display = 'none';
                return;
            }

            const activeTab = tabs[0];

            // Check if the URL is valid and not a chrome:// or chrome-extension:// URL
            if (!activeTab.url || 
                activeTab.url.startsWith('chrome://') || 
                activeTab.url.startsWith('chrome-extension://') || 
                !/^https?:\/\//.test(activeTab.url)) {
                console.log('Cannot run the script on this page.');
                document.querySelector('.loader-overlay').style.display = 'none';
                return;
            }

            // Inject and execute the translateContent function in the active tab
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: translateAudio,
                args: [language]  // Pass the selected language as an argument
            });
        });
    });


    const checkGrammarBtn = document.getElementById('checkGrammar');
    if (checkGrammarBtn) {
        checkGrammarBtn.addEventListener('click', async () => {
            console.log("button clicked");
            // Show the loader overlay
            document.querySelector('.loader-overlay').style.display = 'none';
    
            console.log('Translate button clicked');
    
            const language = document.getElementById('language').value;
            console.log('Selected language:', language);
    
            // Get the page content from the current active tab
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs.length === 0) {
                    console.log('No active tab found.');
                    document.querySelector('.loader-overlay').style.display = 'none';
                    return;
                }
    
                const activeTab = tabs[0];
    
                // Check if the URL is valid and not a chrome:// or chrome-extension:// URL
                if (!activeTab.url || 
                    activeTab.url.startsWith('chrome://') || 
                    activeTab.url.startsWith('chrome-extension://') || 
                    !/^https?:\/\//.test(activeTab.url)) {
                    console.log('Cannot run the script on this page.');
                    document.querySelector('.loader-overlay').style.display = 'none';
                    return;
                }
    
                // Inject and execute the translateContent function in the active tab
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: checkGrammar,
                    args: [language]  // Pass the selected language as an argument
                });
            });
        });
    }


    const SuggestGrammar = document.getElementById('grammerVerify');
    if (SuggestGrammar) {
        SuggestGrammar.addEventListener('click', async () => {
            console.log("button clicked");
            // Show the loader overlay
            document.querySelector('.loader-overlay').style.display = 'none';    
         
    
            const language = document.getElementById('language').value;
            console.log('Selected language:', language);
    
            // Get the page content from the current active tab
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs.length === 0) {
                    console.log('No active tab found.');
                    document.querySelector('.loader-overlay').style.display = 'none';
                    return;
                }
    
                const activeTab = tabs[0];
    
                // Check if the URL is valid and not a chrome:// or chrome-extension:// URL
                if (!activeTab.url || 
                    activeTab.url.startsWith('chrome://') || 
                    activeTab.url.startsWith('chrome-extension://') || 
                    !/^https?:\/\//.test(activeTab.url)) {
                    console.log('Cannot run the script on this page.');
                    document.querySelector('.loader-overlay').style.display = 'none';
                    return;
                }
    
                // Inject and execute the translateContent function in the active tab
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: SuggestGrammar,
                    args: [language]  // Pass the selected language as an argument
                });
            });
        });
    }
   
});

async function translateContent(language,romanizedCheckboxValue) {
    // Create and show a loader overlay (optional UI element)

       
    try {
        const response = await fetch('https://localhost:21205/api/translation/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream'  // Ensure the server knows we expect an event stream
            },
            body: JSON.stringify({ 
                text: document.body.innerHTML, 
                targetLanguage: language, 
                checkRomanized: romanizedCheckboxValue  // Send the boolean value
            })
        });

        if (!response.ok) {
            console.error('Translation failed:', response.statusText);
            throw new Error('API response was not OK');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
         // Clear the existing content in the document
    document.body.innerHTML = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Decode the incoming chunk
            const chunk = decoder.decode(value, { stream: true });

            // Process the chunk (this assumes the server sends SSE-like data)
            const events = chunk.split('\n\n'); // Split by event boundary

            events.forEach(event => {
                if (event.startsWith('data: ')) {
                    const jsonData = event.replace('data: ', '');
                    const parsedData = JSON.parse(jsonData);
                    
                    // Extract the Query content from the parsedData
                    const htmlContent = parsedData.message.content.parts[0].Query;

                    // Append the extracted HTML content directly to document.body
                    document.body.innerHTML += htmlContent;

                    const loader = document.createElement("div");
                    loader.className = "loader-overlay";
                    loader.style.display = "none";
                }
            });
        }
    } catch (error) {
        console.error('Error translating content:', error);
    } finally {

        const loader = document.createElement("div");
        loader.className = "loader-overlay";
        loader.style.display = "none";
        
        // Hide the loader overlay after the translation is complete
        if (loader) {
            document.body.removeChild(loader);
        }
    }
}





async function translateAudio(language) {
    console.log("translate audio function start");
    let pageText = document.body.innerText;
    console.log('Page Text:', pageText);
    const targetLanguage = language;

    try {
        // Call your ASP.NET Core API to translate the text
        const response = await fetch('https://localhost:21205/api/translation/translateAudio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: pageText, targetLanguage: targetLanguage })
        });

        if (!response.ok) {
            console.error('Audio Translation failed:', response.statusText);
            throw new Error('API response was not OK');
        }

        // Handle the response as binary data (Blob)
        const blob = await response.blob();

        // Create a URL for the Blob
        const audioUrl = URL.createObjectURL(blob);

        // Create or update the audio element with controls
        let audioElement = document.getElementById('translatedAudio');
        if (!audioElement) {
            audioElement = document.createElement('audio');
            audioElement.id = 'translatedAudio';
            audioElement.controls = true;
            document.body.appendChild(audioElement);
        }
        
        // Set the source of the audio element and play the audio
        audioElement.src = audioUrl;
        audioElement.play();

        console.log('Audio translation played successfully.');

    } catch (error) {
        console.error('Error translating content:', error);
    } finally {
        // Hide the loader overlay
        const loaderOverlay = document.querySelector('.loader-overlay');
        if (loaderOverlay) {
            loaderOverlay.style.display = 'none';
        }
    }

    
}


async function checkGrammar(language) {
    // Create and show loader in the active tab context   
debugger;
    let pageText = document.body.innerHTML;
    console.log('Page Text:', pageText);
    const targetLanguage = language;

    try {
        // Call your ASP.NET Core API to check the grammar
        const response = await fetch('https://localhost:21205/api/translation/checkGrammar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: pageText, targetLanguage: targetLanguage })
        });

        if (!response.ok) {
            console.error('Grammar check failed:', response.statusText);
            throw new Error('API response was not OK');
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);

        debugger;
     

        if (responseData.query) {
            console.log('Corrected Text:', responseData.query);
            document.body.innerHTML = responseData.query;
        } else {
            console.error('Grammar check failed: No "correctedText" field found in the response data.');
        }

    } catch (error) {
        console.error('Error during grammar check:', error);
    } finally {
        // Hide the loader overlay
        const loaderOverlay = document.querySelector('.loader-overlay');
        if (loaderOverlay) {
            loaderOverlay.style.display = 'none';
        }
    }
}


// Function to restore original content
function restoreOriginalContent(originalContent) {
    if (originalContent) {
        document.body.innerHTML = originalContent;
        console.log('Original content restored.');
    } else {
        console.log('No original content found.');
    }
}


async function SuggestGrammar(language) {
    // Create and show loader in the active tab context   
debugger;
    let pageText = document.body.innerHTML;
    console.log('Page Text:', pageText);
    const targetLanguage = language;

    try {
        // Call your ASP.NET Core API to check the grammar
        const response = await fetch('https://localhost:21205/api/translation/suggestGrammar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: pageText, targetLanguage: targetLanguage })
        });

        if (!response.ok) {
            console.error('Grammar check failed:', response.statusText);
            throw new Error('API response was not OK');
        }

        const responseData = await response.json();

        if (responseData.correctedText) {
            console.log('Corrected Text:', responseData.correctedText);
            document.body.innerHTML = responseData.correctedText;
        } else {
            console.error('Grammar check failed: No "correctedText" field found in the response data.');
        }

    } catch (error) {
        console.error('Error during grammar check:', error);
    } finally {
        // Hide the loader overlay
        const loaderOverlay = document.querySelector('.loader-overlay');
        if (loaderOverlay) {
            loaderOverlay.style.display = 'none';
        }
    }
}
