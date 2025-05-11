/*  SCRIPT OPTIMIZADO */

// Garantir que o script só execute quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Variáveis globais dentro do escopo da função
    let isConnected = false;
    
    /*=================================================================================================================
        O P T I M I Z A Ç Ã O   D E   E L E M E N T O S   A P Ó S   A   C O N E X Ã O
    =================================================================================================================*/
    
    async function optimizeElements(connectionStatus) {
        isConnected = connectionStatus;
        updateUIElements();
        autoSelectMenuItem();
    }
    
    function updateUIElements() {
        // Atualiza elementos da interface
        const elements = [
            { el: document.getElementById('connectButton'), display: isConnected ? 'none' : 'flex' },
            { el: document.getElementById('disconnectButton'), display: isConnected ? 'flex' : 'none' },
            { el: document.getElementById('title'), width: isConnected ? '43%' : '50%' },
            { el: document.getElementById('login'), width: isConnected ? '27%' : '20%' },
            { el: document.getElementById('home'), display: isConnected ? 'none' : 'flex' },
            { el: document.getElementById('default-content'), display: isConnected ? 'none' : 'block' },
            { el: document.getElementById('user'), display: isConnected ? 'flex' : 'none' },
            { el: document.getElementById('content1'), display: isConnected ? 'block' : 'none' },
            { el: document.getElementById('online-items'), display: isConnected ? 'block' : 'none' },
            // { el: document.getElementById('countdown'), display: isConnected ? 'none' : 'flex' },
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
                const userPanel = document.getElementById('user');
                if (userPanel) userPanel.click();
            }
        });
    
        // Atualiza perfil
        const profiles = document.getElementsByClassName('profile');
        Array.from(profiles).forEach(el => el.style.display = isConnected ? 'flex' : 'none');
    }
    
    function autoSelectMenuItem() {
        if (isConnected) {
            const userElement = document.getElementById('user');
            if (userElement) userElement.click();   // Simula clique automático no item "Perfil"
        } else {
            const homeElement = document.getElementById('home');
            if (homeElement) homeElement.click();   // Simula clique automático no item "Início"
        }
    }
    
    // Inicializa o estado conectado
    optimizeElements(true);
    
    // Adicionar evento de clique ao botão de desconexão
    const disconnectButton = document.getElementById('disconnectButton');
    if (disconnectButton) {
        disconnectButton.addEventListener('click', () => {
            optimizeElements(false);                    // Define o estado como desconectado
            console.log('Painel desconectado com sucesso!');
        });
    }



    /*=================================================================================================================
        D E F I N I Ç Ã O   D O   T E M A   D O   L A Y O U T
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
    
    // Define tema inicial ao carregar a página
    document.body.classList.add('light-theme');
    setActive(btnLight);
    iframe.style.display = 'none';
    
    
    /*------------------------------------------------------------------------------------------------------
        O p t i m i z a n d o   o s   E l e m e n t o s   A p ó s   a   D e f i n i ç ã o   d o
        T e m a   d o   L a y o u t
    ------------------------------------------------------------------------------------------------------*/
    
    const toggleButton = document.getElementById('toggle-menu');
    const toggleSpan = toggleButton.querySelector('span');
    const menu = document.getElementById('lateral-menu');
    const resizer = document.getElementById('menu-content');
    const footer = document.getElementById('x-footer');
    
    toggleButton.addEventListener('click', () => {
        menu.classList.toggle('active');            // Alterna a classe 'active' no menu
        toggleButton.classList.toggle('active');    // adiciona ou remove classe 'active' no botão
    
        // Verifica se o menu está ativo
        if (menu.classList.contains('active')) {
            toggleSpan.textContent = 'Ocultar';
            // Se o menu está ativo, optimiza os elementos...
            resizer.style.width = '78%';
            footer.style.width = '122%';
        } else {
            toggleSpan.textContent = 'Menu';
            // Se o menu não está ativo, restaura as definições...
            resizer.style.width = '100%';
            footer.style.width = '100%';
        }
    });
    
    

    /*=================================================================================================================
        C O N F I G U R A Ç Ã O   D E   T E L A - C H E I A   ( F u l l S c r e e n )
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
        S E L E C T O R   D E   I D I O M A S
    =================================================================================================================*/
    
    const languageSelector = document.querySelector('.language-selector');
    const selectedLanguage = languageSelector.querySelector('.selected-language');
    const options = languageSelector.querySelectorAll('ul li');
    
    options.forEach(option => {
      option.addEventListener('click', () => {
        // Atualiza a selector com a imagem da bandeira clicada
        const img = option.querySelector('img').cloneNode(true);
    
        selectedLanguage.innerHTML = '';
        selectedLanguage.appendChild(img);
    
        // Mostra todas as opções antes de ocultar a selecionada
        options.forEach(opt => opt.style.display = '');
    
        // Oculta a opção selecionada na lista
        option.style.display = 'none';
      });
    });
    
    // Oculta a opção que já está selecionada inicialmente
    function hideSelectedOption() {
      const selectedImgSrc = selectedLanguage.querySelector('img').src;
      options.forEach(option => {
        const optionImgSrc = option.querySelector('img').src;
        option.style.display = (optionImgSrc === selectedImgSrc) ? 'none' : '';
      });
    }
    
    // Executa para sincronizar o dropdown
    hideSelectedOption();
    
    

    /*=================================================================================================================
        M E N U - L A T E R A L   D I N Â M I C O
    =================================================================================================================*/
    
    // Recupera todos os elementos de menu e seções
    const menuItems = document.querySelectorAll('#menu li');
    const sections = document.querySelectorAll('.right-column section');
    
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
    
    function toggleSubmenu(item, submenu, e) {
        const isOpen = submenu.style.display === 'block';
        const mainContentId = item.getAttribute('data-content');
        
        // Se o submenu está fechado e estamos abrindo
        if (!isOpen) {
            closeAllSubmenus();
            submenu.style.display = 'block';
            item.classList.add('submenu-active');
            
            // Mostra o conteúdo principal se existir
            if (mainContentId) {
                updateSections(mainContentId);
            }
        } 
        // Se o submenu está aberto e estamos fechando
        else {
            submenu.style.display = 'none';
            item.classList.remove('submenu-active');
        }
    
        // Previne que o evento de click se propague apenas se clicarmos no ícone de toggle
        if (e.target.closest('.submenu-toggle')) {
            e.stopPropagation();
        }
    }
    
    // Gerenciamento do menu
    menuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        
        item.addEventListener('click', (e) => {
            const isSubmenuClick = e.target.closest('.submenu');
            const isToggleClick = e.target.closest('.submenu-toggle');
    
            // Se clicou em um item do submenu
            if (isSubmenuClick && !isToggleClick) {
                handleSubmenuItemClick(e, e.target.closest('li'));
                return;
            }
    
            // Remove classes ativas
            menuItems.forEach(i => i.classList.remove('active', 'defaultActive'));
            
            // Adiciona classe ativa apropriada
            item.classList.add(isConnected ? 'active' : 'defaultActive');
    
            // Se tem submenu
            if (submenu) {
                toggleSubmenu(item, submenu, e);
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
        B R E A D C R U M B   C L I C Á V E L
    =================================================================================================================*/
        
    // Script melhorado para lidar com ambos os tipos de elementos

    // Manipulador para os links do breadcrumb
    document.querySelectorAll('.breadcrumb a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showTargetSection(targetSection);
        });
    });
    
    // Manipulador para os botões metric-card
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const targetSection = this.getAttribute('data-section');
            showTargetSection(targetSection);
        });
    });
    
    // Função auxiliar para mostrar a seção alvo e ocultar as demais
    function showTargetSection(targetSection) {
        if (!targetSection) return;
        
        // Oculta todas as secções
        document.querySelectorAll('section[id^="content"]').forEach(section => {
            section.style.display = 'none';
        });
        
        // Mostra a secção alvo
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.style.display = 'block';
            
            // Atualiza o breadcrumb se necessário (opcional)
            updateBreadcrumb(targetSection);
        }
    }
    
    // Função opcional para atualizar o breadcrumb quando um botão metric-card é clicado
    function updateBreadcrumb(targetSection) {
        // Esta é uma implementação básica que você pode expandir conforme necessário
        const currentElement = document.querySelector('.breadcrumb .current');
        if (currentElement) {
            // Você pode personalizar esta lógica de acordo com a estrutura do seu breadcrumb
            // Por exemplo, encontrar o título da seção e atualizá-lo no breadcrumb
            const sectionTitle = document.querySelector(`#${targetSection} h2, #${targetSection} h3, #${targetSection} .section-title`);
            if (sectionTitle) {
                currentElement.textContent = sectionTitle.textContent;
            }
        }
    }



    /*=================================================================================================================
        F U N D O   D E   P A R T Í C U L A S   V I R T U A I S
    =================================================================================================================*/      

    // Verificar se o elemento existe antes de inicializar
    if (document.getElementById("particles-js")) {
        /* Configuração do particles.js */
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 120,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#3839E1"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3839E1",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 4,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

        /* Contador de partículas (opcional - pode remover se não desejar) */
        const count_particles = document.querySelector('.js-count-particles');
        
        function updateParticleCount() {
            if (window.pJSDom?.[0]?.pJS?.particles?.array) {
                count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
            }
            requestAnimationFrame(updateParticleCount);
        }        
        requestAnimationFrame(updateParticleCount);
    } else {
        console.error("Elemento #particles-js não encontrado!");
    }    
    
});
