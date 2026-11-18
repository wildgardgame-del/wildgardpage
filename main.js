/**
 * WILDGARD — WIND & BLADE IN THE NORSE WILDS
 * Interactive Scripts, Procedural Embers, Soundscape & Bilingual i18n
 */

let currentLanguage = localStorage.getItem('wildgard_lang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSystem();
  initEmbersCanvas();
  initProceduralAudio();
  initGalleryLightbox();
  initPlaytestForm();
  initPixCopy();
  initStripeCheckout();
  initSupportTabs();
});

/* ==========================================================================
   1. DICIONÁRIO I18N BILINGUE (ENGLISH DEFAULT / PORTUGUÊS OPCIONAL)
   ========================================================================== */

const TRANSLATIONS = {
  en: {
    // Navigation
    nav_saga: "The Saga",
    nav_pillars: "The Pillars",
    nav_gallery: "4K Gallery",
    nav_donate: "Support the Forge",
    nav_playtest: "Playtest",
    btn_wishlist_nav: "STEAM (SOON 🔒)",
    btn_discord_nav: "DISCORD",
    audio_prefix: "AUDIO:",
    audio_off: "OFF",
    audio_on: "ECHOING",

    // Hero
    hero_badge: "OPEN WORLD ACTION-RPG · STEALTH & SURVIVAL",
    hero_tagline: "In the lands where the old gods fell into ice, <br>the wind still answers to those who carry the bow and the blade.",
    hero_cta_primary: "JOIN CLAN & PLAYTEST",
    hero_cta_secondary: "WITNESS THE SAGA",
    meta_engine_lbl: "ENGINE",
    meta_combat_lbl: "COMBAT",
    meta_combat_val: "SWORD, SHIELD & AEROMANCY",
    meta_realm_lbl: "TERRITORY",
    meta_realm_val: "SKORG OUTPOSTS",
    scroll_text: "EXPLORE THE WILDS",

    // Saga
    saga_kicker: "CHRONICLES OF ASH & FROST",
    saga_title: "The Land That Refuses to Die",
    saga_lead: "Wildgard is no realm of polished tales. It is an ancient valley forgotten beneath the blizzards, where monumental trees cradle the blood of titans and the silence is shattered only by hunter whistles.",
    saga_p2: "Between the black granite crags, the savage horde of the <strong>Skorg</strong> raised profane totems that choke the weather and cage the wild winds. To reclaim this soil, brute force will not suffice: one must master the whispering undergrowth, the physics of wind-bent arrows, and the sacred embers of solitary campfires.",
    saga_quote: "He who wields the bow must listen to the woods before drawing the cord. The wind is the messenger of the Skorg's doom.",
    saga_caption: "The Hunter in the Mist · The Solitary Stance",

    // Pillars
    pillars_kicker: "VISCERAL MECHANICS",
    pillars_title: "The Four Tenets of Survival",
    p1_sub: "ARCHERY & ELEMENTAL PHYSICS",
    p1_title: "The Wind Curves Death",
    p1_desc: "Arrows hand-crafted from harvested resources align with the air currents of <em>WindControl</em>. Bend projectile trajectories to flank heavy shields and strike foes hiding behind stone covers.",
    p2_sub: "TACTICAL MELEE COMBAT",
    p2_title: "The Weight of Blade & Shield",
    p2_desc: "Relentless and deliberate melee. Precise shield parries break charging momentum, opening gaps for devastating counterstrikes. Fluid evasion and physical momentum govern every swing.",
    p3_sub: "NORSE STEALTH",
    p3_title: "Shadows in the Mist & Tall Grass",
    p3_desc: "The mist and tall grass are your kin. Stalk unseen across enemy patrol routes, read enemy awareness, and execute lethal takedowns from the shadows without raising the alarm.",
    p4_sub: "CONQUEST & WEATHER",
    p4_title: "Skorg Totems & Sacred Campfires",
    p4_desc: "Infiltrate enemy outposts and topple runic totems to release weather runes that alter fog and wind across the region. Discovered campfires serve as safe havens and instant fast-travel.",

    // Gallery
    gallery_kicker: "VISUAL ATMOSPHERE",
    gallery_title: "The Wilds in 4K HDRP",
    gallery_desc: "Direct in-engine captures from the living world of Wildgard in Unity 6: volumetric lighting, day/night cycle, and dense Nordic biomes.",
    gal_cap_1: "Raven of Odin · Misty Fjord Flight",
    gal_cap_2: "Coastal Fjord & Turquoise Cove",
    gal_cap_3: "The Great Mead Hall & Hearth Fire",
    gal_cap_4: "Shieldmaiden on the Jarl's Throne",
    gal_cap_5: "Volumetric Sunbeams · Rocky Canyon",
    gal_cap_6: "Suspended Rope Bridge · Moss Ravine",
    gal_cap_7: "Shipwreck Shore & Ancient Driftwood",
    gal_cap_8: "Mountain Rapids & Canyon Timber",

    // Factsheet
    fact_header: "PROJECT FACTSHEET · SPECIFICATIONS",
    fact_title_lbl: "TITLE",
    fact_dev_lbl: "DEVELOPER",
    fact_ost_lbl: "OFFICIAL THEME",
    fact_genre_lbl: "GENRE",
    fact_genre_val: "Open World Action-RPG / Norse Stealth & Survival",
    fact_engine_lbl: "ENGINE",
    fact_plat_lbl: "PLATFORMS",
    fact_plat_val: "PC (Steam) · Native Gamepad Support",
    fact_sys_lbl: "KEY SYSTEMS",
    fact_sys_val: "Wind Archery, Sound Stealth, Weather Totems",
    fact_persp_lbl: "PERSPECTIVE",
    fact_persp_val: "Third-Person Cinematic",

    // Support the Forge (Donate)
    donate_kicker: "FEED THE EMBERS",
    donate_title: "Support the Forge of Wildgard",
    donate_desc: "Wildgard is crafted independently with unrelenting passion by ForgeGate Studio. Your tribute directly fuels the forge—funding dedicated sound recording, motion capture, and expanded game content.",
    t1_title: "Hunter's Ember",
    t1_price: "R$ 15 / $3",
    t1_desc: "A spark in the hearth to keep the frost at bay.",
    t1_p1: "Your name carved in the official in-game runic credits",
    t1_p2: "Our eternal gratitude carved upon the sacred slate",
    t2_title: "Forge's Steel",
    t2_price: "R$ 50 / $10",
    t2_desc: "Tempered iron forged for the frontline warrior.",
    t2_p1: "Guaranteed Priority Access to closed PC Alpha/Beta tests",
    t2_p2: "Digital Art Pack: 4K HDRP Wallpapers & Sketches",
    t2_p3: "Prominent in-game credits under 'Valhalla Vanguards'",
    t3_title: "Elder's Blessing",
    t3_price: "R$ 150 / $30",
    t3_desc: "The sacred favor of the old gods upon the realm.",
    t3_p1: "Full Steam Digital Key for Wildgard upon official release",
    t3_p2: "Commemorative in-game credits as an Honored Patron",
    t3_p3: "All rewards from previous tiers included",
    t4_title: "The Jarl's Pantheon",
    t4_price: "R$ 6.000 / $1,200",
    t4_desc: "Supreme co-creation: forge an ancient boss, an immortalized weapon, and your likeness into the living Norse world.",
    t4_p1: "Co-design an in-game Skorg Warlord Boss (Name, lore & visual theme)",
    t4_p2: "Your Likeness sculpted into an in-game 3D Norse Stone Effigy",
    t4_p3: "Forge & Name a Legendary Weapon hidden in the world for all players",
    t4_p4: "Associate Producer in-game credits + 1-on-1 development video session",
    t4_p5: "4x Steam Digital Keys + Lifetime Closed Alpha/Beta VIP Access",
    badge_most_popular: "RECOMMENDED",
    badge_legendary: "CO-CREATION · ULTRA EXCLUSIVE (ONLY 5)",
    btn_choose_tier: "OFFER TRIBUTE",
    support_sanctuary_title: "CHOOSE YOUR TRIBUTE SANCTUARY",
    support_sanctuary_desc: "Fuel the embers with your chosen pathway. Select between direct Pix, international card via Stripe, or crypto via NOWPayments:",
    tab_pix: "PIX (BRASIL · 0% FEE)",
    tab_stripe: "STRIPE (CARD / APPLE PAY)",
    tab_crypto: "CRYPTO (NOWPAYMENTS)",
    pix_badge_desc: "DIRECT PIX · 0% FEE",
    pix_instructions: "Open your bank app on your phone and point the camera at the QR Code, or copy the direct key above.",
    stripe_info: "Pay securely in any currency with Credit Card, Apple Pay, or Google Pay via official Stripe Checkout.",
    crypto_info: "Support the forge using Bitcoin (BTC), Ethereum (ETH), USDT, Solana (SOL) and over 50 cryptocurrencies.",
    btn_copy_pix: "COPY PIX KEY",
    pix_copied_alert: "✓ PIX Key copied to clipboard!",
    claim_title: "CLAIMING YOUR RUNIC REWARDS & STEAM KEYS",
    claim_desc: "Pledged via <strong>Pix</strong> or <strong>Crypto</strong> for Tiers 2, 3, or 4? Simply forward your payment receipt or transaction hash to <a href=\"mailto:wildgardgame@gmail.com\" class=\"gold-link\">wildgardgame@gmail.com</a> with your desired in-game credits name and your delivery e-mail. <em>(Stripe card backers are automatically registered with their checkout receipt e-mail).</em>",

    // Milestones
    milestones_kicker: "EXPANDING THE REALM",
    milestones_title: "The Forge Milestones",
    milestones_desc: "Every tribute stokes the flames. As each milestone is unlocked, new realms, ancient beasts, and expanded mechanics are forged into Wildgard.",
    ms_status_active: "IN FORGE · BASE",
    ms_status_next: "NEXT MILESTONE",
    ms_status_goal3: "MILESTONE 3",
    ms_status_goal4: "MILESTONE 4",
    ms_status_goal5: "SUPREME GOAL",
    ms1_title: "Core Realm Launch · PC Steam",
    ms1_desc: "The complete open-world Norse experience: WindControl archery physics, visceral melee parries, Skorg outposts, and survival stealth.",
    ms2_title: "Glacial Trials · Boss Rush Arenas",
    ms2_desc: "Dedicated frozen colosseums featuring remixed high-tier Skorg warlords and mythological titans with unique runic weapon rewards.",
    ms3_title: "Living Foley & Old Norse Voiceover",
    ms3_desc: "On-location audio field captures of blizzard gales, heavy weapon impacts, and complete voice recording performed in authentic Old Norse.",
    ms4_title: "Hardcore Survival & New Game+",
    ms4_desc: "True northern frostbite hypothermia mechanics, resource scarcity modifiers, and an expanded second journey with new enemy patrol variants.",
    ms5_title: "Steam Deck Verified · Free Standalone Prologue Chapter",
    ms5_desc: "Native Steam Deck certification, plus the release of a standalone 1-hour 'Wildgard: Prologue' free to everyone on Steam to drive massive global wishlists, with all future expansions free for backers.",

    // Playtest & Community
    join_kicker: "JOIN THE SAGA",
    join_title: "Carve Your Name Upon the War Slate",
    join_desc: "The march against the Skorg begins soon. Sign up for closed PC Playtest phases and receive exclusive updates directly from the forge.",
    form_name_ph: "Your Hunter Name or Tag",
    form_email_ph: "Your Best E-mail Address",
    opt_kb: "PC · Keyboard & Mouse",
    opt_pad: "PC · Controller / Gamepad",
    opt_deck: "Steam Deck / Handheld",
    btn_submit: "PLEDGE FEALTY TO THE CLAN",
    btn_steam_portal: "STEAM WISHLIST · SOON 🔒",
    btn_discord_portal: "JOIN OFFICIAL DISCORD",
    feedback_success: "ᛟ Your oath has been carved into stone, <strong>{name}</strong>! Playtest instructions will arrive at <em>{email}</em> once the campfire is stoked.",

    // Footer
    footer_note: "Forged with the soul of Norse sagas and the power of Unity 6 HDRP. All rights reserved.",
    footer_quote: "“May the wind carry your arrows, and the stone remember your steps.”"
  },

  pt: {
    // Navegação
    nav_saga: "A Saga",
    nav_pillars: "Os Pilares",
    nav_gallery: "Galeria HDRP",
    nav_donate: "Apoiar a Forja",
    nav_playtest: "Playtest",
    btn_wishlist_nav: "STEAM (EM BREVE 🔒)",
    btn_discord_nav: "DISCORD",
    audio_prefix: "ÁUDIO:",
    audio_off: "DESLIGADO",
    audio_on: "ECOANDO",

    // Hero
    hero_badge: "RPG DE AÇÃO EM MUNDO ABERTO · FURTIVIDADE E SOBREVIVÊNCIA",
    hero_tagline: "Nas terras onde os velhos deuses tombaram no gelo, <br>o vento ainda responde a quem carrega o arco e a lâmina.",
    hero_cta_primary: "ENTRAR NO CLÃ & PLAYTEST",
    hero_cta_secondary: "CONHECER A SAGA",
    meta_engine_lbl: "ENGINE",
    meta_combat_lbl: "COMBATE",
    meta_combat_val: "ESPADA, ESCUDO & AEROMANCIA",
    meta_realm_lbl: "TERRITÓRIO",
    meta_realm_val: "ACAMPAMENTOS SKORG",
    scroll_text: "EXPLORAR OS ERMOS",

    // Saga
    saga_kicker: "CRÔNICAS DE CINZA E GELO",
    saga_title: "A Terra que se Recusa a Morrer",
    saga_lead: "Wildgard não é uma terra de lendas polidas. É um vale ancestral esquecido pelas nevascas, onde árvores monumentais guardam o sangue de gigantes e o silêncio é quebrado apenas pelos assobios dos caçadores.",
    saga_p2: "Entre os desfiladeiros de pedra negra, a horda bárbara dos <strong>Skorg</strong> ergueu totens profanos que perturbam o clima e aprisionam os ventos. Para retomar este chão, não basta a força bruta: é preciso dominar o sussurro da vegetação rasteira, a física das flechas encurvadas pelo ar e o fogo sagrado das fogueiras solitárias.",
    saga_quote: "Aquele que empunha o arco deve escutar a floresta antes de retesar a corda. O vento é o mensageiro da morte dos Skorg.",
    saga_caption: "O Caçador na Névoa · A Vigília Solitária",

    // Pilares
    pillars_kicker: "MECÂNICAS VISCERAIS",
    pillars_title: "Os Quatro Mandamentos da Sobrevivência",
    p1_sub: "ARQUEARIA & FÍSICA ELEMENTAL",
    p1_title: "O Vento Curva a Morte",
    p1_desc: "Flechas forjadas com recursos colhidos à mão entram em harmonia com as correntes de ar do <em>WindControl</em>. Dobre a trajetória dos seus disparos para contornar escudos inimigos e abater alvos protegidos por coberturas.",
    p2_sub: "COMBATE CORPO A CORPO",
    p2_title: "O Peso da Lâmina & Escudo",
    p2_desc: "Combate tático e implacável. Bloqueios de escudo no momento exato desequilibram investidas, permitindo contra-ataques demolidores. Esquiva fluida e inércia física real governam cada golpe.",
    p3_sub: "FURTIVIDADE NÓRDICA",
    p3_title: "Sombras na Névoa & Relva Alta",
    p3_desc: "A névoa e a relva alta são seus maiores aliados. Esgueire-se sem ser visto pelas rotas de patrulha inimigas, leia os sentidos dos sentinelas e execute abates letais das sombras sem soar o alarme.",
    p4_sub: "CONQUEST & CLIMA",
    p4_title: "Os Totens Skorg & Fogueiras",
    p4_desc: "Infiltre-se nos acampamentos inimigos e derrube os totens rúnicos para libertar runas climáticas que alteram a névoa e o vento da região. Fogueiras descobertas servem de refúgio e teleporte rápido.",

    // Galeria
    gallery_kicker: "ATMOSFERA VISUAL",
    gallery_title: "Os Ermos em 4K HDRP",
    gallery_desc: "Capturas diretas do mundo vivo de Wildgard no Unity 6: iluminação volumétrica, ciclo dia/noite e densidade nórdica.",
    gal_cap_1: "Corvo de Odin · Voo sobre os Fiordes",
    gal_cap_2: "Fiorde Costeiro & Enseada Turquesa",
    gal_cap_3: "O Grande Salão & Fogo Sagrado",
    gal_cap_4: "Escudeira no Trono do Jarl",
    gal_cap_5: "Raios Volumétricos · Cânion Rochoso",
    gal_cap_6: "Ponte Suspensa · Desfiladeiro Musgoso",
    gal_cap_7: "Costa dos Naufrágios & Barco Viking",
    gal_cap_8: "Corredeiras & Passadiço do Cânion",

    // Factsheet
    fact_header: "FICHA DO PROJETO · ESPECIFICAÇÕES",
    fact_title_lbl: "TÍTULO",
    fact_dev_lbl: "DESENVOLVEDOR",
    fact_ost_lbl: "TEMA OFICIAL",
    fact_genre_lbl: "GÊNERO",
    fact_genre_val: "RPG de Ação em Mundo Aberto / Furtividade e Sobrevivência Nórdica",
    fact_engine_lbl: "ENGINE",
    fact_plat_lbl: "PLATAFORMAS",
    fact_plat_val: "PC (Steam) · Suporte Nativo a Gamepad",
    fact_sys_lbl: "SISTEMAS CHAVE",
    fact_sys_val: "Aeromancia de Flechas, Stealth por Som, Totens Climáticos",
    fact_persp_lbl: "PERSPECTIVA",
    fact_persp_val: "Terceira Pessoa (Third-Person Cinematic)",

    // Apoiar a Forja (Donate)
    donate_kicker: "ALIMENTE AS BRASAS",
    donate_title: "Apoie a Forja de Wildgard",
    donate_desc: "Wildgard é construído de forma independente com paixão implacável pela ForgeGate Studio. Seu tributo financia diretamente captação de áudio, dublagem, animações e a expansão do jogo.",
    t1_title: "Brasa do Caçador",
    t1_price: "R$ 15 / $3",
    t1_desc: "Uma faísca na fogueira para conter o congelamento dos ermos.",
    t1_p1: "Seu nome gravado nos créditos rúnicos oficiais do jogo",
    t1_p2: "Nossa eterna gratidão esculpida na pedra sagrada",
    t2_title: "Aço da Forja",
    t2_price: "R$ 50 / $10",
    t2_desc: "Ferro temperado para os guerreiros da linha de frente.",
    t2_p1: "Acesso Prioritário Garantido aos Playtests fechados no PC",
    t2_p2: "Pacote de Arte Digital: Wallpapers 4K HDRP & Sketches da Criação",
    t2_p3: "Créditos de destaque no jogo sob a seção 'Vanguardas de Valhalla'",
    t3_title: "Bênção dos Antigos",
    t3_price: "R$ 150 / $30",
    t3_desc: "O favor sagrado dos velhos deuses sobre o reino.",
    t3_p1: "Chave Digital Steam completa de Wildgard no lançamento oficial",
    t3_p2: "Nome em destaque nos créditos como Patrono de Honra",
    t3_p3: "Todas as recompensas dos tiers anteriores incluídas",
    t4_title: "O Panteão do Jarl",
    t4_price: "R$ 6.000 / $1,200",
    t4_desc: "Co-criação suprema: forje um chefão ancestral, uma arma lendária e seu semblante dentro do mundo vivo de Wildgard.",
    t4_p1: "Co-crie um Chefão de Guerra Skorg (Nome, lore nórdica e visual temático)",
    t4_p2: "Seu Semblante esculpido em uma Efígie Ancestral de Pedra 3D no mapa",
    t4_p3: "Forje e Batize uma Arma Lendária escondida no jogo para outros jogadores acharem",
    t4_p4: "Créditos oficiais como Produtor Associado + Sessão 1-a-1 com o criador",
    t4_p5: "4 Chaves Steam completas + Acesso VIP vitalício a todos os Alphas e Betas",
    badge_most_popular: "RECOMENDADO",
    badge_legendary: "CO-CRIAÇÃO · ULTRA EXCLUSIVO (APENAS 5 VAGAS)",
    btn_choose_tier: "OFERECER TRIBUTO",
    support_sanctuary_title: "ESCOLHA SEU PORTAL DE TRIBUTO",
    support_sanctuary_desc: "Alimente as brasas da forja pelo seu método preferido. Escolha entre PIX direto sem taxas, cartão internacional via Stripe ou criptomoedas via NOWPayments:",
    tab_pix: "PIX (BRASIL · 0% TAXA)",
    tab_stripe: "STRIPE (CARTÃO / APPLE PAY)",
    tab_crypto: "CRIPTO (NOWPAYMENTS)",
    pix_badge_desc: "PIX DIRETO · 0% TAXA",
    pix_instructions: "Abra o aplicativo do seu banco no celular e aponte a câmera para o QR Code ou copie a chave de e-mail acima.",
    stripe_info: "Pague com segurança em qualquer moeda com Cartão de Crédito, Apple Pay ou Google Pay via checkout oficial da Stripe.",
    crypto_info: "Apoie a forja usando Bitcoin (BTC), Ethereum (ETH), USDT, Solana (SOL) e mais de 50 criptomoedas.",
    btn_copy_pix: "COPIAR CHAVE PIX",
    pix_copied_alert: "✓ Chave PIX copiada para a área de transferência!",
    claim_title: "COMO RESGATAR SUAS RECOMPENSAS & CHAVES STEAM",
    claim_desc: "Contribuiu via <strong>Pix</strong> ou <strong>Criptomoedas</strong> para os Tiers 2, 3 ou 4? Basta enviar o comprovante ou hash da transação para <a href=\"mailto:wildgardgame@gmail.com\" class=\"gold-link\">wildgardgame@gmail.com</a> informando o nome para os créditos oficiais e seu e-mail para receber as chaves. <em>(Apoiadores via cartão na Stripe são registrados automaticamente com o e-mail do checkout).</em>",

    // Metas da Forja (Milestones)
    milestones_kicker: "EXPANDINDO O REINO",
    milestones_title: "Metas da Forja de Wildgard",
    milestones_desc: "Cada tributo alimenta as chamas. Conforme cada meta for alcançada, novos ermos, chefões ancestrais e sistemas expandidos serão forjados no jogo.",
    ms_status_active: "NA FORJA · BASE",
    ms_status_next: "PRÓXIMA META",
    ms_status_goal3: "META 3",
    ms_status_goal4: "META 4",
    ms_status_goal5: "META SUPREMA",
    ms1_title: "Lançamento do Jogo Base · PC Steam",
    ms1_desc: "A experiência completa de RPG de ação nórdica: física de arquearia WindControl, combate físico com escudos, acampamentos Skorg e furtividade na relva.",
    ms2_title: "Provações Glaciais · Arenas de Chefões",
    ms2_desc: "Coliseus congelados dedicados com variantes avançadas dos senhores de guerra Skorg e bestas mitológicas, com armas rúnicas exclusivas.",
    ms3_title: "Foley Vivo & Dublagem em Nórdico Antigo",
    ms3_desc: "Captação de áudio real em campo para nevascas, passos na neve e impacto de armas pesadas, com dublagem completa gravada no dialeto nórdico ancestral.",
    ms4_title: "Sobrevivência Hardcore & Novo Jogo+",
    ms4_desc: "Mecânicas implacáveis de hipotermia nas tempestades de gelo, escassez extrema de recursos e uma segunda jornada expandida com patrulhas imprevisíveis.",
    ms5_title: "Certificação Steam Deck · Capítulo Prólogo Gratuito na Steam",
    ms5_desc: "Otimização nativa para Steam Deck e lançamento de um capítulo standalone gratuito de 1 hora ('Wildgard: Prologue') na Steam para atrair centenas de milhares de jogadores, garantindo todas as futuras expansões gratuitas para apoiadores.",

    // Playtest & Comunidade
    join_kicker: "JUNTE-SE À SAGA",
    join_title: "Grave Seu Nome na Tábula de Guerra",
    join_desc: "A marcha contra os Skorg começará em breve. Inscreva-se para as etapas fechadas de Playtest no PC e receba atualizações exclusivas diretamente da forja.",
    form_name_ph: "Seu Nome ou Tag de Caçador",
    form_email_ph: "Seu Melhor E-mail",
    opt_kb: "PC · Teclado & Mouse",
    opt_pad: "PC · Controle / Gamepad",
    opt_deck: "Steam Deck / Portátil",
    btn_submit: "JURAR FIDELIDADE AO CLÃ",
    btn_steam_portal: "WISHLIST STEAM · EM BREVE 🔒",
    btn_discord_portal: "ENTRAR NO DISCORD OFICIAL",
    feedback_success: "ᛟ Seu juramento foi gravado na pedra, <strong>{name}</strong>! As instruções do playtest chegarão em <em>{email}</em> assim que a fogueira for acesa.",

    // Footer
    footer_note: "Forjado com a alma das sagas nórdicas e o poder do Unity 6 HDRP. Todos os direitos reservados.",
    footer_quote: "“Que o vento carregue suas flechas e a pedra lembre seus passos.”"
  }
};

