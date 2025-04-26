/*  SCRIPT */

/*=================================================================================================================
    D E F I N I Ã‡ Ãƒ O   D O   T E M A   D O   L A Y O U T
=================================================================================================================*/

const btnLight = document.getElementById('light');
const btnDark = document.getElementById('dark');
const iframe = document.getElementById('dark-widget');  // Widget de Tema Escuro

function setActive(button) {
    btnLight.classList.remove('active');
    btnDark.classList.remove('active');
    button.classList.add('active');
}

btnLight.addEventListener('click', () => {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    setActive(btnLight);
    iframe.style.display = 'none';
});

btnDark.addEventListener('click', () => {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    setActive(btnDark);
    iframe.style.display = 'flex';   // Exibir o widget da CoinMarketCap
});

// Define tema inicial ao carregar a pÃ¡gina
window.addEventListener('DOMContentLoaded', () => {
    // Pode definir tema padrÃ£o como claro
    document.body.classList.add('light-theme');
    setActive(btnLight);
    iframe.style.display = 'none';
});


/*------------------------------------------------------------------------------------------------------
    O p t i m i z a n d o   o s   E l e m e n t o s   A p Ã³ s   a   D e f i n i Ã§ Ã£ o   d o
    T e m a   d o   L a y o u t
------------------------------------------------------------------------------------------------------*/

const toggleButton = document.getElementById('toggle-menu');
const toggleSpan = toggleButton.querySelector('span');
const menu = document.getElementById('x-column');
const resizer = document.getElementById('default-content');
const resizer_2 = document.getElementById('menu-content');
const footer = document.getElementById('x-footer');

toggleButton.addEventListener('click', () => {
    menu.classList.toggle('active');            // Alterna a classe 'active' no menu
    toggleButton.classList.toggle('active');    // adiciona ou remove classe 'active' no botÃ£o

    // Verifica se o menu estÃ¡ ativo
    if (menu.classList.contains('active')) {
        toggleSpan.textContent = 'Ocultar';
        // Se o menu estÃ¡ ativo, optmiza os elementos...
        resizer.style.width = '78%';
        resizer_2.style.width = '78%';
        footer.style.width = '122%';

    } else {
        toggleSpan.textContent = 'Menu';
        // Se o menu nÃ£o estÃ¡ ativo, restaura as definiÃ§Ãµes...
        resizer.style.width = '100%';
        resizer_2.style.width = '100%';
        footer.style.width = '100%';
    }
});






/*=================================================================================================================
    M E N U - L A T E R A L   D I N Ã‚ M I C O
=================================================================================================================*/

// Adicione esta lÃ³gica na funÃ§Ã£o que gerencia os cliques do submenu
function handleSubmenuItemClick(e, submenuItem) {
    e.stopPropagation();
    
    // Remove active de todos os itens do submenu
    document.querySelectorAll('.submenu li').forEach(item => {
        item.classList.remove('active');
    });

    // Adiciona active ao item clicado
    if (submenuItem) {
        submenuItem.classList.add('active');
        updateSections(submenuItem.getAttribute('data-content'));
    }
}

function updateSections(targetContent) {
    sections.forEach(section => section.style.display = 'none');
    if (targetContent) {
        const targetSection = document.getElementById(targetContent);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }
}

function closeAllSubmenus() {
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.style.display = 'none';
    });
    document.querySelectorAll('#menu li').forEach(item => {
        item.classList.remove('submenu-active');
    });
}

function toggleSubmenu(item, submenu) {
    const isOpen = submenu.style.display === 'block';
    closeAllSubmenus();
    
    if (!isOpen) {
        submenu.style.display = 'block';
        item.classList.add('submenu-active');
    }
}

// Gerenciamento do menu
const menuItems = document.querySelectorAll('#menu li');
const sections = document.querySelectorAll('.right-column-2 section');

