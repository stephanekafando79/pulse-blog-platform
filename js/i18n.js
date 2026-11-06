/**
 * Pulse Internationalization (i18n) Engine
 * Multi-language support: English (en), Français (fr), Español (es), Deutsch (de), 日本語 (ja)
 */

(function () {
  const STORAGE_KEY = 'pulse_language_v1';

  const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English (US)', flag: '🇺🇸', region: 'United States / Global' },
    { code: 'fr', name: 'French', native: 'Français (France)', flag: '🇫🇷', region: 'France / Francophonie' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', region: 'España / Latinoamérica' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', region: 'Deutschland / DACH' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', region: '日本 (Japan)' }
  ];

  const TRANSLATIONS = {
    en: {
      // Navigation & Header
      write: 'Write',
      search_placeholder: 'Search stories across all 18 tech domains...',
      nav_bookmarks: 'Saved Bookmarks',
      switch_profile: 'Switch profile or avatar',
      toggle_theme: 'Toggle Dark/Light Mode',
      appearance: 'Appearance & Themes',
      language: 'Language',
      select_language: 'Select Language',
      language_sub: 'Choose your preferred language for the Pulse interface.',

      // Hero Section
      hero_badge: 'The Global Technology Knowledge Wire',
      hero_title: 'Where craft meets curiosity.',
      hero_subtitle: 'A high-signal publication covering Software Engineering, AI, CYSA, Cloud, FinTech, BioTech, Robotics, Aerospace, SpaceTech, and CleanTech.',
      stat_readers: 'Active Readers',
      stat_standards: 'Native Standards',
      stat_latency: 'Build Latency',
      start_reading: 'Start Reading',
      write_story: 'Write a Story',

      // Feeds & Tabs (All 18 Core Domains)
      feed_stories: 'Stories & Articles',
      feed_discussions: 'Community Wire',
      feed_live_news: 'Live Tech Wire',
      cat_all: 'All Tech Topics',
      cat_software_eng: 'Software Engineering',
      cat_ai: 'AI & Machine Learning',
      cat_cysa: 'CYSA & Cybersecurity',
      cat_cloud: 'Cloud Computing',
      cat_network_infra: 'Network & Infra',
      cat_product_design: 'Product & Design',
      cat_fintech: 'FinTech',
      cat_health_bio: 'HealthTech & BioTech',
      cat_edtech: 'Education Tech',
      cat_climate: 'Climate & CleanTech',
      cat_agtech: 'AgTech',
      cat_robotics_auto: 'Robotics & Automotive',
      cat_aerospace_space: 'Aerospace & SpaceTech',
      cat_iot: 'Internet of Things (IoT)',
      cat_hardware: 'Hardware & Silicon',
      cat_startups: 'Startups & VC',
      cat_agencies: 'Tech Agencies',
      cat_os: 'OS & Systems',
      cat_apps: 'APPs & Tools',

      // Community Wire
      wire_title: 'Pulse Community Wire',
      wire_subtitle: 'Real-time engineering debates, architecture takes, and peer discussions.',
      wire_placeholder: "What's on your mind? Share an architectural take, code challenge, or question...",
      wire_code_placeholder: 'Paste optional code snippet or CLI command...',
      wire_post_btn: 'Post Take',
      wire_reply: 'Reply',
      wire_upvote: 'Upvote',
      wire_share: 'Share',

      // Live News
      news_title: 'Real-Time Tech Wire',
      news_subtitle: 'Automated live feed aggregated from top engineering ecosystems and security channels.',
      news_refresh: 'Refresh Feed',

      // Reader & Comments
      back_to_stories: '← Back to Stories',
      min_read: 'min read',
      published_by: 'Published by',
      comments_title: 'Discussion & Peer Takes',
      comments_sub: 'Attach your technical perspective or debate tradeoffs.',
      comment_placeholder: 'Write a thoughtful technical response or challenge assumptions... (Markdown supported)',
      post_comment: 'Post Comment',
      tool_code: 'Code Block',
      tool_quote: 'Quote',
      tool_insight: 'Key Takeaway',
      share_article: 'Share Story',
      like_article: 'Like',
      bookmark_article: 'Bookmark',

      // Sidebar & Menu
      menu_home: 'Home Stories',
      menu_wire: 'Explore Communities (Wire)',
      menu_news: 'Live News Stream',
      menu_popular: 'Popular & Trending',
      menu_bookmarks: 'Saved Bookmarks',
      menu_newsletter: 'Newsletter Digest',
      menu_collections: 'My Collections',
      menu_history: 'Search History',
      menu_settings: 'Feed & Content Settings',
      menu_avatars: 'Avatar Gallery (Photos & Stickers)',
      menu_profile: 'Manage Profile / Log In',
      menu_appearance: 'Themes & Color Accents',
      menu_language: 'Language Settings',

      // Themes Modal
      theme_modal_title: 'Customize Theme & Appearance',
      theme_modal_sub: 'Personalize your reading interface with custom themes and vibrant color accents.',
      theme_mode_heading: 'Theme Base Mode',
      theme_accent_heading: 'Accent Color of Choice',
      theme_light: 'Light Paper',
      theme_dark: 'Dark Obsidian',
      theme_midnight: 'Midnight OLED',
      theme_cyberpunk: 'Cyberpunk Neon',
      theme_forest: 'Nordic Forest',
      theme_sepia: 'Warm Sepia',
      accent_indigo: 'Pulse Indigo',
      accent_cyan: 'Cyber Cyan',
      accent_emerald: 'Emerald Mint',
      accent_rose: 'Rose Sunset',
      accent_amber: 'Electric Amber',
      accent_violet: 'Royal Violet',
      accent_custom: 'Custom Hex Color',
      save_theme_btn: 'Apply & Close',

      // System Toasts
      lang_changed: 'Language switched to English 🇺🇸',
      theme_applied: 'Theme & colors updated successfully!',
      copied_link: 'Link copied to clipboard!'
    },

    fr: {
      // Navigation & Header
      write: 'Écrire',
      search_placeholder: 'Rechercher parmi les 18 domaines technologiques...',
      nav_bookmarks: 'Favoris enregistrés',
      switch_profile: 'Changer de profil ou avatar',
      toggle_theme: 'Basculer mode Sombre/Clair',
      appearance: 'Thèmes & Apparence',
      language: 'Langue',
      select_language: 'Choisir la langue',
      language_sub: "Sélectionnez votre langue préférée pour l'interface de Pulse.",

      // Hero Section
      hero_badge: 'Le Fil Mondial du Savoir Technologique',
      hero_title: 'Où le savoir-faire rencontre la curiosité.',
      hero_subtitle: 'Publication de référence couvrant le Génie Logiciel, l’IA, la Cybersécurité, le Cloud, la FinTech, la BioTech, la Robotique, l’Aérospatiale et les CleanTech.',
      stat_readers: 'Lecteurs Actifs',
      stat_standards: 'Standards Natifs',
      stat_latency: 'Latence de Build',
      start_reading: 'Commencer la lecture',
      write_story: 'Rédiger un article',

      // Feeds & Tabs (All 18 Core Domains)
      feed_stories: 'Articles & Publications',
      feed_discussions: 'Fil Communautaire',
      feed_live_news: 'Fil Actualités Direct',
      cat_all: 'Tous les Sujets',
      cat_software_eng: 'Génie Logiciel',
      cat_ai: 'IA & Machine Learning',
      cat_cysa: 'CYSA & Cybersécurité',
      cat_cloud: 'Cloud Computing',
      cat_network_infra: 'Réseaux & Infrastructure',
      cat_product_design: 'Produit & Design',
      cat_fintech: 'FinTech',
      cat_health_bio: 'HealthTech & BioTech',
      cat_edtech: 'EdTech & Éducation',
      cat_climate: 'Climat & CleanTech',
      cat_agtech: 'AgTech & Agriculture',
      cat_robotics_auto: 'Robotique & Automobile',
      cat_aerospace_space: 'Aérospatiale & Espace',
      cat_iot: 'Internet des Objets (IoT)',
      cat_hardware: 'Matériel & Silicium',
      cat_startups: 'Startups & VC',
      cat_agencies: 'Agences Tech',
      cat_os: 'Systèmes & OS',
      cat_apps: 'Applications & Outils',

      // Community Wire
      wire_title: 'Fil Communautaire Pulse',
      wire_subtitle: "Débats d'ingénierie en temps réel, choix d'architecture et discussions techniques.",
      wire_placeholder: 'Partagez une réflexion technique, un défi de code ou une question...',
      wire_code_placeholder: 'Collez un extrait de code ou une commande CLI optionnelle...',
      wire_post_btn: 'Publier le message',
      wire_reply: 'Répondre',
      wire_upvote: 'Voter pour',
      wire_share: 'Partager',

      // Live News
      news_title: 'Fil Actualités Tech en Direct',
      news_subtitle: "Flux continu automatisé provenant des meilleurs écosystèmes d'ingénierie et de cybersécurité.",
      news_refresh: 'Actualiser le flux',

      // Reader & Comments
      back_to_stories: '← Retour aux articles',
      min_read: 'min de lecture',
      published_by: 'Publié par',
      comments_title: 'Discussions & Avis des Pairs',
      comments_sub: 'Apportez votre perspective technique ou débattez des compromis.',
      comment_placeholder: 'Rédigez une réponse technique détaillée ou partagez votre expérience... (Markdown supporté)',
      post_comment: 'Publier le commentaire',
      tool_code: 'Bloc de code',
      tool_quote: 'Citation',
      tool_insight: 'Point clé',
      share_article: "Partager l'article",
      like_article: "J'aime",
      bookmark_article: 'Enregistrer',

      // Sidebar & Menu
      menu_home: "Articles d'Accueil",
      menu_wire: 'Explorer les Communautés',
      menu_news: 'Actualités en Direct',
      menu_popular: 'Populaire & Tendances',
      menu_bookmarks: 'Favoris enregistrés',
      menu_newsletter: 'Bulletin d’Information',
      menu_collections: 'Mes Collections',
      menu_history: 'Historique de recherche',
      menu_settings: 'Paramètres du flux',
      menu_avatars: 'Galerie d’Avatars (Photos & Stickers)',
      menu_profile: 'Gérer mon profil / Connexion',
      menu_appearance: 'Thèmes & Couleurs',
      menu_language: 'Choix de la Langue',

      // Themes Modal
      theme_modal_title: "Personnaliser le Thème & l'Apparence",
      theme_modal_sub: "Personnalisez votre interface avec des thèmes d'arrière-plan et des couleurs d'accent.",
      theme_mode_heading: 'Mode Fond de Thème',
      theme_accent_heading: "Couleur d'Accent au Choix",
      theme_light: 'Papier Clair',
      theme_dark: 'Obsidienne Sombre',
      theme_midnight: 'Minuit OLED Pur',
      theme_cyberpunk: 'Cyberpunk Néon',
      theme_forest: 'Forêt Nordique',
      theme_sepia: 'Sépia Chaleureux',
      accent_indigo: 'Indigo Pulse',
      accent_cyan: 'Cyan Cyber',
      accent_emerald: 'Émeraude Menthe',
      accent_rose: 'Rose Couchant',
      accent_amber: 'Ambre Électrique',
      accent_violet: 'Violet Royal',
      accent_custom: 'Couleur Hex Personnalisée',
      save_theme_btn: 'Appliquer et Fermer',

      // System Toasts
      lang_changed: 'Langue changée en Français 🇫🇷',
      theme_applied: 'Thème et couleurs mis à jour avec succès !',
      copied_link: 'Lien copié dans le presse-papiers !'
    },

    es: {
      // Navigation & Header
      write: 'Escribir',
      search_placeholder: 'Buscar artículos entre los 18 dominios tecnológicos...',
      nav_bookmarks: 'Marcadores guardados',
      switch_profile: 'Cambiar perfil o avatar',
      toggle_theme: 'Alternar modo Oscuro/Claro',
      appearance: 'Temas y Apariencia',
      language: 'Idioma',
      select_language: 'Seleccionar idioma',
      language_sub: 'Elige tu idioma preferido para la interfaz de Pulse.',

      // Hero Section
      hero_badge: 'El Hilo Global del Conocimiento Tecnológico',
      hero_title: 'Donde la destreza se une a la curiosidad.',
      hero_subtitle: 'Publicación líder que abarca Ingeniería de Software, IA, Ciberseguridad, Nube, FinTech, BioTech, Robótica, Aeroespacial y CleanTech.',
      stat_readers: 'Lectores Activos',
      stat_standards: 'Estándares Nativos',
      stat_latency: 'Latencia de Build',
      start_reading: 'Comenzar a leer',
      write_story: 'Escribir artículo',

      // Feeds & Tabs (All 18 Core Domains)
      feed_stories: 'Artículos y Publicaciones',
      feed_discussions: 'Muro Comunitario',
      feed_live_news: 'Noticias en Vivo',
      cat_all: 'Todos los Temas',
      cat_software_eng: 'Ingeniería de Software',
      cat_ai: 'IA y Machine Learning',
      cat_cysa: 'CYSA y Ciberseguridad',
      cat_cloud: 'Computación en la Nube',
      cat_network_infra: 'Redes e Infraestructura',
      cat_product_design: 'Producto y Diseño',
      cat_fintech: 'FinTech',
      cat_health_bio: 'HealthTech y BioTech',
      cat_edtech: 'Tecnología Educativa',
      cat_climate: 'Clima y CleanTech',
      cat_agtech: 'AgTech y Agricultura',
      cat_robotics_auto: 'Robótica y Automoción',
      cat_aerospace_space: 'Aeroespacial y Espacio',
      cat_iot: 'Internet de las Cosas (IoT)',
      cat_hardware: 'Hardware y Silicio',
      cat_startups: 'Startups y VC',
      cat_agencies: 'Agencias Tech',
      cat_os: 'Sistemas y SO',
      cat_apps: 'Aplicaciones y Herramientas',

      // Community Wire
      wire_title: 'Muro Comunitario de Pulse',
      wire_subtitle: 'Debates de ingeniería en tiempo real, decisiones de arquitectura y reflexiones técnicas.',
      wire_placeholder: '¿Qué estás construyendo? Comparte una reflexión técnica o pregunta...',
      wire_code_placeholder: 'Pega código o comando CLI opcional...',
      wire_post_btn: 'Publicar mensaje',
      wire_reply: 'Responder',
      wire_upvote: 'Votar',
      wire_share: 'Compartir',

      // Live News
      news_title: 'Noticias Tecnológicas en Vivo',
      news_subtitle: 'Canal automatizado con lo último en ingeniería y seguridad informática.',
      news_refresh: 'Actualizar noticias',

      // Reader & Comments
      back_to_stories: '← Volver a artículos',
      min_read: 'min de lectura',
      published_by: 'Publicado por',
      comments_title: 'Debates y Comentarios de Colegas',
      comments_sub: 'Aporta tu perspectiva técnica o debate compensaciones.',
      comment_placeholder: 'Escribe una respuesta técnica constructiva... (Markdown soportado)',
      post_comment: 'Publicar comentario',
      tool_code: 'Código',
      tool_quote: 'Cita',
      tool_insight: 'Punto clave',
      share_article: 'Compartir artículo',
      like_article: 'Me gusta',
      bookmark_article: 'Guardar',

      // Sidebar & Menu
      menu_home: 'Inicio',
      menu_wire: 'Muro Comunitario',
      menu_news: 'Noticias en Vivo',
      menu_popular: 'Popular y Tendencias',
      menu_bookmarks: 'Marcadores Guardados',
      menu_newsletter: 'Boletín Semanal',
      menu_collections: 'Mis Colecciones',
      menu_history: 'Historial de Búsqueda',
      menu_settings: 'Ajustes del Feed',
      menu_avatars: 'Galería de Avatares (Fotos y Stickers)',
      menu_profile: 'Mi Perfil / Iniciar Sesión',
      menu_appearance: 'Temas y Colores',
      menu_language: 'Configuración de Idioma',

      // Themes Modal
      theme_modal_title: 'Personalizar Tema y Apariencia',
      theme_modal_sub: 'Personaliza tu entorno de lectura con temas y colores de acento vibrantes.',
      theme_mode_heading: 'Modo de Fondo',
      theme_accent_heading: 'Color de Acento a Elección',
      theme_light: 'Papel Claro',
      theme_dark: 'Obsidiana Oscura',
      theme_midnight: 'Medianoche OLED',
      theme_cyberpunk: 'Cyberpunk Neón',
      theme_forest: 'Bosque Nórdico',
      theme_sepia: 'Sepia Cálido',
      accent_indigo: 'Índigo Pulse',
      accent_cyan: 'Cian Cyber',
      accent_emerald: 'Menta Esmeralda',
      accent_rose: 'Rosa Atardecer',
      accent_amber: 'Ámbar Solar',
      accent_violet: 'Violeta Real',
      accent_custom: 'Color Hex Personalizado',
      save_theme_btn: 'Aplicar y Cerrar',

      // System Toasts
      lang_changed: 'Idioma cambiado a Español 🇪🇸',
      theme_applied: '¡Tema y colores actualizados correctamente!',
      copied_link: '¡Enlace copiado al portapapeles!'
    },

    de: {
      // Navigation & Header
      write: 'Schreiben',
      search_placeholder: 'Themen aus allen 18 Tech-Bereichen suchen...',
      nav_bookmarks: 'Gespeicherte Lesezeichen',
      switch_profile: 'Profil oder Avatar wechseln',
      toggle_theme: 'Dunkel/Hell-Modus umschalten',
      appearance: 'Designs & Erscheinungsbild',
      language: 'Sprache',
      select_language: 'Sprache auswählen',
      language_sub: 'Wählen Sie Ihre bevorzugte Sprache für die Pulse-Benutzeroberfläche.',

      // Hero Section
      hero_badge: 'Der globale Technologie-Nachrichtenkanal',
      hero_title: 'Wo Handwerk auf Neugier trifft.',
      hero_subtitle: 'Leitmedium für Software-Engineering, KI, CYSA, Cloud, FinTech, BioTech, Robotik, Raumfahrt und CleanTech.',
      stat_readers: 'Aktive Leser',
      stat_standards: 'Native Standards',
      stat_latency: 'Build-Latenz',
      start_reading: 'Lesen beginnen',
      write_story: 'Artikel verfassen',

      // Feeds & Tabs (All 18 Core Domains)
      feed_stories: 'Artikel & Berichte',
      feed_discussions: 'Community-Ticker',
      feed_live_news: 'Live-Nachrichten',
      cat_all: 'Alle Themen',
      cat_software_eng: 'Software-Entwicklung',
      cat_ai: 'KI & Machine Learning',
      cat_cysa: 'CYSA & Cybersicherheit',
      cat_cloud: 'Cloud Computing',
      cat_network_infra: 'Netzwerk & Infrastruktur',
      cat_product_design: 'Produkt & Design',
      cat_fintech: 'FinTech',
      cat_health_bio: 'HealthTech & BioTech',
      cat_edtech: 'Bildungstechnologie',
      cat_climate: 'Klima & CleanTech',
      cat_agtech: 'AgTech & Landwirtschaft',
      cat_robotics_auto: 'Robotik & Automotive',
      cat_aerospace_space: 'Luft- & Raumfahrt',
      cat_iot: 'Internet der Dinge (IoT)',
      cat_hardware: 'Hardware & Silizium',
      cat_startups: 'Startups & VC',
      cat_agencies: 'Tech-Agenturen',
      cat_os: 'Betriebssysteme',
      cat_apps: 'Apps & Werkzeuge',

      // Community Wire
      wire_title: 'Pulse Community-Ticker',
      wire_subtitle: 'Echtzeit-Debatten über Systemarchitektur und Engineering.',
      wire_placeholder: 'Teilen Sie technische Überlegungen, Code-Herausforderungen oder Fragen...',
      wire_code_placeholder: 'Optionalen Code oder CLI-Befehl einfügen...',
      wire_post_btn: 'Beitrag senden',
      wire_reply: 'Antworten',
      wire_upvote: 'Upvote',
      wire_share: 'Teilen',

      // Live News
      news_title: 'Echtzeit-Techniknachrichten',
      news_subtitle: 'Automatisierter Live-Feed aus führenden Engineering-Ökosystemen.',
      news_refresh: 'Feed aktualisieren',

      // Reader & Comments
      back_to_stories: '← Zurück zur Übersicht',
      min_read: 'Min. Lesezeit',
      published_by: 'Veröffentlicht von',
      comments_title: 'Diskussion & Experten-Kommentare',
      comments_sub: 'Bringen Sie Ihre technische Perspektive ein.',
      comment_placeholder: 'Fundierte technische Antwort verfassen... (Markdown unterstützt)',
      post_comment: 'Kommentar senden',
      tool_code: 'Codeblock',
      tool_quote: 'Zitat',
      tool_insight: 'Kernaussage',
      share_article: 'Artikel teilen',
      like_article: 'Gefällt mir',
      bookmark_article: 'Merken',

      // Sidebar & Menu
      menu_home: 'Startseite',
      menu_wire: 'Community-Ticker',
      menu_news: 'Live-Nachrichten',
      menu_popular: 'Beliebt & Trends',
      menu_bookmarks: 'Gespeicherte Lesezeichen',
      menu_newsletter: 'Newsletter-Zusammenfassung',
      menu_collections: 'Meine Sammlungen',
      menu_history: 'Suchverlauf',
      menu_settings: 'Feed-Einstellungen',
      menu_avatars: 'Avatar-Galerie (Fotos & Sticker)',
      menu_profile: 'Profil verwalten / Login',
      menu_appearance: 'Designs & Farbakzente',
      menu_language: 'Spracheinstellungen',

      // Themes Modal
      theme_modal_title: 'Design & Farben anpassen',
      theme_modal_sub: 'Passen Sie Ihre Leseumgebung mit Themes und Farbakzenten an.',
      theme_mode_heading: 'Basis-Design',
      theme_accent_heading: 'Akzentfarbe nach Wahl',
      theme_light: 'Helles Papier',
      theme_dark: 'Dunkles Obsidian',
      theme_midnight: 'Mitternacht OLED',
      theme_cyberpunk: 'Cyberpunk Neon',
      theme_forest: 'Nordischer Wald',
      theme_sepia: 'Warmes Sepia',
      accent_indigo: 'Pulse Indigo',
      accent_cyan: 'Cyber Cyan',
      accent_emerald: 'Smaragd Minze',
      accent_rose: 'Rosenrot',
      accent_amber: 'Solar Bernstein',
      accent_violet: 'Königliches Violett',
      accent_custom: 'Eigene Hex-Farbe',
      save_theme_btn: 'Übernehmen & Schließen',

      // System Toasts
      lang_changed: 'Sprache auf Deutsch geändert 🇩🇪',
      theme_applied: 'Design und Farben erfolgreich aktualisiert!',
      copied_link: 'Link in Zwischenablage kopiert!'
    },

    ja: {
      // Navigation & Header
      write: '投稿する',
      search_placeholder: '全18テクノロジー領域の記事を検索...',
      nav_bookmarks: '保存したブックマーク',
      switch_profile: 'プロフィール・アバター変更',
      toggle_theme: 'ダーク/ライトモード切替',
      appearance: 'テーマと外観',
      language: '言語 (Language)',
      select_language: '言語を選択',
      language_sub: 'Pulseのインターフェース表示言語を選択してください。',

      // Hero Section
      hero_badge: '世界の先端技術ナレッジ・ワイヤー',
      hero_title: 'クラフトマンシップと探求心が交差する場所。',
      hero_subtitle: 'ソフトウェア工学、AI、サイバーセキュリティ、クラウド、FinTech、BioTech、ロボティクス、宇宙開発、クリーンテックを網羅。',
      stat_readers: 'アクティブ読者',
      stat_standards: 'ネイティブ標準',
      stat_latency: 'ビルド待機時間',
      start_reading: '記事を読む',
      write_story: '記事を書く',

      // Feeds & Tabs (All 18 Core Domains)
      feed_stories: 'ストーリー記事',
      feed_discussions: 'コミュニティ・ワイヤー',
      feed_live_news: 'リアルタイム速報',
      cat_all: '全テクノロジー',
      cat_software_eng: 'ソフトウェア工学',
      cat_ai: 'AI・機械学習',
      cat_cysa: 'CYSA・セキュリティ',
      cat_cloud: 'クラウド・分散基盤',
      cat_network_infra: 'ネットワーク・インフラ',
      cat_product_design: 'プロダクト・デザイン',
      cat_fintech: 'FinTech・金融技術',
      cat_health_bio: 'HealthTech・バイオ',
      cat_edtech: 'EdTech・教育技術',
      cat_climate: '気候・クリーンテック',
      cat_agtech: 'アグテック・農業技術',
      cat_robotics_auto: 'ロボティクス・自動運転',
      cat_aerospace_space: '航空宇宙・宇宙技術',
      cat_iot: 'IoT・組込みシステム',
      cat_hardware: '半導体・ハードウェア',
      cat_startups: 'スタートアップ・VC',
      cat_agencies: 'テックエージェンシー',
      cat_os: 'OS・カーネル',
      cat_apps: 'アプリ・開発ツール',

      // Community Wire
      wire_title: 'Pulse コミュニティ・ワイヤー',
      wire_subtitle: 'リアルタイムの技術議論、アーキテクチャのトレードオフ考察。',
      wire_placeholder: 'アーキテクチャの洞察や技術的な問いを投稿してください...',
      wire_code_placeholder: '任意のコードやCLIコマンドを入力...',
      wire_post_btn: '投稿する',
      wire_reply: '返信する',
      wire_upvote: '賛成',
      wire_share: '共有',

      // Live News
      news_title: 'ライブ・テック・フィード',
      news_subtitle: '世界の主要エンジニアリングおよびセキュリティ発信源からの自動速報。',
      news_refresh: '更新する',

      // Reader & Comments
      back_to_stories: '← 記事一覧に戻る',
      min_read: '分で読める',
      published_by: '投稿者:',
      comments_title: '議論とピアレビュー',
      comments_sub: '技術的なフィードバックや視点を共有してください。',
      comment_placeholder: '技術的な見解や代替案を入力してください... (Markdown対応)',
      post_comment: 'コメントを投稿',
      tool_code: 'コード挿入',
      tool_quote: '引用',
      tool_insight: '重要ポイント',
      share_article: '記事を共有',
      like_article: 'いいね',
      bookmark_article: '保存',

      // Sidebar & Menu
      menu_home: 'ホーム記事',
      menu_wire: 'コミュニティ探検',
      menu_news: 'リアルタイム速報',
      menu_popular: '人気・トレンド',
      menu_bookmarks: '保存したブックマーク',
      menu_newsletter: 'ニュースレター要約',
      menu_collections: 'マイコレクション',
      menu_history: '検索履歴',
      menu_settings: 'フィード設定',
      menu_avatars: 'アバターギャラリー (写真・ステッカー)',
      menu_profile: 'プロフィールの管理 / ログイン',
      menu_appearance: 'テーマとカラー設定',
      menu_language: '言語設定',

      // Themes Modal
      theme_modal_title: 'テーマとカラーのカスタマイズ',
      theme_modal_sub: '読書環境を好みの背景テーマとお気に入りのアクセントカラーに整えましょう。',
      theme_mode_heading: '基本テーマモード',
      theme_accent_heading: 'お好みのアクセントカラー',
      theme_light: 'ライトペーパー',
      theme_dark: 'ダークオブシディアン',
      theme_midnight: 'ミッドナイト OLED',
      theme_cyberpunk: 'サイバーパンク・ネオン',
      theme_forest: 'ノルディックフォレスト',
      theme_sepia: 'ウォームセピア',
      accent_indigo: 'Pulse インディゴ',
      accent_cyan: 'サイバーシアン',
      accent_emerald: 'エメラルドミント',
      accent_rose: 'ローズサンセット',
      accent_amber: 'ソーラーアンバー',
      accent_violet: 'ロイヤルバイオレット',
      accent_custom: 'カスタムカラー (Hex)',
      save_theme_btn: '適用して閉じる',

      // System Toasts
      lang_changed: '言語を日本語に切り替えました 🇯🇵',
      theme_applied: 'テーマとカラーを更新しました！',
      copied_link: 'リンクをクリップボードにコピーしました！'
    }
  };

  class I18nManager {
    constructor() {
      this.currentLang = localStorage.getItem(STORAGE_KEY) || 'en';
      if (!TRANSLATIONS[this.currentLang]) {
        this.currentLang = 'en';
      }
    }

    init() {
      this.applyLanguage(this.currentLang, false);
    }

    getLanguages() {
      return LANGUAGES;
    }

    getCurrentLanguage() {
      return this.currentLang;
    }

    getCurrentLanguageInfo() {
      return LANGUAGES.find(l => l.code === this.currentLang) || LANGUAGES[0];
    }

    t(key, fallback = '') {
      const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
      return dict[key] || TRANSLATIONS.en[key] || fallback || key;
    }

    setLanguage(code) {
      if (!TRANSLATIONS[code]) {
        console.warn(`[i18n] Language ${code} is not supported.`);
        return;
      }
      this.currentLang = code;
      localStorage.setItem(STORAGE_KEY, code);
      this.applyLanguage(code, true);
    }

    applyLanguage(code, showToastMessage = true) {
      document.documentElement.lang = code;

      // Update elements with data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = this.t(key);
        if (translated) {
          el.textContent = translated;
        }
      });

      // Update elements with data-i18n-placeholder
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translated = this.t(key);
        if (translated) {
          el.setAttribute('placeholder', translated);
        }
      });

      // Update elements with data-i18n-title
      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const translated = this.t(key);
        if (translated) {
          el.setAttribute('title', translated);
        }
      });

      // Update all language display buttons across headers and toolbars
      const langInfo = this.getCurrentLanguageInfo();
      const codeUpper = langInfo.code.toUpperCase();

      ['current-lang-code', 'toolbar-lang-code', 'quick-lang-code'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = codeUpper;
      });

      ['current-lang-flag', 'toolbar-lang-flag', 'quick-lang-flag'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = langInfo.flag;
      });

      // Trigger UI updates if UI controller exists
      if (window.PulseUI && typeof window.PulseUI.onLanguageChanged === 'function') {
        window.PulseUI.onLanguageChanged(code);
      }

      if (showToastMessage && window.PulseUI && typeof window.PulseUI.showToast === 'function') {
        window.PulseUI.showToast(this.t('lang_changed'), 'success');
      }
    }
  }

  window.PulseI18n = new I18nManager();
})();