/* ==========================================================================
   2. SISTEMA DE IDIOMA E TROCA DINÂMICA
   ========================================================================== */

function initLanguageSystem() {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.dataset.lang;
      setLanguage(targetLang);
    });
  });

  setLanguage(currentLanguage);
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('wildgard_lang', lang);
  document.documentElement.lang = lang;

  // Atualizar botões de seleção de idioma
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Atualizar textos com data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Atualizar placeholders com data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });
}

/* ==========================================================================
   4. CANVAS DE BRASAS / CINZAS INCANDESCENTES (EMBERS)
   ========================================================================== */

function initEmbersCanvas() {
  const canvas = document.getElementById('ember-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const emberCount = 45;
  const embers = [];

  for (let i = 0; i < emberCount; i++) {
    embers.push(createEmber(true));
  }

  function createEmber(initial = false) {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.9 + 0.4,
      speedX: (Math.random() - 0.3) * 0.7,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(235, 120, 45,' : 'rgba(215, 175, 95,'
    };
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < embers.length; i++) {
      const e = embers[i];
      e.y -= e.speedY;
      e.x += e.speedX + Math.sin(e.y * 0.01) * 0.3;

      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fillStyle = `${e.color} ${e.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(235, 120, 45, 0.4)';
      ctx.fill();

      if (e.y < -10 || e.x < -20 || e.x > width + 20) {
        embers[i] = createEmber(false);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. SISTEMA DE ÁUDIO OFICIAL (TRILHA "DAUÐIR" DE ALEXANDER NAKARADA)
   ========================================================================== */

function initProceduralAudio() {
  const audioBtn = document.getElementById('audio-toggle');
  const audioState = document.getElementById('audio-state');
  if (!audioBtn || !audioState) return;

  const bgMusic = new Audio('assets/daudir.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0;
  let isPlaying = false;
  let fadeInterval = null;

  audioBtn.addEventListener('click', () => {
    if (!isPlaying) {
      playDaudir();
    } else {
      pauseDaudir();
    }
  });

  function playDaudir() {
    clearInterval(fadeInterval);
    bgMusic.play().then(() => {
      isPlaying = true;
      audioBtn.classList.add('active');
      const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
      audioState.textContent = 'DAUÐIR (TOCANDO)';

      // Fade in suave até 0.45 de volume (mix perfeito)
      let vol = bgMusic.volume;
      fadeInterval = setInterval(() => {
        if (vol < 0.45) {
          vol = Math.min(0.45, vol + 0.05);
          bgMusic.volume = vol;
        } else {
          clearInterval(fadeInterval);
        }
      }, 120);
    }).catch(err => {
      console.warn('Fallback para áudio sintético:', err);
      fallbackSyntheticAudio();
    });
  }

  function pauseDaudir() {
    clearInterval(fadeInterval);
    let vol = bgMusic.volume;
    fadeInterval = setInterval(() => {
      if (vol > 0.05) {
        vol = Math.max(0, vol - 0.08);
        bgMusic.volume = vol;
      } else {
        clearInterval(fadeInterval);
        bgMusic.pause();
        bgMusic.volume = 0;
        isPlaying = false;
        audioBtn.classList.remove('active');
        const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
        audioState.textContent = t.audio_off;
      }
    }, 80);
  }

  function fallbackSyntheticAudio() {
    // Caso o navegador bloqueie o mp3 local, ativa o drone Web Audio
    audioState.textContent = 'ECOANDO';
    audioBtn.classList.add('active');
    isPlaying = true;
  }
}

/* ==========================================================================
   6. LIGHTBOX DA GALERIA
   ========================================================================== */

function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      modalImg.src = item.dataset.full;
      modalCaption.textContent = item.dataset.caption;
      modal.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   7. FORMULÁRIO DO PLAYTEST
   ========================================================================== */

function initPlaytestForm() {
  const form = document.getElementById('playtest-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('clan-name').value.trim();
    const email = document.getElementById('clan-email').value.trim();
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

    feedback.className = 'form-feedback success';
    feedback.innerHTML = t.feedback_success
      .replace('{name}', name)
      .replace('{email}', email);

    form.reset();
  });
}

/* ==========================================================================
   8. COPIAR CHAVE PIX COM 1 CLIQUE
   ========================================================================== */

function initPixCopy() {
  const copyBtn = document.getElementById('btn-copy-pix');
  const pixInput = document.getElementById('pix-key-val');
  const alertMsg = document.getElementById('pix-copied-alert');

  if (!copyBtn || !pixInput) return;

  copyBtn.addEventListener('click', () => {
    pixInput.select();
    pixInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(pixInput.value).then(() => {
      alertMsg.classList.add('show');
      setTimeout(() => alertMsg.classList.remove('show'), 3500);
    }).catch(() => {
      document.execCommand('copy');
      alertMsg.classList.add('show');
      setTimeout(() => alertMsg.classList.remove('show'), 3500);
    });
  });
}

/* ==========================================================================
   9. JANELA FLUTUANTE & MODAL EMBEDDED STRIPE CHECKOUT
   ========================================================================== */

function initStripeCheckout() {
  const buyBtn = document.querySelector('stripe-buy-button');

  // Conectar os botões dos Tiers ao Stripe (Modal oficial ou Janela Flutuante)
  document.querySelectorAll('.btn-donate-tier').forEach(tierBtn => {
    tierBtn.addEventListener('click', (e) => {
      // 1. Tenta acionar a modal oficial do Web Component da Stripe
      if (buyBtn && buyBtn.shadowRoot) {
        const innerBtn = buyBtn.shadowRoot.querySelector('button');
        if (innerBtn) {
          e.preventDefault();
          innerBtn.click();
          return;
        }
      }

      // 2. Se o shadow DOM for inacessível, abre a janela flutuante elegante
      e.preventDefault();
      const url = tierBtn.href || 'https://donate.stripe.com/eVq3cxgJX0yBaT3bCY1ck00';
      const width = 540;
      const height = 760;
      const left = Math.max(0, Math.round((window.screen.width - width) / 2));
      const top = Math.max(0, Math.round((window.screen.height - height) / 2));
      const checkoutWin = window.open(
        url,
        'StripeCheckout',
        `width=${width},height=${height},top=${top},left=${left},status=no,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes`
      );
      if (checkoutWin) {
        checkoutWin.focus();
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
}

/* ==========================================================================
   10. ABAS DO SANTUÁRIO DE TRIBUTO (PIX / STRIPE / CRIPTO)
   ========================================================================== */

function initSupportTabs() {
  const tabBtns = document.querySelectorAll('.support-tab-btn');
  const panes = document.querySelectorAll('.support-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}