menuItems.forEach(item => {
    const submenu = item.querySelector('.submenu');
    
    item.addEventListener('click', (e) => {
        const isSubmenuClick = e.target.closest('.submenu');

        if (isSubmenuClick) {
            handleSubmenuItemClick(e, e.target.closest('li'));
            return;
        }

        // Remove classes ativas
        menuItems.forEach(i => i.classList.remove('active', 'defaultActive'));
        
        // Adiciona classe ativa apropriada
        item.classList.add(isConnected ? 'active' : 'defaultActive');

        if (submenu) {
            e.preventDefault();
            toggleSubmenu(item, submenu);
        } else {
            closeAllSubmenus();
            updateSections(item.getAttribute('data-content'));
        }
    });
});

// Fecha submenus ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('#menu')) {
        closeAllSubmenus();
    }
});

// Fecha submenus ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllSubmenus();
    }
});



/*=================================================================================================================
    B R E A D C R U M B   C L I C Ã V E L
=================================================================================================================*/

document.addEventListener('DOMContentLoaded', function() {
    // Manipulador de eventos para os links do breadcrumb
    document.querySelectorAll('.breadcrumb a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Oculta todas as seÃ§Ãµes
            document.querySelectorAll('section[id^="content"]').forEach(section => {
                section.style.display = 'none';
            });
            
            // Mostra a seÃ§Ã£o alvo
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.style.display = 'block';
            }
        });
    });
});

  


/*=================================================================================================================
    C O N F I G U R A Ã‡ Ãƒ O   D E   T E L A - C H E I A   ( F u l l S c r e e n )
=================================================================================================================*/

const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});







/*=================================================================================================================
    V O L U M E   D E   N E G O C I A Ã‡ Ãƒ O   D A S   E X C H A N G E S   E M   T E M P O - R E A L
=================================================================================================================*/

class ExchangeDataManager {
    constructor() {
        this.exchangeIds = {
            'binance': 'binance',
            'kucoin': 'kucoin',
            'coinbase': 'gdax',
            'kraken': 'kraken',
            'huobi': 'huobi'
        };
        this.updateInterval = 5 * 60 * 1000; // 5 minutos
        this.retryDelay = 10000; // 10 segundos para retry em caso de falha
        this.maxRetries = 3;
        this.currentRetries = 0;
    }

    async fetchExchangeData() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/exchanges', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                timeout: 5000 // 5 segundos timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.currentRetries = 0; // Reset retries on success
            return data;

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            
            if (this.currentRetries < this.maxRetries) {
                this.currentRetries++;
                console.log(`Tentativa ${this.currentRetries} de ${this.maxRetries}`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.fetchExchangeData();
            }
            
            return null;
        }
    }

    formatVolume(volume) {
        if (!volume || isNaN(volume)) return 'IndisponÃ­vel';

        try {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                maximumFractionDigits: 2
            });

            return formatter.format(volume);

        } catch (error) {
            console.error('Erro ao formatar volume:', error);
            return 'IndisponÃ­vel';
        }
    }

    async updateVolumeData() {
        try {
            const exchangeData = await this.fetchExchangeData();
            if (!exchangeData) {
                throw new Error('Dados nÃ£o disponÃ­veis');
            }

            Object.entries(this.exchangeIds).forEach(([displayName, exchangeId]) => {
                const volumeElement = document.querySelector(`[data-exchange-id="${displayName}"]`);
                if (!volumeElement) return;

                const exchange = exchangeData.find(e => e.id === exchangeId);
                
                if (exchange?.trade_volume_24h_btc_normalized && exchange?.btc_price_usd) {
                    const volume = exchange.trade_volume_24h_btc_normalized * exchange.btc_price_usd;
                    const formattedVolume = this.formatVolume(volume);
                    
                    volumeElement.textContent = formattedVolume;
                    volumeElement.classList.remove('loading');
                    volumeElement.classList.add('updated');
                    
                    // Adiciona animaÃ§Ã£o de atualizaÃ§Ã£o
                    volumeElement.classList.add('flash');
                    setTimeout(() => volumeElement.classList.remove('flash'), 1000);
                } else {
                    volumeElement.textContent = 'IndisponÃ­vel';
                    volumeElement.classList.add('loading');
                    volumeElement.classList.remove('updated');
                }
            });

        } catch (error) {
            console.error('Erro ao atualizar volumes:', error);
            this.handleUpdateError();
        }
    }

    handleUpdateError() {
        document.querySelectorAll('[data-exchange-id]').forEach(el => {
            if (!el.classList.contains('updated')) {
                el.textContent = 'IndisponÃ­vel';
                el.classList.add('loading');
            }
        });
    }

    startUpdates() {
        this.updateVolumeData();
        
        // AtualizaÃ§Ã£o periÃ³dica
        setInterval(() => this.updateVolumeData(), this.updateInterval);

        // Valores fallback
        const fallbackVolumes = {
            'binance': '$45.2B',
            'kucoin': '$2.1B',
            'coinbase': '$8.5B',
            'kraken': '$1.8B',
            'huobi': '$3.4B'
        };

        // Fallback timer
        setTimeout(() => {
            document.querySelectorAll('[data-exchange-id]').forEach(el => {
                if (el.textContent === 'Carregando...') {
                    const exchangeId = el.getAttribute('data-exchange-id');
                    el.textContent = fallbackVolumes[exchangeId] || 'IndisponÃ­vel';
                }
            });
        }, 5000);
    }
}

