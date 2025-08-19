import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'ge';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    catalog: 'Catalog',
    aboutUs: 'About Us',
    rent: 'Rent',
    buy: 'Buy',
    projects: 'Projects',
    contacts: 'Contacts',
    
    // Hero
    heroTitle: 'From viewing to keys — without extra hassle',
    heroSubtitle: 'We will select, show and arrange — you just have to choose.',
    yourName: 'Your Name',
    email: 'Your Email',
    phone: 'Phone Number',
    submit: 'Submit',
    
    // Search
    searchLocation: 'Location',
    propertyType: 'Property Type',
    priceRange: 'Price Range',
    bedrooms: 'Bedrooms',
    searchButton: 'Search Properties',
    
    // Property Types
    apartment: 'Apartment',
    house: 'House',
    villa: 'Villa',
    commercial: 'Commercial',
    
    // Featured Properties
    featuredProperties: 'Featured Properties',
    viewDetails: 'View Details',
    contactAgent: 'Contact Agent',
    
    // Why Trust Home
    whyTrustHome: 'Why Trust Home?',
    secureDeals: 'Secure Deals',
    secureDealsDesc: 'All transactions are legally protected with comprehensive insurance coverage',
    verifiedListings: 'Verified Listings',
    verifiedListingsDesc: 'Every property is thoroughly inspected and verified by our expert team',
    trustedDevelopers: 'Trusted Developers',
    trustedDevelopersDesc: 'We work only with reputable developers with proven track records',
    easyProcess: 'Easy Process',
    easyProcessDesc: 'Streamlined workflow from initial search to final key handover',
    
    // Reviews
    customerReviews: 'Customer Reviews',
    
    // Request Form
    leaveRequest: 'Leave a Request',
    requestSubtitle: 'Tell us about your preferences and we will select the perfect property for you',
    requestSubmit: 'Send Request',
    
    // Footer
    footerDescription: 'Trust Home - your reliable partner in real estate. We help find the perfect property for life and investment.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
    followUs: 'Follow Us',
    
    // Pages
    propertiesFor: 'Properties for',
    forRent: 'For Rent',
    forSale: 'For Sale',
    developmentProjects: 'Development Projects',
    investmentOpportunities: 'Investment Opportunities',
    
    // About Us
    aboutUsTitle: 'About Trust Home',
    aboutUsContent: 'Trust Home is a leading real estate marketplace connecting buyers, sellers, and renters with their perfect properties. With years of experience in the market, we provide transparent, secure, and efficient property transactions.',
    ourMission: 'Our Mission',
    missionContent: 'To make real estate transactions simple, transparent, and trustworthy for everyone.',
    ourValues: 'Our Values',
    
    // Contact
    getInTouch: 'Get in Touch',
    address: 'Address',
    workingHours: 'Working Hours',
    mondayFriday: 'Monday - Friday: 9:00 - 18:00',
    saturday: 'Saturday: 10:00 - 16:00',
    
    // Common
    from: 'from',
    usd: 'USD',
    perMonth: '/month',
    bedrooms_count: 'bedrooms',
    bathrooms: 'bathrooms',
    sqft: 'sq ft',
    viewProject: 'View Project',
    learnMore: 'Learn More',
  },
  ru: {
    // Navigation
    catalog: 'Каталог',
    aboutUs: 'О нас',
    rent: 'Аренда',
    buy: 'Покупка',
    projects: 'Проекты',
    contacts: 'Контакты',
    
    // Hero
    heroTitle: 'От просмотра до ключей — без лишних забот',
    heroSubtitle: 'Мы подберём, покажем и оформим — вам останется выбрать.',
    yourName: 'Ваше имя',
    email: 'Email',
    phone: 'Номер телефона',
    submit: 'Отправить',
    
    // Search
    searchLocation: 'Местоположение',
    propertyType: 'Тип недвижимости',
    priceRange: 'Ценовой диапазон',
    bedrooms: 'Спальни',
    searchButton: 'Поиск недвижимости',
    
    // Property Types
    apartment: 'Квартира',
    house: 'Дом',
    villa: 'Вилла',
    commercial: 'Коммерческая',
    
    // Featured Properties
    featuredProperties: 'Рекомендуемые объекты',
    viewDetails: 'Подробнее',
    contactAgent: 'Связаться с агентом',
    
    // Why Trust Home
    whyTrustHome: 'Почему Trust Home?',
    secureDeals: 'Безопасные сделки',
    secureDealsDesc: 'Все транзакции юридически защищены с полным страховым покрытием',
    verifiedListings: 'Проверенные объекты',
    verifiedListingsDesc: 'Каждая недвижимость тщательно проверена нашей командой экспертов',
    trustedDevelopers: 'Надёжные застройщики',
    trustedDevelopersDesc: 'Мы работаем только с проверенными застройщиками с безупречной репутацией',
    easyProcess: 'Простой процесс',
    easyProcessDesc: 'Упрощённый workflow от поиска до получения ключей',
    
    // Reviews
    customerReviews: 'Отзывы клиентов',
    
    // Request Form
    leaveRequest: 'Оставить заявку',
    requestSubtitle: 'Расскажите о своих предпочтениях, и мы подберём идеальную недвижимость для вас',
    requestSubmit: 'Отправить заявку',
    
    // Footer
    footerDescription: 'Trust Home - ваш надёжный партнёр в сфере недвижимости. Помогаем найти идеальную недвижимость для жизни и инвестиций.',
    quickLinks: 'Быстрые ссылки',
    contactInfo: 'Контактная информация',
    followUs: 'Следите за нами',
    
    // Pages
    propertiesFor: 'Недвижимость для',
    forRent: 'Аренды',
    forSale: 'Продажи',
    developmentProjects: 'Проекты застройки',
    investmentOpportunities: 'Инвестиционные возможности',
    
    // About Us
    aboutUsTitle: 'О Trust Home',
    aboutUsContent: 'Trust Home - ведущая платформа недвижимости, соединяющая покупателей, продавцов и арендаторов с их идеальной недвижимостью. Имея многолетний опыт работы на рынке, мы обеспечиваем прозрачные, безопасные и эффективные сделки с недвижимостью.',
    ourMission: 'Наша миссия',
    missionContent: 'Сделать сделки с недвижимостью простыми, прозрачными и надёжными для всех.',
    ourValues: 'Наши ценности',
    
    // Contact
    getInTouch: 'Связаться с нами',
    address: 'Адрес',
    workingHours: 'Часы работы',
    mondayFriday: 'Понедельник - Пятница: 9:00 - 18:00',
    saturday: 'Суббота: 10:00 - 16:00',
    
    // Common
    from: 'от',
    usd: 'USD',
    perMonth: '/мес',
    bedrooms_count: 'спальни',
    bathrooms: 'ванные',
    sqft: 'кв. м',
    viewProject: 'Посмотреть проект',
    learnMore: 'Узнать больше',
  },
  ge: {
    // Navigation
    catalog: 'კატალოგი',
    aboutUs: 'ჩვენს შესახებ',
    rent: 'ქირავდება',
    buy: 'იყიდება',
    projects: 'პროექტები',
    contacts: 'კონტაქტები',
    
    // Hero
    heroTitle: 'დათვალიერებიდან გასაღებებამდე — ზედმეტი პრობლემების გარეშე',
    heroSubtitle: 'ჩვენ შევარჩევთ, გაჩვენებთ და გავაფორმებთ — თქვენ მხოლოდ უნდა აირჩიოთ.',
    yourName: 'თქვენი სახელი',
    email: 'ელ. ფოსტა',
    phone: 'ტელეფონის ნომერი',
    submit: 'გაგზავნა',
    
    // Search
    searchLocation: 'მდებარეობა',
    propertyType: 'უძრავი ქონების ტიპი',
    priceRange: 'ფასების დიაპაზონი',
    bedrooms: 'საძინებელი',
    searchButton: 'უძრავი ქონების ძებნა',
    
    // Property Types
    apartment: 'ბინა',
    house: 'სახლი',
    villa: 'ვილა',
    commercial: 'კომერციული',
    
    // Featured Properties
    featuredProperties: 'რჩეული ობიექტები',
    viewDetails: 'დეტალები',
    contactAgent: 'აგენტთან კავშირი',
    
    // Why Trust Home
    whyTrustHome: 'რატომ Trust Home?',
    secureDeals: 'უსაფრთხო გარიგებები',
    secureDealsDesc: 'ყველა ტრანზაქცია იურიდიულად დაცულია სრული სადაზღვეო დაცვით',
    verifiedListings: 'გადამოწმებული ობიექტები',
    verifiedListingsDesc: 'ყოველი ქონება საფუძვლიანად შემოწმებულია ჩვენი ექსპერტთა გუნდის მიერ',
    trustedDevelopers: 'სანდო დეველოპერები',
    trustedDevelopersDesc: 'ვმუშაობთ მხოლოდ სანდო დეველოპერებთან დადასტურებული რეპუტაციით',
    easyProcess: 'მარტივი პროცესი',
    easyProcessDesc: 'გამარტივებული workflow-ი ძიებიდან საბოლოო გასაღებების მიღებამდე',
    
    // Reviews
    customerReviews: 'მომხმარებელთა შეფასებები',
    
    // Request Form
    leaveRequest: 'მოთხოვნის დატოვება',
    requestSubtitle: 'მოგვითხარით თქვენს პრეფერენციებზე და ჩვენ შევარჩევთ თქვენთვის სრულყოფილ ქონებას',
    requestSubmit: 'მოთხოვნის გაგზავნა',
    
    // Footer
    footerDescription: 'Trust Home - თქვენი სანდო პარტნიორი უძრავი ქონების სფეროში. ვეხმარებით იპოვოთ სრულყოფილი ქონება ცხოვრებისა და ინვესტიციისთვის.',
    quickLinks: 'სწრაფი ბმულები',
    contactInfo: 'საკონტაქტო ინფორმაცია',
    followUs: 'გაგვყევით',
    
    // Pages
    propertiesFor: 'უძრავი ქონება',
    forRent: 'ქირავდება',
    forSale: 'იყიდება',
    developmentProjects: 'განვითარების პროექტები',
    investmentOpportunities: 'საინვესტიციო შესაძლებლობები',
    
    // About Us
    aboutUsTitle: 'Trust Home-ის შესახებ',
    aboutUsContent: 'Trust Home არის უძრავი ქონების წამყვანი მარკეტპლეისი, რომელიც აკავშირებს მყიდველებს, გამყიდველებს და მქირავნეებს მათ სრულყოფილ ქონებასთან. მრავალწლიანი გამოცდილებით ბაზარზე, ჩვენ უზრუნველვყოფთ გამჭვირვალე, უსაფრთხო და ეფექტურ უძრავი ქონების ტრანზაქციებს.',
    ourMission: 'ჩვენი მისია',
    missionContent: 'უძრავი ქონების ტრანზაქციები გავხადოთ მარტივი, გამჭვირვალე და სანდო ყველასთვის.',
    ourValues: 'ჩვენი ღირებულებები',
    
    // Contact
    getInTouch: 'დაგვიკავშირდით',
    address: 'მისამართი',
    workingHours: 'სამუშაო საათები',
    mondayFriday: 'ორშაბათი - პარასკევი: 9:00 - 18:00',
    saturday: 'შაბათი: 10:00 - 16:00',
    
    // Common
    from: 'დან',
    usd: 'USD',
    perMonth: '/თვე',
    bedrooms_count: 'საძინებელი',
    bathrooms: 'სააბაზანო',
    sqft: 'კვ. მ',
    viewProject: 'პროექტის ნახვა',
    learnMore: 'მეტის გაგება',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};