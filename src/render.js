// Handle SSR rendering with template literals
export function renderPage(data, translations, locale) {
  // Helper function to translate a key
  const t = (key) => translations[key] || key;
  
  return `
    <!DOCTYPE html>
    <html lang="${locale}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t('page_title')}</title>
      <link href="/public/css/tailwind.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100 min-h-screen">
      <div class="container mx-auto p-4">
        <header class="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 class="text-3xl font-bold text-gray-800">${t('welcome_message')}</h1>
          <p class="text-gray-600 mt-2">${t('app_description')}</p>
          
          <div class="mt-4 flex space-x-4">
            <a href="?locale=en" class="px-3 py-1 rounded ${locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}">English</a>
            <a href="?locale=es" class="px-3 py-1 rounded ${locale === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}">Español</a>
            <a href="?locale=fr" class="px-3 py-1 rounded ${locale === 'fr' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}">Français</a>
          </div>
        </header>
        
        <main class="bg-white shadow-md rounded-lg p-6">
          <!-- Tab navigation -->
          <div class="border-b border-gray-200">
            <ul class="flex flex-wrap -mb-px" role="tablist">
              <li class="mr-2">
                <button class="tab-button inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 active"
                  data-tab="tab1" role="tab" aria-selected="true" aria-controls="tab1">
                  ${t('tab1_title')}
                </button>
              </li>
              <li class="mr-2">
                <button class="tab-button inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
                  data-tab="tab2" role="tab" aria-selected="false" aria-controls="tab2">
                  ${t('tab2_title')}
                </button>
              </li>
              <li class="mr-2">
                <button class="tab-button inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
                  data-tab="tab3" role="tab" aria-selected="false" aria-controls="tab3">
                  ${t('tab3_title')}
                </button>
              </li>
            </ul>
          </div>
          
          <!-- Tab content -->
          <div class="mt-4">
            <div id="tab1" class="tab-content" role="tabpanel">
              <h2 class="text-xl font-semibold mb-4">${t('tab1_title')}</h2>
              <p>${t('tab1_content')}</p>
              
              <div class="mt-4 bg-gray-50 p-4 rounded-md">
                <h3 class="font-medium mb-2">${t('data_from_api')}</h3>
                <ul class="list-disc pl-5">
                  ${data.items.map(item => `
                    <li class="mb-2">
                      <span class="font-medium">${item.name}</span>: ${item.description}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
            
            <div id="tab2" class="tab-content hidden" role="tabpanel">
              <h2 class="text-xl font-semibold mb-4">${t('tab2_title')}</h2>
              <p>${t('tab2_content')}</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                ${data.features.map(feature => `
                  <div class="border border-gray-200 rounded-md p-4">
                    <h3 class="font-medium text-lg mb-2">${feature.title}</h3>
                    <p class="text-gray-600">${feature.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div id="tab3" class="tab-content hidden" role="tabpanel">
              <h2 class="text-xl font-semibold mb-4">${t('tab3_title')}</h2>
              <p>${t('tab3_content')}</p>
              
              <div class="mt-4">
                <h3 class="font-medium mb-2">${t('contact_info')}</h3>
                <p>${data.contact.email}</p>
                <p>${data.contact.phone}</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer class="mt-8 text-center text-gray-500 text-sm">
          <p>${t('footer_text')} - ${new Date().getFullYear()}</p>
        </footer>
      </div>
      
      <script src="/public/js/tabs.js"></script>
    </body>
    </html>
  `;
}