// InicializaÃ§Ã£o
document.addEventListener('DOMContentLoaded', () => {
    const exchangeManager = new ExchangeDataManager();
    exchangeManager.startUpdates();
});








/*=================================================================================================================
    C O N F I G U R A Ã‡ Ãƒ O   D E   N O T I F I C A Ã‡ Ã• E S
=================================================================================================================*/

const notificationBtn = document.getElementById('notification-btn');
const notificationBadge = document.getElementById('notification-badge');
const notificationDropdown = document.getElementById('notification-dropdown');

function updateNotifications(count) {
    if (count > 0) {
        notificationBadge.style.display = 'inline';
        notificationBadge.textContent = count;
    } else {
        notificationBadge.style.display = 'none';
    }
}

setTimeout(() => {
    updateNotifications(4);
}, 3000);

let isAnimating = false;

notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (isAnimating) return;

    if (notificationDropdown.style.display === 'block') {
        // AnimaÃ§Ã£o de saÃ­da
        isAnimating = true;
        notificationDropdown.classList.remove('fade-in-up');
        notificationDropdown.classList.add('fade-out-down');

        notificationDropdown.addEventListener('animationend', function handler() {
            notificationDropdown.style.display = 'none';
            notificationDropdown.classList.remove('fade-out-down');
            isAnimating = false;
            notificationDropdown.removeEventListener('animationend', handler);
        });
    } else {
        // AnimaÃ§Ã£o de entrada
        notificationDropdown.style.display = 'block';
        notificationDropdown.classList.remove('fade-out-down');
        notificationDropdown.classList.add('fade-in-up');
        updateNotifications(0);
    }
});

window.addEventListener('click', (e) => {
    if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
        if (notificationDropdown.style.display === 'block' && !isAnimating) {
            notificationBtn.click();
        }
    }
});



/*=================================================================================================================
    S E L E C T O R   D E   I D I O M A S
=================================================================================================================*/

const languageSelector = document.querySelector('.language-selector');
const selectedLanguage = languageSelector.querySelector('.selected-language');
const options = languageSelector.querySelectorAll('ul li');

options.forEach(option => {
  option.addEventListener('click', () => {
    // Atualiza a seleÃ§Ã£o com a imagem da bandeira clicada
    const img = option.querySelector('img').cloneNode(true);

    selectedLanguage.innerHTML = '';
    selectedLanguage.appendChild(img);

    // Mostra todas as opÃ§Ãµes antes de ocultar a selecionada
    options.forEach(opt => opt.style.display = '');

    // Oculta a opÃ§Ã£o selecionada na lista
    option.style.display = 'none';
  });
});

// Oculta a opÃ§Ã£o que jÃ¡ estÃ¡ selecionada inicialmente
function hideSelectedOption() {
  const selectedImgSrc = selectedLanguage.querySelector('img').src;
  options.forEach(option => {
    const optionImgSrc = option.querySelector('img').src;
    option.style.display = (optionImgSrc === selectedImgSrc) ? 'none' : '';
  });
}

// Executa ao carregar a pÃ¡gina para sincronizar o dropdown
hideSelectedOption();




/*=================================================================================================================
    O P T I M I Z A Ã‡ Ãƒ O   D E   E L E M E N T O S   A P Ã“ S   A   C O N E X Ãƒ O
=================================================================================================================*/

let isConnected = false;
async function optimizeElements(connectionStatus) {
    isConnected = connectionStatus;
    updateUIElements();
    autoSelectMenuItem();
}

function updateUIElements() {
    // Atualiza elementos da interface
    const elements = [
        { el: document.getElementById('connectButton'), display: isConnected ? 'none' : 'flex' },
        { el: document.getElementById('title'), width: isConnected ? '43%' : '50%' },
        { el: document.getElementById('login'), width: isConnected ? '27%' : '20%' },
        { el: document.getElementById('default-content'), display: isConnected ? 'none' : 'flex' },
        { el: document.getElementById('menu-content'), display: isConnected ? 'flex' : 'none' },
        { el: document.getElementById('home'), display: isConnected ? 'none' : 'flex' },
        { el: document.getElementById('user'), display: isConnected ? 'flex' : 'none' },
//      { el: document.getElementById('countdown'), display: isConnected ? 'none' : 'flex' },
    ];

    elements.forEach(({ el, display, width }) => {
        if (el) {
            if (display !== undefined) el.style.display = display;
            if (width !== undefined) el.style.width = width;
        }
    });

    // Atualiza classes do menu
    menuItems.forEach(item => {
        item.classList.remove('active', 'defaultActive');
        if (item.classList.contains('active') || item.classList.contains('defaultActive')) {
            item.classList.add(isConnected ? 'active' : 'defaultActive');
            userPanel.click();
        }
    });

    // Atualiza perfil
    const profiles = document.getElementsByClassName('profile');
    Array.from(profiles).forEach(el => el.style.display = isConnected ? 'flex' : 'none');
}

function autoSelectMenuItem() {
    if (isConnected) {
        document.getElementById('user')?.click();   // Simula clique automÃ¡tico no item "Perfil"
    } else {
        document.getElementById('home')?.click();   // Simula clique automÃ¡tico no item "InÃ­cio"
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////

optimizeElements(true);

// Adicionar evento de clique ao botÃ£o de desconexÃ£o
const disconnectButton = document.getElementById('disconnectButton');
if (disconnectButton) {
    disconnectButton.addEventListener('click', () => {
        optimizeElements(false); // Define o estado como desconectado
        console.log('Painel desconectado com sucesso!');
    });
}





/*=================================================================================================================
    G E R E N C I A M E N T O   &   V I S U A L I Z A Ã‡ Ãƒ O   D E   W H I T E P A P E R S
=================================================================================================================*/

document.addEventListener('DOMContentLoaded', () => {
    // ReferÃªncias aos elementos
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-upload');
    const previewButtons = document.querySelectorAll('.preview-btn');
    const downloadButtons = document.querySelectorAll('.download-btn');
    const shareButtons = document.querySelectorAll('.share-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const pdfModal = document.querySelector('.pdf-viewer-modal');
    const closeButton = document.querySelector('.pdf-close-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const whitepaperGrid = document.querySelector('.whitepaper-grid');
    const categoryItems = document.querySelectorAll('.category-item');

    // Funcionalidade de upload
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) {
                const file = e.target.files[0];
                
                // Aqui vocÃª implementaria a lÃ³gica de upload do arquivo
                console.log(`Arquivo selecionado: ${file.name}`);
                
                // SimulaÃ§Ã£o de upload
                uploadArea.innerHTML = `
                    <i class="fas fa-file-pdf"></i>
                    <p>${file.name}</p>
                    <div class="upload-progress">
                        <div class="progress-bar"></div>
                    </div>
                `;
                
                // Simula o progresso do upload
                simulateUploadProgress();
            }
        });
    }

    // FunÃ§Ã£o de simulaÃ§Ã£o de progresso de upload
    function simulateUploadProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    uploadArea.innerHTML = `
                        <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
                        <p>Upload concluÃ­do!</p>
                        <button class="custom-file-upload">Selecionar outro arquivo</button>
                    `;
                }, 500);
            }
        }, 300);
    }

    // Funcionalidade de visualizaÃ§Ã£o do PDF
    if (previewButtons.length) {
        previewButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (pdfModal) {
                    pdfModal.style.display = 'flex';
                }
            });
        });
    }

    // Funcionalidade de download do PDF
    if (downloadButtons.length) {
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                // Aqui vocÃª implementaria a lÃ³gica de download do arquivo
                console.log('Download iniciado...');
            });
        });
    }

    // Funcionalidade de compartilhamento do PDF
    if (shareButtons.length) {
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                // Aqui vocÃª implementaria a lÃ³gica de compartilhamento do arquivo
                console.log('Compartilhamento iniciado...');
            });
        });
    }

    // Funcionalidade de exclusÃ£o do PDF
    if (deleteButtons.length) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const confirmation = confirm('Tem certeza de que deseja excluir este arquivo?');
                if (confirmation) {
                    // Aqui vocÃª implementaria a lÃ³gica de exclusÃ£o do arquivo
                    console.log('Arquivo excluÃ­do.');
                }
            });
        });
    }

    // Fechar o modal do PDF
    if (closeButton && pdfModal) {
        closeButton.addEventListener('click', () => {
            pdfModal.style.display = 'none';
        });
        
        // TambÃ©m fechar ao clicar fora do conteÃºdo
        pdfModal.addEventListener('click', (e) => {
            if (e.target === pdfModal) {
                pdfModal.style.display = 'none';
            }
        });
    }

    // Alternar entre visualizaÃ§Ã£o em grade e lista
    if (viewButtons.length && whitepaperGrid) {
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe ativa de todos os botÃµes
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe ativa ao botÃ£o clicado
                button.classList.add('active');
                
                // Muda o layout com base no valor data-view
                const viewType = button.getAttribute('data-view');
                if (viewType === 'list') {
                    whitepaperGrid.classList.add('list-view');
                    whitepaperGrid.classList.remove('grid-view');
                } else {
                    whitepaperGrid.classList.add('grid-view');
                    whitepaperGrid.classList.remove('list-view');
                }
            });
        });
    }

    // Filtragem por categoria
    if (categoryItems.length) {
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove a classe ativa de todos os itens
                categoryItems.forEach(cat => cat.classList.remove('active'));
                
                // Adiciona a classe ativa ao item clicado
                item.classList.add('active');
                
                // Aqui vocÃª implementaria a lÃ³gica de filtragem dos relatÃ³rios
                console.log(`Categoria selecionada: ${item.textContent.trim()}`);
            });
        });
    }
});


















/*=================================================================================================================
    C O N F I G U R A Ã‡ Ãƒ O   D O  " F E E D  N E W S "
=================================================================================================================*/

document.addEventListener('DOMContentLoaded', () => {
    const newsFeed = document.querySelector('.news-feed');

    // SimulaÃ§Ã£o de carregamento de notÃ­cias
    const newsData = [
        {
            title: 'Bitcoin atinge novo recorde histÃ³rico',
            description: 'O preÃ§o do Bitcoin ultrapassou os $70.000 pela primeira vez.',
            link: 'https://br.cointelegraph.com/',
            image: 'https://via.placeholder.com/150',
        },
        {
            title: 'Ethereum 2.0 estÃ¡ mais prÃ³ximo',
            description: 'A atualizaÃ§Ã£o do Ethereum promete maior escalabilidade.',
            link: 'https://br.beincrypto.com/',
            image: 'https://via.placeholder.com/150',
        },
        {
            title: 'RegulamentaÃ§Ã£o de criptomoedas avanÃ§a',
            description: 'PaÃ­ses ao redor do mundo discutem novas leis para criptoativos.',
            link: 'https://finance.yahoo.com/',
            image: 'https://via.placeholder.com/150',
        },
    ];

    // Renderizar notÃ­cias
    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.innerHTML = `
            <img src="${news.image}" alt="NotÃ­cia">
            <div class="news-content">
                <h4>${news.title}</h4>
                <p>${news.description}</p>
                <a href="${news.link}" target="_blank" class="read-more">Leia mais</a>
            </div>
        `;
        newsFeed.appendChild(newsCard);
    });
});










/*=================================================================================================================
   Implantador de contratos inteligentes"
=================================================================================================================*/


// ConfiguraÃ§Ã£o do Editor Solidity
document.addEventListener('DOMContentLoaded', () => {
    // Importar Monaco Editor
    require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        // Criar instÃ¢ncia do editor
        window.solidityEditor = monaco.editor.create(document.getElementById('solidity-editor'), {
            value: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract MyContract {\n    \n}',
            language: 'solidity',
            theme: 'vs-dark',
            automaticLayout: true
        });
    });

    // Funcionalidades do laboratÃ³rio
    setupLabFunctions();
});

function setupLabFunctions() {
    // Gerenciamento de redes
    const networkSelect = document.getElementById('networkSelect');
    networkSelect.addEventListener('change', handleNetworkChange);

    // BotÃµes de controle
    document.querySelector('.ctrl-btn.compile').addEventListener('click', compileContract);
    document.querySelector('.ctrl-btn.deploy').addEventListener('click', deployContract);
    document.querySelector('.ctrl-btn.verify').addEventListener('click', verifyContract);
    document.querySelector('.ctrl-btn.export').addEventListener('click', exportContract);

    // Console
    document.querySelector('.clear-console').addEventListener('click', clearConsole);
}

// FunÃ§Ãµes principais
function handleNetworkChange(e) {
    const network = e.target.value;
    logToConsole(`Rede alterada para: ${network}`);
    updateGasTracker(network);
}

function compileContract() {
    const code = window.solidityEditor.getValue();
    logToConsole('Compilando contrato...');
    
    // Aqui vocÃª integraria com solc-js para compilaÃ§Ã£o real
    setTimeout(() => {
        logToConsole('CompilaÃ§Ã£o concluÃ­da com sucesso!');
        updateContractInfo({
            bytecodeSize: '3.2 KB',
            version: '0.8.19',
            optimizationRuns: 200
        });
    }, 1000);
}

function deployContract() {
    logToConsole('Iniciando implantaÃ§Ã£o...');
    // IntegraÃ§Ã£o com Web3.js/Ethers.js para implantaÃ§Ã£o real
}

function verifyContract() {
    logToConsole('Iniciando verificaÃ§Ã£o...');
    // IntegraÃ§Ã£o com APIs de verificaÃ§Ã£o (Etherscan, Sourcify)
}

function exportContract() {
    const code = window.solidityEditor.getValue();
    const blob = new Blob([code], {type: 'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SmartContract.sol';
    a.click();
}

// FunÃ§Ãµes auxiliares
function logToConsole(message) {
    const consoleOutput = document.getElementById('console-output');
    const timestamp = new Date().toLocaleTimeString();
    consoleOutput.innerHTML += `[${timestamp}] ${message}\n`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function updateContractInfo(info) {
    const infoContent = document.querySelector('.info-content');
    infoContent.innerHTML = `
        <div>Tamanho do Bytecode: ${info.bytecodeSize}</div>
        <div>VersÃ£o do Solidity: ${info.version}</div>
        <div>OtimizaÃ§Ã£o: ${info.optimizationRuns} runs</div>
    `;
}

function updateGasTracker(network) {
    const gasStats = document.querySelector('.gas-stats');
    // Aqui vocÃª integraria com APIs de gas (ETH Gas Station, etc.)
    gasStats.innerHTML = `
        <div>Gas Base: 21000 gwei</div>
        <div>Gas PrioritÃ¡rio: 25000 gwei</div>
        <div>Gas RÃ¡pido: 30000 gwei</div>
    `;
}

function clearConsole() {
    document.getElementById('console-output').innerHTML = '';
}











/*=================================================================================================================
   C A L E N D Ã R I O   D E   E V E N T O S
=================================================================================================================*/

// ConfiguraÃ§Ã£o do CalendÃ¡rio
function initCalendar() {
    const date = new Date();
    const calendar = {
        currentMonth: date.getMonth(),
        currentYear: date.getFullYear(),
        selectedDate: null,
        events: []
    };

    // Preenche o calendÃ¡rio
    function renderCalendar() {
        const firstDay = new Date(calendar.currentYear, calendar.currentMonth, 1);
        const lastDay = new Date(calendar.currentYear, calendar.currentMonth + 1, 0);
        const gridContainer = document.querySelector('.calendar-grid');
        const monthDisplay = document.querySelector('.calendar-nav h3');

        // Limpa dias existentes
        const existingDays = gridContainer.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());

        // Atualiza o mÃªs/ano mostrado
        const months = ['Janeiro', 'Fevereiro', 'MarÃ§o', 'Abril', 'Maio', 'Junho', 
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        monthDisplay.textContent = `${months[calendar.currentMonth]} ${calendar.currentYear}`;

        // Adiciona dias vazios atÃ© o primeiro dia do mÃªs
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            gridContainer.appendChild(emptyDay);
        }

        // Adiciona os dias do mÃªs
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            // Verifica se hÃ¡ eventos neste dia
            const dateStr = `${calendar.currentYear}-${calendar.currentMonth + 1}-${day}`;
            const hasEvents = calendar.events.some(event => event.date === dateStr);
            if (hasEvents) {
                dayElement.classList.add('has-event');
            }

            dayElement.addEventListener('click', () => selectDate(day));
            gridContainer.appendChild(dayElement);
        }
    }

    // NavegaÃ§Ã£o entre meses
    document.querySelector('.calendar-nav .nav-btn:first-child').addEventListener('click', () => {
        calendar.currentMonth--;
        if (calendar.currentMonth < 0) {
            calendar.currentMonth = 11;
            calendar.currentYear--;
        }
        renderCalendar();
    });

    document.querySelector('.calendar-nav .nav-btn:last-child').addEventListener('click', () => {
        calendar.currentMonth++;
        if (calendar.currentMonth > 11) {
            calendar.currentMonth = 0;
            calendar.currentYear++;
        }
        renderCalendar();
    });

    // Adicionar novo evento
    const newEventBtn = document.querySelector('.menuitem-btn');
    newEventBtn.addEventListener('click', () => {
        // Implementar modal de novo evento
        showNewEventModal();
    });

    // Filtrar eventos
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterEvents(btn.textContent.toLowerCase());
        });
    });

    // Inicializa o calendÃ¡rio
    renderCalendar();
}

// Modal para novo evento
function showNewEventModal() {
    // Template do modal
    const modalHTML = `
        <div class="event-modal">
            <div class="modal-content">
                <h3>Novo Evento</h3>
                <form id="newEventForm">
                    <div class="form-group">
                        <label>TÃ­tulo</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Data</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Tipo</label>
                        <select required>
                            <option value="listing">Listagem</option>
                            <option value="airdrop">Airdrop</option>
                            <option value="presale">PrÃ©-venda</option>
                            <option value="staking">Staking</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancelar</button>
                        <button type="submit" class="save-btn">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Adiciona o modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Implementa a lÃ³gica do modal
    const modal = document.querySelector('.event-modal');
    const form = document.getElementById('newEventForm');
    
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implementar lÃ³gica de salvamento
        modal.remove();
    });
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initCalendar);













/*=================================================================================================================
   Tecnologias - Carrossel e Tabs
=================================================================================================================*/

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tech-tab');
    const contents = document.querySelectorAll('.tech-tab-content');
    const descriptions = document.querySelectorAll('.description-content');

    function initializeCarousel(container) {
        const track = container.querySelector('.carousel-track');
        const cards = track.querySelectorAll('.tech-card');
        const prevButton = container.querySelector('.carousel-btn.prev');
        const nextButton = container.querySelector('.carousel-btn.next');
        const tabId = container.id;

        // Clona os cards para criar efeito infinito
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        // Atualiza a largura do track para acomodar os clones
        track.style.width = `${cards.length * 2 * 200}px`;
        
        let currentIndex = 0;
        const cardWidth = 200;
        let isTransitioning = false;
        let autoPlayInterval;

        function updateTechDescription(card) {
            const techName = card.getAttribute('data-tech');
            const descContainer = document.getElementById(`${tabId}-desc`);
            
            if (descContainer) {
                const techItems = descContainer.querySelectorAll('.tech-item');
                techItems.forEach(item => item.style.display = 'none');
                
                const selectedDesc = document.getElementById(`tech-${techName}`);
                if (selectedDesc) {
                    selectedDesc.style.display = 'block';
                }
            }
        }

        function moveCarousel(direction) {
            if (isTransitioning) return;
            isTransitioning = true;

            const moveAmount = direction === 'next' ? 1 : -1;
            currentIndex += moveAmount;

            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            setTimeout(() => {
                if (currentIndex >= cards.length) {
                    track.style.transition = 'none';
                    currentIndex = 0;
                    track.style.transform = 'translateX(0)';
                } else if (currentIndex < 0) {
                    track.style.transition = 'none';
                    currentIndex = cards.length - 1;
                    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                }
                isTransitioning = false;
            }, 500);
        }

        function startAutoPlay() {
            return setInterval(() => moveCarousel('next'), 3000);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }

        // Event listeners para todos os cards (originais e clones)
        track.querySelectorAll('.tech-card').forEach(card => {
            card.addEventListener('click', () => {
                track.querySelectorAll('.tech-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                updateTechDescription(card);
            });
        });

        prevButton.addEventListener('click', () => {
            stopAutoPlay();
            moveCarousel('prev');
            autoPlayInterval = startAutoPlay();
        });

        nextButton.addEventListener('click', () => {
            stopAutoPlay();
            moveCarousel('next');
            autoPlayInterval = startAutoPlay();
        });

        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', () => {
            autoPlayInterval = startAutoPlay();
        });

        autoPlayInterval = startAutoPlay();

        const firstCard = track.querySelector('.tech-card');
        if (firstCard) {
            firstCard.click();
        }
    }

    // Funcionalidade das tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            descriptions.forEach(d => d.classList.remove('active'));

            tab.classList.add('active');
            const tabId = tab.dataset.tab;
            
            const targetContent = document.getElementById(tabId);
            const targetDesc = document.getElementById(`${tabId}-desc`);
            
            if (targetContent) {
                targetContent.classList.add('active');
                initializeCarousel(targetContent);
            }
            
            if (targetDesc) {
                targetDesc.classList.add('active');
            }
        });
    });

    // Inicializa o carrossel da primeira tab
    const firstTabContent = document.querySelector('.tech-tab-content.active');
    if (firstTabContent) {
        initializeCarousel(firstTabContent);
    }
});












/*=================================================================================================================
   FATURAS
=================================================================================================================*/

// FunÃ§Ã£o para gerar o QR Code
function generateQRCode(invoiceData) {
    // Limpa o elemento anterior
    document.getElementById('qrcode').innerHTML = '';
    
    // Cria o QR Code
    new QRCode(document.getElementById('qrcode'), {
        text: JSON.stringify(invoiceData),
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Exemplo de uso
const invoiceData = {
    type: 'payment',
    amount: '1.5 ETH',
    date: '21/04/2025',
    address: '0x71C7...F34E'
};

generateQRCode(invoiceData);

// Handler para download do QR Code
document.querySelector('.qr-btn.download').addEventListener('click', () => {
    const canvas = document.querySelector('#qrcode canvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = 'invoice-qr.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});







		/*-------------------------------------------------------------------------------------------
		----   S e l e c t o r   d e   O p e r a d o r a s   I n t e r n a c i o n a i s     ------*/

        function updateFlag() {
            const select = document.getElementById('countryCode');
            const selectedOption = select.options[select.selectedIndex];
            const telOperator = document.getElementById('nationCode');
            const flagImg = document.getElementById('selected-flag');
            const flagUrl = selectedOption.getAttribute('data-image');
        
            telOperator.textContent = selectedOption.value;
            flagImg.src = flagUrl;
        }
        
        // Atualiza a bandeira e código ao carregar a página
        window.onload = updateFlag;
        
        // Atualiza quando o select muda
        document.getElementById('countryCode').addEventListener('change', updateFlag);
        
        // Faz o clique na custom-operator disparar o clique no select
        document.getElementById('customOperator').addEventListener('click', () => {
            document.getElementById('countryCode').focus();
            document.getElementById('countryCode').click();
        });
        